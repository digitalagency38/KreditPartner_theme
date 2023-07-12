import Glide from '@glidejs/glide';

const PostPage = class PostPage {
    constructor(){}
    initSlider() {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.innerWidth <= 1023) {
              new Glide('.glide', {
                type: 'carousel',
                perView: 1,
                startAt: 0,
                autoplay: 3000,

              }).mount();
            }
        });
    }
    init() {
        this.initSlider();
    }
}

export default PostPage;