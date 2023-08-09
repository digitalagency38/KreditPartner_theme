$(document).ready(function() {
    $('#responsiveTabsDemo').responsiveTabs();
    $('.ques_block__title').on('click', function() {
        $(this).parent().toggleClass('isActive');
    })
});