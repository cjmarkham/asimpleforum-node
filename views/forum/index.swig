{% extends layout %}

{% block content %}
	<div id="topic-showing-count" class="alert alert-warning">
		<small>Showing <span id="topic-count">{{ currentTopicsCount }}</span> of {{ totalTopicsCount }} Total</small>
	</div>

	<section id="topics">
		<header>
			<h5>{{ forum.name }}</h5>
		</header>
		<div class="content">
			{% if topics.length %}

				{% include "../partials/topic/list.swig" %}

			{% else %}
				Nothing to see here, move along.
			{% endif %}

		</div>
	</section>

	<button class="btn btn-orange" data-event="click" data-action="topic.newTrigger">
		New topic
	</button>

	<script>
		ASF.globals.forum = {{ forum|safe|json }};
		ASF.page.sidebars = {{ sails.config.sidebars[section]|safe|json }};

		$(function () {

			$(document).on('scroll', function () {
				
				if (!$('#no-topics').length) {
					if ($(window).scrollTop() >= $(this).height() - $(window).height()) {
						ASF.forum.loadMoreTopics({{ forum.id }}, $('.topic').length);
					}
				}

			});

		});
	</script>
{% endblock %}