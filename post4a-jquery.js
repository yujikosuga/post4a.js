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
$(document).ready(function() {
	var CLASSNAME = 'post4a';
	var POSTDATA = 'data-postdata';
	$('.' + CLASSNAME).each(function() {
		$(this).click(function(event) {
	 		event.preventDefault();
	 		var postData = $.parseJSON($(this).attr(POSTDATA));
			var form = $('<form>').hide().attr({
				'method':'POST', 
				'action': this['href']
			}).appendTo($(this).parent());			
			for ( var key in postData) {
				$('<input>').clone(true).attr({
					'name' : key,
					'value' : postData[key]
				}).appendTo($(form));
			}
			$(form).submit();
		});
	});
});
