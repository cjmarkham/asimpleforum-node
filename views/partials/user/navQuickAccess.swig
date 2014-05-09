{% if req.user %}
	<div class="clearfix">
		<a class="pull-right avatar small background" href="/user/{{ req.user.username|toUrl }}">
			<img width="55" height="55" src="/uploads/avatars/{{ req.user.username }}/avatar.png" alt="{{ req.user.username }}" title="{{ req.user.username }}" />
		</a>
		<div class="pull-right quick-links relative">
			<div class="dropdown inline" id="notifications-dropdown">
				<a href="#" data-toggle="dropdown" title="Notifications" class="notification-link fa fa-exclamation-triangle"></a>

				<a href="/user/settings/">
					<em data-toggle="tooltip" title="Settings" class="fa fa-cogs"></em>
				</a>

				<div class="notifications-dropdown-list dropdown-menu" role="menu" aria-labelledby="dLabel">
					<ul class="list-unstyled">
						<li>
							<a href="javascript:void(0)">
								No new notifications
							</a>
						</li>
						<li class="seperator"></li>
						<li>
							<a href="/user/notifications/">
								View all
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
{% else %}
	<div class="quick-links text-right">
		<a href="#" data-toggle="modal" data-target="#login-modal">
			Login
		</a>
		<a href="/register">
			Signup
		</a>
	</div>
{% endif %}