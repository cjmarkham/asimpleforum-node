<section id="userbox" class="box">
	<header>
		<h3>Account Control</h3>
	</header>
	<div class="content">
		{% if !req.user %}
			<form data-event="submit" data-action="auth.login" method="post" action="javascript:void(0)">
				<div class="form-group">
					<label>Username</label>
					<input required type="text" class="form-control" name="username" placeholder="Username" />
				</div>
				<div class="form-group">
					<label>Password</label>
					<input required type="password" class="form-control" name="password" placeholder="Password" />
					<p class="help text-right">
						<a href="/">
							Forgot password?
						</a>
					</p>
				</div>

				<div class="text-center">
					<button class="btn btn-orange">
						Login
					</button>

					<a class="btn btn-orange" href="/register">
						Signup
					</a>
				</div>
			</form>

		{% else %}

			<div class="row">
				<div class="col-md-4">
					<div class="avatar medium">
						<img width="149" height="198" src="/uploads/avatars/{{ req.user.username }}/avatar.png" alt="" />
					</div>		
				</div>
				<div class="text-right col-md-8">
					<a href="/" class="user-link">
						{{ req.user.username }}
					</a>

					<div id="userbox-options">
						<div class="clearfix">
							<div class="pull-left">
								<a class="marginRight10" href="/user/{{ req.user.username }}">
									<em class="fa fa-user"></em> <span class="hidden-xs hidden-sm">Profile</span>
								</a>
							</div>
							<div class="pull-right">
								<a href="/user/settings">
									<span class="hidden-xs hidden-sm">Inbox</span> <em class="fa fa-envelope-o"></em>
								</a>
							</div>
						</div>
						<div class="clearfix">
							<div class="pull-left">
								<a class="marginRight10" href="/user/notifications">
									<em class="fa fa-exclamation-triangle"></em> <span class="hidden-xs hidden-sm">Alerts</span>
								</a>
							</div>
							<div class="pull-right">
								<a href="/user/settings">
									<span class="hidden-xs hidden-sm">Settings</span> <em class="fa fa-cogs"></em>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="seperator"></div>
			<a class="btn btn-orange" href="javascript:void(0)" data-user="{{ req.user.username }}" data-event="click" data-action="auth.logout">
				Logout
			</a>
		{% endif %}

	</div>
</section>