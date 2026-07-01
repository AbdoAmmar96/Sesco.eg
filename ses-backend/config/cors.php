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
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
