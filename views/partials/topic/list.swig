{% for topic in topics %}
	<div class="row topic {% if topic.sticky %}sticky{% endif %}" id="topic-{{ topic.id }}">
		<div class="col-sm-5">
			<a href="/{{ topic.forum.name|toUrl }}/{{ topic.name|toUrl }}-{{ topic.id }}/" class="topic-name preview">
				{{ topic.name }}
			</a>

			<div class="topic-info">
				{% if topic.locked %}
					<em title="Locked" data-toggle="tooltip" class="fa fa-lock"></em >
				{% endif %}

				{% if topic.sticky %}
					<em title="Sticky" data-toggle="tooltip" class="fa fa-thumb-tack"></em >
				{% endif %}
			</div>

			<p class="topic-author">
				<a href="/user/{{ topic.author.username }}" class="user-link">
					{{ topic.author.username }}
				</a>
			</p>
			<span class="date" title="{{ topic.createdAt|date('c') }}">
				{{ topic.createdAt|toDate }}
			</span>
		</div>
		<div class="col-sm-3">
			<p title="Views" data-toggle="tooltip" class="views"><em class="fa fa-eye"></em > {{ topic.views }}</p>
			<p title="Replies" data-toggle="tooltip" class="replies"><em class="fa fa-pencil"></em > {{ topic.replies }}<p>
		</div>
		<div class="text-right col-sm-4">
			{% if topic.lastPost %}
				<p>
					<a href="/{{ topic.forum.name|toUrl }}/{{ topic.name|toUrl }}-{{ topic.id }}/#{{ topic.lastPost.id }}" class="topic-name">
						{{ topic.lastPost.name }}
					</a>
				</p>
				<p>	
					<a href="/user/{{ topic.lastAuthor.username }}" class="user-link">
						{{ topic.lastAuthor.username }}
					</a>
				</p>
				<span class="date" title="{{ topic.lastPost.createdAt|date('c') }}">
					{{ topic.lastPost.createdAt|toDate }}
				</span>
			{% else %}
				<p>
					<a href="/" class="topic-name">
						{{ topic.name }}
					</a>
				</p>
				<p>	
					<a href="/user/{{ topic.author.username }}" class="user-link">
						{{ topic.author.username }}
					</a>
				</p>
				<span class="date" title="{{ topic.createdAt|date('c') }}">
					{{ topic.createdAt|toDate }}
				</span>
			{% endif %}
		</div>
	</div>
	<div class="seperator"></div>
{% endfor %}