{% if following %}
	<a href="javascript:void(0)" class="btn btn-danger" data-event="click" data-action="profile.unfollow" data-userId="{{ user.id }}">
		Unfollow
	</a>
{% else %}
	<a href="javascript:void(0)" class="btn btn-primary" data-event="click" data-action="profile.follow" data-userId="{{ user.id }}">
		Follow
	</a>
{% endif %}