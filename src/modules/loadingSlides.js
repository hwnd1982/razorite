import fetching from './fetching';
import Service from './service';
import setLikeCount from './setLikeCounter';

let isLoading = false;
let initSliders = (swiperImg, swiperTitle, swiperDesc) => {
  const likeCount = document.getElementById('like-count');
  const likeBtn = document.getElementById('like-button');
  const popUpOverlay = document.getElementById('pop-up-overlay');
  const popUp = document.getElementById('pop-up');
  const popUpTitle = document.getElementById('pop-up-title');
  const popUpDesc = document.getElementById('pop-up-desc');
  const social = document.getElementById('social');

  const setLike = fetching(async () => {
    if (!window.liked.has(window.likeCnt[swiperImg.activeIndex].id)) {
      const response = await (await Service.setLike({ id: window.likeCnt[swiperImg.activeIndex].id })).json();

      popUpTitle.textContent = response.title;
      popUpDesc.textContent = response.desc;
      likeBtn.classList.add('active');
      window.liked.add(window.likeCnt[swiperImg.activeIndex].id);
      localStorage.setItem('liked', JSON.stringify([...window.liked]));
    } else {
      popUpTitle.textContent = popUpTitle.dataset.title;
      popUpDesc.textContent = popUpDesc.dataset.desc;
    }

    popUpOverlay.classList.add('active');
    popUp.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  swiperImg.wrapperEl.classList.remove('hidden');
  swiperTitle.wrapperEl.classList.remove('hidden');
  swiperDesc.wrapperEl.classList.remove('hidden');
  social.classList.remove('hidden');
  likeCount.classList.remove('disable');
  likeBtn.classList.remove('disable');
  popUp.classList.add('init');
  setLikeCount(swiperImg.activeIndex);

  document.getElementById('like-button').addEventListener('click', async () => {
    await setLike();
    setLikeCount(swiperImg.activeIndex);
  });
  popUpOverlay.addEventListener('click', ({ target }) => {
    if (!target.matches('.overlay') && !target.closest('#pop-up-close')) return;

    popUpOverlay.classList.remove('active');
    popUp.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
};

const loadingSlides = ({ swiperImg, swiperTitle, swiperDesc }) => {
  const getNextSlids = fetching(async () => {
    if (isLoading) return;

    isLoading = true;
    const img = [], title = [], desc = [];
    const response = await (await Service.getSlides(window)).json();

    window.countAll = response.countAll;
    response.data.forEach(slide => {
      const slideEl = document.createElement('div');
      const imgEl = document.createElement('img');
      const showLoadedImg = ({ target }) => {
        if (initSliders) {
          initSliders(swiperImg, swiperTitle, swiperDesc);
          initSliders = null;
        }
        target.classList.remove('hidden');
        target.removeEventListener('load', showLoadedImg);
      };
      const showСover = ({ target }) => {
        if (initSliders) {
          initSliders(swiperImg, swiperTitle, swiperDesc);
          initSliders = null;
        }
        target.parentElement.classList.add('non-loaded');
        target.removeEventListener('load', showСover);
      };
      slideEl.className = 'swiper-slide swiper-slide-img';
      slideEl.id = `img-${slide.id}`;
      imgEl.className = 'hidden';
      imgEl.addEventListener('load', showLoadedImg);
      imgEl.addEventListener('error', showСover);
      imgEl.setAttribute('src', slide.imgUrl);
      imgEl.setAttribute('alt', slide.title);
      slideEl.append(imgEl);
      img.push(slideEl);

      title.push(
        `
          <div id="title-${slide.id}" class="swiper-slide swiper-slide-title">
            <h1 data-title="${slide.title}" class="swiper-title">${slide.title}</h1>
          </div>
        `
      );
      desc.push(
        `
          <div id="desc-${slide.id}" class="swiper-slide swiper-slide-desc">
            <p data-title="${slide.desc}">${slide.desc}</p>
          </div>
        `
      );

      window.likeCnt.push({ id: slide.id, count: slide.likeCnt });
    });

    swiperImg.appendSlide(img);
    swiperTitle.appendSlide(title);
    swiperDesc.appendSlide(desc);
    swiperDesc.slides[swiperImg.activeIndex].classList.add('swiper-slide-desc-active');

    if (swiperImg.el.querySelector('.swiper-slide-img-next'))
      document.querySelector('.swiper-button-next').classList.remove('swiper-button-disabled');
    else {
      document.querySelector('.swiper-button-next').classList.add('swiper-button-disabled');
    }

    window.offset += window.offset < window.countAll && 3;
    isLoading = false;
  });

  getNextSlids();
};

export default loadingSlides;
