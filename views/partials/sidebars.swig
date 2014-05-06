{% for sidebar in sidebars %}
	{% set sidebar = "../sidebars/" + sidebar + ".swig" %}
	{% include sidebar %}
{% endfor %}