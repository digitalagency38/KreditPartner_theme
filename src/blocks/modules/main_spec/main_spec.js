import Glide from '@glidejs/glide';

const MainSpec = class MainSpec {
    constructor(){}
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.innerWidth <= 1023) {
              new Glide('.spec_glide_js', {
                type: 'carousel',
                perView: 1,
                startAt: 0,
                gap: 40,
                autoplay: 3000,
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
        });
    }
    init() {
        this.initSlider();
    }
}

export default MainSpec;