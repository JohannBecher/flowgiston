/* Author:
  Charles F. Munat
*/

$(function() {
  $('span.at').html('@');
  $('span.grizmo').each(function(index) {
    var t = $(this).text().trim();
    $(this).html("<a href='mailto:" + t + "'>" + t + "</a>");
  });
  
  var toggleAnswer = function(id) {
    $('#' + id + 'a').slideToggle(400);
  };
  
  $('dl.faq dd').hide();
  $('dl.faq dt').click(function(x) {
    toggleAnswer($(this).attr('id'));
    return false;
  });
  
  var showPage = function(lnk, hsh) {
    console.log("showPage with lnk = "); console.log(lnk);
    console.log("and hsh = "); console.log(hsh);
    pagehash = window.location.hash = hsh;
    $('#navbar li a').removeClass('currentPage');
    $('#footer p.f_links a').removeClass('currentPage');
    $('[href='+pagehash+']').addClass('currentPage');
    $('.section').hide();
    console.log($(hsh));
    $(hsh).fadeIn(500);
  };
  
  var pagehash = window.location.hash || '#home';
  showPage($('a[href=' + pagehash + ']'), pagehash);
  
  $('#logo').click(function() { showPage($('a[href=#home]'), '#home') });
  
  $('#navbar li a').click(function(x) {
    showPage($(this), $(this).attr('href'));
    return false;
  });
  
  $('#footer p.f_links a').click(function(x) {
    showPage($(this), $(this).attr('href'));
    return false;
  });
});
