<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function edit()
    {
        return view('admin.settings.edit', [
            'company' => Setting::get('company', []),
            'pages' => Setting::get('pages', []),
            'projectFilters' => Setting::get('project_filters', []),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'company.name' => ['required', 'string', 'max:160'],
            'company.email' => ['nullable', 'email', 'max:160'],
            'company.phone' => ['nullable', 'string', 'max:60'],
        ]);

        $company = $request->input('company', []);
        // Keep derived href fields in sync with the editable values.
        if (! empty($company['phone'])) {
            $company['phoneHref'] = 'tel:'.preg_replace('/[^0-9+]/', '', $company['phone']);
        }
        if (! empty($company['website'])) {
            $company['websiteHref'] = str_starts_with($company['website'], 'http')
                ? $company['website']
                : 'https://'.$company['website'];
        }

        Setting::put('company', $company);
        Setting::put('pages', $request->input('pages', []));
        Setting::put('project_filters', lines_to_array($request->input('project_filters')));

        return back()->with('ok', 'Settings saved.');
    }
}
