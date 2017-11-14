/**
 * Created by lijiahao on 16/8/2.
 */
;(function (swal) {
    var main = {
        init: function () {
            this.isAjax = false;
            this.initSwiper();
            this.addEvent();
        },
        /**
         * 初始化alert提示框
         * @param message
         */
        swalAlert: function (message) {
            swal(message, {
                closeOnClickOutside: false
            });
        },
        addEvent: function () {
            var that = this;

            // 提交数据
            $('#submit').click(function () {
                that.submitUserInfo({
                    phone: $.trim($('#phone').val()),
                    user_name: $.trim($('#user_name').val()),
                    wechat: $.trim($('#wechat').val())
                })
            })
        },
        /**
         * 当前位置删除隐藏的动画，开始动画效果
         * @param target
         */
        removeAnimateClass: function (target) {
            target.find('.hidden').removeClass('hidden');
        },
        /**
         * swiper init
         */
        initSwiper: function () {
            var that = this;
            var mySwiper = new Swiper('.swiper-container', {
                on: {
                    init: function () {
                        var slider = $('.swiper-slide').eq(0);
                        // slider.find('li').css({
                        //     animation: "swiper 1s forwards"
                        // });
                        // #phone
                        slider.find('.user-form #phone').css({
                            animation: "swiper 1s 1s forwards"
                        });
                        // #wechat
                        slider.find('.user-form #wechat').css({
                            animation: "swiper 1s 1.2s forwards"
                        });
                        // #user_name
                        slider.find('.user-form #user_name').css({
                            animation: "swiper 1s 1.4s forwards"
                        });
                        // #submit
                        slider.find('.user-form #submit').css({
                            animation: "swiper 1s 1.4s forwards"
                        });
                        setTimeout(function () {
                            $('.animated').addClass('fadeInDownBig');
                        }, 100);
                        for (var i = 0; i < slider.find('.animated-left').length; i++) {
                            slider.find('.animated-left').eq(i).css({
                                animation: "swiper " + ((i + 1) * 0.5) + "s forwards"
                            })
                        }
                    },
                    sliderMove: function (swiper, event) {
                        // var slider = $('.swiper-slide');
                        // slider.find('li').addClass('hidden');
                    },
                    slideChangeTransitionStart: function () {
                        // var slider = $('.swiper-slide');
                        // slider.find('li').addClass('hidden');
                        // $('.animated').removeClass('fadeInDownBig');
                    },
                    slideChangeTransitionEnd: function () {
                        var slider = $('.swiper-slide').eq(mySwiper.activeIndex);
                        that.removeAnimateClass(slider);
                        setTimeout(function () {
                            $('.animated').addClass('fadeInDownBig');
                        }, 100);
                        for (var i = 0; i < slider.find('.animated-left').length; i++) {
                            slider.find('.animated-left').eq(i).css({
                                animation: "swiper " + ((i + 1) * 0.5) + "s forwards"
                            })
                        }

                        // #phone
                        slider.find('.user-form #phone').css({
                            animation: "swiper 1s 1s forwards"
                        });
                        // #wechat
                        slider.find('.user-form #wechat').css({
                            animation: "swiper 1s 1.2s forwards"
                        });
                        // #user_name
                        slider.find('.user-form #user_name').css({
                            animation: "swiper 1s 1.4s forwards"
                        });
                        // #submit
                        slider.find('.user-form #submit').css({
                            animation: "swiper 1s 1.4s forwards"
                        });

                        slider.find('.slide-container').css({
                            animation: "swiper 1s 1s forwards"
                        });
                    }
                },
                lazy: {
                    elementClass: 'swiper-lazy',
                    loadingClass: 'swiper-lazy-loading',
                    loadedClass: 'swiper-lazy-loaded',
                    preloaderClass: 'swiper-lazy-preloader',
                    loadPrevNext: true
                },
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 1,
                mousewheel: true,
                effect: 'slide',
                shortSwipes: false,
                resistance: true,
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true
                // }
            });
        },
        /**
         * 提交用户数据
         * @param data
         */
        submitUserInfo: function (data) {
            var that = this;
            if (that.isAjax === true) {
                that.swalAlert('请勿多次重复提交!');
                return;
            }
            that.isAjax = true;
            $.ajax({
                url: 'http://192.168.3.132:8080/add_user',
                type: 'post',
                dataType: 'text',
                data: data,
                beforeSend: function () {

                },
                complete: function () {
                    console.log('完成!');
                    setTimeout(function () {
                        that.isAjax = false;
                    }, 1000)
                },
                success: function (data) {
                    that.swalAlert(data)
                },
                error: function (error) {
                    that.swalAlert(error.responseText)
                }
            })
        }
    };
    // run
    $(function () {
        main.init()
    })
})(swal);