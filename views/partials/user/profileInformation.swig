<form role="form" method="post" action="javascript:void(0)" class="form-horizontal" id="avatar-form">
	<div class="alert alert-info helper">
		Press enter when you change a setting to save it.
	</div>	
	
	<div class="form-group">
		<div class="col-sm-3">
			<label class="control-label">
				Avatar
			</label>	
		</div>
		<div class="col-sm-6">
			<div class="marginBottom10 alignBottom" id="avatar-list">
				<img class="inline avatar large" src="{{ sails.config.board.avatarDir }}/{{ req.session.User.username }}/avatar.png" />
			</div>
			<div class="file-input">
				<button class="btn btn-orange">
					Choose a new image
				</button>
				<input type="file" name="avatar" />
			</div>
		</div>
	</div>
</form>

<form role="form" method="post" action="javascript:void(0)" class="form-horizontal">
	<div class="form-group">
		<div class="col-sm-3">
			<label class="control-label">
				Username
			</label>	
		</div>
		<div class="col-sm-6">
			<input disabled type="text" class="form-control" value="{{ req.session.User.username }}" />
			<p class="help-block">
				Your username cannot be changed
			</p>
		</div>
	</div>

	<div class="form-group">
		<div class="col-sm-3">
			<label class="control-label">
				Location
			</label>	
		</div>
		<div class="col-sm-6">
			<input data-event="return" data-action="settings.saveLocation" type="text" class="form-control" name="location" value="{{ req.session.User.profile.location }}" />
		</div>
	</div>

	<div class="form-group">
		<div class="col-sm-3">
			<label class="control-label">
				Name
			</label>	
		</div>
		<div class="col-sm-6">
			<input data-event="return" data-action="settings.saveName" type="text" class="form-control" placeholder="Name" name="name" value="{{ req.session.User.profile.name }}" />
			<p class="help-block">
				Your name will be displayed on your profile
			</p>
		</div>
	</div>

	<div class="form-group">
		<div class="col-sm-3">
			<label class="control-label">
				Birthday (dd-mm-yyyy)
			</label>	
		</div>
		<div class="col-sm-6">
			<input data-event="return" data-action="settings.saveDOB" data-date-format="dd-mm-yyyy" type="text" name="dob" value="{{ req.session.User.profile.dob|date('d-m-Y') }}" class="form-control calander" />
		</div>
	</div>

</form>