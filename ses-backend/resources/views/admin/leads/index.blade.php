@extends('admin.layout')
@section('title', 'Leads')

@php
    $statusColors = [
        'new' => 'bg-brand-orange/10 text-brand-orange',
        'read' => 'bg-slate-200 text-slate-700',
        'replied' => 'bg-green-100 text-green-700',
        'archived' => 'bg-slate-100 text-slate-400',
    ];
@endphp

@section('content')
    <h1 class="text-2xl font-bold text-navy-900">Leads</h1>
    <p class="mt-1 text-sm text-slate-500">Messages received from the website contact form.</p>

    {{-- Stats --}}
    <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        @foreach ([['Total', $stats['total'], 'slate'], ['New', $stats['new'], 'orange'], ['Replied', $stats['replied'], 'royal'], ['Archived', $stats['archived'], 'navy']] as [$label, $value, $c])
            <div class="rounded-xl border border-slate-200 bg-white p-4">
                <div class="text-2xl font-extrabold text-navy-900">{{ $value }}</div>
                <div class="text-xs font-semibold uppercase tracking-wide text-slate-400">{{ $label }}</div>
            </div>
        @endforeach
    </div>

    {{-- Filters --}}
    <form method="GET" class="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <input type="text" name="q" value="{{ request('q') }}" placeholder="Search name, email, company…"
               class="min-w-[220px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-orange">
        <select name="status" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">All statuses</option>
            @foreach (\App\Models\Lead::STATUSES as $s)
                <option value="{{ $s }}" @selected(request('status')===$s)>{{ ucfirst($s) }}</option>
            @endforeach
        </select>
        <button class="rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800">Filter</button>
        <a href="{{ route('admin.leads.index') }}" class="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 hover:text-navy-900">Reset</a>
    </form>

    {{-- Table --}}
    <div class="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                    <th class="px-4 py-3">Name</th>
                    <th class="px-4 py-3">Subject</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Received</th>
                    <th class="px-4 py-3"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse ($leads as $lead)
                    <tr class="hover:bg-slate-50">
                        <td class="px-4 py-3">
                            <div class="font-semibold text-navy-900">{{ $lead->name }}</div>
                            <div class="text-xs text-slate-500">{{ $lead->email }}{{ $lead->company ? ' · '.$lead->company : '' }}</div>
                        </td>
                        <td class="px-4 py-3 text-slate-600">{{ \Illuminate\Support\Str::limit($lead->subject ?: $lead->interested_in ?: '—', 32) }}</td>
                        <td class="px-4 py-3">
                            <span class="rounded-full px-2.5 py-1 text-xs font-bold {{ $statusColors[$lead->status] ?? '' }}">{{ ucfirst($lead->status) }}</span>
                        </td>
                        <td class="px-4 py-3 text-slate-500">{{ $lead->created_at->format('d M Y, H:i') }}</td>
                        <td class="px-4 py-3 text-right">
                            <a href="{{ route('admin.leads.show', $lead) }}" class="font-semibold text-brand-orange hover:underline">View →</a>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="5" class="px-4 py-12 text-center text-slate-400">No leads found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-5">{{ $leads->links() }}</div>
@endsection
