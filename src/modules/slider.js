import Swiper, { Navigation, Manipulation, EffectCreative } from 'swiper';
import loadingSlides from './loadingSlides';
import setLikeCount from './setLikeCounter';

const slider = () => {
  const state = { isNext: true, isPrev: false, speed: 1200 };
  const setState = () => setTimeout(() => state.speed = innerWidth <= 470 ? 600 : 1200, 0);

  const swiperImg =   new Swiper('.swiper', {
    allowTouchMove: false,
    wrapperClass: 'swiper-wrapper-img',
    slideClass: 'swiper-slide-img',
    slideNextClass: 'swiper-slide-img-next',
    slidePrevClass: 'swiper-slide-img-prev',
    slideActiveClass: 'swiper-slide-img-active',
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-45%", 0, -1],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    centeredSlides: true,
    initialSlide: 0,
    spaceBetween: 0,
    speed: state.speed,
    modules: [Navigation, Manipulation, EffectCreative],
  });

  const swiperTitle =   new Swiper('.swiper', {
    allowTouchMove: false,
    wrapperClass: 'swiper-wrapper-title',
    slideClass: 'swiper-slide-title',
    slideNextClass: 'swiper-slide-title-next',
    slidePrevClass: 'swiper-slide-title-prev',
    slideActiveClass: 'swiper-slide-title-active',
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-65%", 0, 0],
        opacity: 0
      },
      next: {
        translate: ["55%", 0, -1],
        opacity: 0
      },
    },
    centeredSlides: true,
    initialSlide: 0,
    spaceBetween: 0,
    speed: state.speed,
    modules: [Navigation, Manipulation, EffectCreative],
  });

  const swiperDesc =   new Swiper('.swiper', {
    allowTouchMove: false,
    wrapperClass: 'swiper-wrapper-desc',
    slideClass: 'swiper-slide-desc',
    initialSlide: 0,
    modules: [Manipulation]
  });

  document.querySelector('.swiper-buttons').addEventListener('click', ({ target, currentTarget }) => {
    const prevImg = swiperImg.el.querySelector('.swiper-slide-img-prev');
    const activeImg = swiperImg.el.querySelector('.swiper-slide-img-active');
    const nextImg = swiperImg.el.querySelector('.swiper-slide-img-next');
    const slidesImg = [...swiperImg.el.querySelectorAll('.swiper-slide-img')];

    if (target.closest('.swiper-button-prev')) {
      if (state.isNext && prevImg) {
        swiperImg.params.creativeEffect.prev.translate = ["-100%", 0, 0];
        swiperImg.params.creativeEffect.next.translate = ["45%", 0, -1];
        swiperTitle.params.creativeEffect.prev.translate = ["-55%", 0, -1];
        swiperTitle.params.creativeEffect.next.translate = ["65%", 0, 0];

        slidesImg.forEach(slide => slide.style.cssText = '');
        swiperImg.addSlide(swiperImg.activeIndex, prevImg, activeImg);
        swiperImg.updateSlides(state.speed);

        state.isNext = false;
        state.isPrev = true;
      }

      swiperDesc.slides[swiperImg.activeIndex].classList.remove('swiper-slide-desc-active');
      swiperImg.slidePrev(state.speed);
      swiperTitle.slidePrev(state.speed);
      swiperDesc.slides[swiperImg.activeIndex].classList.add('swiper-slide-desc-active');
      setLikeCount(swiperImg.activeIndex);
    }
    if (target.closest('.swiper-button-next')) {
      if (state.isPrev && nextImg) {
        swiperImg.params.creativeEffect.prev.translate = ["-45%", 0, -1];
        swiperImg.params.creativeEffect.next.translate = ["100%", 0, 0];
        swiperTitle.params.creativeEffect.prev.translate = ["-65%", 0, 0];
        swiperTitle.params.creativeEffect.next.translate = ["55%", 0, -1];

        slidesImg.forEach(slide => slide.style.cssText = '');
        swiperImg.addSlide(swiperImg.activeIndex + 1, activeImg, nextImg);
        swiperImg.updateSlides(state.speed);

        state.isNext = true;
        state.isPrev = false;
      }

      swiperDesc.slides[swiperImg.activeIndex].classList.remove('swiper-slide-desc-active');
      swiperTitle.slideNext(state.speed);
      swiperImg.slideNext(state.speed);
      swiperDesc.slides[swiperImg.activeIndex].classList.add('swiper-slide-desc-active');
      setLikeCount(swiperImg.activeIndex);
    }
    if (swiperImg.el.querySelector('.swiper-slide-img-prev'))
      currentTarget.firstElementChild.classList.remove('swiper-button-disabled');
    else {
      currentTarget.firstElementChild.classList.add('swiper-button-disabled');
    }

    if (swiperImg.el.querySelector('.swiper-slide-img-next'))
      currentTarget.lastElementChild.classList.remove('swiper-button-disabled');
    else {
      currentTarget.lastElementChild.classList.add('swiper-button-disabled');
      if (window.offset < window.countAll)
        loadingSlides({ swiperImg, swiperTitle, swiperDesc });
    }
  });

  setState();
  window.addEventListener('resize', setState);

  return { swiperImg, swiperTitle, swiperDesc };
};

export default slider;
