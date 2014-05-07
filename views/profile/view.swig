{% extends layout %}

{% block content %}
	<script>
	$(function () {
		ASF.profile.loadPostHistory(null, {{ user.profile.id }});
		ASF.profile.loadComments(null, {{ user.profile.id }});
		
		{% if req.session.authenticated && req.session.User.id != user.id %}
			ASF.profile.updateViews({{ user.id }});
		{% endif %}

		ASF.page.sidebar = {{ sails.config.sidebars[section]|raw|json_encode }};
	});
	</script>

	<section id="user-profile" class="marginTop80 relative">
		<ul class="list-unstyled list-inline" id="profile-stats">
			<li title="Topics" data-toggle="tooltip">
				<em class="fa fa-comment"></em> {{ user.topics }}
			</li>
			<li title="Posts" data-toggle="tooltip">
				<em class="fa fa-comments"></em> {{ user.posts }}
			</li>
			<li title="Profile Views" data-toggle="tooltip">
				<em class="fa fa-eye"></em> {{ user.profile.views }}
			</li>
		</ul>

		<header class="clearfix">
			<div id="profile-avatar" class="huge pull-left">
				<img width="100" height="100" src="{{ sails.config.board.avatarDir }}/{{ user.username }}/avatar.png" alt=""  />
			</div>
			<div class="pull-left">
				<h5>{{ user.username }}</h5>
			</div>
		</header>

		<div class="row">
			<div class="col-md-6" id="profile-left">
				<div id="profile-info" class="clearfix">
					<div class="pull-left">
						<h3>
							{{ user.profile.name }}
						</h3>
						<em>
							<em class="fa fa-{{ user.profile.gender|lower }}"></em> {{ user.profile.gender|lower|capitalize }} from <span>{{ user.profile.location }}</span>
						</em>
					</div>
					<div class="pull-right">
						<p>
							{% include "../partials/profile/following.swig" %}
						</p>
					</div>
				</div>

				<div id="profile-comments">
					
					<form class="relative" method="post" action="javascript:void(0)" data-event="submit" data-action="profile.addComment">
						<input type="hidden" name="profileId" value="{{ user.profile.id }}" />
						<textarea class="form-control" name="profile-comment" {% if req.session.authenticated %}placeholder="Write something..."{% else %}disabled{% endif %}></textarea>
						<button class="form-control btn btn-primary">
							Post
						</button>	

						{% if not req.session.authenticated %}
							<div class="textarea-login-placeholder">
								Please <a href="#" data-target="#login-modal" data-toggle="modal">login</a> or <a href="/register">signup</a> to post a comment
							</div>
						{% endif %}
					</form>	

					<ul class="list-unstyled">
						<li class="alert alert-warning" id="no-comments">
							No comments posted yet
						</li>
					</ul>
				</div>

				<a id="loadMoreComments" href="javascript:void(0)" class="btn btn-primary form-control" data-event="click" data-userId="{{ user.id }}" data-action="profile.loadComments">
					Load More
				</a>
			</div>

			<div class="col-md-6" id="profile-right">
				<div id="profile-post-history">
					<ul class="list-unstyled"></ul>
				</div>

				<a id="loadMorePosts" href="javascript:void(0)" class="btn btn-primary form-control" data-event="click" data-userId="{{ user.id }}" data-action="profile.loadPostHistory">
					Load More
				</a>

			</div>
		</div>

	</section>

	<script>
		ASF.page.sidebars = {{ sails.config.sidebars[section]|safe|json }};
	</script>
{% endblock %}