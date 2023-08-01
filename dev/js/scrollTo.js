import remToPx from './helpers';
import { isNavActive, toggleHeaderEvents } from './header';

export const scrollToInit = () => {
  const scrollButtons = document.getElementsByClassName('scroll-button-js');

  Array.from(scrollButtons).forEach((element) => {
    const root = document.querySelector(':root');
    const cs = getComputedStyle(root);
    const headerHeight = cs.getPropertyValue('--headerHeight');
    const elementTarget = document.getElementById(element.dataset.target);
    let offsetTop = 0;

    if (elementTarget) {
      offsetTop = elementTarget.offsetTop - remToPx(headerHeight);
    }

    element.addEventListener('click', (e) => {
      e.preventDefault();

      // eslint-disable-next-line no-restricted-globals
      scroll({
        top: offsetTop,
        behavior: 'smooth',
      });

      if (isNavActive()) {
        toggleHeaderEvents();
      }
    });
  });
};

export default scrollToInit;
