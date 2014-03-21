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
							<img width="318" height="52" src="/linker/images/{{ sails.config.board.logo }}" alt="{{ sails.config.board.name }}" />
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
								<a href="{{ link.link }}">
									{{ link.title }}
								</a>
							</h2>	
						</li>
					{% endfor %}
				</ul>
				<div id="nav-quick-access" class="col-md-3 pull-right hidden-sm hidden-xs">
					{% include "partials/user/navQuickAccess.swig" %}
				</div>
			</div>
		</div>
	</header>
	
	<div class="container" id="main">
		<nav id="breadcrumbs">
			<ul class="list-unstyled list-inline">
				<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
					<a href="/" itemprop="url">
						<span itemprop="title">Home</span>
					</a>
				</li>
				{% block crumbs %}{% endblock %}
			</ul>
		</nav>

		<div class="row">

			{% if sails.config.sidebars[section] %}
				<div class="col-md-3 hidden-xs hidden-sm">
					
					{% for element in sails.config.sidebars[section] %}
						{% set sidebarFile = 'sidebars/' + element + '.swig' %}
						{% include sidebarFile %}
					{% endfor %}

				</div>
			{% endif %}

			{% if sails.config.sidebars[section] %}
				<div class="col-md-9">
			{% else %}
				<div id="main-full">
			{% endif %}

				{% block content %}{% endblock %}

				<div id="sessions">
					Currently online: 
					<p class="inline" title="Users" data-toggle="tooltip"><em class="fa fa-group"></em > <span id="online-user-count"></span></p>
					<p class="inline" title="Guests" data-toggle="tooltip"><em class="fa fa-user"></em > <span id="online-guest-count"></span></p>
					
					<section id="online-list">
						<header>
							Currently online users
						</header>

						<div class="content" id="users">
							No users online
						</div>
					</section>
				</div>

			</div>

		</div>
	</div>

	
	<footer id="footer">
		<div class="container">
			<div class="row">
				<div class="col-md-4"></div>
				<div class="col-md-4"></div>
				<div class="text-right col-md-4">
					<p><small>Powered by &copy; {{ 'now'|date('Y') }} asimpleforum</small></p>
					<p><small>All content &copy; {{ sails.config.board.name }}</small></p>
				</div>
			</div>
		</div>
	</footer>

	{% block modals %}

		{% if !req.session.authenticated %}
			<div class="modal fade" id="login-modal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-body">
							<form method="post" action="javascript:void(0)" data-event="submit" data-action="auth.login">
								<div class="form-group">
									<label>
										Username
									</label>
									<input type="text" name="username" class="form-control" />
								</div>
								<div class="form-group">
									<label>
										Password
									</label>
									<input type="password" name="password" class="form-control" />
								</div>
								<button class="btn btn-orange">
									Login
								</button>
								<a href="/register" class="btn btn-orange">
									Signup
								</a>
							</form>
						</div>
					</div>
				</div>
			</div>
		{% endif %}

	{% endblock %}

	<!--SCRIPTS-->
<script src="/linker/js/socket.io.js"></script>
<script src="/linker/js/sails.io.js"></script>
<script src="/linker/js/app.js"></script>
<script src="/linker/js/jquery.js"></script>
<script src="/linker/js/bootstrap.js"></script>
<script src="/linker/js/color.js"></script>
<script src="/linker/js/asf.js"></script>
<script src="/linker/js/dom.js"></script>
<!--SCRIPTS END-->
	
	<script>

		{% if req.session.authenticated %}
			ASF.user = {{ JSON.stringify(req.session.User) }};
		{% endif %}

	</script>

</body>
</html>