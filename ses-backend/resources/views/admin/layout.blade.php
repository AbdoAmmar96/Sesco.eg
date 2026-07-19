<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/png" href="/images/logo-mark.png">
    <link rel="apple-touch-icon" href="/images/logo-mark.png">
    <title>@yield('title', 'Admin') — SES Trading & Industries</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: { extend: { colors: {
          navy: { 50:'#EEF2F9',100:'#D5DEEE',200:'#A9BBDB',500:'#2C4E8C',600:'#1D3A6E',700:'#16315A',800:'#13294B',900:'#0E2143',950:'#0A1A38' },
          brand: { orange:'#F47A20', royal:'#2155CC' }
        } } }
      }
    </script>
</head>
<body class="min-h-screen bg-slate-100 text-navy-900 antialiased">
@php
    $nav = [
        ['Dashboard', 'admin.dashboard', 'admin.dashboard'],
        ['Leads', 'admin.leads.index', 'admin.leads.*'],
        ['__HEADING__', 'Content', ''],
        ['Products', 'admin.products.index', 'admin.products.*'],
        ['Projects', 'admin.projects.index', 'admin.projects.*'],
        ['Product Categories', 'admin.product-categories.index', 'admin.product-categories.*'],
        ['Product Groups', 'admin.product-groups.index', 'admin.product-groups.*'],
        ['Featured Products', 'admin.featured-products.index', 'admin.featured-products.*'],
        ['Services', 'admin.services.index', 'admin.services.*'],
        ['Brands', 'admin.brands.index', 'admin.brands.*'],
        ['Consultants', 'admin.consultants.index', 'admin.consultants.*'],
        ['Downloads', 'admin.downloads.index', 'admin.downloads.*'],
        ['Content Blocks', 'admin.content-blocks.index', 'admin.content-blocks.*'],
        ['__HEADING__', 'Configuration', ''],
        ['Site Settings', 'admin.settings.edit', 'admin.settings.*'],
    ];
@endphp
    @auth
    <div class="flex min-h-screen">
        {{-- Sidebar --}}
        <aside class="hidden w-64 shrink-0 flex-col bg-navy-900 text-white lg:flex">
            <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-2.5 px-5 py-5">
                <img src="/images/logo-mark.png" alt="SES" class="h-10 w-10 shrink-0 object-contain">
                <span class="flex flex-col leading-none">
                    <span class="text-lg font-extrabold tracking-tight text-white">SES <span class="font-semibold text-white/50">Admin</span></span>
                    <span class="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">Control Panel</span>
                </span>
            </a>
            <nav class="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
                @foreach ($nav as $item)
                    @if ($item[0] === '__HEADING__')
                        <p class="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-widest text-white/30">{{ $item[1] }}</p>
                    @else
                        <a href="{{ route($item[1]) }}"
                           class="block rounded-lg px-3 py-2 text-sm font-medium transition-colors {{ request()->routeIs($item[2]) ? 'bg-brand-orange text-white' : 'text-white/70 hover:bg-white/10 hover:text-white' }}">
                            {{ $item[0] }}
                        </a>
                    @endif
                @endforeach
            </nav>
        </aside>

        {{-- Main --}}
        <div class="flex min-w-0 flex-1 flex-col">
            <header class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
                <div class="flex items-center gap-3">
                    {{-- mobile nav --}}
                    <details class="relative lg:hidden">
                        <summary class="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200">☰</summary>
                        <div class="absolute left-0 top-11 z-20 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                            @foreach ($nav as $item)
                                @if ($item[0] !== '__HEADING__')
                                    <a href="{{ route($item[1]) }}" class="block rounded-lg px-3 py-2 text-sm {{ request()->routeIs($item[2]) ? 'bg-navy-50 font-semibold text-navy-900' : 'text-slate-600' }}">{{ $item[0] }}</a>
                                @endif
                            @endforeach
                        </div>
                    </details>
                    <h1 class="text-lg font-bold text-navy-900">@yield('title', 'Dashboard')</h1>
                </div>
                <div class="flex items-center gap-3">
                    <a href="http://localhost:5173" target="_blank" class="hidden text-sm font-semibold text-brand-royal hover:underline sm:inline">View site ↗</a>
                    <form method="POST" action="{{ route('admin.logout') }}">
                        @csrf
                        <button class="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Sign out</button>
                    </form>
                </div>
            </header>

            <main class="flex-1 p-6">
                @if (session('ok'))
                    <div class="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">{{ session('ok') }}</div>
                @endif
                @if ($errors->any())
                    <div class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <p class="font-semibold">Please fix the following:</p>
                        <ul class="mt-1 list-inside list-disc">
                            @foreach ($errors->all() as $e)<li>{{ $e }}</li>@endforeach
                        </ul>
                    </div>
                @endif
                @yield('content')
            </main>
        </div>
    </div>
    @else
        {{-- unauthenticated content (rarely used; login has its own layout) --}}
        <main class="p-6">@yield('content')</main>
    @endauth
    @stack('scripts')
</body>
</html>
