@extends('layouts.app')
@section('content')
	<div class="flex-container">
		<div class="columns m-t-10">
			<div class="column">
				<h1><i class='fa fa-user-plus'></i> Add User</h1>
			</div>
		</div>
			<div class="columns">
				<div class="column">
					{{ Form::open(['route' => 'users.store','method' => 'POST']) }}

					<div class="field">
						{{ Form::label('name', 'Name',['class'=>'label']) }}
						<p class="control">
							{{ Form::text('name', '', array('class' => 'input','requiered' => 'requiered')) }}
						</p>
						{!!$errors->first('name','<p class="alert alert-danger">:message</p>')!!}
					</div>

					<div class="field">
						{{ Form::label('email', 'Email',['class'=>'label']) }}
						<p class="control">
							{{ Form::email('email', '', array('class' => 'input','requiered' => 'requiered')) }}
						</p>
						{!!$errors->first('email','<p class="alert alert-danger">:message</p>')!!}
					</div>



					<div class="field">
						{{ Form::label('password', 'Password',['class'=>'label']) }}
						<p class="control">
							{{ Form::password('password', array('class' => 'input','requiered' => 'requiered')) }}
							<p>
								{!!$errors->first('password','<p class="alert alert-danger">:message</p>')!!}
							</div>
							<div class="field">
								{{ Form::label('password_confirmation', 'Confirm Password',['class'=>'label','requiered' => 'requiered']) }}
								<p class="control">
									{{ Form::password('password_confirmation', array('class' => 'input')) }}
								</p>

							</div>
							<br>
							{{ Form::submit('Add User', array('class' => 'button is-primary')) }}

					{{ Form::close() }}
			    </div>
		    </div>
	</div>
@stop

