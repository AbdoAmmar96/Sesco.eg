<?php

namespace App\Http\Controllers\Admin\Concerns;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HandlesUploads
{
    /** Longest edge (px) a stored image is downscaled to. */
    protected int $maxImageDimension = 1600;

    /**
     * Store an uploaded file under storage/app/public/uploads/{folder}
     * and return its public URL path ("/storage/...") or null if none.
     *
     * Raster images larger than {@see $maxImageDimension} are downscaled in
     * place so a phone-sized photo (often 4000px+, several MB) becomes a
     * web-friendly file. Non-images (PDF, etc.) are stored untouched.
     */
    protected function storeUpload(Request $request, string $field, string $folder): ?string
    {
        if (! $request->hasFile($field)) {
            return null;
        }

        $path = $request->file($field)->store("uploads/{$folder}", 'public');

        $this->downscaleImage(Storage::disk('public')->path($path), $this->maxImageDimension);

        return '/storage/'.$path;
    }

    /**
     * Build the diagrams list ([{image, caption}, ...]) from a repeater whose
     * rows are `diagrams[i][caption]`, `diagrams[i][image]` (new upload) and
     * `diagrams[i][image_current]` (existing path kept when no new file).
     * Rows with no image are dropped.
     */
    protected function diagramRows(Request $request, string $folder): array
    {
        $out = [];

        foreach ((array) $request->input('diagrams', []) as $i => $row) {
            $image = $this->storeUpload($request, "diagrams.{$i}.image", $folder)
                ?: (trim((string) ($row['image_current'] ?? '')) ?: null);

            if (! $image) {
                continue;
            }

            $out[] = [
                'image' => $image,
                'caption' => trim((string) ($row['caption'] ?? '')) ?: null,
            ];
        }

        return $out;
    }

    /**
     * Store every uploaded file found under $field (a multi-file input like
     * `gallery[]`) and return their public URL paths. Empty when none.
     */
    protected function storeUploads(Request $request, string $field, string $folder): array
    {
        $paths = [];

        foreach ((array) $request->file($field, []) as $file) {
            if (! $file) {
                continue;
            }
            $path = $file->store("uploads/{$folder}", 'public');
            $this->downscaleImage(Storage::disk('public')->path($path), $this->maxImageDimension);
            $paths[] = '/storage/'.$path;
        }

        return $paths;
    }

    /**
     * Shrink an image file in place to fit within $maxDim on its longest edge,
     * preserving aspect ratio and PNG/WebP transparency. A no-op when GD is
     * missing, the file is not a supported raster image, or it already fits.
     */
    protected function downscaleImage(string $absPath, int $maxDim): void
    {
        if ($maxDim < 1 || ! is_file($absPath) || ! extension_loaded('gd')) {
            return;
        }

        $info = @getimagesize($absPath);
        if (! $info) {
            return; // not a raster image (SVG/PDF/corrupt) — leave as-is
        }

        [$w, $h] = $info;
        if ($w <= $maxDim && $h <= $maxDim) {
            return; // already within bounds
        }

        $type = $info[2];
        $src = match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($absPath),
            IMAGETYPE_PNG => @imagecreatefrompng($absPath),
            IMAGETYPE_WEBP => @imagecreatefromwebp($absPath),
            default => null,
        };
        if (! $src) {
            return; // unsupported format (e.g. GIF/AVIF) — keep the original
        }

        $scale = $maxDim / max($w, $h);
        $nw = max(1, (int) round($w * $scale));
        $nh = max(1, (int) round($h * $scale));

        $dst = imagecreatetruecolor($nw, $nh);
        if ($type === IMAGETYPE_PNG || $type === IMAGETYPE_WEBP) {
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
        }
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);

        match ($type) {
            IMAGETYPE_JPEG => imagejpeg($dst, $absPath, 85),
            IMAGETYPE_PNG => imagepng($dst, $absPath, 6),
            IMAGETYPE_WEBP => imagewebp($dst, $absPath, 85),
            default => null,
        };

        imagedestroy($src);
        imagedestroy($dst);
    }
}
