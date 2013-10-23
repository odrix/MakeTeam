 jQuery(function(){
	
	
	$.getJSON('js/team.json', function(data) {
		var template = $('#personTpl').html();
		var html = Mustache.to_html(template, data);
		$('#teamList').html(html);
		
		var playgroundTpl = $('#playgroundTpl').html();
		var htmlplay = Mustache.to_html(playgroundTpl, data);
		$('#playground').html(htmlplay);
		
		$('.present').draggable({cursor: 'crosshair',cursorAt: { top: 10, rigth: 10 }, opacity: 0.7, helper: 'clone', revert: 'invalid'});
		
		$('.fieldPlay').droppable({
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
		
		//$(".present a").on("click", tooglePresence);		
	});
	
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
		if(player.parent().is('#teamList'))
			player.remove()
	}
	
	function addPlayerToSubstitute(player) {
		player.removeClass('player').addClass('present')
		$('#teamList').append(player)
	}
	
	function removePlayerLastPlace(player) {
		if(player.parent().hasClass('fieldPlay'))
		{
			player.parent().html(player.data('no'))
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
});

