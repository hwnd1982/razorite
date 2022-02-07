const fetching = callback => {
  const
    fetching = async () => {
      try {
        await callback();
      } catch (err) {
        document.getElementById('message').textContent = 'error';
      }
    };

  return fetching;
};

export default fetching;
