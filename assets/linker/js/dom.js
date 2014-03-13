$(function () {

	$('[data-event="click"]').on('click', ASF.events.call.bind(this));
	$('[data-event="submit"]').on('submit', ASF.events.call.bind(this));
	$('[data-event="keyup"]').on('keyup', ASF.events.call.bind(this));
	$('[data-event="change"]').on('change', ASF.events.call.bind(this));

});