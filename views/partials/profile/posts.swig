{% if posts.length %}
	{% for post in posts %}
		<li class="row">
			<div class="col-md-4 relative">
				<div class="circle"></div>
				<div class="line"></div>
				<span class="date" title="{{ post.createdAt|date('c') }}">
					{{ post.createdAt|toDate }}
				</span>
			</div>
			<div class="col-md-8">
				<div class="profile-post">
					<a href="/{{ post.forum.name|toUrl }}/{{ post.topic.name|toUrl }}-{{ post.topic.id }}/1#{{ post.id }}" class="topic-name">
						{{ post.name }}
					</a>

					<p>
						{{ post.content|safe }}
					</p>
				</div>
			</div>
		</li>
	{% endfor %}
{% else %}
	<p id="no-posts">
		No posts found
	</p>
{% endif %}