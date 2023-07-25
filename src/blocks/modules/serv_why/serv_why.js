import $ from 'jquery';
import 'slick-carousel';

const ServWhy = class ServWhy {
    constructor(){}
    initWhy() {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.innerWidth <= 1023) {
              $('.js_serv_why').slick({
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
        this.initWhy();
    }
}

export default ServWhy;