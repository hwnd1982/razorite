export const
  makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction),
  square = timeFraction => Math.pow(timeFraction, 2),
  animate = ({ duration, draw, timing }) => {
    const
      start = performance.now(),
      requestID = requestAnimationFrame(function animate(time) {
        const
          timeFraction = (time - start) / duration,
          progress = timing(timeFraction > 1 ? 1 : timeFraction),
          stop = draw(progress);

        if (timeFraction < 1 && !stop)
          return requestAnimationFrame(animate);

        cancelAnimationFrame(requestID);
      });
  };
