post4a.js 
=========

JavaScript for sending a POST request with an HTML anchor tag.  

Summary
-------

post4a.js is a JavaScript library that would help to prevent websites from exposing a user's identity embedded in `Referer` to other sites, by avoiding selected query-strings from being used for the page URL. 

The regular HTML anchor tags (`<A>`) let browsers issue GET requests when the user clicks on the anchors, so that the browser can simply, directly open the requested page with the URL specified in the anchor's `href` attribute. 
When the browsers send the HTTP request, they by default automatically attach the `Referer` value to the request for the purpose of letting the destination website know about the page from which the browser is arriving. 
If the URL contains user's sensitive information, the destination website can extract them from the URL.

Since POST requests embed query-strings into the request body instead of the URL, they are safer than GET requests in terms of `Referer` information theft, because the request body is not automatically embedded to other requests.
However, the browsers only send GET requests for anchor tags, currently.
post4a.js provides a simple solution currently available on the today's browsers.
It automatically converts the specified anchor tags into form tags to send POST requests with some pieces of parameters you want to hide from `Referer`.

Author
------

(c) Yuji Kosuga 2010  
<http://blog.yujikosuga.com>  
<yuji@amberate.org>  

License 
-------

post4a.js is freely distributable under [the MIT license](http://www.opensource.org/licenses/mit-license.php).  

Usage
-----

The anchor tag becomes like this.

    <a href="{url}" class="post4a" data-postdata="{json format data}">link</a>  

How to Use
----------

*Note: Basically, please use POST requests only for executable scripts (such as PHP, CGI, JSP, ASP, etc.), because static contents (such as HTML or IMG) might refuse your POST requests saying `HTTP Error 405 Method not allowed`. If you still want to use POST methods to that content, please refer to [this article](http://vijaymodi.wordpress.com/2007/03/31/method-not-allowed-the-requested-method-post-is-not-allowed-for-the-url/).

**Import post4a.js**: Add the following line before the closing `</head>` tag.

    <script src="post4a.js"></script>  

**Declare the use of `post4a.js`**: Add `post4a` to the class of an anchor tag.

**Declare POST data**: Create a `data-postdata` attribute to the anchor tag and add the data to be POSTed in [JSON](http://www.json.org/) format into the `data-postdata` value.

Try this Sample
----
Please copy and paste the following anchor tag for checking to see HTTP parameters your browser sends. 
This anchor sends a POST message equivalent to `userid=43ec7d99d05064.98961542&lang=en`.

    <a href="http://www.yujikosuga.com/httpParams.php" 
       class="post4a" data-postdata='{"userid":"43ec7d99d05064.98961542", "lang":"en"}'>
       HTTP Environment Checker
    </a>
