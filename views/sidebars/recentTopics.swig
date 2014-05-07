<section class="box">
	<header>
		<h3>Recent Topics</h3>
	</header>
	<div class="content">
		<ul class="list-unstyled">
			{% if res.locals.recentTopics %}
				{% for topic in res.locals.recentTopics %}
					<li class="clearfix recent-topic">
						<div class="pull-left">
							<div class="avatar">
								<img width="149" height="198" src="{{ sails.config.board.avatarDir}}/{{ topic.author.username }}/avatar.png" alt="" />
							</div>
						</div>
						<div class="pull-left marginLeft30">
							<p class="topic-name">
								<a href="/{{ topic.forum.name|toUrl }}/{{ topic.name|toUrl }}-{{ topic.id }}">
									{{ topic.name }}
								</a>
							</p>
							<div class="topic-info">
								<a href="/user/{{ topic.author.username }}" class="user-link">
									{{ opic.author.username }}
								</a>
								<span title="{{ topic.createdAt|date('c') }}" class="date">
									{{ topic.createdAt|toDate }}
								</span>
							</div>
						</div>
					</li>
					<li class="seperator"></li>
					
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