// custom-gsap-attributes.js

const GSAPAttributes = (() => {
  // Animation presets
  const presets = {
    fadeIn: { opacity: 0, y: 20 },
    slideUp: { y: 100, opacity: 0 },
    scaleUp: { scale: 0.8, opacity: 0 },
    // Add more presets here
  };

  // Core animation handler
  function animateElement(el) {
    const type = el.dataset.gsap;
    const duration = parseFloat(el.dataset.duration) || 1;
    const stagger = parseStagger(el.dataset.stagger);
    const vars = parseVars(el.dataset.vars);
    
    // Combine preset + custom vars
    const animationVars = {
      ...(presets[type] || {}),
      ...vars,
      duration,
      stagger
    };

    // Create timeline or single animation
    if (el.dataset.timeline) {
      handleTimeline(el, animationVars);
    } else {
      const targets = el.dataset.stagger ? el.children : el;
      gsap.from(targets, {
        ...animationVars,
        scrollTrigger: createScrollTrigger(el)
      });
    }
  }

  // ScrollTrigger configuration
  function createScrollTrigger(el) {
    if (!el.dataset.trigger) return null;
    const [start, end] = el.dataset.trigger.split(' ');
    return {
      trigger: el,
      start: start || 'top 80%',
      end: end || 'bottom 20%',
      toggleActions: 'play none none reverse'
    };
  }

  // Helper functions
  function parseStagger(value) {
    try {
      return JSON.parse(value);
    } catch {
      return value ? parseFloat(value) : null;
    }
  }

  function parseVars(value) {
    try {
      return value ? JSON.parse(value) : {};
    } catch (e) {
      console.error('Invalid data-vars:', value);
      return {};
    }
  }

  // Timeline handler
  function handleTimeline(el, vars) {
    const timeline = gsap.timeline({
      scrollTrigger: createScrollTrigger(el)
    });

    Array.from(el.children).forEach(child => {
      const position = child.dataset.position || '+=0';
      timeline.from(child, {
        ...vars,
        ...parseVars(child.dataset.vars)
      }, position);
    });
  }

  // Public API
  return {
    init() {
      gsap.registerPlugin(ScrollTrigger);
      document.querySelectorAll('[data-gsap]').forEach(animateElement);
      
      // Optional: Watch for new elements (CMS/async content)
      new MutationObserver(() => {
        document.querySelectorAll('[data-gsap]').forEach(animateElement);
      }).observe(document.body, { subtree: true, childList: true });
    }
  };
})();

// Auto-init
window.addEventListener('DOMContentLoaded', () => {
  GSAPAttributes.init();
});
