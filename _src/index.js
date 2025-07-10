// CSS and SASS files
import './index.scss';

import Tobi from '@midzer/tobii';
import FloatingPrompt from 'producthunt-floating-prompt';
import Darkmode from 'darkmode-js';

// Initialize Tobi for image lightbox functionality
// eslint-disable-next-line no-unused-vars
const tobi = new Tobi();

// Remove the two following lines to remove the product hunt floating prompt
FloatingPrompt({
  name: 'Mobile App Landing Page',
  url: 'https://www.producthunt.com/posts/mobile-app-landing-page',
  bottom: '96px',
  width: '450px',
});

// Remove the following lines to remove the darkmode js
const addDarkmodeWidget = () => {
  new Darkmode().showWidget();
};

// eslint-disable-next-line no-undef
window.addEventListener('load', addDarkmodeWidget);
