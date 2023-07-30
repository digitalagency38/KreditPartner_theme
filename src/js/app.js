import * as globalFunctions from './modules/functions.js';
globalFunctions.isWebp();

import Vue from 'vue/dist/vue.js';
import $ from 'jquery';

import Header from '../blocks/modules/header/header.js';
import FirstBlock from '../blocks/modules/first_block/first_block.js';
import MainSpec from '../blocks/modules/main_spec/main_spec.js';
import MainNews from '../blocks/modules/main_news/main_news.js';
import MainPost from '../blocks/modules/main_post/main_post.js';
import ServProg from '../blocks/modules/serv_program/serv_program.js';
import ServZaym from '../blocks/modules/serv_zaym/serv_zaym.js';
import ServDop from '../blocks/modules/serv_dop/serv_dop.js';
import ServWhy from '../blocks/modules/serv_why/serv_why.js';
import PostPage from '../blocks/modules/post_page/post_page.js';
import AboutPage from '../blocks/modules/about_page/about_page.js';
import Modals from '../blocks/modules/modals/modals.js';

window.app = new Vue({
    el: '#app',
    data: () => ({
        isMounted: false,
        sizes: {
            tablet: 1024,
            mobile: 768,
            window: window.innerWidth
        },
        header: new Header({
            isMobileMenuOpened: false,
        }),
        firstBlock: new FirstBlock(),
        mainSpec: new MainSpec(),
        mainNews: new MainNews(),
        mainPost: new MainPost(),
        servProg: new ServProg(),
        servZaym: new ServZaym(),
        servDop: new ServDop(),
        servWhy: new ServWhy(),
        postPage: new PostPage(),
        aboutPage: new AboutPage(),
        modals: new Modals({
            modalsSelector: "data-modal",
            modalsOpenerSelector: "data-modal-id",
            openedClass: "isOpened"
        })
    }),
    beforeCreate() {        
        window.addEventListener('resize', () => {
            this.sizes.window = window.innerWidth;
        });
    },
    beforeMount() {
        this.isMounted = true;
        this.header.init();
        this.firstBlock.init();
        this.mainSpec.init();
        this.mainNews.init();
        this.mainPost.init();
        this.servProg.init();
        this.servZaym.init();
        this.servDop.init();
        this.servWhy.init();
        this.postPage.init();
        this.aboutPage.init();
        this.modals.init();
    },
    computed: {
        isMobile: function () {
            return this.sizes.window < this.sizes.mobile;
        },
        isTablet: function () {
            return this.sizes.window < this.sizes.tablet && this.sizes.window > this.sizes.mobile;
        }
    },
});