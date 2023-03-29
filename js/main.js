jQuery(document).ready(function(){
    $('.nav > li').mouseover(function(){
        $(this).find('.nav_in').stop().slideDown(500);
    }).mouseout(function(){
        $(this).find('.nav_in').stop().slideUp(500);
    });
});
