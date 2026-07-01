# SES Trading & Industries — Backend (Laravel API + Admin)

Laravel backend that powers the SES website:

- **API** that receives the Contact form & "Request a Quotation" submissions.
- **Admin panel** to view, filter and manage incoming leads.
- **Email notification** to the company inbox on every new lead.

Stack: **Laravel 13** · **PHP 8.3** · **SQLite** (no DB server needed).

---

## Requirements
- PHP 8.2+ (tested on 8.3)
- Composer 2

## Setup (fresh machine)
```bash
cd ses-backend
composer install
# .env is already present; for a brand-new copy: cp .env.example .env
php artisan key:generate
php artisan migrate --seed     # creates tables + the admin user
php artisan serve              # http://localhost:8000
```

## Admin panel
- URL: **http://localhost:8000/admin/login**
- Default credentials (override via `.env` `ADMIN_EMAIL` / `ADMIN_PASSWORD`, then re-seed):
  - **Email:** `admin@sescoeg.com`
  - **Password:** `SesAdmin@123`

The dashboard lists all leads with search + filters (type / status), a detail
view, status workflow (new → read → replied → archived), reply-by-email, and delete.

## API
| Method | Path         | Purpose                                   |
|--------|--------------|-------------------------------------------|
| POST   | `/api/leads` | Create a lead (Contact form / Quotation)  |
| GET    | `/api/ping`  | Health check                              |

**POST `/api/leads`** body (JSON):
```json
{
  "type": "contact",            // or "quote" (optional, default "contact")
  "name": "Ahmed Ali",          // required
  "company": "ACME",            // optional
  "email": "a@example.com",     // required
  "phone": "+20...",            // optional
  "subject": "...",             // optional
  "interested_in": "Fire Fighting Systems", // optional
  "message": "...",             // required
  "website": ""                 // honeypot — must be empty (anti-spam)
}
```
Returns `201` with `{ success, message, id }`, or `422` with validation errors.

CORS is open to the Vite dev origins in `config/cors.php` — **add your production
domain there** before deploying.

## Email notifications
New leads are emailed to `LEAD_INBOX` (see `.env`, defaults to `MAIL_FROM_ADDRESS`).
By default `MAIL_MAILER=log`, so emails are written to `storage/logs/laravel.log`
instead of being sent. To send real email, set SMTP in `.env`:
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.yourhost.com
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=no-reply@sescoeg.com
LEAD_INBOX=mallamy@sescoeg.com
```

## Connecting the frontend
The React site (`../ses-website`) reads `VITE_API_URL` (see its `.env`),
defaulting to `http://localhost:8000`. The Contact page posts to `/api/leads`.
