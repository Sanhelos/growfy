






const headerburger = document.querySelector('.header__burger');
headerburger.addEventListener('click', function burger(){
  const burger = document.querySelector('.header__burger');
  burger.classList.toggle('active');
  
  const menu = document.querySelector('.header__menu');
  menu.classList.toggle('active');
  
  const body = document.querySelector('body');
  
  body.classList.toggle('lock');

  const header = document.querySelector('.header');
  header.classList.toggle('active')
});
const menu2 = document.querySelector('.menu');
  menu2.addEventListener('click', function burger(){
    const burger = document.querySelector('.header__burger');
    burger.classList.remove('active');
    
    const menu = document.querySelector('.header__menu');
    menu.classList.remove('active');
    
    const body = document.querySelector('body');
    
    body.classList.remove('lock');
    
    
  });




const spollersArray = document.querySelectorAll('[data-spollers]');
let slideUp = (target, duration = 500) => {
	if (!target.classList.contains("_slide")) { 
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop= 0; 
		target.style.paddingBottom= 0;
		target.style.marginTop = 0; 
		target.style.marginBottom= 0;
		
		window.setTimeout(() => { 
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top'); 
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property'); 
			target.classList.remove('_slide');
			
		}, duration);
	
	}
}
let slideDown = (target, duration = 500)  => { 
	if (!target.classList.contains('_slide')) {
		target.classList.add("_slide"); 
		if (target.hidden) {
			target.hidden = false;
		}	
		let height = target.offsetHeight;
		target.style.overflow = 'hidden'; 
		target.style.height = 0;
		target.style.paddingTop= 0;
		target.style.paddingBottom=0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0; 
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding"; 
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + 'px'; 
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-botton");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty('transition-property');
			target.classList.remove("_slide");
		
		}, duration);
	}
}
	
let slideToggle = (target, duration = 500) => { 
	if (target.hidden) {
			return slideDown(target, duration);
	} else {
			return slideUp(target, duration);
		
	}
}
if (spollersArray.length > 0) { 
	//Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});

	// Инициализация обычных слойлеров 
	if (spollersRegular.length > 0) {
		initSpollers (spollersRegular);
	}

	// Получение слойлеров с медия запросам
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);

		});

		// Получаем уникальные брейкпоин
		let mediaQueries = breakpointsArray.map(function (item) { 
			return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index , self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкп 
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(","); 
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условилки 
			const spollersArray = breakpointsArray.filter(function (item) { 
				if (item.value === mediaBreakpoint && item.type === mediaType) {
				return true;
				}
			});


			matchMedia.addListener(function () {

				initSpollers (spollersArray, matchMedia);
			});


			initSpollers (spollersArray, matchMedia);
		});
	}

		function initSpollers (spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
				
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
		function initSpollerBody(spollersBlock, hideSpollerBody= true) { 
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) { spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute("tabindex");
						if (!spollerTitle.classList.contains('_active')) {
							spollerTitle.nextElementSibling.hidden = true;

						}

					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}	
				});
			}
		}
	
	function setSpollerAction(e) {

		const el = e.target; 
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				slideToggle(spollerTitle.nextElementSibling , 500  );
			}
				e.preventDefault();
		}
	}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
			if (spollerActiveTitle) { 
				spollerActiveTitle.classList.remove('_active');
				slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
}









const animItems = document.querySelectorAll('[data-anims]');
if (animItems.length > 0) {
window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) { 
			const animItem = animItems [index];
			const animItemHeight = animItem.offsetHeight
			const animItemOffset = offset (animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) { 
				animItem.classList.add('_active-anim');
			} else {
				animItem.classList.remove('_active-anim');
			}

			animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				//remove class
				//animItem.classList.remove('_active');
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset ||document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
	
	//setTimeout (() => {
	//	animOnScroll();
	//}, time );

	animOnScroll();

	
}













