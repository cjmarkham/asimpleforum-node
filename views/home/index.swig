{% extends '../layout.swig' %}

{% block content %}

    <section id="forums">

		{% for forum in forums %}

			<div class="parent-forum">
				<header>
					<h3>
						{{ forum.name }}
					</h3>
				</header>

				<div class="content">
					{% if forum.forums %}
						<div class="forums" aria-label="forums">
							{% for child in forum.forums %}
								<div class="forum row" aria-label="forum">

									<div class="col-sm-8">
										<h4>
											<a class="forum-name" href="/{{ child.name }}-{{ child.id }}/">
												{{ child.name }}
											</a>
										</h4>
										<p class="forum-description">
											{{ child.description }}
										</p>
									</div>

									<div class="col-sm-4 text-right">
										<p>	
											{% if child.lastTopic %}
												<a href="/{{ child.name }}/{{ child.lastTopic.name }}-{{ child.lastTopic.id }}/#{{ child.lastPost.id }}" class="topic-name">
													{{ child.lastTopic.name }}
												</a>
											{% else %}
												<a href="javascript:void(0)" class="topic-name">
													No topics
												</a>
											{% endif %}
										</p>
										<p>
											{% if child.lastTopic %}
												<a href="/user/{{ child.lastAuthor.username }}" class="user-link">
													{{ child.lastAuthor.username }}
												</a>
											{% else %}
												<a href="javascript:void(0)" class="user-link">
													Be the first
												</a>
											{% endif %}
										</p>
										{% if child.lastPost %}
											<p data-default="" title="{{ child.lastPost.createdAt }}" class="date">
												{{ child.lastPost.createdAt|toDate }}
											</p>
										{% endif %}
									</div>
								</div>
								{% if child.forums %}
									<div class="row">
										<div class="col-sm-12 subforum-list">
											Subforums: 
											{% for subchild in child.forums %}
												<a href="/{{ subchild.name }}-{{ subchild.id }}">
													{{ subchild.name }}
												</a>
											{% endfor %}
										</div>
									</div>
								{% endif %}

								{% if not loop.last %}
									<div class="seperator"></div>
								{% endif %}
								
							{% endfor %}
						</div>
					{% endif %}
				</div>
			</div>
	 	{% endfor %}

	</section>

{% endblock %}