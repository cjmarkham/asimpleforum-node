<form data-event="submit" data-action="auth.login" role="form" method="post" action="javascript:void(0)" class="form-horizontal">
	<div class="form-group">
		<label class="col-sm-2 control-label">
			Username
		</label>
		<div class="col-sm-10">
			<input type="text" class="form-control" name="username" placeholder="Username" />
		</div>
	</div>

	<div class="form-group">
		<label class="col-sm-2 control-label">
			Password
		</label>
		<div class="col-sm-10">
			<input type="password" class="form-control" name="password" placeholder="Password" />
		</div>
	</div>

	<input type="hidden" name="_csrf" value="<%= _csrf %>" />

	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-10">
			<button class="btn btn-primary submit">
				Login
			</button>
		</div>
	</div>
</form>