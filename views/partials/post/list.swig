{% for post in posts %}
	<div class="content post post-{{ post.id }}">
		<a name="{{ post.id }}"></a>
		<div class="row" id="post-{{ post.id }}">
			<div class="post-author col-sm-2 hidden-xs">
				<div class="avatar large">
					<img width="70" height="70" src="{{ sails.config.board.avatarDir }}/{{ post.author.username }}/avatar.png" alt="{{ post.author.username }}" />
				</div>
				<p class="truncate w80">
					<a href="/user/{{ post.author.username }}" class="user-link resize">
						{{ post.author.username }}
					</a>
				</p>
				<p title="Group" class="group">
					<em class="fa fa-group"></em > Admin
				</p>
				<span title="Posts" class="post-count">
					<em class="fa fa-pencil"></em > {{ post.author.posts }}
				</span>
				<span title="Topics" class="post-count">
					<em class="fa fa-pencil"></em > {{ post.author.topics }}
				</span>
			</div>
			<div class="post-body col-sm-10 col-xs-12">
				<div class="post-info">
					<div class="clearfix">
						<div class="pull-left">
							<span class="date" title="{{ post.createdAt }}">{{ post.createdAt|toDate }}</span> - <a href="/{{ post.forum.name|toUrl }}/{{ post.topic.name|toUrl }}-{{ post.topic.id }}/#{{ post.id }}" class="topic-name">{{ post.name }}</a>
						</div>
						<div class="pull-right post-tools">
							{% include "../post/tools.swig" %}
						</div>
					</div>
				</div>
				<div class="post-content">
					{{ post.content|raw }}
				</div>
				<div class="post-extras clearfix">
					{% if post.edits > 0 %}
						<div class="edit-count pull-left">
							Edited {{ post.edits }} times
						</div>
					{% endif %}

					{% include "likes.swig" with post %}
				</div>
				{% if post.quoted %}
					<div class="post-quoted">
						<a class="external" href="/{{ topic.forum.name|toUrl }}/{{ topic.name|toUrl }}-{{ topic.id }}/#{{ post.quoted.id }}">
							Reply to {{ post.quoted.name }}
						</a>
					</div>
				{% endif %}
				{% if post.attachments %}
					<div class="post-attachments">
						<h5>Attachments</h5>
						{% for attachment in post.attachments %}
							<div class="post-attachment {% if attachment.extension in ["png","jpg","jpeg","bmp","gif"] %}inline{% endif %}">

								{% if attachment.extension in ["png","jpg","jpeg","bmp","gif"] %}
									<img data-title="{{ attachment.name }} - Uploaded on {{ attachment.createdAt|toDate }}" src="/uploads/attachments/{{ attachment.file_name }}" alt="{{ attachment.name }}" title="{{ attachment.name }}" />
								{% else %}
									<a href="/uploads/attachments/{{ attachment.file_name }}" target="_blank">
										{{ attachment.name }}
									</a>
								{% endif %}

							</div>
						{% endfor %}
					</div>
				{% endif %}
			</div>
		</div>
	</div>
{% endfor %}

<div class="modal fade" id="other-likes-modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				Others who like this post
			</div>
			<div class="modal-body">
				<table class="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Username</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</div>
</div>