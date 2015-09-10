// ==UserScript==
// @name         vBUSdevkit
// @namespace    http://your.vBulletin.site/
// @version      0.1
// @description  A dev kit that helps with creating userscripts for vBulletin forum software
// @author       Geertje123
// @require      http://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==

/**
 *
 * @namespace
 * @type {{getAllThreads: Function, getAllNonStickyThreads: Function, getAllStickyThreads: Function, getAllThreadsWithNewPost: Function, getAllThreadsWithoutNewPost: Function, getAllHotThreads: Function, getAllLockedThreads: Function, getAllThreadsYouPostedIn: Function, getThreadByIndex: Function, getThreadTitle: Function, getThreadAuthor: Function, getThreadUrl: Function, getLastPostUrl: Function, getLastPostAuthor: Function, getThreadPageAmount: Function, getThreadReplyAmount: Function, getThreadViewAmount: Function}}
 */
var VBUS = {
    /**
     * Gets all the threads in a section. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllThreads: function () {
        var threads = [];

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if (!tr.find("td").first().hasClass("thead")) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the non-sticky threads in a section. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllNonStickyThreads: function () {
        var threads = [];
        var pattern = new RegExp("<b>Sticky</b>");

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if (!pattern.test(tr.html()) && !tr.find("td").first().hasClass("thead")) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the sticky threads in a section. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllStickyThreads: function () {
        var threads = [];
        var pattern = new RegExp("<b>Sticky</b>");

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads with unread posts in them. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllThreadsWithNewPost: function () {
        var threads = [];

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if(tr.find("a[id^='thread_title_']").css("font-weight") === "bold") {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads with no unread posts in them. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllThreadsWithoutNewPost: function () {
        var threads = [];

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if(tr.find("a[id^='thread_title_']").css("font-weight") !== "bold" && !tr.find("td").first().hasClass("thead")) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads that are hot. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllHotThreads: function () {
        var threads = [];
        var pattern = new RegExp("_hot(_lock)?.gif");

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads that are locked. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllLockedThreads: function () {
        var threads = [];
        var pattern = new RegExp("_lock.gif");

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads that you have posted in. Returns an array with the DOM element of every thread.
     * Should only be used within a section.
     *
     * @returns {Object[]}
     */
    getAllThreadsYouPostedIn: function () {
        var threads = [];
        var pattern = new RegExp("_dot.*\.gif");

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            var tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets the thread at the given index. Thread counting starts at 0. Returns the DOM element of the thread.
     * Should only be used within a section.
     *
     * @param {Number} index
     * @returns {Object}
     */
    getThreadByIndex: function (index) {
        var iteration = 0;
        var tr;

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if (!tr.find("td").first().hasClass("thead")) {
                if (index === iteration) {
                    return false;
                } else {
                    iteration++;
                }
            }
        });

        return tr;
    },

    /**
     * Gets the title of the given thread. Takes the thread parameter as a DOM element. Returns the title as string.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getThreadTitle: function (thread) {
        return $(thread).find("a[id^='thread_title_']").text();
    },

    /**
     * Gets the author of the given thread. Takes the thread parameter as a DOM element. Returns the author as string.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getThreadAuthor: function (thread) {
        return $(thread).find("td[id^='td_threadtitle_']").find("div[class='smallfont']").find("span").text();
    },

    /**
     * Gets the URL of the given thread. Takes the thread parameter as a DOM element. Returns the URL as string.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getThreadUrl: function (thread) {
        return $(thread).find("a[id^='thread_title_']").attr("href");
    },

    /**
     * Gets the last post URL of the given thread. Takes the thread parameter as a DOM element. Returns the last post URL as string.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getLastPostUrl: function (thread) {
        return $(thread).find("img[alt='Go to last post']").parent().attr("href");
    },

    /**
     * Gets the last post author of the given thread. Takes the thread parameter as a DOM element. Returns the last post author as string.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getLastPostAuthor: function (thread) {
        return $(thread).find("img[alt='Go to last post']").parent().parent().find("a[href*='forum/member']").text();
    },

    /**
     * Gets the amount of pages of the given thread. Takes the thread parameter as a DOM element. Returns the amount of pages as number.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {Number}
     */
    getThreadPageAmount: function (thread) {
        var number = $(thread).find("img[title='Multi-page thread']").parent().find("a").last().text();

        if (number.length === 0) {
            return 0;
        } else {
            return parseInt(number)
        }
    },

    /**
     * Gets the amount of replies of the given thread. Takes the thread parameter as a DOM element. Returns the amount of replies as number.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {Number}
     */
    getThreadReplyAmount: function (thread) {
        return parseInt($(thread).find("a[href*='forum/misc.php?do=whoposted&t=']").text());
    },

    /**
     * Gets the amount of views of the given thread. Takes the thread parameter as a DOM element. Returns the amount of views as number.
     * Should only be used within a section.
     *
     * @param {Object} thread
     * @returns {Number}
     */
    getThreadViewAmount: function (thread) {
        return parseInt($(thread).find("a[href*='forum/misc.php?do=whoposted&t=']").parent().next().text());
    }
};