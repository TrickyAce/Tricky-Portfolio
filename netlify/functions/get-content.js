const fs = require("fs")
const path = require("path")

// Helper function to parse frontmatter
function parseFrontmatter(content) {
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

      // Handle arrays (basic support)
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'))
        } catch (e) {
          // Keep as string if parsing fails
        }
      }

      data[key] = value
    }
  })

  return { data, content: body }
}

function loadMarkdownFiles(directory) {
  try {
    const fullPath = path.join(process.cwd(), "content", directory)

    if (!fs.existsSync(fullPath)) {
      return []
    }

    const files = fs.readdirSync(fullPath)
    const markdownFiles = files.filter((file) => file.endsWith(".md"))

    return markdownFiles.map((file) => {
      const filePath = path.join(fullPath, file)
      const content = fs.readFileSync(filePath, "utf8")
      const { data } = parseFrontmatter(content)
      return data
    })
  } catch (error) {
    console.error(`Error loading ${directory}:`, error)
    return []
  }
}

function loadSettings() {
  try {
    const settings = {}

    // Load about.md
    const aboutPath = path.join(process.cwd(), "content", "settings", "about.md")
    if (fs.existsSync(aboutPath)) {
      const aboutContent = fs.readFileSync(aboutPath, "utf8")
      const { data } = parseFrontmatter(aboutContent)
      settings.about = data
    }

    // Load contact.md
    const contactPath = path.join(process.cwd(), "content", "settings", "contact.md")
    if (fs.existsSync(contactPath)) {
      const contactContent = fs.readFileSync(contactPath, "utf8")
      const { data } = parseFrontmatter(contactContent)
      settings.contact = data
    }

    return settings
  } catch (error) {
    console.error("Error loading settings:", error)
    return {}
  }
}

exports.handler = async (event, context) => {
  const { type } = event.queryStringParameters || {}

  try {
    let data

    switch (type) {
      case "projects":
        data = loadMarkdownFiles("projects")
        break
      case "testimonials":
        data = loadMarkdownFiles("testimonials")
        break
      case "chat-testimonials":
        data = loadMarkdownFiles("chat-testimonials")
        break
      case "settings":
        data = loadSettings()
        break
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid type parameter" }),
        }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error("Function error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
