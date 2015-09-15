// ==UserScript==
// @name         vBUSdevkit
// @namespace    http://your.vBulletin.site/
// @version      1.002
// @description  A dev kit that helps with creating userscripts for vBulletin forum software
// @author       Geertje123
// @require      http://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==


var VBUS = {


    /** Sections **/
    getAllSections: function () {
        var sections = [];

        $("tbody[id^='collapseobj_forumbit_']").each(function () {
            sections.push(this);
        });

        return sections;
    },
    getAllSectionTitles: function () {
        var sections = [];
        var section = {};

        $('a[onclick^="return toggle_collapse(\'forumbit_"]').each(function () {
            section = $(this);

            sections.push(section.next().text());
        });

        return sections;
    },
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


    /** Forums **/
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
    getAllForumTitles: function () {
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


    /** Threads **/
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
    getThreadTitle: function (thread) {
        return $(thread).find("a[id^='thread_title_']").text();
    },
    getThreadAuthor: function (thread) {
        return $(thread).find("td[id^='td_threadtitle_']").find("div[class='smallfont']").find("span").text();
    },
    getThreadUrl: function (thread) {
        return $(thread).find("a[id^='thread_title_']").attr("href");
    },
    getThreadLastPostUrl: function (thread) {
        return $(thread).find("img[alt='Go to last post']").parent().attr("href");
    },
    getThreadLastPostAuthor: function (thread) {
        return $(thread).find("img[alt='Go to last post']").parent().parent().find("a[href*='forum/member']").text();
    },
    getThreadPageAmount: function (thread) {
        var number = $(thread).find("img[title='Multi-page thread']").parent().find("a").last().text();

        if (number.length === 0) {
            return 0;
        } else {
            return parseInt(number)
        }
    },
    getThreadReplyAmount: function (thread) {
        return parseInt($(thread).find("a[href*='forum/misc.php?do=whoposted&t=']").text());
    },
    getThreadViewAmount: function (thread) {
        return parseInt($(thread).find("a[href*='forum/misc.php?do=whoposted&t=']").parent().next().text());
    }
};