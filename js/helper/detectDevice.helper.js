$(document).ready( function(){
  var device = $('.detect_device div:visible').attr('data-device');
  $('body').addClass( device );
  
  $('p').text( 'detected dreakpoint width: ' + device );
} );