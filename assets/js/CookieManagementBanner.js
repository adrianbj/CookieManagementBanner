(function ($) {

    // older versions of jQuery need to use the `attr` method to modify node properties, newer versions use `prop`
    var method = $.fn.jquery.replace(/\.(\d)/g,".0$1").replace(/\.0(\d{2})/g,".$1") > "1.6" ? 'prop' : 'attr';

    var pwcmb = {
        attach: function () {
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
                viewCount : 0,
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
                    localStorage.setItem("pwcmbViewCount", cookieMonster.cfg.viewCount);
                }
            }

            //set cookieMonster variables when user allows

            /**
             *
             *
             * @param explicit {Boolean}
             */
            cookieMonster.allow = function(explicit) {

                if (explicit) {
                    cookieMonster.cfg.viewCount = -1;
                }

                cookieMonster.cfg.allowCookies = "y";
                cookieMonster.cfg.selectionMade = "y";
                cookieMonster.cfg.storedVersion = cookieMonster.cfg.version;
                cookieMonster.sendActionBeacon();
                cookieMonster.updateStatus();
                cookieMonster.setUserPreferences();

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

                    if(
                        cookieMonster.cfg.allowCookies == "y"
                    ) {
                        $('.js-pwcmb-marketing-pref--y')[method]('checked', true);
                    } else if (cookieMonster.cfg.allowCookies == "n") {
                        $('.js-pwcmb-marketing-pref--n')[method]('checked', true);
                    }

                    cookieMonster.cfg.allow.click(function allowClick() {

                        cookieMonster.cfg.viewCount = -1;
                        if (cookieMonster.cfg.allowCookies !== "y") {
                            cookieMonster.allow(true);
                        }

                        cookieMonster.setUserPreferences();
                        cookieMonster.ui.showMessage();
                    });

                    if($('.js-show.pwcmb--top_push').length) {
                        cookieMonster.ui.updateUi(true);
                        $(window).resize(function resizeWindow() {
                            cookieMonster.ui.updateUi(false);
                        })
                    }

                    $('.js-pwcmb-manage-cookies').bind('click', function manageClick() {
                        cookieMonster.ui.showManage();
                        if(
                            cookieMonster.cfg.allowCookies == "y"
                        ) {

                            $('.js-pwcmb-marketing-pref--y')[method]('checked', true);
                        } else if (cookieMonster.cfg.allowCookies == "n") {
                            $('.js-pwcmb-marketing-pref--n')[method]('checked', true);
                        }
                    });

                    $('.pwcmb-widget__row-cb').bind('change', function change() {
                        var checked = $(this).is(':checked');
                        $(this).parents('.pwcmb-option-wrapper').siblings().find('.pwcmb-widget__row-cb')[method]('checked', !checked);
                    });

                    $('.js-pwcmb-save-pref').bind('click', function savePreferenceClick() {
                        var _val = $('.js-pwcmb-marketing-pref--y').is(':checked');
                        if(_val) {
                            cookieMonster.allow(true);
                        } else {
                            cookieMonster.block();
                        }
                        cookieMonster.ui.showMessage();
                    });

                    $('.js-pwcmb-notice-toggle').bind('click', function toggleClick(e) {
                        e.preventDefault();
                        cookieMonster.ui.show();
                        cookieMonster.ui.showManage();
                    })
                },
                show: function() {
                    //first step
                    cookieMonster.cfg.wrapper.addClass(cookieMonster.cfg.visibleClass);
                    cookieMonster.ui.showNotice();
                    // add pwcmb class to body when banner is active
                    // not used by this module, but available for devs for their use
                    $('body').addClass('pwcmb-active');
                }
            }

            /**
             * Entry point to cookie initialization
             *
             */
            cookieMonster.init = function() {

                /*
                 auto_fire is a truthy value when "EU only" mode is enabled and the visitor is deemed to be NOT from the EU,
                 in which case we want to fire the "set cookies" event immediately, hide any "manage cookies links" in the page,
                 and then ignore all further processing
                 */
                if (pwcmb_settings.auto_fire == 'true') {
                    cookieMonster.cfg.allowCookies = 'y';
                    cookieMonster.sendTrackingBeacon();
                    $('.js-pwcmb-notice-toggle').remove();
                    return;
                }

                if(cookieMonster.cfg.allowStorage) {
                    cookieMonster.cfg.allowCookies = localStorage.getItem("pwcmbAllowCookies");
                    cookieMonster.cfg.selectionMade = localStorage.getItem("pwcmbSelectionMade");
                    cookieMonster.cfg.storedVersion = localStorage.getItem("pwcmbVersion");
                    cookieMonster.cfg.viewCount = localStorage.getItem("pwcmbViewCount") ? parseInt(localStorage.getItem("pwcmbViewCount"), 10) : 0;
                } else {
                    return;
                }

                // attach all listeners
                cookieMonster.ui.actions();

                // have they implicitly or explicitly made a choice?
                if (cookieMonster.cfg.selectionMade == "y") {

                    // have they implicitly or explicitly made a choice?
                    if (localStorage.getItem('pwcmbViewcount') || ! localStorage.getItem('pwcmbViewCount')) {
                        cookieMonster.cfg.viewCount = -1;
                        cookieMonster.setUserPreferences();
                    }

                    cookieMonster.setStatus(); //on page load

                    // if they haven't explicitly accepted it (ie: auto-accept) then display the banner
                    if (pwcmb_settings.auto_accept && cookieMonster.cfg.viewCount != -1) {
                        cookieMonster.ui.show();
                    }
                }

                if (pwcmb_settings.auto_accept) {

                    if (cookieMonster.cfg.viewCount == -1) {
                        cookieMonster.setUserPreferences();

                    // auto-accept mode is on but they have not explicitly accepted the terms
                    } else {

                        // if this is NOT the first page view (ie: 2nd, 3rd, 4th, 5th, ...) pageview, then implicitly allow cookies
                        if (cookieMonster.cfg.viewCount == 1) {
                            cookieMonster.allow(false);
                        }

                        // but if they haven't explicitly allowed cookies, then display the banner
                        if (cookieMonster.cfg.viewCount >= 0) {
                            cookieMonster.ui.show();
                            cookieMonster.cfg.viewCount++;
                        }
                        cookieMonster.setUserPreferences();
                    }

                // if auto-accept is off and they haven't selected anything, display the banner
                } else {
                    if (cookieMonster.cfg.selectionMade !== 'y') {
                        cookieMonster.ui.show();
                    }
                }
            };

            cookieMonster.init();

        }
    };

    pwcmb.attach();

})(jQuery);
