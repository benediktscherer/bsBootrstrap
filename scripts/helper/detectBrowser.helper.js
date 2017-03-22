var DetectBrowserHelper = function () {

};


/**
 * Opera 8.0+
 * @returns {boolean}
 */
DetectBrowserHelper.prototype.isOpera = function(){
	return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
};

/**
 * Firefox 1.0+
 * @returns {boolean}
 */
DetectBrowserHelper.prototype.isFirefox = function(){
	return typeof InstallTrigger !== 'undefined';
};

/**
 * Safari 3.0+ "[object HTMLElementConstructor]"
 * @returns {boolean}
 */
DetectBrowserHelper.prototype.isSafari = function(){
	return /constructor/i.test(window.HTMLElement) || (function (p) {
			return p.toString() === "[object SafariRemoteNotification]";
		})(!window['safari'] || safari.pushNotification);
};

/**
 * Internet Explorer 6-11
 * @returns {boolean}
 */
DetectBrowserHelper.prototype.isIE = function(){
	return /*@cc_on!@*/false || !!document.documentMode;
};

/**
 * Edge 20+
 * @returns {boolean}
 */
DetectBrowserHelper.prototype.isEdge = function(){
	return !this.isIE && !!window.StyleMedia;
};

/**
 * Chrome 1+
 * @returns {boolean}
 */
DetectBrowserHelper.prototype.isChrome = function(){
	return !!window.chrome && !!window.chrome.webstore;
};

/**
 * Blink engine detection
 * @returns {*|boolean}
 */
DetectBrowserHelper.prototype.isBlink = function(){
	return (this.isChrome || this.isOpera) && !!window.CSS;
};