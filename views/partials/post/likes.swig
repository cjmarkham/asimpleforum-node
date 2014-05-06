{% if post.likes.length == 1 %}
    {{ likes[0].username }} likes this
{% elif post.likes.length == 2 %}
    {{ likes[0].username }} and {{ likes[1].username }} like this
{% elif post.likes.length > 2 %}
    {{ likes[0].username }}, {{ likes[1].username }} and <a href="javascript:void(0)" class="other-likes" data-event="click" data-action="post.showOtherLikes" data-likes='{{ post.likes|safe|json_encode }}'>{{ post.likes.length - 2 }} other{% if post.likes.length - 2 > 1 %}s{% endif %}</a> like{% if post.likes.length - 2 == 1 %}s{% endif %} this
{% endif %}