// post4a.js - POST for Anchor
// JavaScript for sending a POST HTTP request with an HTML anchor tag
//
// (c) Yuji Kosuga 2010 http://blog.yujikosuga.com
// post4a.js is freely distributable under the MIT license 
// <http://www.opensource.org/licenses/mit-license.php>.
//
// The usage example of post4s.js
// <a href="{url}" class="post4a" data-postdata="{json format data}">link</a>  
//
function post4a() {
    // The class name for the use of post4a.js. An anchor tag to be POSTed
    // requires this class name.
    var CLASSNAME = 'post4a';

    // The attribute name for the data to be POSTed. The value of this attribute
    // should be in JSON format.
    var POSTDATA = 'data-postdata';

    var elems = document.getElementsByClassName(CLASSNAME);
    for ( var i = 0; i < elems.length; i++) {

	// Override the default onclick function.
	elems[i]['onclick'] = function() {
	    var postData = JSON.parse(this.getAttribute(POSTDATA));
	    var form = document.createElement('form');
	    form['method'] = 'POST';
	    form['action'] = this['href'];

	    // Creates <input> tags for the data to be POSTed.
	    var inputTemp = document.createElement('input');
	    for ( var key in postData) {
		var input = inputTemp.cloneNode(true);
		input['name'] = key;
		input['value'] = postData[key];
		form.appendChild(input);
	    }

	    // For the debug use, the following line adds a newly created form
	    // to the anchor's parent node.
	    // this.parentNode.appendChild(form);
	    form.submit();

	    // Deactivate the default onclick event.
	    return false;
	};
    }
}
// Attach post4a to window.onload.
(function(func) {
    if (window.addEventListener) // for W3C DOM
	window.addEventListener('load', func, false);
    else if (window.attachEvent) // for IE
	window.attachEvent('onload', func);
    else
	window.onload = func;
})(post4a);
