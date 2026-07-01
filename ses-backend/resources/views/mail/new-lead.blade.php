@php($kind = $lead->type === 'quote' ? 'Quotation Request' : 'Contact Message')
<x-mail::message>
# New {{ $kind }}

A new {{ strtolower($kind) }} was submitted on the SES website.

**Name:** {{ $lead->name }}
**Company:** {{ $lead->company ?: '—' }}
**Email:** {{ $lead->email }}
**Phone:** {{ $lead->phone ?: '—' }}
**Subject:** {{ $lead->subject ?: '—' }}
**Interested In:** {{ $lead->interested_in ?: '—' }}

**Message:**
{{ $lead->message }}

<x-mail::button :url="config('app.admin_url', '#')">
View in Admin
</x-mail::button>

Received {{ $lead->created_at->format('d M Y, H:i') }}
</x-mail::message>
