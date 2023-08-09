$(document).ready(function () {
        let yaMap = null;

        function initMap() {
            yaMap = new ymaps.Map("map", {
                center: [52.036616, 113.490943],
                zoom: 7,
                controls: [
                    "zoomControl",
                ]
            });
            yaMap.behaviors.disable("scrollZoom");

            <?php foreach ($marks as $mark): ?>
                const coords = [<?php echo $mark['coords'][0] . ', ' . $mark['coords'][1]; ?>];
                const placemark = new ymaps.Placemark(coords, {
                    hintContent: "<?php echo $mark['content']; ?>",
                    hasBalloon: false
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: './img/favicon.svg',
                    iconImageSize: [32, 32],
                    iconImageOffset: [-16, -16],
                });
                placemark.events.add(["click"], function () {
                    yaMap.setCenter(coords, 18, { duration: 1000 });
                });
                yaMap.geoObjects.add(placemark);
            <?php endforeach; ?>
        }

        window.getYaMap = initMap;
        setTimeout(function () {
            const elem = document.createElement('script');
            elem.type = 'text/javascript';
            elem.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=getYaMap';
            document.getElementsByTagName('body')[0].appendChild(elem);
        }, 3000);

        $(".map-link").on("click", function (e) {
            e.preventDefault();
            const coords = $(this).data("coords").split(",");
            yaMap.setCenter(coords, 18, { duration: 1000 });
        });
    });