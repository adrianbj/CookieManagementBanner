(function ($) {

    var pwcmb = {
        attach: function (context, settings) {
            if(!pwcmb_settings.status) return;

            window.dataLayer = window.dataLayer || [];

            var cookieMonster = {};

            cookieMonster.cfg = {
                wrapper: $('.pwcmb'),
                notice: $('.pwcmb-widget--notice'),
                manage: $('.pwcmb-widget--manage'),
                message: $('.pwcmb-widget--message'),
                visibleClass: 'js-show',
                version: pwcmb_settings.version,
                storedVersion: null,
                //status: $('#cookie-status'),
                allow: $('.js-pwcmb-allow-cookies'),
                block: $('.js-pwcmb-block-cookies'),
                allowCookies: 'n', //current tracking state
                allowStorage: (typeof(Storage) !== "undefined"),
                selectionMade: 'n', //whether a selection has been made by the user
                acceptanceSet: 0 //keeps track of whether acceptance has been set in current page load or not
            }

            //push acceptance flag to the dataLayer for tag manager to pick up
            //use flag 'acceptanceSet' to only push acceptance to the datalayer
            //once (otherwise might get set multiple times in tag manager)
            cookieMonster.sendTrackingBeacon = function() {
                dataLayer.push({
                    event: (cookieMonster.cfg.allowCookies == "y" ? "COOKIE_MONSTER_SET_COOKIES" : "COOKIE_MONSTER_NO_COOKIES"),
                    payload: {status: 1},
                });
            }

            //event to track accept/decline action
            cookieMonster.sendActionBeacon = function() {
                dataLayer.push({
                    event: (cookieMonster.cfg.allowCookies == "y" ? "COOKIE_MONSTER_USER_ACCEPTS" : "COOKIE_MONSTER_USER_DECLINES"),
                    payload: {status: 1},
                });
            }

            //set the status of the user preferences (typically on page load)
            cookieMonster.setStatus = function() {
                cookieMonster.setUserPreferences();
                cookieMonster.sendTrackingBeacon();
            }

            //update the preferences of a user, when interacting with the modal widget
            cookieMonster.updateStatus = function() {
                cookieMonster.setUserPreferences();
                if(cookieMonster.cfg.acceptanceSet < 1) {
                    cookieMonster.cfg.acceptanceSet = 1; //track that a user has accepted already
                    //set this whether accepting or declining to ensure the action is tracked
                    cookieMonster.sendTrackingBeacon();
                }
            }

            //store the user's preferences to local storage
            cookieMonster.setUserPreferences = function() {
                if(cookieMonster.cfg.allowStorage) {
                    localStorage.setItem("pwcmbAllowCookies", cookieMonster.cfg.allowCookies);
                    localStorage.setItem("pwcmbSelectionMade", cookieMonster.cfg.selectionMade);
                    localStorage.setItem("pwcmbVersion", cookieMonster.cfg.storedVersion);
                }
            }

            //set cookieMonster variables when user allows
            cookieMonster.allow = function() {
                cookieMonster.cfg.allowCookies = "y";
                cookieMonster.cfg.selectionMade = "y";
                cookieMonster.cfg.storedVersion = cookieMonster.cfg.version;
                cookieMonster.sendActionBeacon();
                cookieMonster.updateStatus();
            }

            //set cookieMonster variables when user blocks
            cookieMonster.block = function() {
                cookieMonster.cfg.allowCookies = "n";
                cookieMonster.cfg.selectionMade = "y";
                cookieMonster.cfg.storedVersion = cookieMonster.cfg.version;
                cookieMonster.sendActionBeacon();
                cookieMonster.updateStatus();
            }

            //cookieMonster UI actions and methods
            cookieMonster.ui = {
                cfg: {
                  initialBodyPadding:  parseInt($('body').css('padding-top')),
                },
                updateUi: function(animate) {
                    var h = $('.js-show.pwcmb--top_push').outerHeight();
                    var p = cookieMonster.ui.cfg.initialBodyPadding;

                    $('body').animate({
                        'padding-top': h + p,
                    }, (animate ? 250 : 0));
                },
                showNotice: function() {
                    var vis = cookieMonster.cfg.visibleClass;
                    cookieMonster.cfg.notice.addClass(vis).siblings().removeClass(vis);
                },
                showManage: function() {
                    var vis = cookieMonster.cfg.visibleClass;
                    cookieMonster.cfg.manage.addClass(vis).siblings().removeClass(vis);
                },
                showMessage: function() {
                    var vis = cookieMonster.cfg.visibleClass;
                    cookieMonster.cfg.message.addClass(vis).siblings().removeClass(vis);
                    cookieMonster.ui.timeoutSuccess();
                },
                timeoutSuccess: function() {
                    var vis = cookieMonster.cfg.visibleClass;
                    var timer = setTimeout(function() {
                        cookieMonster.cfg.message.removeClass(vis);
                        clearTimeout(timer);
                    }, 1400)
                },
                actions: function() {

                    cookieMonster.cfg.allow.click(function() {
                        cookieMonster.allow();
                        cookieMonster.ui.showMessage();
                    });

                    if($('.js-show.pwcmb--top_push').length) {
                        cookieMonster.ui.updateUi(true);
                        $(window).resize(function() {
                            cookieMonster.ui.updateUi(false);
                        })
                    }

                    $('.js-pwcmb-manage-cookies').on('click', function() {
                        cookieMonster.ui.showManage();
                        if(
                            cookieMonster.cfg.allowCookies == "y"
                        ) {
                            $('.js-pwcmb-marketing-pref--y').prop('checked', true);
                        } else if (cookieMonster.cfg.allowCookies == "n") {
                            $('.js-pwcmb-marketing-pref--n').prop('checked', true);
                        }
                    });

                    $('.pwcmb-widget__row-cb').on('change', function() {
                        var checked = $(this).is(':checked');
                        $(this).parents('.pwcmb-option-wrapper').siblings().find('.pwcmb-widget__row-cb').prop('checked', !checked);
                    });

                    $('.js-pwcmb-save-pref').on('click', function() {
                        var _val = $('.js-pwcmb-marketing-pref--y').is(':checked');
                        if(_val) {
                            cookieMonster.allow();
                        } else {
                            cookieMonster.block();
                        }
                        cookieMonster.ui.showMessage();
                    });

                    $('.js-pwcmb-notice-toggle').on('click', function(e) {
                        e.preventDefault();
                        cookieMonster.ui.show();
                    })
                },
                show: function() {
                    //first step
                    cookieMonster.cfg.wrapper.addClass(cookieMonster.cfg.visibleClass);
                    cookieMonster.ui.showNotice();
                }
            }

            cookieMonster.init = function() {
                if(cookieMonster.cfg.allowStorage) {
                    cookieMonster.cfg.allowCookies = localStorage.getItem("pwcmbAllowCookies");
                    cookieMonster.cfg.selectionMade = localStorage.getItem("pwcmbSelectionMade");
                    cookieMonster.cfg.storedVersion = localStorage.getItem("pwcmbVersion");
                } else {
                    return;
                }

                //determine whether to show the modal or not
                //show if the user has not made a selection either way, or if version has changed
                if(
                    cookieMonster.cfg.selectionMade != "y" ||
                    cookieMonster.cfg.storedVersion != cookieMonster.cfg.version
                ) {
                    cookieMonster.ui.show();
                    $('body').addClass('pwcmb-active');
                }

                cookieMonster.setStatus(); //on page load
                cookieMonster.ui.actions();

            }

            cookieMonster.init();
        }
    };

    pwcmb.attach();

})(jQuery);
