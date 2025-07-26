class ContentLoader {
  constructor() {
    this.projects = []
    this.testimonials = []
    this.settings = {}
    this.chatTestimonials = []
  }

  async init() {
    try {
      await Promise.all([
        this.loadProjects(),
        this.loadTestimonials(),
        this.loadSettings(),
        this.loadChatTestimonials(),
      ])

      this.renderProjects()
      this.renderTestimonials()
      this.renderChatTestimonials()
      this.renderAbout()
      this.renderContact()
    } catch (error) {
      console.error("Error loading content:", error)
      // Fallback to existing static content if dynamic loading fails
    }
  }

  async loadProjects() {
    try {
      // In a real implementation, you'd fetch from your content files
      // For now, we'll use the existing data as fallback
      this.projects = [
        {
          title: "Delolas Closet",
          description: "Dynamic clothing store demo",
          image: "delola.webp",
          url: "https://delolasclosetdemo.netlify.app/",
          featured: true,
          order: 1,
        },
        {
          title: "HairDo Mirab",
          description: "One‑page e‑commerce demo",
          image: "mirab.webp",
          url: "https://hairdomirabdemo.netlify.app/",
          featured: true,
          order: 2,
        },
      ]
    } catch (error) {
      console.error("Error loading projects:", error)
    }
  }

  async loadTestimonials() {
    try {
      this.testimonials = [
        {
          name: "Ada O.",
          quote: "Sales jumped 32% the first week—site loads before my coffee does.",
          image: "/images/uploads/ada-testimonial.jpg", // Optional image
          order: 1,
        },
        {
          name: "Tosin A.",
          quote: "Looked global from day one. Customers thought we were a huge brand.",
          // No image for this testimonial
          order: 2,
        },
        {
          name: "Chiamaka E.",
          quote: "99 Lighthouse on mobile? Yes please.",
          image: "/images/uploads/chiamaka-testimonial.jpg", // Optional image
          order: 3,
        },
      ]
    } catch (error) {
      console.error("Error loading testimonials:", error)
    }
  }

  async loadChatTestimonials() {
    try {
      this.chatTestimonials = [
        {
          title: "Client loved the speed!",
          client: "Sarah M.",
          image: "/images/uploads/chat-screenshot-1.jpg",
          project_type: "Landing Page",
          featured: true,
          order: 1,
        },
      ]
    } catch (error) {
      console.error("Error loading chat testimonials:", error)
    }
  }

  renderTestimonials() {
    const container = document.querySelector(".slider")
    if (!container || !this.testimonials.length) return

    // Sort by order
    const sortedTestimonials = this.testimonials.sort((a, b) => a.order - b.order)

    container.innerHTML = sortedTestimonials
      .map(
        (testimonial, index) => `
    <div class="slide ${index === 0 ? "current" : ""}">
      ${
        testimonial.image
          ? `
        <div class="testimonial-image">
          <img src="${testimonial.image}" alt="${testimonial.name}" />
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

    // Re-initialize slider
    this.initSlider()
  }

  renderChatTestimonials() {
    const container = document.querySelector(".chat-testimonials-grid")
    if (!container || !this.chatTestimonials.length) return

    const featured = this.chatTestimonials.filter((item) => item.featured).sort((a, b) => a.order - b.order)

    container.innerHTML = featured
      .map(
        (item) => `
      <div class="chat-testimonial reveal">
        <div class="chat-header">
          <h4>${item.title}</h4>
          <span class="project-type">${item.project_type}</span>
        </div>
        <img src="${item.image}" alt="Chat with ${item.client}" />
        <p class="client-name">— ${item.client}</p>
      </div>
    `,
      )
      .join("")

    this.initScrollReveal()
  }

  async loadSettings() {
    try {
      this.settings = {
        about: {
          bio1: "🇳🇬 Ogbomosho‑based front‑end dev, taekwondo athlete, pixel‑perfectionist.",
          bio2: "I combine athlete discipline with design thinking to ship projects that punch above their weight.",
          image: "tricky.webp",
          tech: ["HTML & CSS", "JavaScript ES6+", "Tailwind / Vanilla", "Netlify & Vercel"],
        },
        contact: {
          whatsapp: "2347080428566",
          email: "trickyacemagic@gmail.com",
          title: "Let's Work",
        },
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }

  renderProjects() {
    const container = document.querySelector(".cards")
    if (!container || !this.projects.length) return

    // Sort by order and filter featured
    const featuredProjects = this.projects.filter((project) => project.featured).sort((a, b) => a.order - b.order)

    container.innerHTML = featuredProjects
      .map(
        (project) => `
      <article class="card reveal">
        <img src="${project.image}" alt="${project.title} – screenshot">
        <div class="card-info">
          <h3>${project.title}</h3>
          <p class="small">${project.description}</p>
          <a href="${project.url}" target="_blank" class="btn-text">Visit →</a>
        </div>
      </article>
    `,
      )
      .join("")

    // Re-initialize scroll reveal for new elements
    this.initScrollReveal()
  }

  renderAbout() {
    const aboutSection = document.querySelector(".about-wrapper")
    if (!aboutSection || !this.settings.about) return

    const { bio1, bio2, image, tech } = this.settings.about

    aboutSection.innerHTML = `
      <img src="${image}" alt="Portrait of Tricky Ace">
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

// Initialize content loader when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const contentLoader = new ContentLoader()
  contentLoader.init()
})
