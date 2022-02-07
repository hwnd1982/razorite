const share = swiper => {
  const
    title = document.head.querySelector('title').textContent,
    desc =
        'BMW Vision Efficient Dynamics, BMW i8 — автомобиль компании BMW.' +
        'Концепт-кар был представлен в 2009 году,' +
        'первый серийный образец — на Франкфуртском автосалоне в сентябре 2013 года';

  const openDialog = url => {
    const
      width = 600,
      height = 400,
      left = Math.floor((innerWidth - width) / 2),
      top = Math.floor((innerHeight - height) / 2);

    window.open(url, 'example', `left=${left},top=${top},width=${width},height=${height},location=no`);
  };

  document.getElementById('vk').addEventListener('click', () => {
    const
      img = swiper.slides[swiper.activeIndex].firstElementChild.getAttribute('src'),
      url = new URL(`http://vk.com/share.php?url=${location}&title=${title}&description=${desc}&image=${img}`);

    openDialog(url);
  });

  document.getElementById('facebook').addEventListener('click', () => {
    const url = new URL(`http://www.facebook.com/sharer.php?u=${location}`);

    openDialog(url);
  });

  document.getElementById('odnoklassniki').addEventListener('click', () => {
    const
      img = swiper.slides[swiper.activeIndex].firstElementChild.getAttribute('src'),
      url = new URL(`https://connect.ok.ru/offer?url=${location}&title=${title}&description=${desc}&imageUrl=${img}`);

    openDialog(url);
  });
};

export default share;
