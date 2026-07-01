<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class LeadAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::query()->latest();

        if ($request->filled('status') && in_array($request->status, Lead::STATUSES)) {
            $query->where('status', $request->status);
        }
        if ($request->filled('q')) {
            $term = '%'.$request->q.'%';
            $query->where(function ($w) use ($term) {
                $w->where('name', 'like', $term)
                  ->orWhere('email', 'like', $term)
                  ->orWhere('company', 'like', $term)
                  ->orWhere('message', 'like', $term);
            });
        }

        $leads = $query->paginate(15)->withQueryString();

        $stats = [
            'total'    => Lead::count(),
            'new'      => Lead::where('status', 'new')->count(),
            'replied'  => Lead::where('status', 'replied')->count(),
            'archived' => Lead::where('status', 'archived')->count(),
        ];

        return view('admin.leads.index', compact('leads', 'stats'));
    }

    public function show(Lead $lead)
    {
        if ($lead->status === 'new') {
            $lead->update(['status' => 'read']);
        }

        return view('admin.leads.show', compact('lead'));
    }

    public function updateStatus(Request $request, Lead $lead)
    {
        $request->validate(['status' => ['required', 'in:'.implode(',', Lead::STATUSES)]]);
        $lead->update(['status' => $request->status]);

        return back()->with('ok', 'Status updated.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()->route('admin.leads.index')->with('ok', 'Lead deleted.');
    }
}
