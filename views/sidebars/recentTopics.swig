<section class="box">
	<header>
		<h3>Recent Topics</h3>
	</header>
	<div class="content">
		<ul class="list-unstyled">
			{% if recent_topics.length %}
				{% for topic in recent_topics %}
					<li class="clearfix recent-topic">
						<div class="pull-left">
							<div class="avatar">
								<img width="149" height="198" src="{{ avatar_root }}/{{ topic.author.username }}/small.png" alt="" />
							</div>
						</div>
						<div class="pull-left marginLeft30">
							<p class="topic-name">
								<a href="/{{ config('board', 'base') }}{{ topic.forum.name }}/{{ topic.name }}-{{ topic.id }}/1">
									{{ topic.name }}
								</a>
							</p>
							<div class="topic-info">
								<a href="/user/{{ topic.author.username }}" class="user-link">
									{{ topic.author.username }}
								</a>
								<span title="{{ topic.createdAt|date('c') }}" class="date">
									{{ topic.createdAt|toDate }}
								</span>
							</div>
						</div>
					</li>

					{% if not loop.last %}
						<li class="seperator"></li>
					{% endif %}
				{% endfor %}
			{% else %}
				<li class="recent-topic">
					<p class="alert alert-warning">
						No Topics Yet
					</p>
				</li>
			{% endif %}
		</ul>		
	</div>
</section>