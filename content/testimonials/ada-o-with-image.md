---
name: Ada O.
quote: Sales jumped 32% the first week, site loads before my coffee does.
image: /images/uploads/ada-profile.jpg
order: 1
---
\`\`\`

And update the CMS config to make the image field more user-friendly:

```typescriptreact file="admin/config.yml"
[v0-no-op-code-block-prefix]backend:
  name: git-gateway
  branch: main # or master, depending on your default branch

media_folder: "images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "projects"
    label: "Projects"
    folder: "content/projects"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "Image", name: "image", widget: "image"}
      - {label: "Live URL", name: "url", widget: "string"}
      - {label: "Featured", name: "featured", widget: "boolean", default: false}
      - {label: "Order", name: "order", widget: "number", default: 1}

  - name: "testimonials"
    label: "Testimonials"
    folder: "content/testimonials"
    create: true
    slug: "{{slug}}"
    fields:
    - {label: "Client Name", name: "name", widget: "string"}
    - {label: "Quote", name: "quote", widget: "text"}
    - {label: "Client Photo", name: "image", widget: "image", required: false, hint: "Optional: Upload a photo of your client (square images work best)"}
    - {label: "Order", name: "order", widget: "number", default: 1, hint: "Lower numbers appear first in the slider"}

  - name: "settings"
    label: "Site Settings"
    files:
      - label: "About Me"
        name: "about"
        file: "content/settings/about.md"
        fields:
          - {label: "Bio Paragraph 1", name: "bio1", widget: "text"}
          - {label: "Bio Paragraph 2", name: "bio2", widget: "text"}
          - {label: "Profile Image", name: "image", widget: "image"}
          - {label: "Tech Stack", name: "tech", widget: "list", allow_add: true}
      
      - label: "Contact Info"
        name: "contact"
        file: "content/settings/contact.md"
        fields:
          - {label: "WhatsApp Number", name: "whatsapp", widget: "string"}
          - {label: "Email", name: "email", widget: "string"}
          - {label: "Contact Title", name: "title", widget: "string", default: "Let's Work"}
