# LaFaries Mortimer LLC - Website Replica

A complete replica of the LaFaries Mortimer LLC website, designed for deployment on GitHub Pages and Netlify.

## 🌐 Original Website
- **URL**: https://www.lafariesmortimerllc.com
- **Description**: Professional Administrative & IT Services for businesses, ministries, and nonprofits

## 📁 Project Structure

```
├── index.html              # Home page
├── laap.html              # LAAP Suite page
├── tutorial.html          # Tutorials and resources
├── service.html           # Services page
├── about.html             # About us page
├── faq.html               # Frequently asked questions
├── goals.html             # Contact/goals page
├── main.js                # Main JavaScript functionality
└── README.md              # This file
```

## 🚀 Quick Deployment

### Option 1: GitHub Pages

1. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository named `lafariesmortimer-website`
   - Make it public

2. **Upload files**:
   - Upload all files from this folder to your GitHub repository
   - Make sure `index.html` is in the root directory

3. **Enable GitHub Pages**:
   - Go to Settings → Pages in your repository
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click Save

4. **Access your site**:
   - Your site will be available at: `https://[your-username].github.io/lafariesmortimer-website/`

### Option 2: Netlify

1. **Create a Netlify account**:
   - Go to https://netlify.com and sign up (free tier available)

2. **Deploy via drag & drop**:
   - Compress all files in this folder into a ZIP file
   - Go to https://app.netlify.com/drop
   - Drag and drop your ZIP file
   - Netlify will automatically deploy your site

3. **Access your site**:
   - Netlify will provide a random URL like `https://amazing-name-123456.netlify.app`
   - You can customize the URL in your Netlify dashboard

### Option 3: Connect GitHub to Netlify

1. **Push to GitHub first** (follow Option 1 steps 1-2)

2. **Connect GitHub to Netlify**:
   - Log in to Netlify
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify
   - Select your `lafariesmortimer-website` repository
   - Click "Deploy site"

3. **Benefits**:
   - Automatic deployments when you push changes
   - Branch previews
   - Advanced deployment settings

## 🎨 Features

### Pages Included
- **Home**: Hero section, LAAP features, process flow, audience targeting
- **LAAP**: 10-step formation wizard, interactive demo
- **Tutorials**: Filterable tutorials, downloadable resources, video section
- **Services**: Three core service areas, target audience, process steps
- **About**: Company story, mission, values
- **FAQ**: Expandable FAQ section with common questions
- **Goals**: Contact form, business information, inquiry system

### Interactive Elements
- ✅ Mobile-responsive navigation
- ✅ Cookie consent banner
- ✅ FAQ accordion
- ✅ Tutorial filtering
- ✅ Contact form with validation
- ✅ Smooth scrolling
- ✅ Loading states
- ✅ Form validation
- ✅ Print-friendly tutorials

### Design Features
- 🎨 Modern, professional design
- 📱 Fully responsive (mobile-first)
- 🌟 Smooth animations and transitions
- 🎯 Consistent branding and colors
- ♿ Accessible design patterns
- 🚀 Optimized for performance

## 🔧 Customization

### Basic Customization

1. **Colors**: Edit the CSS custom properties in each HTML file:
   ```css
   :root {
       --primary-color: #2c3e50;
       --accent-color: #e74c3c;
       --gold-accent: #d4af37;
       /* ... other colors */
   }
   ```

2. **Content**: Edit the HTML files directly to update text, images, and sections

3. **Contact Information**: Update phone, email, and address in all HTML files

### Advanced Customization

1. **Add new pages**: Create new HTML files following the existing structure
2. **Modify JavaScript**: Edit `main.js` for new interactive features
3. **Enhance styling**: Add custom CSS to any HTML file or create a separate stylesheet

## 📞 Support & Contact

For questions about this website replica or deployment assistance:

- **Email**: info@lafariesmortimerllc.com
- **Phone**: (305) 859-1279
- **Website**: https://www.lafariesmortimerllc.com

## 📝 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)**: Modern JavaScript with no dependencies
- **Font Awesome**: Icon library
- **Google Fonts**: Playfair Display and Inter fonts

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimizations
- Inline CSS for faster loading
- Optimized images (using placeholders)
- Minimal JavaScript
- Mobile-first responsive design
- Semantic HTML for better SEO

## 🔄 Updates & Maintenance

### Updating Content
1. Edit the relevant HTML files
2. Commit changes to GitHub (if using GitHub Pages)
3. Changes deploy automatically (Netlify) or within minutes (GitHub Pages)

### Adding New Features
1. Edit `main.js` for new JavaScript functionality
2. Update HTML files as needed
3. Test locally before deploying
4. Push changes to your repository

## 📄 License

This website replica is created for deployment purposes. Original content and design belong to LaFaries Mortimer LLC.

## 🙏 Acknowledgments

- Original website design and content by LaFaries Mortimer LLC
- Icons by Font Awesome
- Fonts by Google Fonts
- Built with modern web standards

---

**Ready to deploy? Choose your platform above and follow the steps! 🚀**