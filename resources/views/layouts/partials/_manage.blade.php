<<<<<<< HEAD
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
      <a href="{{route('users.index')}}" class="navbar-item">Manage Users</a>
      <a href="{{route('roles.index')}}" class="navbar-item" >Roles</a>
      <a href="{{route('permissions.index')}}" class="navbar-item">Permissions</a>


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
          <hr class="navbar-divider">
          <a class="navbar-item" href="{{ route('logout') }}" onclick="event.preventDefault();
            document.getElementById('logout-form').submit();"><span class="icone"><i class="m-r-5 fa fa-sign-out" aria-hidden="true"></i></span>
            Logout
          </a>
          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
    {{ csrf_field() }}
</form>
        </div>
      </div>
      @endif
    </div>
  </div>
</nav>

=======
<div class="side-menu" id="admin-side-menu">
	<aside class="menu m-t-30 m-l-10">
	  <p class="menu-label">
	    General
	  </p>
	  <ul class="menu-list">
	    <li><a href="" class="">Dashboard</a></li>
	  </ul>
	  <p class="menu-label">
	    Content
	  </p>
	  <ul class="menu-list">
	    <li><a href="" class="">Blog Posts</a></li>
	  </ul>
	  <p class="menu-label">
	    Administration
	  </p>
	  <ul class="menu-list">
      <li><a href="{{route('users.index')}}" class="{{Nav::isResource('users')}}">Manage Users</a></li>
      <li>
        <a href="{{route('roles.index')}}" class="has-submenu {{Nav::hasSegment(['roles','permissions'],2)}}" >Roles &amp; Permissions</a>
        <ul class="submenu">
          <li><a href="{{route('roles.index')}}" class="{{Nav::isResource('roles')}}" >Roles</a></li>
          <li><a href="{{route('permissions.index')}}" class="{{Nav::isResource('permissions')}}" >Permissions</a></li>
        </ul>
      </li>
    </ul>

	</aside>
</div>
>>>>>>> b90808b4814167b672f66f39fd6fe9b13008bf55
