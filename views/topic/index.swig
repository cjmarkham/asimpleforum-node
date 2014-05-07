{% extends layout %}

{% block content %}
	<section id="posts">
			
		<header class="clearfix">
			<div class="pull-left">
				<h5>{{ topic.name }}</h5>
			</div>
			<div class="pull-right text-right">
				<span data-toggle="tooltip" title="Views" class="marginRight10">
					<em class="fa fa-eye"></em > {{ topic.views }}
				</span>
				<span data-toggle="tooltip" title="Replies">
					<em class="fa fa-pencil"></em > {{ topic.replies }}
				</span>
			</div>
		</header>

		<div id="post-list">
			{% include "../partials/post/list.swig" %}
		</div>
	</section>

	<div class="post-buttons clearfix">
		
		<div class="pull-left">	
			{% if topic.locked %}
				<button class="btn btn-danger">
					Locked
				</button>	
			{% else %}
				<button id="add-post" class="btn btn-orange" data-event="click" data-action="post.newTrigger">
					Add Reply
				</button>
				<button id="save-post" class="btn btn-orange hide" data-event="click" data-action="post.create">
					Save Post
				</button>
			{% endif %}
		</div>
	</div>

	<script>
		$(function () {

			$(document).on('scroll', function () {
				
				if ($(window).scrollTop() == $(this).height() - $(window).height()) {
					ASF.topic.loadMorePosts({{ topic.id }}, $('.post').length);
				}

			});

		});

		ASF.globals.forum = {{ topic.forum|raw|json_encode }};
		ASF.globals.topic = {{ topic|raw|json_encode }};

		ASF.page.sidebar = {{ sails.config.sidebars[section]|raw|json_encode }};

		{% if not req.session.authenticated or (req.session.authenticated and req.session.User.id != topic.author.id) %}
			ASF.topic.updateViews({{ topic.id }});
		{% endif %}	
	</script>
{% endblock %}