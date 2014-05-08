{% extends layout %}

{% block content %}

	<div class="tab-content">
		<div id="profile-information" class="tab-pane active">
			<section>
				<header>
					<h5>Profile Information</h5>
				</header>	
				<div class="content">
					{% include "../partials/user/profileInformation.swig" %}
				</div>
			</section>
		</div>
		<div id="board-preferences" class="tab-pane">
			<section>
				<header>
					<h5>Board Preferences</h5>
				</header>	
				<div class="content">
					{% include "../partials/user/boardPreferences.swig" %}
				</div>
			</section>
		</div>
	</div>

	<script>
		ASF.page.sidebars = {{ sails.config.sidebars[section]|safe|json }};
	</script>
{% endblock %}