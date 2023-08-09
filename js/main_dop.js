$(document).ready(function() {
$('#slidemenu1').waSlideMenu({
  autoHeightMenu: false,
  backOnTop: true,
  backLinkContent: 'Back please',
    onSlideForward : function(){
		$('.waSlideMenu-wrapper').removeClass('closed');
		
    },
	onInit: function(){
		$('#slidemenu1').find('.menu-item-has-children > a').on('click', function() {
			var menuTitle = $('#menu-osnovnoe-menyu-1 .menu-item-has-children > a').text();
			$(this).parents('.menu-item-has-children').find('.sub-menu > .waSlideMenu-back a').text(menuTitle);
		})
	},
	onSlideBack : function(){
		$('.waSlideMenu-wrapper').addClass('closed')
	}
});
    // Инициализируем плагин styler
    $('select').styler();

    // Обработчик события change для select
    $('#serv_select_js').change(function() {
        var selectedTabId = $(this).find(':selected').data('tab');
        $('.tab-content').removeClass('active'); // Скрываем все табы
        $('#' + selectedTabId).addClass('active'); // Показываем выбранный таб
    });
	$(".submenu li:not(.isActive)").on("click", function() {
		if ($(this).hasClass("isActive")) {
			$(this).removeClass("isActive");
			$('.main_map__menu').removeClass('isShow');
		} else {
			$(".submenu li").removeClass("isActive");
			$(this).addClass("isActive");
			$('.main_map__menu').removeClass('isShow');
		}
	});
  	$(".submenu li:first-child").trigger("click");
	$('.main_map__trigger').on('click', function() {
		$('.main_map__menu').toggleClass('isShow');
	});
	$('#raschet').appendTo($('.spec_calc__in'));
});
