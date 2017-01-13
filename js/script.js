$(document).ready(function(){
  console.log('Hello World! MAMA!');
});
$(document).ready(function(){}),$(document).ready(function(){var d=$(".detect_device div:visible").attr("data-device");$("body").addClass(d),$("p").text("detected dreakpoint width: "+d)});
$(document).ready( function(){
  var device = $('.detect_device div:visible').attr('data-device');
  $('body').addClass( device );
  
  $('p').text( 'detected dreakpoint width: ' + device );
} );