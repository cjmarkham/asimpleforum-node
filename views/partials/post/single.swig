<div class="content post">
	<a name="{{ post.id }}"></a>
	<div class="row">
		<div class="post-author col-sm-2 hidden-xs">
			<div class="avatar large">
				<img width="70" height="70" src="/{{ post.author.username }}/large.png" alt="" />
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
						{% if req.session.authenticated and post.author.id == req.session.User.id %}
							<a data-postId="{{ post.id }}" href="javascript:void(0)" data-event="click" data-action="editPost">
								<em class="fa fa-pencil"></em >
							</a>
						{% endif %}
						{% if req.session.authenticated %}
							<a href="javascript:void(0)" data-event="click" data-action="reportPostTrigger" data-postId="{{ post.id }}">
								<em class="fa fa-exclamation-triangle"></em >
							</a>
							<a href="javascript:void(0)" data-event="click" data-action="posts.likePost" data-postId="{{ post.id }}">
								<em class="fa fa-thumbs-up"></em >
							</a>
						
							<a href="javascript:void(0)" data-event="click" data-action="quotePost" data-postId="{{ post.id }}" data-author="{{ post.author.username }}">
								<em title="Quote" data-toggle="tooltip" class="fa fa-comment"></em >
							</a>
						{% endif %}
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

				{% include likes %}
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