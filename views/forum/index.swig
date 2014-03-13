{% extends '../layout.swig' %}

{% block content %}

	<section>
		<header>
			<h5>{{ forum.name }}</h5>
		</header>
		<div class="content">
			{% if topics.length %}

				{% for topic in topics %}

					{% include '../partials/topic/single.swig' %}

					{% if not loop.last %}
						<div class="seperator"></div>
					{% endif %}

				{% endfor %}

			{% else %}
				<p id="no-topics">
					No topics
				</p>
			{% endif %}
		</div>
	</section>
{% endblock %}