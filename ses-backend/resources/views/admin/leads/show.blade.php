@extends('admin.layout')
@section('title', 'Lead · '.$lead->name)

@section('content')
    <a href="{{ route('admin.leads.index') }}" class="text-sm font-semibold text-slate-500 hover:text-navy-900">← Back to leads</a>

    <div class="mt-4 grid gap-6 lg:grid-cols-3">
        {{-- Details --}}
        <div class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
            <div class="flex items-start justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-navy-900">{{ $lead->name }}</h1>
                    <p class="mt-1 text-sm text-slate-500">{{ $lead->created_at->format('d M Y, H:i') }}</p>
                </div>
                @php $sc = ['new' => 'bg-brand-orange/10 text-brand-orange', 'read' => 'bg-slate-200 text-slate-700', 'replied' => 'bg-green-100 text-green-700', 'archived' => 'bg-slate-100 text-slate-400']; @endphp
                <span class="rounded-full px-3 py-1 text-xs font-bold {{ $sc[$lead->status] ?? 'bg-slate-100 text-slate-600' }}">
                    {{ ucfirst($lead->status) }}
                </span>
            </div>

            <dl class="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                @foreach ([
                    'Email' => $lead->email, 'Phone' => $lead->phone,
                    'Company' => $lead->company, 'Interested In' => $lead->interested_in,
                    'Subject' => $lead->subject, 'IP Address' => $lead->ip_address,
                ] as $label => $value)
                    <div>
                        <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">{{ $label }}</dt>
                        <dd class="mt-0.5 text-sm text-navy-900">{{ $value ?: '—' }}</dd>
                    </div>
                @endforeach
            </dl>

            <div class="mt-6">
                <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Message</dt>
                <dd class="mt-2 whitespace-pre-line rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-navy-800">{{ $lead->message }}</dd>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
                <a href="mailto:{{ $lead->email }}?subject=RE: {{ $lead->subject ?: 'Your enquiry to SES' }}"
                   class="rounded-lg bg-brand-orange px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600">
                    Reply by Email
                </a>
                @if ($lead->phone)
                    <a href="tel:{{ $lead->phone }}" class="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-slate-50">Call</a>
                @endif
            </div>
        </div>

        {{-- Status / actions --}}
        <div class="space-y-6">
            <div class="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 class="text-sm font-bold uppercase tracking-wide text-slate-500">Status</h2>
                <form method="POST" action="{{ route('admin.leads.status', $lead) }}" class="mt-3">
                    @csrf @method('PATCH')
                    <select name="status" class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm">
                        @foreach (\App\Models\Lead::STATUSES as $s)
                            <option value="{{ $s }}" @selected($lead->status === $s)>{{ ucfirst($s) }}</option>
                        @endforeach
                    </select>
                    <button class="mt-3 w-full rounded-lg bg-navy-900 py-2.5 text-sm font-bold text-white hover:bg-navy-800">Update status</button>
                </form>
            </div>

            <div class="rounded-2xl border border-red-200 bg-white p-6">
                <h2 class="text-sm font-bold uppercase tracking-wide text-red-500">Danger zone</h2>
                <form method="POST" action="{{ route('admin.leads.destroy', $lead) }}" class="mt-3"
                      onsubmit="return confirm('Delete this lead permanently?')">
                    @csrf @method('DELETE')
                    <button class="w-full rounded-lg border border-red-300 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50">Delete lead</button>
                </form>
            </div>
        </div>
    </div>
@endsection
