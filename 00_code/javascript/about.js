// About Section Tabs - No Animation
(() => {
  const TAB_BUTTONS_SELECTOR = '.tab-btn';
  const TAB_PANE_SELECTOR = '.tab-pane';
  const ACTIVE_CLASS = 'active';

  let tabButtons, tabPanes;

  function initializeTabs() {
    tabButtons = document.querySelectorAll(TAB_BUTTONS_SELECTOR);
    tabPanes = document.querySelectorAll(TAB_PANE_SELECTOR);

    if (!tabButtons.length || !tabPanes.length) {
      console.error('Tab elements not found');
      return;
    }

    tabButtons.forEach(button => {
      button.addEventListener('click', handleTabClick);
    });
  }

  function handleTabClick(event) {
    const targetTab = event.currentTarget.dataset.tab;
    if (!targetTab) return;

    // Update button states
    tabButtons.forEach(btn => btn.classList.remove(ACTIVE_CLASS));
    event.currentTarget.classList.add(ACTIVE_CLASS);

    // Update tab content - instant switch
    tabPanes.forEach(pane => {
      pane.classList.remove(ACTIVE_CLASS);
    });

    const targetPane = document.getElementById(targetTab);
    if (targetPane) {
      targetPane.classList.add(ACTIVE_CLASS);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTabs);
  } else {
    initializeTabs();
  }
})();
