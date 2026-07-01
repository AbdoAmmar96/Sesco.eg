<?php

namespace Database\Seeders;

use App\Models\Lead;
use Illuminate\Database\Seeder;

class SampleLeadSeeder extends Seeder
{
    public function run(): void
    {
        $samples = [
            ['type' => 'quote', 'name' => 'Ahmed Hassan', 'company' => 'Cairo Developments', 'email' => 'a.hassan@cairodev.com', 'phone' => '+20 100 111 2233', 'subject' => 'Fire fighting system for new compound', 'interested_in' => 'Fire Fighting Systems', 'message' => 'We need a full fire fighting and sprinkler system quotation for a 12-building residential compound in New Cairo. Please advise on timeline.', 'status' => 'new'],
            ['type' => 'contact', 'name' => 'Mona Saleh', 'company' => 'Nile Industrial Park', 'email' => 'mona.saleh@nilepark.com', 'phone' => '+20 122 444 5566', 'subject' => 'Water network maintenance', 'interested_in' => 'Maintenance & Service', 'message' => 'Looking for an annual maintenance contract for our existing water distribution network.', 'status' => 'read'],
            ['type' => 'quote', 'name' => 'Karim Fouad', 'company' => 'Delta Engineering', 'email' => 'kfouad@delta-eng.com', 'phone' => '+20 111 777 8899', 'subject' => 'Addressable fire alarm — hospital', 'interested_in' => 'Fire Alarm Systems', 'message' => 'Quotation needed for an EN54-certified addressable fire alarm system for a 6-floor hospital.', 'status' => 'replied'],
            ['type' => 'contact', 'name' => 'Sara Adel', 'company' => 'Horizon Mall', 'email' => 'sara.adel@horizonmall.com', 'phone' => '+20 109 222 3344', 'subject' => 'MEP contracting inquiry', 'interested_in' => 'MEP Contracting', 'message' => 'Please share your company profile and previous mall projects.', 'status' => 'new'],
            ['type' => 'quote', 'name' => 'Omar Khaled', 'company' => 'BuildRight Contractors', 'email' => 'omar@buildright.com', 'phone' => '+20 128 555 6677', 'subject' => 'Pump station supply', 'interested_in' => 'Water Network Products', 'message' => 'Need pricing for 3 booster pump sets with variable speed drives.', 'status' => 'read'],
            ['type' => 'contact', 'name' => 'Laila Mansour', 'company' => 'GreenTech Facilities', 'email' => 'laila.m@greentech.com', 'phone' => '+20 106 888 9900', 'subject' => 'Testing & commissioning', 'interested_in' => 'Testing & Commissioning', 'message' => 'We need T&C services for a recently installed fire fighting network.', 'status' => 'archived'],
        ];

        foreach ($samples as $s) {
            Lead::firstOrCreate(
                ['email' => $s['email'], 'subject' => $s['subject']],
                $s,
            );
        }
    }
}
