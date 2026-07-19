<?php

return [
    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // Vite dev server origins (add your production domain here when deploying)
    'allowed_origins' => [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://localhost:4173',
        'https://sescoeg.com',
        'https://www.sescoeg.com',
    ],

    // Any local dev origin — localhost / 127.0.0.1 on any port (Vite picks
    // 5173, 5174, 5175… depending on what's free), over http or https.
    'allowed_origins_patterns' => [
        '#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
