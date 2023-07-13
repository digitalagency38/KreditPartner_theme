import $ from 'jquery';
import 'slick-carousel';

const MainPost = class MainPost {
    constructor(){}
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.innerWidth <= 1023) {
              $('.js_main_post').slick({
                slidesToShow: 2,
                arrows: false,
                customPaging: '20',
                slidesToScroll: 1,
                responsive: [
                  {
                    breakpoint: 768,
                    settings: {
                      variableWidth: true
                    }
                  }
                ]
              });
            }
        });
    }
    init() {
        this.initSlider();
    }
}

export default MainPost;