{% extends layout %}

{% block content %}
    <section id="search">
        <header>
            <h3>Search results for {{ query }}</h3>
        </header>   
        <div class="content">
            {% if posts.length %}
                {% include "../partials/post/list.swig" %}
            {% else %}
                <p class="alert alert-warning">
                    No results found
                </p>    
            {% endif %}
        </div>
    </section>

    <script>
        ASF.page.sidebars = {{ sails.config.sidebars[section]|safe|json }};
    </script>
{% endblock %}