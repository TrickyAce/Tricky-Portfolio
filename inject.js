// Fetch and inject ABOUT content
fetch('about.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('about-img').src = data.image;
    document.getElementById('para1').textContent = data.para1;
    document.getElementById('para2').textContent = data.para2;
  });

// Fetch and inject FEATURED WORK
fetch('featured.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('#work .cards');
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
  });

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
    grid.innerHTML = '';
    data.reactions.forEach(item => {
      const div = document.createElement('div');
      div.className = 'chat-bubble';
      div.innerHTML = `
        <img src="${item.image}" alt="Client reaction">
        <p>${item.text}</p>
      `;
      grid.appendChild(div);
    });
  });
