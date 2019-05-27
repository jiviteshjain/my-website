
window.onload = function(){
	navbar = document.getElementById("navbarstick");
	
	getNavbarOffset();

	setLikeCount();

	formInit();
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

// PARALLAX
// $(document).ready(function(){
//   $('div[data-type="parallax"]').each(function(){
//       var $bgobj = $(this); // assigning the object
	
//       $(window).scroll(function() {
//           var yPos = -($window.scrollTop() / $bgobj.data('bgspeed')); 
					
//           // Put together our final background position
//           var coords = '50% '+ yPos + 'px';

//           // Move the background
//           $bgobj.css({ backgroundPosition: coords});
//       }); 
//   });    
// });

// TYPEFORM
function showTypeform(){
	$('#typeform-parent').slideToggle(400);
}


// SLIDESHOW
var slideIndex = 1;
if($("body").hasClass("home")){
	showSlides(slideIndex);
}

function plusSlides(n){
	showSlides(slideIndex = slideIndex + n);
}

function currentSlide(n){
	showSlides(slideIndex = n);
}

function showSlides(n){
	var slides = document.getElementsByClassName("slideimage");
	var dots = document.getElementsByClassName("slidedot");
	if(n > slides.length)
		slideIndex = 1;
	if(n < 1)
		slideIndex = slides.length;
	
		for(var i = 0; i < slides.length; i++)
			slides[i].style.display = "none";

		for(var j = 0; j < dots.length; j++)
			dots[j].className = dots[j].className.replace("active", "");
		
		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].className = dots[slideIndex - 1].className + " slidedotactive";
}

// FORM

	function clickCounter() {
		if (typeof (Storage) !== "undefined") {
			if (localStorage.clickcount) {
				localStorage.clickcount = Number(localStorage.clickcount) + 1;
			}
			else {
				localStorage.clickcount = 1;
			}
			document.getElementById("likecount").innerHTML = String(localStorage.clickcount) + " ";
		}
	};

function setLikeCount(){
	if($("body").hasClass("formpage")){
		if(typeof(Storage) !== "undefined" && localStorage.clickcount){
			document.getElementById("likecount").innerHTML = String(localStorage.clickcount) + " ";
		}
	}
}

function formInit(){
	// console.log("Called-new");

	if($('body').hasClass("formpage")){
		if(typeof(Storage) !== "undefined"){
			if(!localStorage.form){
				localStorage.form = JSON.stringify(new Array());
			}else{
				var arr = JSON.parse(localStorage.form);
				var tblbody = document.getElementsByTagName("tbody")[0];
				for(var i = 0; i < arr.length; i++){
					var row = document.createElement("tr");
					for(var j = 0; j < arr[i].length; j++){
						var cell = document.createElement("td");
						cell.innerHTML = arr[i][j];
						row.appendChild(cell);
					}
					tblbody.appendChild(row);
				}
			}
		}
	}
}



function handleData(){
	event.preventDefault();
	// console.log("called");
	// debugger;
	var name = document.getElementById("yourname").value;
	var skill = document.getElementById("skill").value;
	var prof = document.getElementById("proficiency").value;

	var tblbody = document.getElementsByTagName("tbody")[0];
	var row = document.createElement("tr");

	var cell = document.createElement("td");
	cell.innerHTML = name;
	row.appendChild(cell);

	cell = document.createElement("td");
	cell.innerHTML = skill;
	row.appendChild(cell);

	cell = document.createElement("td");
	cell.innerHTML = prof;
	row.appendChild(cell);

	tblbody.appendChild(row);
	// debugger;

	// if(!localStorage.form) {
	// 	console.log(JSON.stringify([[ name, skill, prof ]]));
	// 	localStorage.form = JSON.stringify([[ name, skill, prof ]]);
	// }


	//console.log(localStorage.form;
	var arr = JSON.parse(localStorage.form);
	arr.push([name, skill, prof]);
	localStorage.form = JSON.stringify(arr);
}

