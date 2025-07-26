// Simple content loader that works with static files
class ContentLoader {
  constructor() {
    this.projects = []
    this.testimonials = []
    this.chatTestimonials = []
    this.settings = {}
  }

  async init() {
    // Load content and render immediately
    this.loadStaticContent()
    this.renderProjects()
    this.renderTestimonials()
    this.renderChatTestimonials()
    this.renderAbout()
    this.renderContact()
  }

  loadStaticContent() {
    // Projects data (you can update this via CMS later)
    this.projects = [
      {
        title: "Delolas Closet",
        description: "Dynamic clothing store demo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Delola-3MdUdpXOPOmhTzpq2FCsiuI1IJlsPV.webp", // Using the provided image
        url: "https://delolasclosetdemo.netlify.app/",
        featured: true,
        order: 1,
      },
      {
        title: "HairDo Mirab",
        description: "One‑page e‑commerce demo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mirab-2uJywicxplaMnRIPlzMuaczNiLBlWF.webp", // Using the provided image
        url: "https://hairdomirabdemo.netlify.app/",
        featured: true,
        order: 2,
      },
    ]

    // Testimonials data
    this.testimonials = [
      {
        name: "Ada O.",
        quote: "Sales jumped 32% the first week—site loads before my coffee does.",
        order: 1,
      },
      {
        name: "Tosin A.",
        quote: "Looked global from day one. Customers thought we were a huge brand.",
        order: 2,
      },
      {
        name: "Chiamaka E.",
        quote: "99 Lighthouse on mobile? Yes please.",
        order: 3,
      },
    ]

    // Chat testimonials (empty for now - you can add via CMS)
    this.chatTestimonials = []

    // Settings
    this.settings = {
      about: {
        bio1: "🇳🇬 Ogbomosho‑based front‑end dev, taekwondo athlete, pixel‑perfectionist.",
        bio2: "I combine athlete discipline with design thinking to ship projects that punch above their weight.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tricky-Fhwk7jwqsyqknpgNh2F2lVKTSI1Qeq.webp", // Using the provided image
        tech: ["HTML & CSS", "JavaScript ES6+", "Tailwind / Vanilla", "Netlify & Vercel"],
      },
      contact: {
        whatsapp: "2347080428566",
        email: "trickyacemagic@gmail.com",
        title: "Let's Work",
      },
    }
  }

  renderProjects() {
    const container = document.querySelector(".cards")
    if (!container) return

    const featuredProjects = this.projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)

    container.innerHTML = featuredProjects
      .map(
        (project) => `
      <article class="card reveal">
        <img src="${project.image}" alt="${project.title} – screenshot" loading="lazy">
        <div class="card-info">
          <h3>${project.title}</h3>
          <p class="small">${project.description}</p>
          <a href="${project.url}" target="_blank" class="btn-text">Visit →</a>
        </div>
      </article>
    `,
      )
      .join("")

    this.initScrollReveal()
  }

  renderTestimonials() {
    const container = document.querySelector(".slider")
    if (!container) return

    const sortedTestimonials = this.testimonials.sort((a, b) => a.order - b.order)

    container.innerHTML = sortedTestimonials
      .map(
        (testimonial, index) => `
      <div class="slide ${index === 0 ? "current" : ""}">
        ${
          testimonial.image
            ? `
          <div class="testimonial-image">
            <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy" />
          </div>
        `
            : ""
        }
        <blockquote>"${testimonial.quote}"</blockquote>
        <span>— ${testimonial.name}</span>
      </div>
    `,
      )
      .join("")

    this.initSlider()
  }

  renderChatTestimonials() {
    const container = document.querySelector(".chat-testimonials-grid")
    const section = document.querySelector("#chat-testimonials")

    if (!container) return

    if (this.chatTestimonials.length === 0) {
      if (section) section.style.display = "none"
      return
    }

    if (section) section.style.display = "block"

    const featured = this.chatTestimonials.filter((item) => item.featured).sort((a, b) => a.order - b.order)

    container.innerHTML = featured
      .map(
        (item) => `
      <div class="chat-testimonial reveal">
        <div class="chat-header">
          <h4>${item.title}</h4>
          <span class="project-type">${item.project_type}</span>
        </div>
        <img src="${item.image}" alt="Chat with ${item.client}" loading="lazy" />
        <p class="client-name">— ${item.client}</p>
      </div>
    `,
      )
      .join("")

    this.initScrollReveal()
  }

  renderAbout() {
    const aboutSection = document.querySelector(".about-wrapper")
    if (!aboutSection || !this.settings.about) return

    const { bio1, bio2, image, tech } = this.settings.about

    aboutSection.innerHTML = `
      <img src="${image}" alt="Portrait of Tricky Ace" loading="lazy">
      <div>
        <p>${bio1}</p>
        <p>${bio2}</p>
        <ul class="tech">
          ${tech.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `
  }

  renderContact() {
    if (!this.settings.contact) return

    const { whatsapp, email, title } = this.settings.contact

    // Update contact section title
    const contactTitle = document.querySelector("#contact .section-title")
    if (contactTitle) contactTitle.textContent = title

    // Update WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]')
    whatsappLinks.forEach((link) => {
      link.href = `https://wa.me/${whatsapp}`
    })

    // Update email link
    const emailLink = document.querySelector('a[href*="mailto"]')
    if (emailLink) {
      emailLink.href = `mailto:${email}`
      emailLink.textContent = email
    }
  }

  initScrollReveal() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
  }

  initSlider() {
    let currentSlide = 0
    const slides = document.querySelectorAll(".slide")

    if (slides.length <= 1) return

    setInterval(() => {
      slides[currentSlide].classList.remove("current")
      currentSlide = (currentSlide + 1) % slides.length
      slides[currentSlide].classList.add("current")
    }, 5000)
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const contentLoader = new ContentLoader()
  contentLoader.init()
})
