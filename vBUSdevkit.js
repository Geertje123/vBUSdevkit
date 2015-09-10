// ==UserScript==
// @name         vBUSdevkit
// @namespace    http://your.vBulletin.site/
// @version      1.001
// @description  A dev kit that helps with creating userscripts for vBulletin forum software
// @author       Geertje123
// @require      http://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==

/**
 * @namespace VBUS
 * @type {{getAllThreads: Function, getAllNonStickyThreads: Function, getAllStickyThreads: Function, getAllThreadsWithNewPost: Function, getAllThreadsWithoutNewPost: Function, getAllHotThreads: Function, getAllLockedThreads: Function, getAllThreadsYouPostedIn: Function, getThreadByIndex: Function, getThreadTitle: Function, getThreadAuthor: Function, getThreadUrl: Function, getLastPostUrl: Function, getLastPostAuthor: Function, getThreadPageAmount: Function, getThreadReplyAmount: Function, getThreadViewAmount: Function}}
 */
var VBUS = {
    /**
     * Gets all the sectionblocks. Returns the DOM objects in an array.
     * Should only be used on the main page.
     *
     * @returns {Object[]}
     */
    getAllSections: function () {
        var sections = [];

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            sections.push(this);
        });

        return sections;
    },

    /**
     * Gets all the titles of the sectionblocks. Returns the titles as strings in an array.
     * Should only be used on the main page.
     *
     * @returns {String[]}
     */
    getAllSectionTitles: function () {
        var sections = [];
        var section = {};

        $('a[onclick^="return toggle_collapse(\'forumbit_"]').each(function () {
            section = $(this);

            sections.push(section.next().text());
        });

        return sections;
    },

    /**
     * Gets the section at the given index. Returns the DOM object of the section.
     * Should only be used on the main page.
     *
     * @param {Number} index
     * @returns {Object}
     */
    getSectionByIndex: function (index) {
        var iteration = 0;
        var section = {};

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            section = this;

            if (index === iteration) {
                return false;
            } else {
                iteration++;
            }
        });

        return section;
    },

    /**
     * Gets the section with the given title. Returns the DOM object of the section.
     * Should only be used on the main page.
     *
     * @param {String} title
     * @returns {Object}
     */
    getSectionByTitle: function (title) {
        var match = false;
        var section = {};

        $('a[onclick^="return toggle_collapse(\'forumbit_"]').each(function () {
            section = $(this);

            if (section.next().text() === title) {
                match = true;
                return false;
            }
        });

        if (match) {
            return section.parent().parent().parent().parent().next().first();
        } else {
            return {};
        }
    },






    /**
     * Gets all the forums and returns them as DOM objects in an array.
     * Should only be used on the main page.
     *
     * @returns {Object[]}
     */
    getAllForums: function () {
        var forums = [];

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            $(this).find("tr").each(function (i) {
                if (i !== 0) {
                    forums.push(this);
                }
            });
        });

        return forums;
    },

    /**
     * Gets all the forum titles and returns them as strings in an array.
     * Should only be used on the main page.
     *
     * @returns {String[]}
     */
    getAllForumsTitles: function () {
        var forums = [];

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            $(this).find("tr").each(function (i) {
                if (i !== 0) {
                    forums.push($(this).find("td[id^='f']").first().find("a").find("strong").text());
                }
            });
        });

        return forums;
    },

    /**
     * Gets all the forums with new posts in them and returns them as DOM objects in an array.
     * Should only be used on the main page.
     *
     * @returns {Object[]}
     */
    getAllForumsWithNewPost: function () {
        var forums = [];

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            $(this).find("tr").each(function (i) {
                if (i !== 0) {
                    if ($(this).find("td:first-child").find("img").attr("src").indexOf("new.gif") !== -1) {
                        forums.push(this);
                    }
                }
            });
        });

        return forums;
    },

    /**
     * Gets all the forums with no new posts in them and returns them as DOM objects in an array.
     * Should only be used on the main page.
     *
     * @returns {Object[]}
     */
    getAllForumsWithoutNewPost: function () {
        var forums = [];

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            $(this).find("tr").each(function (i) {
                if (i !== 0) {
                    if ($(this).find("td:first-child").find("img").attr("src").indexOf("old.gif") !== -1) {
                        forums.push(this);
                    }
                }
            });
        });

        return forums;
    },

    /**
     * Gets all the forums in the section given by index and returns them as DOM objects in an array.
     * Should only be used on the main page.
     *
     * @param {Number} index
     * @returns {Object[]}
     */
    getAllForumsFromSectionIndex: function (index) {
        var iteration = 0;
        var forums = [];
        var section = {};

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            section = $(this);

            if (index === iteration) {
                section.find("tr").each(function (i) {
                    if (i !== 0) {
                        forums.push(this);
                    }
                });

                return false;
            } else {
                iteration++;
            }
        });

        return forums;
    },

    /**
     * Gets all the forums in the section given by title and returns them as DOM objects in an array.
     * Should only be used on the main page.
     *
     * @returns {Object[]}
     */
    getAllForumsFromSectionTitle: function (title) {
        var match = false;
        var forums = [];
        var section = {};

        $('a[onclick^="return toggle_collapse(\'forumbit_"]').each(function () {
            section = $(this);
            console.log(section.next().text());

            if (section.next().text() === title) {
                section.parent().parent().parent().parent().next().first().find("tr").each(function (i) {
                    if (i !== 0) {
                        forums.push(this);
                    }
                });
                match = true;
                return false;
            }
        });

        if (match) {
            return forums;
        } else {
            return [];
        }
    },

    /**
     * Gets the forum at the given index and returns it as a DOM object.
     * Should only be used on the main page.
     *
     * @param {Number} index
     * @returns {Object}
     */
    getForumByIndex: function (index) {
        var iteration = 0;
        var match = false;
        var forum = {};
        var section = {};

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            section = $(this);

            section.find("tr").each(function (i) {
                if (i !== 0) {
                    if (index === iteration) {
                        match = true;
                        forum = this;
                        return false;
                    } else {
                        iteration++;
                    }
                }
            });

            if (match) {
                return false;
            }
        });

        if (match) {
            return forum;
        } else {
            return {};
        }
    },

    /**
     * Gets the forum with the given title and returns it as a DOM object.
     * Should only be used on the main page.
     *
     * @param {String} title
     * @returns {Object}
     */
    getForumByTitle: function (title) {
        var match = false;
        var forum = {};
        var section = {};

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            section = $(this);

            section.find("tr").each(function (i) {
                if (i !== 0) {
                    if (title === $(this).find("td[id^='f']").first().find("a").find("strong").text()) {
                        match = true;
                        forum = this;
                        return false;
                    }
                }
            });

            if (match) {
                return false;
            }
        });

        if (match) {
            return forum;
        } else {
            return {};
        }
    },






    /**
     * Gets all the threads in a section. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllThreads: function () {
        var threads = [];
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if (!tr.find("td").first().hasClass("thead")) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the non-sticky threads in a section. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllNonStickyThreads: function () {
        var threads = [];
        var pattern = new RegExp("<b>Sticky</b>");
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if (!pattern.test(tr.html()) && !tr.find("td").first().hasClass("thead")) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the sticky threads in a section. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllStickyThreads: function () {
        var threads = [];
        var pattern = new RegExp("<b>Sticky</b>");
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads with unread posts in them. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllThreadsWithNewPost: function () {
        var threads = [];
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if(tr.find("a[id^='thread_title_']").css("font-weight") === "bold") {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads with no unread posts in them. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllThreadsWithoutNewPost: function () {
        var threads = [];
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if(tr.find("a[id^='thread_title_']").css("font-weight") !== "bold" && !tr.find("td").first().hasClass("thead")) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads that are hot. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllHotThreads: function () {
        var threads = [];
        var pattern = new RegExp("_hot(_lock)?.gif");
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads that are locked. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllLockedThreads: function () {
        var threads = [];
        var pattern = new RegExp("_lock.gif");
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets all the threads that you have posted in. Returns an array with the DOM element of every thread.
     * Should only be used within a forum.
     *
     * @returns {Object[]}
     */
    getAllThreadsYouPostedIn: function () {
        var threads = [];
        var pattern = new RegExp("_dot.*\.gif");
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = $(this);

            if (pattern.test(tr.html())) {
                threads.push(this);
            }
        });

        return threads;
    },

    /**
     * Gets the thread at the given index. Thread counting starts at 0. Returns the DOM element of the thread.
     * Should only be used within a forum.
     *
     * @param {Number} index
     * @returns {Object}
     */
    getThreadByIndex: function (index) {
        var iteration = 0;
        var match = false;
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = this;

            if (!$(tr).find("td").first().hasClass("thead")) {
                if (index === iteration) {
                    match = true;
                    return false;
                } else {
                    iteration++;
                }
            }
        });

        if (match) {
            return tr;
        } else {
            return {};
        }
    },

    /**
     * Gets the thread with the given title. Returns the DOM object of the thread.
     * Should only be used within a forum.
     *
     * @param {String} title
     * @returns {Object}
     */
    getThreadByTitle: function (title) {
        var match = false;
        var tr = {};

        $("tbody[id^='threadbits_forum_']").find("tr").each(function () {
            tr = this;

            if (!$(tr).find("td").first().hasClass("thead")) {
                if (title === $(tr).find("a[id^='thread_title_']").text()) {
                    match = true;
                    return false;
                }
            }
        });

        if (match) {
            return tr;
        } else {
            return {};
        }
    },

    /**
     * Gets the title of the given thread. Takes the thread parameter as a DOM element. Returns the title as string.
     * Should only be used within a forum.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getThreadTitle: function (thread) {
        return $(thread).find("a[id^='thread_title_']").text();
    },

    /**
     * Gets the author of the given thread. Takes the thread parameter as a DOM element. Returns the author as string.
     * Should only be used within a forum.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getThreadAuthor: function (thread) {
        return $(thread).find("td[id^='td_threadtitle_']").find("div[class='smallfont']").find("span").text();
    },

    /**
     * Gets the URL of the given thread. Takes the thread parameter as a DOM element. Returns the URL as string.
     * Should only be used within a forum.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getThreadUrl: function (thread) {
        return $(thread).find("a[id^='thread_title_']").attr("href");
    },

    /**
     * Gets the last post URL of the given thread. Takes the thread parameter as a DOM element. Returns the last post URL as string.
     * Should only be used within a forum.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getLastPostUrl: function (thread) {
        return $(thread).find("img[alt='Go to last post']").parent().attr("href");
    },

    /**
     * Gets the last post author of the given thread. Takes the thread parameter as a DOM element. Returns the last post author as string.
     * Should only be used within a forum.
     *
     * @param {Object} thread
     * @returns {String}
     */
    getLastPostAuthor: function (thread) {
        return $(thread).find("img[alt='Go to last post']").parent().parent().find("a[href*='forum/member']").text();
    },

    /**
     * Gets the amount of pages of the given thread. Takes the thread parameter as a DOM element. Returns the amount of pages as number.
     * Should only be used within a forum.
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
     * Should only be used within a forum.
     *
     * @param {Object} thread
     * @returns {Number}
     */
    getThreadReplyAmount: function (thread) {
        return parseInt($(thread).find("a[href*='forum/misc.php?do=whoposted&t=']").text());
    },

    /**
     * Gets the amount of views of the given thread. Takes the thread parameter as a DOM element. Returns the amount of views as number.
     * Should only be used within a forum.
     *
     * @param {Object} thread
     * @returns {Number}
     */
    getThreadViewAmount: function (thread) {
        return parseInt($(thread).find("a[href*='forum/misc.php?do=whoposted&t=']").parent().next().text());
    }
};