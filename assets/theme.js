document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Expose the live header height so the hero can fill exactly from the
// base of the (sticky) header down to the bottom of the viewport.
const setHeaderHeight = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
};
setHeaderHeight();
window.addEventListener('resize', setHeaderHeight);
window.addEventListener('load', setHeaderHeight);

document.addEventListener('click', (event) => {
  const openMenu = document.querySelector('.mobile-menu[open]');
  if (!openMenu) return;
  if (!openMenu.contains(event.target)) {
    openMenu.removeAttribute('open');
  }
});

document.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const target = document.querySelector('[data-gallery-main]');
    if (!target) return;

    target.src = thumb.dataset.galleryFull;
    target.alt = thumb.alt;
  });
});

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const track = slider.querySelector('[data-slider-track]');
  const slides = Array.from(slider.querySelectorAll('.lib-slider__slide'));
  const prevButton = slider.querySelector('[data-slider-prev]');
  const nextButton = slider.querySelector('[data-slider-next]');
  const dotsContainer = slider.querySelector('[data-slider-dots]');
  const mediaQuery = window.matchMedia('(min-width: 981px)');
  let index = 0;
  let dots = [];

  if (!track || slides.length === 0) return;

  const getPerView = () => (mediaQuery.matches ? 2 : 1);
  const getMaxIndex = () => Math.max(0, slides.length - getPerView());

  const renderDots = () => {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dots = Array.from({ length: getMaxIndex() + 1 }, (_, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to slide ${dotIndex + 1}`);
      dot.addEventListener('click', () => {
        index = dotIndex;
        update();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  };

  const update = () => {
    index = Math.min(Math.max(index, 0), getMaxIndex());
    const slideWidth = slider.clientWidth / getPerView();
    track.style.transform = `translate3d(-${index * slideWidth}px, 0, 0)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === getMaxIndex();
  };

  prevButton?.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextButton?.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', () => {
    renderDots();
    update();
  });

  renderDots();
  update();
});

document.querySelectorAll('[data-review-carousel]').forEach((carousel) => {
  const viewport = carousel.querySelector('.review-carousel__viewport');
  const track = carousel.querySelector('[data-review-carousel-track]');
  const slides = Array.from(carousel.querySelectorAll('.review-carousel__slide'));
  const prevButton = carousel.querySelector('[data-review-carousel-prev]');
  const nextButton = carousel.querySelector('[data-review-carousel-next]');
  const dotsContainer = carousel.querySelector('[data-review-carousel-dots]');
  const desktopQuery = window.matchMedia('(min-width: 981px)');
  const tabletQuery = window.matchMedia('(min-width: 641px)');
  let index = 0;
  let dots = [];

  if (!viewport || !track || slides.length === 0) return;

  const getPerView = () => {
    if (desktopQuery.matches) return 3;
    if (tabletQuery.matches) return 2;
    return 1;
  };

  const getMaxIndex = () => Math.max(0, slides.length - getPerView());

  const renderDots = () => {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dots = Array.from({ length: getMaxIndex() + 1 }, (_, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to review ${dotIndex + 1}`);
      dot.addEventListener('click', () => {
        index = dotIndex;
        update();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  };

  const update = () => {
    index = Math.min(Math.max(index, 0), getMaxIndex());
    const slideWidth = viewport.clientWidth / getPerView();
    track.style.transform = `translate3d(-${index * slideWidth}px, 0, 0)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === getMaxIndex();
  };

  prevButton?.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextButton?.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', () => {
    renderDots();
    update();
  });

  renderDots();
  update();
});

document.querySelectorAll('[data-featured-gallery]').forEach((gallery) => {
  const track = gallery.querySelector('[data-featured-gallery-track]');
  const slides = Array.from(gallery.querySelectorAll('.featured-gallery__slide'));
  const prevButton = gallery.querySelector('[data-featured-gallery-prev]');
  const nextButton = gallery.querySelector('[data-featured-gallery-next]');
  const dotsContainer = gallery.querySelector('[data-featured-gallery-dots]');
  let index = 0;
  let dots = [];

  if (!track || slides.length === 0) return;

  if (slides.length <= 1) {
    gallery.classList.add('is-static');
    return;
  }

  const renderDots = () => {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dots = slides.map((_, dotIndex) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to product image ${dotIndex + 1}`);
      dot.addEventListener('click', () => {
        index = dotIndex;
        update();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  };

  const update = () => {
    index = Math.min(Math.max(index, 0), slides.length - 1);
    track.style.transform = `translate3d(-${index * gallery.clientWidth}px, 0, 0)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
    });

    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === slides.length - 1;
  };

  prevButton?.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextButton?.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', update);

  renderDots();
  update();
});
