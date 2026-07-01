<?php

namespace App\Http\Controllers\Admin\Concerns;

use Illuminate\Http\Request;

trait HandlesUploads
{
    /**
     * Store an uploaded file under storage/app/public/uploads/{folder}
     * and return its public URL path ("/storage/...") or null if none.
     */
    protected function storeUpload(Request $request, string $field, string $folder): ?string
    {
        if (! $request->hasFile($field)) {
            return null;
        }

        $path = $request->file($field)->store("uploads/{$folder}", 'public');

        return '/storage/'.$path;
    }
}
