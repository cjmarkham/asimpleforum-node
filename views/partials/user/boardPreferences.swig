<form role="form" method="post" action="javascript:void(0)" class="form-horizontal">

<div class="form-group">
	<div class="col-sm-3">
		<label class="control-label">
			Email Address
		</label>	
	</div>
	<div class="col-sm-6">
		<input data-event="return" data-action="user.saveEmail" type="text" class="form-control" name="email" value="{{ req.user.email }}" />
		<p class="help-block">
			Your email address will never be shared
		</p>
	</div>
</div>

<div class="form-group">
	<div class="col-sm-3">
		<label class="control-label">
			Date format
		</label>	
	</div>
	<div class="col-sm-9">
		<select data-event="change" data-action="settings.saveDateFormat" class="form-control" name="date-format">
			<option {% if req.user.settings.dateFormat == 'jS M y, H:i' %}selected{% endif %} value="jS M y, H:i">{{ now()|date('jS M y, H:i') }}</option>
			<option {% if req.user.settings.dateFormat == 'jS M y, g:i a' %}selected{% endif %} value="jS M y, g:i a">{{ now()|date('jS M y, g:i a') }}</option>

			<option {% if req.user.settings.dateFormat == 'M jS y, H:i' %}selected{% endif %} value="M jS y, H:i">{{ now()|date('M jS y, H:i') }}</option>
			<option {% if req.user.settings.dateFormat == 'M jS y, g:i a' %}selected{% endif %} value="M jS y, g:i a">{{ now()|date('M jS y, g:i a') }}</option>

		</select>
	</div>
</div>