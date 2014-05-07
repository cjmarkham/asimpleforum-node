{% extends layout %}

{% block content %}
	<section id="posts">
			
		<header class="clearfix">
			<div class="pull-left">
				<h5 class="title-edit" contenteditable data-event="keyup" data-action="topic.updateName" data-placeholder="Add the name of your topic here"><span class="placeholder">Add your topic name here</span></h5>
			</div>
			<div class="pull-right text-right">
				<span data-toggle="tooltip" title="Views" class="marginRight10">
					<em class="fa fa-eye"></em > 0
				</span>
				<span data-toggle="tooltip" title="Replies">
					<em class="fa fa-pencil"></em > 0
				</span>
			</div>
		</header>

		<div id="post-list">
			{% include "../partials/post/single-blank.swig" %}
		</div>
	</section>

	<div class="post-buttons">
		<a href="javascript:void(0)" class="btn btn-orange" data-event="click" data-action="topic.create">
			Save topic
		</a>
	</div>
{% endblock %}