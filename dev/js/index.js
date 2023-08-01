import { headerInit } from './header';
import scrollToInit from './scrollTo';
import phoneMaskInit from './phoneMask';

window.addEventListener('load', () => {
  headerInit();
  scrollToInit();
  phoneMaskInit();
});
