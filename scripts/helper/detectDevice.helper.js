/* ======================================== *\

  Detect Device
  by using Twitter Bootstrap Classes

  add html in index:
  <div class="detect_device">
    <div data-device="mobile" class="visible-xs"></div>
    <div data-device="tablet" class="visible-sm visible-md"></div>
    <div data-device="desktop" class="visible-lg"></div>
  </div>

\* ======================================== */
var DetectDeviceHelper = function(){
  this.$div = jQuery('.detect_device div:visible');
};

DetectDeviceHelper.prototype.init = function(){
	var device = this.$div.attr('data-device');

	$('body').addClass( device );
};