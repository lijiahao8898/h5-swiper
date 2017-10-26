/**
 * Created by lijiahao on 16/8/2.
 */
;(function () {
    var main = {
        init: function(){
            this.initSwiper();
        },
        initSwiper: function () {
            var mySwiper = new Swiper('.swiper-container', {
                on: {
                    init: function () {
                        console.log('init');
                        $('.swiper-slide').eq(0).find('p').css({
                            animation: "swiper 2s forwards"
                        });
                    },
                    sliderMove: function (swiper, event) {

                    },
                    slideChange: function () {
                        $('.swiper-slide p').css({
                            animation: "hidden 0.1s forwards"
                        });
                    },
                    slideChangeTransitionEnd: function () {
                        // var current = $('.swiper-slide.slide-'+ mySwiper.activeIndex + 1);
                        $('.swiper-slide').eq(mySwiper.activeIndex).find('p').css({
                            animation: "swiper 2s forwards"
                        });
                    }
                },
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 1,
                mousewheel: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                flipEffect: {
                    rotate: 300,
                    slideShadows: true
                }
            });
        }
    };
    // run
    $(function () {
        main.init()
    })
})();