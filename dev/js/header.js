const elements = {
  header: document.getElementById('appHeader'),
  burgerButton: document.getElementById('burger'),
  navPanel: document.getElementById('navPanel'),
  backdrop: document.getElementById('backdrop'),
  body: document.body,
};

export const isNavActive = () => elements.navPanel.classList.contains('app-header__nav--active');
export const toggleBurgerMenu = () => {
  elements.burgerButton.classList.toggle('burger--active');
};

export const toggleNavPanel = () => {
  elements.navPanel.classList.toggle('app-header__nav--active');
};

export const toggleBackdrop = () => {
  elements.backdrop.classList.toggle('backdrop--visible');
};

export const toggleBodyLock = () => {
  elements.body.classList.toggle('overflow');
};

export const toggleAnimation = () => new Promise((resolve) => {
  const animatedElements = document.querySelectorAll('[data-animate]');

  animatedElements.forEach((el) => {
    const animatedElement = el;
    const { animationStartName } = animatedElement.dataset;
    const { animationEndName } = animatedElement.dataset;
    const delayStart = el.dataset.delayStart * 1000;
    const delayEnd = el.dataset.delayEnd * 1000;
    const isAnimationStart = animatedElement.classList.contains(animationStartName);
    let isAnimating = false; // flag to prevent re-clicking during animation

    setTimeout(() => {
      if (!isAnimating) {
        isAnimating = true;

        if (!isAnimationStart) {
          animatedElement.classList.add(animationStartName, 'animationFinished');
        } else {
          animatedElement.classList.remove('animationFinished');
          animatedElement.classList.add(animationEndName);
        }

        // waiting for the animation end and resetting isAnimating flag
        animatedElement.addEventListener('animationend', () => {
          isAnimating = false;

          if (animatedElement.classList.contains(animationEndName)) {
            animatedElement.classList.remove(animationEndName, animationStartName);
          }

          resolve();
        }, { once: true });
      }
    }, isAnimationStart ? delayEnd : delayStart);
  });
});
export const toggleHeaderEvents = () => {
  toggleBurgerMenu();
  toggleNavPanel();
  toggleBackdrop();
  toggleBodyLock();
};

export const toggleHeaderAnimation = async () => {
  if (isNavActive()) {
    await toggleAnimation();
    toggleHeaderEvents();
  } else {
    const animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach((animatedElement) => {
      const { animationStartName } = animatedElement.dataset;
      const { animationEndName } = animatedElement.dataset;

      animatedElement.classList.remove('animationFinished', animationStartName, animationEndName);
    });

    toggleHeaderEvents();
    await toggleAnimation();
  }
};

export const handleScroll = () => {
  if (window.scrollY > 0) {
    elements.header.classList.add('app-header--background');
  } else {
    elements.header.classList.remove('app-header--background');
  }
};

export const headerInit = () => {
  [elements.burgerButton, elements.backdrop].forEach((el) => {
    el.addEventListener('click', toggleHeaderAnimation);
  });

  window.addEventListener('scroll', handleScroll);
};
