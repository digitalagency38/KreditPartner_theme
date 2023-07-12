import Glide from '@glidejs/glide';

const FirstBlock = class FirstBlock {
    constructor() { }
    
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
          const glideCount = document.querySelector('.glide__count');
          const glide = new Glide('.first_glide_js', {
            type: 'carousel',
            perView: 1,
            gap: 0,
            startAt: 0
          });
      
          const updateGlideCount = () => {
            const currentSlide = glide.index + 1;
            glideCount.textContent = `${currentSlide}`;
          };
      
          glide.on(['mount.after', 'run'], updateGlideCount);
      
          glide.mount();
        });
    }
      
    
    init() {
        this.initSlider();
    }
}

export default FirstBlock;
