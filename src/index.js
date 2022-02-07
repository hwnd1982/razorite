import "regenerator-runtime/runtime";
import './index.html';
import './fonts/NoirPro/stylesheet.css';
import './css/normalize.css';
import './css/style.css';
import './sass/style.sass';
import slider from './modules/slider';
import loadingSlides from "./modules/loadingSlides";
import share from "./modules/share";

window.offset = 0;
window.likeCnt = [];
window.liked = new Set(JSON.parse(localStorage.getItem('liked')));

const swiper = slider();
loadingSlides(swiper);
share(swiper.swiperImg);
