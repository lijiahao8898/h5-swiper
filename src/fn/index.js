/**
 * Created by lijiahao on 16/8/2.
 */
;(function () {
    var main = {
        init: function () {
            this.isAjax = false;
            this.initRem();
            this.initSwiper();
            this.addEvent();

            var that = this;
            var audio = document.getElementById("bgMusic");
            var isPlaying = false;
            var container = document.querySelector('.music');
            var image = container.querySelector('img');

            image.addEventListener('click', function bindEvent() {
                if (that.isWifi()) {
                    isPlaying ? pause() : play();
                } else {
                    if(isPlaying){
                        pause();
                    }else{
                        swal({
                            title: "温馨提醒",
                            text: "当前网络环境可能不是在WIFI情况下，是否继续播放音乐？",
                            buttons: [
                                "取消", "继续"
                            ],
                            dangerMode: true
                        })
                            .then(function (willDelete) {
                                if (willDelete) {
                                    isPlaying ? pause() : play();
                                } else {

                                }
                            });
                    }
                }
            });

            if (that.isWifi()) {
                // JS绑定自动播放（操作window时，播放音乐）
                $(window).one('touchstart', function(){
                    play();
                });
                // 微信下兼容处理
                document.addEventListener("WeixinJSBridgeReady", function () {
                    play();
                }, false);
            }

            function pause() {
                isPlaying = false;
                var iTransform = getComputedStyle(image).transform;
                var cTransform = getComputedStyle(container).transform;
                container.style.transform = cTransform === 'none'
                    ? iTransform
                    : iTransform.concat(' ', cTransform);
                image.classList.remove('music-on');
                audio.pause();
            }

            function play() {
                isPlaying = true;
                image.classList.add('music-on');
                audio.play();
            }
        },
        isWifi: function () {
            var ua = window.navigator.userAgent.toLocaleLowerCase();
            if (this.isWeixin()) {
                if (ua.indexOf('wifi') != -1) {
                    // wifi
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        isWeixin: function () {
            var ua = window.navigator.userAgent.toLocaleLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            }
            return false;
        },
        initRem: function () {
            var width = window.innerWidth > 414 ? 414 : window.innerWidth;
            var rem = width / 640;
            var docEl = document.documentElement;
            var fontEl = document.createElement('style');
            docEl.firstElementChild.appendChild(fontEl);
            fontEl.innerHTML = 'html{font-size:' + rem + 'px;}';
        },
        /**
         * 初始化alert提示框
         * @param message
         */
        swalAlert: function (message) {
            swal(message, {
                closeOnClickOutside: false,
                button: {
                    text: "确认"
                }
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
                        that.isImageOnLoading(slider, function () {
                            that.theAnimation(slider, 0)
                        });
                    },
                    slideChange: function () {
                        var sliderAll = $('.swiper-slide');
                        sliderAll.find('.animated-right').addClass('hidden');
                        sliderAll.find('.animated-bottom').addClass('hidden');
                        sliderAll.find('.animated-left').addClass('hidden');
                        sliderAll.find('.animated-fadeIn').addClass('hidden');
                        sliderAll.find('.animated-fadeIn-right').addClass('hidden');
                        sliderAll.find('.animated-fadeIn-left').addClass('hidden');
                        sliderAll.find('.animated-wobble').addClass('hidden');
                        sliderAll.find('.animated-rollIn').addClass('hidden');
                        sliderAll.find('.animated-rotateIn').addClass('hidden');
                        sliderAll.find('.animated-bounceIn').addClass('hidden');
                        sliderAll.find('.animated-zoomIn').addClass('hidden');
                        $('.animated-fadeInDownBig').removeClass('fadeInDownBig');
                        $('.animated-flip').removeClass('flip');
                    },
                    slideChangeTransitionEnd: function () {
                        var slider = $('.swiper-slide').eq(mySwiper.activeIndex);
                        that.removeAnimateClass(slider);
                        that.isImageOnLoading(slider, function () {
                            that.theAnimation(slider, mySwiper.activeIndex)
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
                shortSwipes: true,
                resistance: true
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true
                // }
            });
        },
        theAnimation: function (slider, index) {
            switch (index) {
                case 0:
                    setTimeout(function () {
                        slider.find('.animated-fadeInDownBig').addClass('fadeInDownBig');
                    }, 100);
                    for (var i = 0; i < slider.find('.animated-left').length; i++) {
                        slider.find('.animated-left').eq(i).css({
                            animation: "swiper 2s " + (i * 0.4) + "s forwards"
                        })
                    }
                    for (var q = 0; q < slider.find('.animated-fadeIn').length; q++) {
                        slider.find('.animated-fadeIn').eq(q).css({
                            animation: "animated-fadeIn 2s " + (q * 0.4) + "s ease-out forwards"
                        });
                    }
                    setTimeout(function () {
                        slider.find('.animated-zoomIn').css({
                            animation: "zoomIn 2s forwards"
                        });
                    }, 1000);
                    break;
                case 1:
                    for (var n = 0; n < slider.find('.animated-fadeIn').length; n++) {
                        slider.find('.animated-fadeIn').eq(n).css({
                            animation: "animated-fadeIn 1.5s " + (n * 0.4) + "s ease-out forwards"
                        });
                    }
                    break;
                case 2:
                    slider.find('.animated-left').css({
                        animation: "swiper 1.5s forwards"
                    });
                    slider.find('.animated-fadeIn-right').css({
                        animation: "animated-fadeIn-right 1.5s 0.4s ease-out forwards"
                    });
                    slider.find('.animated-fadeIn-left').css({
                        animation: "animated-fadeIn-left 1.5s 0.5s ease-out forwards"
                    });
                    slider.find('.animated-fadeIn').css({
                        animation: "animated-fadeIn 1.5s " + 2 + "s ease-out forwards"
                    });
                    break;
                case 3:
                    for (var n = 0; n < slider.find('.animated-fadeIn').length; n++) {
                        slider.find('.animated-fadeIn').eq(n).css({
                            animation: "animated-fadeIn 1.5s " + (n * 0.4) + "s ease-out forwards"
                        });
                    }
                    break;
                case 4:
                    for (var x = 0; x < slider.find('.animated-rollIn').length; x++) {
                        slider.find('.animated-rollIn').eq(x).css({
                            animation: "rollIn 1.5s " + (x * 0.5) + "s forwards"
                        });
                    }
                    slider.find('.animated-rotateIn').css({
                        animation: "rotateIn 1.5s 2s forwards"
                    });
                    // setTimeout(function () {
                    //     slider.find('.animated-rotateIn').css({
                    //         animation: "tada 1.5s infinite"
                    //     });
                    // }, 3000);
                    break;
                case 5:
                    slider.find('.animated-fadeIn-right').css({
                        animation: "animated-fadeIn-right 1s ease-out forwards"
                    });
                    slider.find('.animated-fadeIn').css({
                        animation: "animated-fadeIn 1s 1s ease-out forwards"
                    });
                    break;
                case 6:
                    slider.find('.animated-fadeIn').css({
                        animation: "animated-fadeIn 1s ease-out forwards"
                    });
                    slider.find('.animated-bounceIn').css({
                        animation: "bounceIn 1.5s 2.5s forwards"
                    });
                    slider.find('.animated-wobble').css({
                        animation: "animated-wobble 1.5s 4s forwards"
                    });
                    slider.find('.animated-rotateIn').css({
                        animation: "rotateIn 1.5s 1s forwards"
                    });
                    for (var y = 0; y < slider.find('.animated-left').length; y++) {
                        slider.find('.animated-left').eq(y).css({
                            animation: "swiper 2s " + (4 + y * 0.4) + "s forwards"
                        })
                    }
                    break;
                case 7:
                    for (var m = 0; m < slider.find('.animated-bottom').length; m++) {
                        slider.find('.animated-bottom').eq(m).css({
                            animation: "swiper-bottom 1.5s " + (m * 0.1) + "s forwards"
                        })
                    }
                    break;
                case 8:
                    slider.find('.animated-bounceIn').css({
                        animation: 'bounceIn 1s forwards'
                    });
                    break;
            }
        },
        isImageOnLoading: function (slider, callback) {
            var t_img; // 定时器
            var isLoad = true; // 控制变量
            var that = this;

            // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
            // 查找所有封面图，迭代处理
            slider.find('img').each(function () {
                // 找到为0就将isLoad设为false，并退出each
                if (this.height === 0) {
                    isLoad = false;
                    return false;
                }
            });
            // 为true，没有发现为0的。加载完毕
            if (isLoad) {
                clearTimeout(t_img); // 清除定时器
                // 回调函数
                callback();
                // 为false，因为找到了没有加载完成的图，将调用定时器递归
            } else {
                isLoad = true;
                t_img = setTimeout(function () {
                    that.isImageOnLoading(slider, callback); // 递归扫描
                }, 500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
            }
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
                url: 'http://116.62.242.23:8080/add_user',
                type: 'post',
                dataType: 'text',
                data: data,
                beforeSend: function () {

                },
                complete: function () {
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
        setTimeout(function () {
            main.init();
        }, 1000)
    })
})();