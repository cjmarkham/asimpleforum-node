<div class="row topic {% if topic.sticky %}sticky{% endif %}" id="topic-{{ topic.id }}">
	<div class="col-sm-5">
		<a href="/{{ forum.name|toUrl }}/{{ topic.name|toUrl }}-{{ topic.id }}/" class="topic-name preview">
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
		<p title="Views" data-toggle="tooltip" class="views"><em class="fa fa-eye"></em > 0</p>
		<p title="Replies" data-toggle="tooltip" class="replies"><em class="fa fa-pencil"></em > 0<p>
	</div>
	<div class="text-right col-sm-4">
		{% if topic.lastPost %}

			{% set page = (topic.replies / sails.config.board.postsPerPage)|round %}
			{% if page < 1 %}
				{% set page = 1 %}
			{% endif %}

			<p>
				<a href="/{{ forum.name|toUrl }}/{{ topic.name|toUrl }}-{{ topic.id }}/{{ page }}/#{{ topic.lastPost.id }}" class="topic-name">
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