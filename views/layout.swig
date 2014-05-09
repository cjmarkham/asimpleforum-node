<!DOCTYPE html>
<head>

	<title>{{ title }} - {{ sails.config.board.name }}</title>
	<!--STYLES-->
<link rel="stylesheet" href="/styles/bootstrap.css">
<link rel="stylesheet" href="/styles/font-awesome.css">
<link rel="stylesheet" href="/styles/importer.css">
<!--STYLES END-->

	<!--SCRIPTS-->
<script src="/js/socket.io.js"></script>
<script src="/js/sails.io.js"></script>
<script src="/js/app.js"></script>
<script src="/js/jquery.js"></script>
<script src="/js/bootstrap.js"></script>
<script src="/js/color.js"></script>
<script src="/js/timeago.js"></script>
<script src="/js/asf.js"></script>
<!--SCRIPTS END-->

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46472475-1', 'asimpleforum.co.uk');
  ga('send', 'pageview');

</script>

<script>
	{% if forum %}
		ASF.globals.forum = {{ forum|safe|json }};
	{% endif %}

	{% if req.session.authenticated %}
		ASF.user = {{ req.session.User|safe|json_encode }}
	{% endif %}
</script>

<script src="/js/dom.js"></script>

</head>

<body id="page-{{ section }}">

	<a class="external" target="_blank" href="https://github.com/cjmarkham/asimpleforum">
		<img id="fork" src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png" alt="Fork me on GitHub" />
	</a>

	<div id="message-block"></div>

	<header id="header">
		<div class="container">
			<div class="row">
				<div id="logo" class="col-sm-9 col-xs-12">

					<h1>
						<a href="/">
							<img width="318" height="52" src="/images/{{ sails.config.board.logo }}" title="{{ sails.config.board.name }}" alt="{{ sails.config.board.name }}" />
						</a>
					</h1>

				</div>
				<div id="quick-search" role="search" class="col-sm-3 hidden-xs">
					<form data-event="submit" data-action="search" role="form" name="search-form" method="post" action="javascript:void(0)" class="form-horizontal">
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
								<a {% if link.external %}class="external"{% endif %} href="{{ link.link }}">
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
				
			</ul>
		</nav>

		<div class="row">

			<aside id="sidebar" class="col-md-3 hidden-xs hidden-sm">
				{% if sails.config.sidebars[section] and sails.config.sidebars[section].length %}
					
					{% for element in sails.config.sidebars[section] %}
						{% set sidebar = "sidebars/" + element + ".swig" %}
						{% include sidebar %}
					{% endfor %}

				{% endif %}
			</aside>

			{% if sails.config.sidebars[section] and sails.config.sidebars[section].length %}
				<div id="main-wrapper" class="col-md-9">
			{% else %}
				<div id="main-wrapper" class="full">
			{% endif %}

				{% block content %}{% endblock %}


			</div>

		</div>
		
		<div id="sessions">
			<section id="online-list">
				<header>
					Currently online users
				</header>

				<div class="content" id="users">
					Loading...
				</div>
			</section>
		</div>
		
	</div>
	
	<footer id="footer">
		<div class="container">
			<div class="row">
				<div class="col-md-4"></div>
				<div class="col-md-4"></div>
				<div class="text-right col-md-4">
					<p><small>Powered by &copy; asimpleforum</small></p>
					<p><small>All content &copy; {{ sails.config.board.name }}</small></p>
				</div>
			</div>
		</div>
	</footer>

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
	
</body>
</html>