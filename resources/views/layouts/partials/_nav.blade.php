<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    @if (Request::segment(1) == "manage")
      <a  class="navbar-item is-hidden-desktop" id="admin-slideout-button">
      <span class="icon"><i class="fa fa-arrow-circle-o-right"></i></span>
    </a>
    @endif


    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start ">
      <a href="{{route('users.index')}}" class="navbar-item">Manage Users
      </a>
      <a href="{{route('roles.index')}}" class="navbar-item">Roles
      </a>
      <a href="{{route('permissions.index')}}" class="navbar-item">
        Permissions
      </a>


    </div>

    <div class="navbar-end ">
      @if (Auth::guest())
      <a class="navbar-item" href="{{route('login')}}">
        Login
      </a>
      <a class="navbar-item" href="{{route('register')}}">
        Join Us
      </a>
      @else
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          {{Auth::user()->name}}
        </a>

        <div class="navbar-dropdown is-right">
          <a class="navbar-item"><span class="icone"><i class="m-r-5 fa fa-user-circle-o" aria-hidden="true"></i></span>
            Profile
          </a>
          <a class="navbar-item"><span class="icone"><i class="m-r-5 fa fa-bell" aria-hidden="true"></i></span>
            Notifications
          </a>
          <a class="navbar-item" href=""><span class="icone"><i class="m-r-5 fa fa-cog" aria-hidden="true"></i></span>
            Settings
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="{{url('/logout')}}"><span class="icone"><i class="m-r-5 fa fa-sign-out" aria-hidden="true"></i></span>
            Logout
          </a>
        </div>
      </div>
      @endif
    </div>
  </div>
</nav>
