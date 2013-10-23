 jQuery(function(){
	
	var tplSubstitute = $('#substituteTpl').html();
	var tplPlayground = $('#playgroundTpl').html();
	
	$.getJSON('js/team.json', function(data) {
		
		var html = Mustache.to_html(tplSubstitute, data);
		$('.teamList').html(html);
				
		var htmlplay = Mustache.to_html(tplPlayground, data);
		$('.playground').html(htmlplay);
				
		initTimeBox($('.timeBox'));
		refreshTimeBoxTime();
		
		//$(".present a").on("click", tooglePresence);		
	});
	
	function initTimeBox(timeBox) {
		timeBox.find('.present').draggable({cursor: 'crosshair',cursorAt: { top: 10, rigth: 10 }, opacity: 0.7, helper: 'clone', revert: 'invalid'});
		timeBox.find('.player').draggable({cursor: 'crosshair',cursorAt: { top: 10, rigth: 10 }, opacity: 0.7, helper: 'clone', revert: 'invalid'});
		
		timeBox.find('.fieldPlay').droppable({
			accept: acceptPlayer,
			activeClass: "ui-state-hover",
			hoverClass: "ui-state-active",
			drop: function(event, ui) { 
				if($(this).find('.player').length > 0) {
					changePlayer($(this), ui.draggable.clone(), $(this).find('.player'))
					removePlayerFromSubstitue(ui.draggable);
					removePlayerLastPlace(ui.draggable);
				} else {
					addPlayerInField($(this), ui.draggable.clone());
					removePlayerFromSubstitue(ui.draggable);
					removePlayerLastPlace(ui.draggable);
				}
			}
		});
	}
	
	function addPlayerInField(field, player) {
		var place = field.data("no")
		// player.find("a").after('<span>' + place + '</span>');
		player.data('no', place);
		player.removeClass('present').removeClass('nop').addClass('player')
		player.draggable({cursor: 'crosshair',cursorAt: { top: 10, rigth: 10 }, opacity: 0.7, helper: 'clone', revert: 'invalid'})
		field.html(player)
		return false
	}
	
	function removePlayerFromSubstitue(player) {
		if(player.parent().hasClass('teamList'))
			player.remove()
	}
	
	function addPlayerToSubstitute(player) {
		player.removeClass('player').addClass('present')
		player.parents('.timeBox').find('.teamList').append(player)
	}
	
	function removePlayerLastPlace(player) {
		var field = player.parent();
		if(field.hasClass('fieldPlay'))
		{
			field.html(field.data('no'))
		}
	}
	
	function changePlayer(field, newPlayer, oldPlayer) {
		addPlayerToSubstitute(oldPlayer)
		addPlayerInField(field, newPlayer)
	}
	
	function acceptPlayer(el) {
		return true;
		return (el.hasClass('present') || el.hasClass('player')) && !el.find('a').hasClass('nop');
	}
	
	function tooglePresence(e){
		e.preventDefault();
		$(this).toggleClass('nop');
	    if($(this).hasClass('nop'))
			$(this).parent().draggable('disable');
		else
			$(this).parent().draggable('enable');
	}
	
	$('.commande button').click(function() {
		var timeBox = $(this).parents('.timeBox')
		var timeBoxClone = timeBox.clone()
		initTimeBox(timeBoxClone)
		timeBox.after(timeBoxClone)
		refreshTimeBoxTime()
	});
	
	function refreshTimeBoxTime() {
		var nbTime = $('.timeBox').length
		var totalTime = 90;
		var timeBoxDuration = totalTime / nbTime;
		$('.timeBox').each(function (i, item) {
			$(item).find('.startTime').html(i*timeBoxDuration)
			$(item).find('.endTime').html((i+1)*timeBoxDuration)
		})
	}
});

