// CSS and SASS files
import './index.scss';

// Lazy-initialize Tobii lightbox on first interaction
// This reduces initial JS execution time and improves TBT
let tobiInstance = null;
let isInitializing = false;

const initTobii = async () => {
  if (tobiInstance) return tobiInstance;
  if (isInitializing) return null;

  isInitializing = true;
  const { default: Tobi } = await import('@midzer/tobii');
  tobiInstance = new Tobi();
  isInitializing = false;
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
  if (lightbox && !tobiInstance) {
    e.preventDefault();
    e.stopPropagation();
    await initTobii();
    // Manually open the lightbox with Tobii's API
    const index = Array.from(document.querySelectorAll('.lightbox')).indexOf(lightbox);
    if (tobiInstance && index !== -1) {
      tobiInstance.open(index);
    }
  }
});
