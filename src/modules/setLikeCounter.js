import { animate, makeEaseOut, square } from "./animation";

const
  animateCounter = (elem, values) => {
    const
      draw = progress => {
        if (values === +elem.textContent)
          return true;

        elem.textContent = Math[(values > +elem.textContent ? 'ceil' : 'floor')](
          +elem.textContent + progress * (values - elem.textContent));
      };

    animate({
      duration: 2000,
      timing: makeEaseOut(square),
      draw
    });
  },

  setLikeCounter = index => {
    const { count, id } = window.likeCnt[index];
    const likeCount = document.getElementById('like-count');
    const likeBtn = document.getElementById('like-button');
    animateCounter(likeCount, count + +window.liked.has(id));
    window.liked.has(id) ? likeBtn.classList.add('active') : likeBtn.classList.remove('active');
  };

export default setLikeCounter;
