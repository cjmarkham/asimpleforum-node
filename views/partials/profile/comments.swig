{% if comments.length %}
	{% for comment in comments %}
		<li class="row profile-comment-{{ comment.id }}">

			<div class="col-md-3">
				<div class="comment-author-info">
					<div class="avatar medium text-center">
						<img width="70" height="70" src="{{ sails.config.board.avatarDir }}/{{ comment.author.username }}/avatar.png" alt="{{ comment.author.username }}" />
					</div>
					<p>
						<em class="fa fa-thumbs-up"></em> 
						<span class="profile-comment-likes" data-comment="{{ comment.id }}">{% if comment.likes.length %}{{ comment.likes.length }}{% else %}0{% endif %}</span>
					</p>
				</div>
			</div>

			<div class="col-md-9">
				<div class="profile-comment">
					<div class="clearfix">
						<div class="pull-left">
							<span class="blue">{{ comment.author.username }} </span>
							<span>
								{{ comment.createdAt|toDate }}
							</span>
						</div>
						<div class="pull-right text-right profile-comment-options">
							<em class="fa fa-thumbs-up" title="Like comment" data-event="click" data-action="profile.likeComment" data-commentId="{{ comment.id }}"></em>

							{% if req.session.authenticated and (req.session.User.id == user.id or req.session.User.id == comment.author.id) %}
								<em data-event="click" data-action="profile.deleteComment" data-commentId="{{ comment.id }}" class="fa fa-times"></em>
							{% endif %}
						</div>
					</div>
					<p>
						{{ comment.comment|safe }}
					</p>
				</div>
			</div>

		</li>
	{% endfor %}
{% endif %}