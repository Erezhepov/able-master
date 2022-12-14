import VSwiper from "./modules/VSwiper";
import Countup from './custom_modules/Countup';
import Video from "./modules/Video";
import Content from "./modules/Content";
import Nav from "./modules/Nav";
// import closest from "./modules/Closest";

/*
	--------------------------------------------
	--------------------------------------------
					SLIDERS
	--------------------------------------------
	--------------------------------------------
 */
	function initCompanySlider() {
		swiper.init(".company-slider", {
			loop: true,
			slidesPerView: 6,
			autoHeight: true,
			bulletActiveClass: '.company-slider-pagination-active',
			pagination: {
				el: '.company-slider__pagination',
				clickable: true,
			},
		});
	}

	function initCompanySecondSlider() {
		swiper.init(".company-slider__second", {
			loop: true,
			slidesPerView: 6,
			autoHeight: true,
			bulletActiveClass: '.company-slider__second-pagination-active',
			pagination: {
				el: '.company-slider__second__pagination',
				clickable: true,
			},
		});
	}

	function initCompanyThirdSlider() {
		swiper.init(".company-slider__third", {
			loop: true,
			slidesPerView: 6,
			autoHeight: true,
			bulletActiveClass: '.company-slider__third-pagination-active',
			pagination: {
				el: '.company-slider__third__pagination',
				clickable: true,
			},
		});
	}

	function initGallerySlider() {
		swiper.init(".gallery-slider", {
			loop: true,
			slidesPerView: 1,
			autoHeight: true,
			bulletActiveClass: '.gallery-slider-pagination-active',
			navigation: {
				prevEl: ".gallery-slider-arrow-prev",
				nextEl: ".gallery-slider-arrow-next",
			},
			pagination: {
				el: '.gallery-slider__pagination',
				clickable: true,
			},
		});
	}
/*
	--------------------------------------------
	--------------------------------------------
						STATS
	--------------------------------------------
	--------------------------------------------
 */
	const scrollElements = document.querySelectorAll(".s-stats");
	const elementInView = (el, dividend = 1) => {  
		const elementTop = el.getBoundingClientRect().top;  
		return (    
			elementTop <=    
			(window.innerHeight || document.documentElement.clientHeight) / dividend  );};
			const handleScrollAnimation = () => {  
				scrollElements.forEach((el) => {    
					if (elementInView(el, 1.25)) {      
						new Countup(".s-stats");
					}  
				})
			}
			window.addEventListener("scroll", () => {   handleScrollAnimation();});

	/*
	--------------------------------------------
	--------------------------------------------
						TABS
	--------------------------------------------
	--------------------------------------------
 */
			
	const tabsBtn = document.querySelectorAll(".tabs__nav-btn")
	const tabsItem = document.querySelectorAll(".tabs__item")
	tabsBtn.forEach(onTabClick)

	function onTabClick(item) {
		item.addEventListener("click", function() {
			let currentBtn = item;
			let tabId = currentBtn.getAttribute("data-tab")
			let currentTab = document.querySelector(tabId)
			if( !currentBtn.classList.contains("tabs__nav-btn--active") ) {
				tabsBtn.forEach(function(item) {
					item.classList.remove("tabs__nav-btn--active")
				})
				tabsItem.forEach(function(item) {
					item.classList.remove("tabs__item--active")
				})
				currentBtn.classList.add("tabs__nav-btn--active")
				currentTab.classList.add("tabs__item--active")
			}else{
				currentBtn.classList.remove('tabs__nav-btn--active')
				currentTab.classList.remove('tabs__item--active')
			}
		})
	}

	document.querySelector(".tabs__nav-btn").click()

	/*
	--------------------------------------------
	--------------------------------------------
						INPUT MASK
	--------------------------------------------
	--------------------------------------------
 */
	let phoneMask = IMask(
		document.getElementById('phone-mask'), {
			mask: '+{7}(000)000-00-00'
		});

	document.addEventListener('DOMContentLoaded', function (){
		const form = document.getElementById('form')
		form.addEventListener('submit', formSend)

		async function formSend(e){
			e.preventDefault()
			let error = formValidate(form)
			let formData = new FormData(form)
			if(error === 0){
				debugger
				let response = await fetch('/sendmail.php', {
					method: 'POST',
					body: formData
				})
				if (response.ok){
					let result = await response.json()
					alert(result.message)
					form.reset()
				}else{
					alert('Error')
				}
			}
		}
		function formValidate(form){
			let error = 0
			let formReq = document.querySelectorAll('.req')
			for (let i=0; i<formReq.length; i++){
				const input = formReq[i]
				formRemoveError(input)
				if (input.classList.contains('mail')){
					if (!emailTest(input)){
						formAddError(input)
						error++
					}
				}else{
					if(input.value === ''){
						formAddError(input)
						error++
					}
				}
			}
			return error
		}
		function formAddError(input){
			input.parentElement.classList.add('error')
			input.classList.add('error')
		}
		function formRemoveError(input){
			input.parentElement.classList.remove('error')
			input.classList.remove('error')
		}
		function emailTest(input){
			let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
			return reg.test(input.value)
		}
	})

/*
	--------------------------------------------
	--------------------------------------------
						COMMON
	--------------------------------------------
	--------------------------------------------
 */

	const swiper = new VSwiper();
	new Video();
	new Content();
	new Nav();

	initCompanySlider()
	initCompanySecondSlider()
	initCompanyThirdSlider()
	initGallerySlider()