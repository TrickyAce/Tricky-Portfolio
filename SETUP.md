# Netlify CMS Setup Guide

## 1. Enable Netlify Identity

1. Go to your Netlify dashboard
2. Navigate to your site settings
3. Go to **Identity** tab
4. Click **Enable Identity**
5. Under **Registration preferences**, select "Invite only" (recommended)
6. Under **Git Gateway**, click **Enable Git Gateway**

## 2. Invite Yourself as Admin

1. In the Identity tab, click **Invite users**
2. Enter your email address
3. Check your email and accept the invitation
4. Set your password

## 3. Deploy Your Changes

1. Push all the new files to your GitHub repository:
   \`\`\`bash
   git add .
   git commit -m "Add Netlify CMS integration"
   git push origin main
   \`\`\`

2. Netlify will automatically deploy your changes

## 4. Access Your CMS

1. Go to `https://yoursite.netlify.app/admin/`
2. Log in with your Netlify Identity credentials
3. Start managing your content!

## 5. File Structure

Your project should now have this structure:
\`\`\`
/
├── admin/
│   ├── index.html
│   └── config.yml
├── content/
│   ├── projects/
│   │   ├── delolas-closet.md
│   │   └── hairdo-mirab.md
│   ├── testimonials/
│   │   ├── ada-o.md
│   │   ├── tosin-a.md
│   │   └── chiamaka-e.md
│   └── settings/
│       ├── about.md
│       └── contact.md
├── js/
│   └── content-loader.js
├── images/
│   └── uploads/ (created automatically)
├── index.html
├── style.css
└── SETUP.md
\`\`\`

## 6. Using the CMS

### Adding Projects
1. Go to **Projects** in the CMS
2. Click **New Project**
3. Fill in title, description, upload image, add URL
4. Toggle "Featured" to show on homepage
5. Set order number for positioning
6. Click **Publish**

### Adding Testimonials
1. Go to **Testimonials**
2. Click **New Testimonial**
3. Add client name and quote
4. Set order for slider position
5. Click **Publish**

### Updating Settings
1. Go to **Site Settings**
2. Edit **About Me** or **Contact Info**
3. Click **Publish**

## 7. Advanced Features

### Preview Mode
The CMS includes a preview pane that shows how your content will look before publishing.

### Image Management
- Images are automatically optimized
- Stored in `/images/uploads/`
- Accessible via the media library

### Content Backup
All content is stored as Markdown files in your Git repository, so you always have a backup.

## Troubleshooting

### CMS Won't Load
- Check that Git Gateway is enabled
- Verify your config.yml syntax
- Make sure you're logged in to Netlify Identity

### Content Not Updating
- Check browser console for JavaScript errors
- Verify Markdown file format
- Clear browser cache

### Images Not Displaying
- Check image paths in Markdown files
- Verify images are in the correct folder
- Check file permissions
\`\`\`
