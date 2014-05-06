<div class="content post">
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
			<p title="Posts" class="post-count">
				<em class="fa fa-pencil"></em > {{ post.author.posts }}
			</p>
		</div>
		<div class="post-body col-sm-10 col-xs-12">
			<div class="post-info">
				<div class="clearfix">
					<div class="pull-left">
						<span class="date" title="{{ post.createdAt }}">{{ post.createdAt|toDate }}</span> - <a href="javascript:void(0)" class="topic-name">{{ post.name }}</a>
					</div>
					<div class="pull-right post-tools">
						{% include "tools.swig" %}
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