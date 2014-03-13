<!DOCTYPE html>
<head>

	<title>{{ title }} - {{ sails.config.board.name }}</title>
	<!--STYLES-->
<link rel="stylesheet" href="/linker/styles/bootstrap.css">
<link rel="stylesheet" href="/linker/styles/font-awesome.css">
<link rel="stylesheet" href="/linker/styles/asf.css">
<!--STYLES END-->

	
</head>

<body id="page-{{ section }}">

	<a target="_blank" href="https://github.com/cjmarkham/asimpleforum">
		<img id="fork" src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png" alt="Fork me on GitHub" />
	</a>

	<div id="message-block"></div>

	<header id="header">
		<div class="container">
			<div class="row">
				<div id="logo" class="col-sm-9 col-xs-12">

					<h1>
						<a href="/">
							<img width="318" height="52" src="/images/{{ sails.config.board.logo }}" alt="{{ sails.config.board.name }}" />
						</a>
					</h1>

				</div>
				<div id="quick-search" role="search" class="col-sm-3 hidden-xs">
					<form role="form" name="search-form" method="post" action="javascript:void(0)" class="form-horizontal">
						<div class="form-group">
							<input type="text" name="query" class="typeahead form-control" autocomplete="off" placeholder="Quick search" />
							<button class="fa fa-search">&nbsp;</button>
							<select id="search-form-indicator" {% if section != 'forums' or section == 'index' %}class="hide"{% endif %}>
								<option selected value="this">This forum</option>
								<option value="all">All forums</option>
							</select>
						</div>
					</form>
				</div>
			</div>
		</div>

		<div class="container hidden-sm hidden-xs" role="navigation">
			<div id="main-nav" class="row">
				<ul class="list-unstyled list-inline col-md-9">
					{% for link in sails.config.navLinks %}
						<li {% if section == link.section %}class="active"{% endif %}>
							<h2>
								
									{% set url = '/' ~ link.link %}
								<a href="{{ url }}">
									{{ link.title }}
								</a>
							</h2>	
						</li>
					{% endfor %}
				</ul>
				<div id="user-quick-access" class="col-md-3 pull-right hidden-sm hidden-xs">
					{% if user %}
						{% include "partials/user/navQuickAccess.swig" %}
					{% else %}
						{% include "partials/user/quickLinks.swig" %}
					{% endif %}
				</div>
			</div>
		</div>
	</header>
	
	<div id="main" class="container">
		{% block content %}{% endblock %}
	</div>

	<!--SCRIPTS-->
<script src="/linker/js/socket.io.js"></script>
<script src="/linker/js/sails.io.js"></script>
<script src="/linker/js/app.js"></script>
<script src="/linker/js/jquery.js"></script>
<script src="/linker/js/color.js"></script>
<script src="/linker/js/asf.js"></script>
<script src="/linker/js/dom.js"></script>
<!--SCRIPTS END-->
</body>
</html>