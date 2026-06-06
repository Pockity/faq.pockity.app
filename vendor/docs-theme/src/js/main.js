document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const aside = document.querySelector('.sidebar-aside');

  if (menuToggle && aside) {
    aside.id = 'mobile-sidebar';
    menuToggle.setAttribute('aria-controls', 'mobile-sidebar');
    menuToggle.setAttribute('aria-expanded', 'false');

    const closeSidebar = () => {
      aside.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = aside.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && aside.classList.contains('show')) {
        closeSidebar();
      }
    });
  }

  // Copy Buttons for Code Blocks
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach((block) => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerText = 'Copy';

    button.addEventListener('click', () => {
      const code = block.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerText = 'Copied!';
        setTimeout(() => {
          button.innerText = 'Copy';
        }, 2000);
      });
    });

    block.appendChild(button);
  });

  // TOC Modal Logic
  const tocModal = document.getElementById('toc-modal');
  const tocTriggers = document.querySelectorAll('.toc-trigger');
  const tocCloseBtn = document.getElementById('close-toc');

  if (tocModal && tocTriggers.length > 0) {
    tocModal.setAttribute('aria-modal', 'true');

    let tocTrigger = null;

    tocTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        tocTrigger = trigger;
        tocModal.showModal();
        document.body.style.overflow = 'hidden';
      });
    });

    if (tocCloseBtn) {
      tocCloseBtn.addEventListener('click', () => {
        tocModal.close(tocTrigger);
        document.body.style.overflow = '';
      });
    }

    // Close on click outside
    tocModal.addEventListener('click', (e) => {
      const dialogDimensions = tocModal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        tocModal.close(tocTrigger);
        document.body.style.overflow = '';
      }
    });

    tocModal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  }
});
