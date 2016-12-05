$(document).ready(function() {

	//=================================== Slider sigle work  ===================================//

	$('.workDetailSlider').each(function() {
		$(this).find('.carousel-inner li:first').show();
	});
	$('.element-thumbs li').click(function() {
		var theTarget = $(this).find("a").attr("data-target");
		//alert (theTarget);
		$(this).parents('.work-element').find('.carousel-inner li').hide();
		$(this).parents('.work-element').find('.carousel-inner li.' + theTarget).fadeIn();
		return false;
	});




	//=================================== Slider  ===================================//
	$('#mainSlider .carousel').carousel({
		interval : false,
	});

	$(".slidesJs").responsiveSlides({
		auto : false, // Boolean: Animate automatically, true or false
		speed : 500, // Integer: Speed of the transition, in milliseconds
		timeout : 4000, // Integer: Time between slide transitions, in milliseconds
		pager : false, // Boolean: Show pager, true or false
		nav : true, // Boolean: Show navigation, true or false
		random : false, // Boolean: Randomize the order of the slides, true or false
		pause : false, // Boolean: Pause on hover, true or false
		pauseControls : true, // Boolean: Pause when hovering controls, true or false
		prevText : "Previous", // String: Text for the "previous" button
		nextText : "Next", // String: Text for the "next" button
		maxwidth : "", // Integer: Max-width of the slideshow, in pixels
		navContainer : "", // Selector: Where controls should be appended to, default is after the 'ul'
		manualControls : "", // Selector: Declare custom pager navigation
		namespace : "rslides", // String: Change the default namespace used
		before : function() {
		}, // Function: Before callback
		after : function() {
		} // Function: After callback
	});




	//=================================== form forms =================================//

	$("#contact-form").submit(function() {
		var elem = $(this);
		var urlTarget = $(this).attr("action");
		$.ajax({
			type : "POST",
			url : urlTarget,
			dataType : "html",
			data : $(this).serialize(),
			beforeSend : function() {
				elem.prepend("<div class='loading alert'>" + "<a class='close' data-dismiss='alert'>×</a>" + "提交成功！" + "</div>");
				//elem.find(".loading").show();
			},
			success : function(response) {
				elem.prepend(response);
				//elem.find(".response").html(response);
				elem.find(".loading").hide();
				elem.find("input[type='text'],input[type='email'],textarea").val("");
			}
		})
		return false;
	});
	$('.service').on('mouseover', function() {
		$(this).addClass('flipped');

	});
	$('.service').on('mouseout', function() {
		$(this).removeClass('flipped');

	});
	
	
	
	//=================================== Tooltips =====================================//
	
	if( $.fn.tooltip() ) {
		$('[class="tooltip_hover"]').tooltip();
	}
	

	
	
	//=================================== charts  =================================//
	function incraseEffect() {
		$('.chart').easyPieChart({
			barColor : '#07AD87',
			trackColor : '#DCDCDC',
			scaleColor : false,
			lineCap : 'square',
			size : 220,
			lineWidth : 10,
			animate : 2000
		});		
	}
	
	//incraseEffect();

	$('#statics').waypoint(function(direction) {
		incraseEffect();
		//alert(direction); // up, down, left, or right
		$('.information').waypoint('destroy');
	}, {
		triggerOnce : true,
		offset : '100%'
	});

});
