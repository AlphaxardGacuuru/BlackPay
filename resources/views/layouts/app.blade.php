<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token"
          content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Black Pay') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch"
          href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito"
          rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700"
          rel="stylesheet">

    {{-- Manifest --}}
    <link rel="manifest"
          type="application/manifest+json"
          href="manifest.webmanifest">

    <!-- Scripts -->

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}"
          rel="stylesheet">
    <link href='{{ asset('css/dark.css') }}'
          rel='stylesheet'>

    <!-- Favicon  -->
    <link rel="icon"
          href="storage/img/favicon.ico">
    {{-- IOS support --}}
    <link rel="apple-touch-icon"
          sizes="180x180"
          href="storage/img/apple-touch-icon.png">
    <link rel="icon"
          type="image/png"
          sizes="32x32"
          href="storage/img/favicon-32x32.png">
    <link rel="icon"
          type="image/png"
          sizes="16x16"
          href="storage/img/favicon-16x16.png">
    <link rel="manifest"
          href="/site.webmanifest">
</head>

<body>
    <noscript>
        <center>
            <h2 class="m-5">
                We're sorry but {{ config('app.name', 'Black Music') }}
                doesn't work properly without JavaScript enabled.
                Please enable it to continue.
            </h2>
        </center>
    </noscript>

    <div id="app"></div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"
            defer></script>
</body>

</html>
