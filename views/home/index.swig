{% extends layout %}

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
								<div class="forum" aria-label="forum">
									<div class="row">
									
										<div class="col-sm-8">
											<h4>
												<a class="forum-name" href="/{{ child.name|toUrl }}-{{ child.id }}/">
													{{ child.name }}
												</a>
											</h4>
											<p class="forum-description">
												{{ child.description }}
											</p>
										</div>

										<div class="col-sm-4 text-right hidden-xs">
											{% if child.lastTopic %}
												<div class="clearfix">

													<div class="marginLeft10 pull-right hidden-xs">
														<a class="inline" title="{{ child.lastAuthor.username }}" data-toggle="tooltip" href="/user/{{ child.lastAuthor.username }}" class="user-link">
															<img class="avatar tiny inline" src="/uploads/avatars/{{ child.lastAuthor.username }}/avatar.png" alt="" />
														</a>
													</div>

													<div class="pull-right">
														<p>
															<a href="/{{ child.name|toUrl }}/{{ child.lastTopic.name|toUrl }}-{{ child.lastTopic.id }}/#{{ child.lastPost.id }}" class="topic-name orange">
																{{ child.lastTopic.name }}
															</a>
														</p>
														<p title="{{ child.lastPost.createdAt|date('c') }}" class="date inline">
															{{ child.lastPost.createdAt|toDate }}
														</p>
													</div>
													
												</div>
											{% else %}
												<p>
													<a href="javascript:void(0)" class="topic-name">
														No topics
													</a>
												</p>
												<p>
													<a href="javascript:void(0)" class="user-link">
														Be the first
													</a>
												</p>
											{% endif %}


										</div>
									</div>
								</div>
								{% if child.forums %}
									<div class="row">
										<div class="col-sm-12 subforum-list">
											Subforums: 
											{% for subchild in child.forums %}
												<a href="/{{ subchild.name|toUrl }}-{{ subchild.id }}">
													{{ subchild.name }}
												</a>
											{% endfor %}
										</div>
									</div>
								{% endif %}

							{% endfor %}
						</div>
					{% endif %}
				</div>
			</div>
	 	{% endfor %}

	</section>

	<script>
		ASF.page.sidebars = {{ sails.config.sidebars[section]|safe|json }};
	</script>
{% endblock %}