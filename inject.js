// Fetch and inject ABOUT content
fetch('about.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('about-img').src = data.image;
    document.getElementById('para1').textContent = data.para1;
    document.getElementById('para2').textContent = data.para2;
  });

/* === Inject cards into #work .cards === */
function injectFeaturedWork() {
  fetch('featured.json')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('#work .cards');
      if (!container) return;
      container.innerHTML = '';
      data.projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'card reveal';
        card.innerHTML = `
          <img src="${project.image}" alt="${project.title}">
          <div class="card-info">
            <h3>${project.title}</h3>
            <p class="small">${project.description}</p>
            <a href="${project.link}" target="_blank" class="btn-text">Visit →</a>
          </div>
        `;
        container.appendChild(card);
      });

      // Trigger scroll reveal on newly added cards
      if (typeof observeReveals === 'function') {
        observeReveals();
      }
    });
}

// Expose it globally
window.injectFeaturedWork = injectFeaturedWork;



// Fetch and inject TESTIMONIALS
fetch('testimonials.json')
  .then(res => res.json())
  .then(data => {
    const slider = document.querySelector('#testimonials .slider');
    slider.innerHTML = '';
    data.testimonials.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'slide' + (i === 0 ? ' current' : '');
      div.innerHTML = `
        <blockquote>"${item.quote}"</blockquote>
        <span>— ${item.name}</span>
      `;
      slider.appendChild(div);
    });
  });

// Fetch and inject CLIENT REACTIONS
fetch('reactions.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.querySelector('.chat-testimonials-grid');
    const wrapper = document.querySelector('.chat-testimonials-wrapper');
    const prevBtn = document.querySelector('.arrow-left');
    const nextBtn = document.querySelector('.arrow-right');
    grid.innerHTML = '';
    data.reactions.forEach(item => {
      const div = document.createElement('div');
      div.className = 'chat-bubble show';
      div.innerHTML = `
        <img src="${item.image}" alt="Client reaction">
        <p>${item.text}</p>
      `;
      grid.appendChild(div);
    });


// --- Carousel setup code starts here ---
function initCarousel() {
  const gridItems = grid.children;

  if (gridItems.length <= 1) return; // No need for carousel

  let currentIndex = 0;
  let slideWidth = gridItems[0].offsetWidth + parseInt(getComputedStyle(grid).gap);
  let totalItems = gridItems.length;

  function updateCarousel() {
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > totalItems - 1) currentIndex = totalItems - 1;
    const translateX = -currentIndex * slideWidth;
    grid.style.transform = `translateX(${translateX}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalItems - 1;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });

  // Drag/swipe
  let startX = 0, currentTranslate = 0, prevTranslate = 0, isDragging = false;

  wrapper.addEventListener('pointerdown', dragStart);
  wrapper.addEventListener('pointerup', dragEnd);
  wrapper.addEventListener('pointerleave', dragEnd);
  wrapper.addEventListener('pointermove', dragAction);

  function dragStart(e) {
    isDragging = true;
    startX = e.pageX || e.touches?.[0]?.pageX;
    prevTranslate = currentTranslate;
    wrapper.style.cursor = 'grabbing';
  }

  function dragAction(e) {
    if (!isDragging) return;
    const currentX = e.pageX || e.touches?.[0]?.pageX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + deltaX;
    grid.style.transform = `translateX(${currentTranslate}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.style.cursor = 'grab';

    currentIndex = Math.round(-currentTranslate / slideWidth);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > totalItems - 1) currentIndex = totalItems - 1;
    updateCarousel();
  }

  wrapper.style.cursor = 'grab';
  updateCarousel();
}

// Wait for images to load before measuring slideWidth
Promise.all(
  Array.from(wrapper.querySelectorAll('img')).map(
    img => img.complete ? Promise.resolve() : new Promise(res => img.onload = res)
  )
).then(initCarousel);

// --- Carousel setup code ends here ---

   });