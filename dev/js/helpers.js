const remToPx = (value) => {
  const CONTEXT = 16;

  return +value.replace(/[^\d.-]/g, '') * CONTEXT;
};

export default remToPx;
