// post4a.js - POST for Anchor
// JavaScript for sending a POST request with an HTML anchor tag
//
// (c) Yuji Kosuga 2010 http://blog.yujikosuga.com
// post4a.js is freely distributable under the MIT license 
// <http://www.opensource.org/licenses/mit-license.php>.
//
// The usage example of post4s.js
// <a href="{url}" class="post4a" data-postdata="{json format data}">link</a>  
//
var post4a = {
    // The class name for the use of post4a.js. An anchor tag to be POSTed
    // requires this class name.
    CLASSNAME : 'post4a',

    // The attribute name for the data to be POSTed. The value of this attribute
    // should be in JSON format.
    POSTDATA : 'data-postdata',

    // Add a post4a 'onclick' event listener to each anchor that has 'post4a'
    // class.
    attach : function() {
	var post4aElems = _getElementsByClassName(post4a.CLASSNAME);
	for ( var i = 0; i < post4aElems.length; i++)
	    post4a.addEvent(post4aElems[i], 'click', post4a.submit);

	function _getElementsByClassName(classname) {
	    var elems = new Array();
	    if (document.getElementsByClassName) // For W3C DOM
		elems = document.getElementsByClassName(classname);
	    else { // For IE
		var nodes = document.all;
		for ( var i = 0; i < nodes.length; i++) {
		    var node = nodes[i];
		    if (node.className == classname)
			elems.push(node);
		}
	    }
	    return elems;
	}
    },

    submit : function(event) {
	preventDefaultEvent(event);
	var postData = jsonParse(this.getAttribute(post4a.POSTDATA));
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

	// Firefox requires a form to be attached on the document.
	// We make the newly created form invisible.
	form['style']['display'] = 'none';
	this.parentNode.appendChild(form);

	form.submit();

	// Deactivate the default event.
	function preventDefaultEvent(event) {
	    if (event.preventDefault) {// For W3C DOM
		event.preventDefault();
	    } else { // For IE
		event.returnValue = false;
	    }
	}

	// Return JSON value of the specified JSON format string.
	function jsonParse(data) {
	    try {
		if (window.JSON) // For browsers that have Native JSON
		    return window.JSON.parse(data);
	    } catch (e) {
		;
	    }
	    // For old browsers
	    if (/^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(
		    /(?:^|:|,)(?:\s*\[)+/g, "")))
		return (new Function("return " + data))();
	    return '';
	}
    },

    // Although this addEvent function does not have any depenency to this class
    // so can be globally used, it is defined in this post4a class not to
    // pollute the global namespace.
    addEvent : function(node, type, handler) {
	if (document.addEventListener) // For W3C DOM
	    node.addEventListener(type, handler, false);
	else if (document.attachEvent) // For IE
	    node.attachEvent('on' + type, function(event) {
		handler.call(node, event);
	    });
	else { // For older browsers
	    var _handler = node['on' + type];
	    node['on' + type] = function(event) {
		if (_handler)
		    _handler.call(node, event || window.event);
		handler.call(node, evt);
	    };
	}
    }
};
// Attach post4a to window.onload.
(function() {
    post4a.addEvent(window, 'load', post4a.attach);
})();
