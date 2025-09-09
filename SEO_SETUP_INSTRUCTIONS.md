# SEO Setup Instructions for Romero Architects

## ✅ Completed SEO Optimizations

The following SEO improvements have been implemented in your Next.js application:

### 1. Enhanced Metadata
- **Comprehensive meta tags** including title templates, descriptions, and keywords
- **Open Graph tags** for social media sharing
- **Twitter Card optimization**
- **Structured data (JSON-LD)** for Google's rich snippets
- **Canonical URLs** to prevent duplicate content issues

### 2. Technical SEO
- **robots.txt** file for search engine crawling instructions
- **Dynamic sitemap.xml** generation
- **Web app manifest** with proper PWA metadata
- **DNS prefetching** for improved performance
- **Accessibility improvements** with skip links and semantic HTML

### 3. Performance Optimizations
- **Font optimization** with preconnect and dns-prefetch
- **Google Analytics** setup (requires configuration)
- **Proper favicon** and app icon configuration

## 🔧 Required Manual Setup

To complete the SEO optimization, you need to update these placeholders:

### 1. Domain and URLs
In `src/app/layout.tsx`, update:
```typescript
const siteUrl = "https://romeroarchitects.com"; // Change to your actual domain
```

In `src/app/sitemap.ts`, update:
```typescript
const baseUrl = 'https://romeroarchitects.com' // Change to your actual domain
```

In `public/robots.txt`, update:
```
Sitemap: https://romeroarchitects.com/sitemap.xml # Change to your actual domain
```

### 2. Contact Information
In `src/app/layout.tsx`, update the structured data:
```typescript
telephone: "+1-XXX-XXX-XXXX", // Your phone number
email: "info@romeroarchitects.com", // Your email
address: {
  streetAddress: "Your Street Address",
  addressLocality: "Your City",
  addressRegion: "Your State", 
  postalCode: "Your ZIP",
  addressCountry: "US",
},
```

### 3. Social Media
Update social media handles in `src/app/layout.tsx`:
```typescript
twitter: {
  site: "@romeroarchitects", // Your Twitter handle
  creator: "@romeroarchitects",
},
```

### 4. Google Analytics
Replace the placeholder tracking ID:
```typescript
gtag('config', 'GA_TRACKING_ID'); // Replace with your GA4 tracking ID (e.g., 'G-XXXXXXXXXX')
```

### 5. Search Console Verification
Add your Google Search Console verification code:
```typescript
verification: {
  google: "your-google-verification-code",
},
```

### 6. OpenGraph Image
Create an OpenGraph image and place it in the `public` folder:
- **File**: `/public/og-image.jpg`
- **Dimensions**: 1200x630 pixels
- **Content**: Should showcase your architecture work with the Romero Architects branding

## 🚀 Next Steps for Enhanced SEO

### 1. Content Optimization
- Add blog/news section for regular content updates
- Create dedicated pages for services (residential, commercial, civic, hospitality)
- Add an "About" page with team information
- Create individual project detail pages

### 2. Local SEO (if applicable)
- Set up Google My Business profile
- Add local business schema markup
- Include location-specific keywords

### 3. Performance Monitoring
- Set up Google Search Console
- Monitor Core Web Vitals
- Use Google Analytics to track user behavior

### 4. Additional Tools
Consider integrating:
- **Google Tag Manager** for easier analytics management
- **Schema.org markup** for individual projects
- **Rich snippets** for project galleries
- **AMP pages** for mobile performance (optional)

## 📊 SEO Testing

After deployment, test your SEO with these tools:
1. **Google Rich Results Test** - Test structured data
2. **Facebook Sharing Debugger** - Test Open Graph tags
3. **Twitter Card Validator** - Test Twitter cards
4. **Google PageSpeed Insights** - Test performance
5. **GTmetrix** - Test loading speed

## 📝 Monitoring

Set up monitoring for:
- Search Console performance reports
- Google Analytics organic traffic
- Social media referrals
- Page loading speeds
- Mobile usability issues

Remember to update the sitemap whenever you add new pages or projects!
