$(document).ready(function() {
        function moveMapToContactInfo() {
            // Находим родительский элемент "contact_page__info"
            const contactInfo = $(this).find('.contact_page__info');

            // Находим элемент "map-block"
            const mapBlock = $('#map');

            // Перемещаем "map-block" внутрь "contact_page__info"
            contactInfo.append(mapBlock);
        }

        function attachClickHandlers() {
            // Находим все элементы с классом "map-link"
            const mapLinks = $('.map-link');

            // Обработчик события "click" для всех элементов с классом "map-link"
            mapLinks.on('click', moveMapToContactInfo);
        }

        // При загрузке страницы назначаем обработчики для ссылок
        attachClickHandlers();

        // Проверяем ширину экрана при загрузке и при изменении размера окна
        $(window).on('load resize', function() {
            if ($(window).width() <= 1023) {
                attachClickHandlers(); // Назначаем обработчики для ссылок на устройствах с шириной <= 1023px
            } else {
                // Если ширина экрана больше 1023px, удаляем обработчики "click" для всех элементов с классом "map-link"
                $('.map-link').off('click', moveMapToContactInfo);
            }
        });
    });