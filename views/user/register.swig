{% extends layout %}

{% block content %}

	<section>
		<header>
			<h5>Register</h5>
		</header>
		<div class="content">
			<form data-event="submit" data-action="auth.register" role="form" method="post" action="javascript:void(0)" class="form-horizontal">
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

				<div class="form-group">
					<label class="col-sm-2 control-label">
						Confirm
					</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" name="confirm" placeholder="Confirm" />
					</div>
				</div>

				<div class="form-group">
					<label class="col-sm-2 control-label">
						Email
					</label>
					<div class="col-sm-10">
						<input type="email" class="form-control" name="email" placeholder="Email" />
					</div>
				</div>

				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button class="btn btn-primary submit">
							Sign Up
						</button>
					</div>
				</div>
			</form>
		</div>
	</section>

{% endblock %}