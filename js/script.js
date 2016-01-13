$(function(){

    history.pushState('', '', '');

    var hidePages = function() {
        $('.page').hide();
    };

    var desideitems = function() {
        $('.sideitem').removeClass('on');
    }

    var sideitem = function(page) {
        selector = "[data-page='" + page + "']";
        $('.sideitem').filter(selector).addClass('on');
    }

    $('.mi,.sideitem').click(function (e) {
        var page = $(e.currentTarget).data('page');
        desideitems();
        sideitem(page);
        if (page === 'source') {
            window.open("https://github.com/jrwdunham/dative", '_blank');
        } else {
            e.stopPropagation();
            showPage(page);
            history.pushState(page, '', page);
        }
    });

    var showPage = function (page) {
        hidePages();
        if (page) {
            $('#' + page).show();
        } else {
            $('#about').show();
        }
    }

    $('#logo, #titlebar').click(function() {
        desideitems();
        hidePages();
        $('#about').show();
        history.pushState('', '', '/');
    });

    $('.faq-q').click(function(e) {
        $q = $(e.currentTarget);
        $a = $q.next('.faq-a');
        if ($a.is(':visible')) {
            $a.slideUp();
        } else {
            $a.slideDown();
        }
    });

    $('.faq-show-all').click(function() {
        $('.faq-a').slideDown();
    });

    $('.faq-hide-all').click(function() {
        $('.faq-a').slideUp();
    });

    window.addEventListener('popstate', function(e) {
        desideitems();
        sideitem(e.state);
        showPage(e.state);
    });

    var resize = function() {
        $('#content').css('min-height', window.innerHeight);
    }

    window.addEventListener('resize', function(e) {
        resize();
    });

    // Here we detect when the user is navigating to a specific "page" and so
    // we display that "page". Note that this requires the server to route
    // requests to /apps, /doc, etc. to /.
    var path = window.location.pathname;
    pages = ['/faq', '/getstarted', '/addingupdating', '/searching'];
    if (pages.indexOf(path) !== -1) {
        desideitems();
        page = path.replace('/', '');
        sideitem(page);
        showPage(page);
    }

    $('a.me').click(function(e) {
        var name = 'jrwdunham';
        var domain = 'gmail';
        var tld = 'com';
        $(e.currentTarget).text(name + '@' + domain + '.' + tld);
    });

});

