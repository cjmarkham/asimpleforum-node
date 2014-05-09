{% if req.session.authenticated and post.author.id == req.session.User.id %}
    <a href="javascript:void(0)">
        <em data-postId="{{ post.id }}" class="fa fa-pencil" data-event="click" data-action="post.edit"></em >
    </a>
{% endif %}
{% if req.session.authenticated %}
    <a href="javascript:void(0)">
        <em class="fa fa-exclamation-triangle" data-event="click" data-action="post.reportTrigger" data-postId="{{ post.id }}"></em >
    </a>
    <a href="javascript:void(0)">
        <em class="fa fa-thumbs-up" data-event="click" data-action="post.like" data-postId="{{ post.id }}"></em >
    </a>

    <a href="javascript:void(0)">
        <em title="Quote" data-toggle="tooltip" class="fa fa-comment" data-event="click" data-postName="{{ post.name }}" data-action="post.quote" data-postId="{{ post.id }}" data-author="{{ post.author.username }}"></em >
    </a>
{% endif %}

<span>
    #{{ post.id }}
</span>
