
window.onload = function(){
	navbar = document.getElementById("navbarstick");
	getNavbarOffset();
}
window.onresize = function(){
	getNavbarOffset();
	stickyNavbar();
}

window.onscroll = stickyNavbar;

// SCROLL-DOWN BUTTON: WELCOME SCREEN: INDEX.HTML

$(function() {
	$('.scroll-down').click (function() {
		$('html, body').animate({scrollTop: $('.nav').offset().top }, 'slow');
		return false;
	});
});

// STICKY NAVBAR

var navbar;
var navbarVisibleScroll;

function getNavbarOffset(){
	if($("body").hasClass("home")){
		navbarVisibleScroll = document.getElementById("welcome").clientHeight;
	}
}

// var navbar = document.getElementById("navbarstick");
// var sticky = navbar.offsetTop;




function stickyNavbar(){
	if($("body").hasClass("home")){
		if(window.scrollY >= navbarVisibleScroll){
			navbar.classList.add("sticky");
		}else{
			navbar.classList.remove("sticky");
		}
	}
}

// TYPEFORM
function showTypeform(){
	$('#typeform-parent').slideToggle(400);
}

// FLICKITY
var $carousel = $('.main-carousel').flickity({
	// options
	cellAlign: 'center',
	contain: true,
	autoPlay: true,
	fullscreen: true
});
