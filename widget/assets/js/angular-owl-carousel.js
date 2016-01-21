(function () {
	'use strict';
	angular
		.module('angular-owl-carousel', [])
		.directive('owlCarousel', [
			'$parse',
			owlCarouselDirective
		]);

	function owlCarouselDirective($parse) {

		var owlOptions = [
			'items',
			'margin',
			'loop',
			'center',
			'mouseDrag',
			'touchDrag',
			'pullDrag',
			'freeDrag',
			'merge',
			'mergeFit',
			'autoWidth',
			'startPosition',
			'URLhashListener',
			'nav',
			'navRewind',
			'navText',
			'slideBy',
			'dots',
			'dotsEach',
			'dotData',
			'lazyLoad',
			'lazyContent',
			'autoplay',
			'autoplayTimeout',
			'autoplayHoverPause',
			'smartSpeed',
			'fluidSpeed',
			'autoplaySpeed',
			'dotsSpeed',
			'dragEndSpeed',
			'callbacks',
			'responsive',
			'responsiveRefreshRate',
			'responsiveBaseElement',
			'responsiveClass',
			'video',
			'videoHeight',
			'videoWidth',
			'animateOut',
			'animateIn',
			'fallbackEasing',
			'info',
			'nestedItemSelector',
			'itemElement',
			'stageElement',
			'navContainer',
			'dotsContainer',
			// Classes
			'themeClass',
			'baseClass',
			'itemClass',
			'centerClass',
			'activeClass',
			'navContainerClass',
			'navClass',
			'controlsClass',
			'dotClass',
			'dotsClass',
			'autoHeightClass',
			// Callbacks
			'onInitialize',
			'onInitialized',
			'onResize',
			'onResized',
			'onRefresh',
			'onRefreshed',
			'onDrag',
			'onDragged',
			'onTranslate',
			'onTranslated',
			'onChange',
			'onChanged',
			'onStopVideo',
			'onPlayVideo',
			'onLoadLazy',
			'onLoadedLazy'
		];

		return {
			restrict: 'A',
			transclude: true,
			link: function (scope, element, attributes, controller, $transclude) {

				var options = {
						loop: false,
						nav: false,
						dots: false,
						items: 4,
						center: true},
					$element = $(element),
					owlCarousel = null,
					propertyName = attributes.owlCarousel;
				console.log(".............",propertyName)

				for (var i = 0; i < owlOptions.length; i++) {
					var opt = owlOptions[i];
					if (attributes[opt] !== undefined) {
						options[opt] = $parse(attributes[opt])();
					}
				}

				scope.$watchCollection(propertyName, function (newItems, oldItems) {

					if (owlCarousel) {
						owlCarousel.destroy();
					}
					$element.empty();

					for (var i in newItems) {
						$transclude(function (clone, scope) {
							scope.item = newItems[i].data.data.title;
							scope.data = newItems[i].data.data;
							scope.elementId =i;
							console.log(".............", $element)
							$element.append(clone[1]);
							//$element.click(function () {
							//	console.log(scope.elementId)
							//});

						});
					}
					$element.owlCarousel(options);
					var owl = $element.owlCarousel(options);
					console.log("aaaaaaaaaaaaa",scope.elementId)
					$element.click(function (obj) {
						/*var slide = $element.children("div")//.attr("dataposition");//find('.text-primery');
						console.log("aaaaaaaaaaaaa",slide)
						$element.trigger('to.owl.carousel', [$(obj.toElement, 300, true]);*/
						owl.trigger('to.owl.carousel', [$(obj.toElement).attr('dataposition'), 300, true]);
						console.log('clicked dataposition',$(obj.toElement).attr('dataposition'));
					});

					owlCarousel = $element.data('owlCarousel');
				});
			}
		};
	}

})();
