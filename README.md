# vBUSdevkit
A dev kit that helps with creating userscripts for vBulletin forum software

## Intro
I created this for the website http://unknowncheats.me/ to give better support for userscript development. Therefore I haven't tested it on newer versions of vBullitin. If you do encouter problems with newer versions of vBullitin, leave an issue and I'll have a look.


## Table of contents
1. Methods
  1. Sections
    1. getAllSections()
    2. getAllSectionTitles()
    3. getSectionByIndex(index)
    4. getSectionByTitle(title)
  2. Forums
  3. Threads
  4. Posts


## Methods
Contains a list of all methods. Note: indexes start at 0. For example; if you want the _first_ thread in a forum, you use `getThreadByIndex(0)`.

### Sections
These functions should only be used on the main page where there is a view of all sections with its forums.

#### getAllSections()
Gets all the sectionblocks. Returns the DOM objects in an array.

* param: -
* returns: Object[]

#### getAllSectionTitles()
Gets all the titles of the sectionblocks. Returns the titles as strings in an array.

* param: -
* returns: String[]

#### getSectionByIndex(index)
Gets the section at the given index. Returns the DOM object of the section.

* param: Number index
* returns: Object

#### getSectionByTitle(title)
Gets the section with the given title. Returns the DOM object of the section.

* param: String title
* returns: Object


### Forums
These methods should only be used on the main page where there is a view of all sections with its forums.

#### getAllForums()
Gets all the forums and returns them as DOM objects in an array.

* param: -
* returns: Object[]

#### getAllForumTitles()
Gets all the forum titles and returns them as strings in an array.

* param: -
* returns: String[]

#### getAllForumsWithNewPost()
Gets all the forums with new posts in them and returns them as DOM objects in an array.

* param: -
* returns: Object[]

#### getAllForumsWithoutNewPost()
Gets all the forums with no new posts in them and returns them as DOM objects in an array.

* param: -
* returns: Object[] 

#### getAllForumsFromSectionIndex(index)
Gets all the forums in the section given by index and returns them as DOM objects in an array.

* param: Number index
* returns: Object[]

#### getAllForumsFromSectionTitle(title)
Gets all the forums in the section given by title and returns them as DOM objects in an array.

* param: String title
* returns: Object[]

#### getForumByIndex(index)
Gets the forum at the given index and returns it as a DOM object.

* param: Number index
* returns: Object

#### getForumByTitle(title)
Gets the forum with the given title and returns it as a DOM object.

* param: String title
* returns: Object


### Threads
These methods should only be used within a forum where there is a list of threads in it.

#### getAllThreads()
Gets all the threads in a section. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[]

#### getAllNonStickyThreads()
Gets all the non-sticky threads in a section. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[] 

#### getAllStickyThreads()
Gets all the sticky threads in a section. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[]

#### getAllThreadsWithNewPost()
Gets all the threads with unread posts in them. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[]

#### getAllThreadsWithoutNewPost()
Gets all the threads with no unread posts in them. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[]

#### getAllHotThreads()
Gets all the threads that are hot. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[]

#### getAllLockedThreads()
Gets all the threads that are locked. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[]

#### getAllThreadsYouPostedIn()
Gets all the threads that you have posted in. Returns an array with the DOM element of every thread.

* param: -
* returns: Object[]

#### getThreadByIndex(index)
Gets the thread at the given index. Thread counting starts at 0. Returns the DOM element of the thread.

* param: Number index
* returns: Object

#### getThreadByTitle(title)
Gets the thread with the given title. Returns the DOM object of the thread.

* param: String title
* returns: Object

#### getThreadTitle(thread)
Gets the title of the given thread. Takes the thread parameter as a DOM element. Returns the title as string.

* param: Object thread
* returns: String

#### getThreadAuthor(thread)
Gets the author of the given thread. Takes the thread parameter as a DOM element. Returns the author as string.

* param: Object thread
* returns: String

#### getThreadUrl(thread)
Gets the URL of the given thread. Takes the thread parameter as a DOM element. Returns the URL as string.

* param: Object thread
* returns: String

#### getThreadLastPostUrl(thread)
Gets the last post URL of the given thread. Takes the thread parameter as a DOM element. Returns the last post URL as string.

* param: Object thread
* returns: String

#### getThreadLastPostAuthor(thread)
Gets the last post author of the given thread. Takes the thread parameter as a DOM element. Returns the last post author as string.

* param: Object thread
* returns: String

#### getThreadPageAmount(thread)
Gets the amount of pages of the given thread. Takes the thread parameter as a DOM element. Returns the amount of pages as number.

* param: Object thread
* returns: Number

#### getThreadReplyAmount(thread)
Gets the amount of replies of the given thread. Takes the thread parameter as a DOM element. Returns the amount of replies as number.

* param: Object thread
* returns: Number

#### getThreadViewAmount(thread)
Gets the amount of views of the given thread. Takes the thread parameter as a DOM element. Returns the amount of views as number.

* param: Object thread
* returns: Number


### Posts
Soon to be


