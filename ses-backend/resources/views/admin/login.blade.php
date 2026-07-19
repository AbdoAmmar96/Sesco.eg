<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="/images/logo-mark.png">
    <title>Admin Login — SES Trading & Industries</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { theme: { extend: { colors: {
        navy: { 50:'#EEF2F9',800:'#13294B',900:'#0E2143',950:'#0A1A38' }, brand:{ orange:'#F47A20' }
      } } } }
    </script>
</head>
<body class="flex min-h-screen items-center justify-center bg-navy-950 px-4">
    <div class="w-full max-w-sm">
        <div class="mb-6 text-center">
            <img src="/images/logo-mark.png" alt="SES" class="mx-auto h-16 w-16 object-contain">
            <h1 class="mt-4 text-xl font-bold text-white">SES Admin Panel</h1>
            <p class="mt-1 text-sm text-white/50">SES Trading &amp; Industries</p>
        </div>

        <form method="POST" action="{{ route('admin.login.attempt') }}" class="rounded-2xl bg-white p-6 shadow-xl">
            @csrf
            @if ($errors->any())
                <div class="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {{ $errors->first() }}
                </div>
            @endif

            <label class="block text-sm font-semibold text-navy-800">Email</label>
            <input type="email" name="email" value="{{ old('email') }}" required autofocus
                   class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-orange">

            <label class="mt-4 block text-sm font-semibold text-navy-800">Password</label>
            <input type="password" name="password" required
                   class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-orange">

            <label class="mt-4 flex items-center gap-2 text-sm text-navy-800">
                <input type="checkbox" name="remember" class="rounded border-slate-300"> Remember me
            </label>

            <button class="mt-6 w-full rounded-lg bg-brand-orange py-2.5 text-sm font-bold text-white hover:bg-orange-600">
                Sign in
            </button>
        </form>
    </div>
</body>
</html>
