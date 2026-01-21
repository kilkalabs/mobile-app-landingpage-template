// CSS and SASS files
import './index.scss';

// Lazy-initialize Tobii lightbox on first interaction
// This reduces initial JS execution time and improves TBT
let tobiInstance = null;

const initTobii = async () => {
  if (tobiInstance) return tobiInstance;

  const { default: Tobi } = await import('@midzer/tobii');
  tobiInstance = new Tobi();
  return tobiInstance;
};

// Pre-initialize on first user interaction (hover/focus) for better UX
document.querySelectorAll('.lightbox').forEach((element) => {
  element.addEventListener('mouseenter', () => initTobii(), { once: true });
  element.addEventListener('focus', () => initTobii(), { once: true });
});

// Ensure Tobii is ready when clicking a lightbox
document.addEventListener('click', async (e) => {
  const lightbox = e.target.closest('.lightbox');
  if (lightbox) {
    e.preventDefault();
    await initTobii();
    // Tobii auto-attaches to .lightbox elements, re-trigger click
    lightbox.click();
  }
}, { once: true });
