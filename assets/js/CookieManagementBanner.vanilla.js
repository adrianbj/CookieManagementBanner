document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    var pwcmb = {
        attach: function () {
            if (!pwcmb_settings.status) return;

            window.dataLayer = window.dataLayer || [];

            var cookieMonster = {};

            cookieMonster.cfg = {
                wrapper: document.querySelector(".pwcmb"),
                notice: document.querySelector(".pwcmb-widget--notice"),
                manage: document.querySelector(".pwcmb-widget--manage"),
                message: document.querySelector(".pwcmb-widget--message"),
                visibleClass: "js-show",
                version: pwcmb_settings.version,
                storedVersion: null,
                //status: document.getElementById("cookie-status"),
                allowClass: ".js-pwcmb-allow-cookies",
                allowCookies: "n", //current tracking state
                allowStorage: (typeof (Storage) !== "undefined"),
                viewCount: 0,
                selectionMade: "n", //whether a selection has been made by the user
                acceptanceSet: 0 //keeps track of whether acceptance has been set in current page load or not
            };

            //push acceptance flag to the dataLayer for tag manager to pick up
            //use flag "acceptanceSet" to only push acceptance to the datalayer
            //once (otherwise might get set multiple times in tag manager)
            cookieMonster.sendTrackingBeacon = function () {
                dataLayer.push({
                    event: (cookieMonster.cfg.allowCookies == "y" ? "COOKIE_MONSTER_SET_COOKIES" : "COOKIE_MONSTER_NO_COOKIES"),
                    payload: {
                        status: 1
                    },
                });
            };

            //event to track accept/decline action
            cookieMonster.sendActionBeacon = function () {
                dataLayer.push({
                    event: (cookieMonster.cfg.allowCookies == "y" ? "COOKIE_MONSTER_USER_ACCEPTS" : "COOKIE_MONSTER_USER_DECLINES"),
                    payload: {
                        status: 1
                    },
                });
            };

            //set the status of the user preferences (typically on page load)
            cookieMonster.setStatus = function () {
                cookieMonster.setUserPreferences();
                cookieMonster.sendTrackingBeacon();
            };

            //update the preferences of a user, when interacting with the modal widget
            cookieMonster.updateStatus = function () {
                cookieMonster.setUserPreferences();
                if (cookieMonster.cfg.acceptanceSet < 1) {
                    cookieMonster.cfg.acceptanceSet = 1; //track that a user has accepted already
                    //set this whether accepting or declining to ensure the action is tracked
                    cookieMonster.sendTrackingBeacon();
                }
            };

            //store the user"s preferences to local storage
            cookieMonster.setUserPreferences = function () {
                if (cookieMonster.cfg.allowStorage) {
                    localStorage.setItem("pwcmbAllowCookies", cookieMonster.cfg.allowCookies);
                    localStorage.setItem("pwcmbSelectionMade", cookieMonster.cfg.selectionMade);
                    localStorage.setItem("pwcmbVersion", cookieMonster.cfg.storedVersion);
                    localStorage.setItem("pwcmbViewCount", cookieMonster.cfg.viewCount);
                }
            };

            //set cookieMonster variables when user allows

            /**
             * @param explicit {Boolean}
             */
            cookieMonster.allow = function (explicit) {

                if (explicit) {
                    cookieMonster.cfg.viewCount = -1;
                }

                cookieMonster.cfg.allowCookies = "y";
                cookieMonster.cfg.selectionMade = "y";
                cookieMonster.cfg.storedVersion = cookieMonster.cfg.version;
                cookieMonster.sendActionBeacon();
                cookieMonster.updateStatus();
                cookieMonster.setUserPreferences();

            };

            //set cookieMonster variables when user blocks
            cookieMonster.block = function () {
                cookieMonster.cfg.allowCookies = "n";
                cookieMonster.cfg.selectionMade = "y";
                cookieMonster.cfg.storedVersion = cookieMonster.cfg.version;
                cookieMonster.sendActionBeacon();
                cookieMonster.updateStatus();
            };

            //cookieMonster UI actions and methods
            cookieMonster.ui = {
                showNotice: function () {
                    var el = cookieMonster.cfg.notice,
                        vis = cookieMonster.cfg.visibleClass,
                        children = el.parentElement.children;

                    for (var i = 0; i < children.length; i++) {
                        children[i].classList.remove(vis);
                    }

                    el.classList.add(vis);
                },
                showManage: function () {
                    var vis = cookieMonster.cfg.visibleClass,
                        el = cookieMonster.cfg.manage,
                        children = el.parentElement.children;

                    for (var i = 0; i < children.length; i++) {
                        children[i].classList.remove(vis);
                    }

                    el.classList.add(vis);
                },
                showMessage: function () {
                    var vis = cookieMonster.cfg.visibleClass,
                        el = cookieMonster.cfg.message,
                        children = el.parentElement.children;

                    for (var i = 0; i < children.length; i++) {
                        children[i].classList.remove(vis);
                    }

                    el.classList.add(vis);

                    cookieMonster.ui.timeoutSuccess();
                },
                timeoutSuccess: function () {
                    var vis = cookieMonster.cfg.visibleClass,
                        timer = setTimeout(function () {
                            cookieMonster.cfg.message.classList.remove(vis);
                            clearTimeout(timer);
                        }, 2700);
                },
                actions: function () {

                    if (cookieMonster.cfg.allowCookies == "y") {
                        document.querySelector(".js-pwcmb-marketing-pref--y").checked = true;
                    } else if (cookieMonster.cfg.allowCookies == "n") {
                        document.querySelector(".js-pwcmb-marketing-pref--n").checked = true;
                    }

                    cookieMonster.cfg.wrapper.addEventListener("click", filterEventHandler(cookieMonster.cfg.allowClass, function () {

                        cookieMonster.cfg.viewCount = -1;

                        if (cookieMonster.cfg.allowCookies !== "y") {
                            cookieMonster.allow(true);
                        }

                        cookieMonster.setUserPreferences();
                        cookieMonster.ui.showMessage();
                    }));

                    cookieMonster.cfg.wrapper.addEventListener("click", filterEventHandler(".js-pwcmb-manage-cookies", function () {
                        cookieMonster.ui.showManage();
                        if (cookieMonster.cfg.allowCookies == "y") {
                            document.querySelector(".js-pwcmb-marketing-pref--y").checked = true;
                        } else if (cookieMonster.cfg.allowCookies == "n") {
                            document.querySelector(".js-pwcmb-marketing-pref--n").checked = true;
                        }
                    }));

                    cookieMonster.cfg.wrapper.addEventListener("change", filterEventHandler(".pwcmb-widget__row-cb", function (e) {
                        var el = e.filterdTarget,
                            checked = el.checked,
                            inputs = el.parentElement.parentElement.querySelectorAll(".pwcmb-widget__row-cb");

                        for (var i = 0; i < inputs.length; i++) {
                            if (inputs[i] !== el) {
                                inputs[i].checked = !checked;
                            }
                        }
                    }));

                    cookieMonster.cfg.wrapper.addEventListener("click", filterEventHandler(".js-pwcmb-save-pref", function () {
                        var _val = document.querySelector(".js-pwcmb-marketing-pref--y").checked;
                        if (_val) {
                            cookieMonster.allow(true);
                        } else {
                            cookieMonster.block();
                        }
                        cookieMonster.ui.showMessage();
                    }));

                    document.addEventListener("click", filterEventHandler(".js-pwcmb-notice-toggle", function (e) {
                        e.preventDefault();
                        cookieMonster.ui.show();
                        cookieMonster.ui.showManage();
                    }));
                },
                show: function () {
                    //first step
                    cookieMonster.cfg.wrapper.classList.add(cookieMonster.cfg.visibleClass);
                    cookieMonster.ui.showNotice();
                    // add pwcmb class to body when banner is active
                    // not used by this module, but available for devs for their use
                    document.body.classList.add("pwcmb-active");
                }
            };

            /**
             * Entry point to cookie initialization
             */
            cookieMonster.init = function () {
                /*
                 auto_fire is a truthy value when "EU only" mode is enabled and the visitor is deemed to be NOT from the EU,
                 in which case we want to fire the "set cookies" event immediately, hide any "manage cookies links" in the page,
                 and then ignore all further processing
                 */
                if (pwcmb_settings.auto_fire == "true") {
                    var el = document.querySelector(".js-pwcmb-notice-toggle");
                    cookieMonster.cfg.allowCookies = "y";
                    cookieMonster.sendTrackingBeacon();
                    el.parentElement.remove(el);
                    return;
                }

                if (cookieMonster.cfg.allowStorage) {
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
                    if (localStorage.getItem("pwcmbViewcount") || !localStorage.getItem("pwcmbViewCount")) {
                        cookieMonster.cfg.viewCount = -1;
                        cookieMonster.setUserPreferences();
                    }

                    cookieMonster.setStatus(); //on page load

                    // if they haven"t explicitly accepted it (ie: auto-accept) then display the banner
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

                        // but if they haven"t explicitly allowed cookies, then display the banner
                        if (cookieMonster.cfg.viewCount >= 0) {
                            cookieMonster.ui.show();
                            cookieMonster.cfg.viewCount++;
                        }
                        cookieMonster.setUserPreferences();
                    }

                    // if auto-accept is off and they haven"t selected anything, display the banner
                } else {
                    if (cookieMonster.cfg.selectionMade !== "y") {
                        cookieMonster.ui.show();
                    }
                }
            };

            cookieMonster.init();
        }
    };

    pwcmb.attach();
});

// jQuery .on() equivalent
var filterEventHandler = function (selector, callback) {
    return (!callback || !callback.call) ? null : function (e) {
        var target = e.target || e.srcElement || null;
        while (target && target.parentElement && target.parentElement.querySelectorAll) {
            var elms = target.parentElement.querySelectorAll(selector);
            for (var i = 0; i < elms.length; i++) {
                if (elms[i] === target) {
                    e.filterdTarget = elms[i];
                    callback.call(elms[i], e);
                    return;
                }
            }
            target = target.parentElement;
        }
    };
};