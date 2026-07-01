<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Mail\NewLeadMail;
use App\Models\Lead;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request)
    {
        $data = $request->safe()->except('website');
        $data['type'] = $data['type'] ?? 'contact';
        $data['ip_address'] = $request->ip();

        $lead = Lead::create($data);

        // Notify the company inbox (uses the configured mailer; defaults to "log").
        try {
            $to = config('mail.lead_inbox') ?: config('mail.from.address');
            if ($to) {
                Mail::to($to)->send(new NewLeadMail($lead));
            }
        } catch (\Throwable $e) {
            Log::warning('Lead notification failed: '.$e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Your message has been received. Our team will get back to you shortly.',
            'id'      => $lead->id,
        ], 201);
    }
}
