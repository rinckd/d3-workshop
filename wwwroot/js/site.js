// site.js

(function () {

  var $sidebarAndWrapper = $('#sidebar,#wrapper');
  var $icon = $('#sidebarToggle i.fa');

  $('#sidebarToggle').on('click', function () {
    $sidebarAndWrapper.toggleClass('hide-sidebar');
    if ($sidebarAndWrapper.hasClass('hide-sidebar')) {
      $icon.removeClass('fa-angle-left');
      $icon.addClass('fa-angle-right');
    } else {
      $icon.addClass('fa-angle-left');
      $icon.removeClass('fa-angle-right');
    }
  });


  var links = [ {'url':'index.html', 'title':'Intro to SVG'} , {'url':'tree.html', 'title':'Trees' },
    {'url':'surface4.html', 'title':'Heat Maps'} ];

  getPosts(links);

  function getPosts(data) {
    var $output = $('<div>');
    $.each(data,function(i, val) {
      $output.append('<a class="navlink" href=' + val.url +'>' + val.title + '</a><br>');
    });
    $output.append('</div>');
    $('#navlinks').empty().append($output);
  }


})();