<div id="post-blank">
	<p class="alert alert-info helper marginTop10">
		{% if reply %}
			Replying to <strong>{{ reply.name }}</strong> by <a href="/user/{{ reply.author }}">{{ reply.author }}</a>
		{% else %}
			Edit your post and then click the save button to add it.
		{% endif %}
	</p>
	<div class="content post">
		<div class="row">
			<div class="post-author col-sm-2 hidden-xs">
				<div class="avatar large">
					<img width="70" height="70" src="{{ sails.config.board.avatarDir }}/{{ req.session.User.username }}/avatar.png" alt="{{ req.session.User.username }}" />
				</div>
				<p class="truncate w80">
					<a href="/user/{{ req.session.User.username }}" class="user-link resize">
						 {{ req.session.User.username }}
					</a>
				</p>
				<p title="Group" class="group">
					<em class="fa fa-group"></em > Admin
				</p>
				<p title="Posts" class="post-count">
					<em class="fa fa-pencil"></em > {{ req.session.User.posts }}
				</p>
			</div>
			<div class="post-body col-sm-10 col-xs-12">
				<div class="post-info">
					<div class="clearfix">
						<div class="pull-left">
							
							<a data-event="keyup" data-action="topic.updateName" href="javascript:void(0)" class="topic-name title-edit" contenteditable data-placeholder="Add the name of your topic here"><span class="placeholder">Add the name of your post here</span></a>
						</div>
					</div>
				</div>
				<div data-placeholder="Add the content for your new post here" class="post-content editable" contenteditable><span class="placeholder">Add the content for your new post here</span></div>
				
			</div>
		</div>
	</div>

	{% if section != 'new-topic' %}
		<button id="save-post" class="btn btn-orange" data-event="click" data-action="post.create" {% if reply %}data-quoted="{{ reply.postId }}"{% endif %}>
			Save Post
		</button>
	{% endif %}
</div>