import Glide from '@glidejs/glide';

const MainNews = class MainNews {
    constructor(){}
    initSlider() {
      document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 1023) {
          const glideElement = document.querySelector('.news_glide_js');
          if (glideElement) {
            new Glide(glideElement, {
              type: 'carousel',
              perView: 1,
              startAt: 0,
              gap: 40,
              breakpoints: {
                1024: {
                  perView: 2
                },
                520: {
                  perView: 1
                }
              }
            }).mount();
          }
        }
      });
    }    
    init() {
        this.initSlider();
    }
}

export default MainNews;