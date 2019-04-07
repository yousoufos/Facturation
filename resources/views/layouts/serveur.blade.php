<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Admin section</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet"  href="{{mix('/css/app.css')}}">
</head>
<body>




 <div class="management-area" id="app">
      @yield('content')
    </div>
</body>
</html>
