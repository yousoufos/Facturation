@extends('layouts.app')
@section('content')
	<div class="flex-container">
		<div class="columns m-t-10">
			<div class="column">
				<h1><i class='fa fa-user-plus'></i> Edit User</h1>
			</div>
		</div>
			<div class="columns">
				<div id="edit_user" class="column">
			{{ Form::model($user, array('route' => array('users.update', $user->id), 'method' => 'PUT')) }}

			    <div class="field">
			        {{ Form::label('name','name',['class'=>'label']) }}
			        <p class="control">
			        {{ Form::text('name', old('name'), array('class' => 'input','requiered' => 'requiered')) }}
			        </p>
			        {!!$errors->first('name','<p class="alert alert-danger">:message</p>')!!}
			    </div>


			    <div class="field">
			        {{ Form::label('email', 'email',['class'=>'label']) }}
			        <p class="control">
			        {{ Form::email('email', old('name'), array('class' => 'input','requiered' => 'requiered')) }}
			        </p>
			        {!!$errors->first('email','<p class="alert alert-danger">:message</p>')!!}
			    </div>


				<div class="field">
				    <input type="checkbox" id="checkbox" v-model="checked">
  					<label class="label" for="checkbox">Changer Mot de passe</label>
				</div>


			    <div class="field">
			        {{ Form::label('password', 'Password',['class'=>'label','v-if'=>'checked']) }}
			        <p class="control">
			        {{ Form::password('password', array('class' => 'input','requiered' => 'requiered','v-if'=>'checked')) }}
			        <p>
			        {!!$errors->first('password','<p class="alert alert-danger">:message</p>')!!}
			    </div>


			    <div class="field">
			        {{ Form::label('password_confirmation', 'Confirm Password',['class'=>'label','requiered' => 'requiered','v-if'=>'checked']) }}
			        <p class="control">
			        {{ Form::password('password_confirmation', array('class' => 'input','v-if'=>'checked')) }}
			        </p>

			    </div>
				<br>


				<div class="column">
			    	<label for="roles" class="label">Roles:</label>
			    	<input type="hidden" name="roles" :value="rolesSelected"/>


			    		@foreach ($roles as $role)
			    			<div class="field">
			    				<b-checkbox v-model="rolesSelected" :custom-value="{{$role->id}}" :native-value="{{$role->id}}">{{$role->display_name}}</b-checkbox>
			    			</div>
			    		@endforeach

			    </div>

			    {{ Form::submit('Validate', array('class' => 'button is-primary')) }}
			    {{ Form::close() }}
			    </div>


		    </div>
	</div>

@endsection

@section('scripts')
	<script>

		var app = new Vue({

			el: '#app',
			data: {
				checked: false,
				rolesSelected: {!! $user->roles->pluck('id') !!}
			},

		});
	</script>
@endsection

