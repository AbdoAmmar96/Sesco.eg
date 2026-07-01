@extends('admin.layout')
@section('title', 'Dashboard')

@section('content')
    <p class="text-sm text-slate-500">Welcome back — manage your website content and leads from here.</p>

    <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        @foreach ($cards as $c)
            <a href="{{ route($c['route']) }}"
               class="group rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md">
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-extrabold text-navy-900">{{ $c['value'] }}</span>
                    <span class="h-2.5 w-2.5 rounded-full {{ $c['accent'] === 'orange' ? 'bg-brand-orange' : ($c['accent'] === 'royal' ? 'bg-brand-royal' : 'bg-navy-700') }}"></span>
                </div>
                <div class="mt-1 text-sm font-semibold text-slate-500 group-hover:text-navy-800">{{ $c['label'] }}</div>
            </a>
        @endforeach
    </div>

    <div class="mt-8 rounded-xl border border-slate-200 bg-white">
        <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 class="font-bold text-navy-900">Recent Leads</h2>
            <a href="{{ route('admin.leads.index') }}" class="text-sm font-semibold text-brand-orange hover:underline">View all →</a>
        </div>
        <div class="divide-y divide-slate-100">
            @forelse ($recentLeads as $lead)
                <a href="{{ route('admin.leads.show', $lead) }}" class="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                    <div>
                        <div class="font-semibold text-navy-900">{{ $lead->name }}</div>
                        <div class="text-xs text-slate-500">{{ $lead->email }} · {{ ucfirst($lead->status) }}</div>
                    </div>
                    <div class="text-xs text-slate-400">{{ $lead->created_at->diffForHumans() }}</div>
                </a>
            @empty
                <p class="px-5 py-8 text-center text-sm text-slate-400">No leads yet.</p>
            @endforelse
        </div>
    </div>
@endsection
