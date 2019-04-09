@extends('layouts.app')
@section('content')

	<div class="flex-container">
		<div class="columns m-t-10">
			<div class="column">
				<h1 class="title">Manage Users</h1>
			</div>
			<div class="column ">
				<span class="level-right"><a href="{{route('users.create')}}" class="button is-primary ">Create New Users</a></span>
			</div>
		</div>
		<hr>

		<div class="card">
			<div class="card-content">
				<table class="table is-fullwidth is-narrow">
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Date Created</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						@foreach ($users as $user)
							<tr>
							<td>{{$user->id}}</td>
							<td>{{$user->name}}</td>
							<td>{{$user->email}}</td>
							<td>{{$user->created_at}}</td>
							<td class="has-text-right"><a class="button is-outlined m-r-5" href="{{route('users.show',$user->id)}}">View</a><a class="button is-outlined" href="{{route('users.edit',$user->id)}}">Edit</a></td>

						</tr>
						@endforeach

					</tbody>
				</table>
			</div>
		</div>
		{{$users->links()}}
	</div>

@stop
