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

  // Helper function to parse frontmatter
  parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
    const match = content.match(frontmatterRegex)

    if (!match) return { data: {}, content: content }

    const frontmatter = match[1]
    const body = match[2]
    const data = {}

    frontmatter.split("\n").forEach((line) => {
      const colonIndex = line.indexOf(":")
      if (colonIndex > -1) {
        const key = line.substring(0, colonIndex).trim()
        let value = line.substring(colonIndex + 1).trim()

        // Remove quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }

        // Convert boolean strings
        if (value === "true") value = true
        if (value === "false") value = false

        // Convert numbers
        if (!isNaN(value) && value !== "") value = Number(value)

        data[key] = value
      }
    })

    return { data, content: body }
  }

  async loadProjects() {
    try {
      // Try to load from API first (for Netlify CMS)
      const response = await fetch("/.netlify/functions/get-content?type=projects")
      if (response.ok) {
        this.projects = await response.json()
        return
      }
    } catch (error) {
      console.log("API not available, using fallback data")
    }

    // Fallback data
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
  }

  async loadTestimonials() {
    try {
      const response = await fetch("/.netlify/functions/get-content?type=testimonials")
      if (response.ok) {
        this.testimonials = await response.json()
        return
      }
    } catch (error) {
      console.log("API not available, using fallback data")
    }

    // Fallback data
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
  }

  async loadChatTestimonials() {
    try {
      const response = await fetch("/.netlify/functions/get-content?type=chat-testimonials")
      if (response.ok) {
        this.chatTestimonials = await response.json()
        return
      }
    } catch (error) {
      console.log("API not available, using fallback data")
    }

    // Fallback - empty for now
    this.chatTestimonials = []
  }

  async loadSettings() {
    try {
      const response = await fetch("/.netlify/functions/get-content?type=settings")
      if (response.ok) {
        this.settings = await response.json()
        return
      }
    } catch (error) {
      console.log("API not available, using fallback data")
    }

    // Fallback data
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
    if (!container) return

    // Hide section if no chat testimonials
    const section = document.querySelector("#chat-testimonials")
    if (!this.chatTestimonials.length) {
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
        <img src="${item.image}" alt="Chat with ${item.client}" />
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
