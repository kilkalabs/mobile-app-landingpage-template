# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static mobile app landing page template built with Jekyll and Webpack. It's designed to showcase mobile apps with screenshots, download links, and press mentions. The site supports PWA features, automatic dark mode, and various analytics/tracking integrations.

## Development Commands

### Prerequisites
- Node.js (version specified in `.nvmrc`)
- Ruby and Bundler

### Setup
```bash
npm install
bundler install
```

### Development
```bash
npm start
```
This runs webpack in dev mode with hot module replacement and starts Jekyll server concurrently. The site will be available at:
- Jekyll: http://localhost:8080
- BrowserSync proxy: http://localhost:3000

### Build
```bash
npm run build              # Production build
npm run build:pwa          # Production build with PWA/service worker support
```

### Serve Built Site
```bash
npm run serve:dist         # Serve the _site directory locally
```

### Linting
Linting runs automatically during webpack builds via ESLintPlugin. The project uses Airbnb base ESLint configuration.

## Architecture

### Build System
The project uses a dual build system:
1. **Webpack** - Handles JavaScript bundling, CSS/SASS compilation, image processing, and favicon generation
2. **Jekyll** - Generates static HTML from templates and data files

Webpack outputs to `assets/` directory, which Jekyll includes in the final `_site/` build.

### Webpack Configuration
- `webpack.config.js` - Entry point that dynamically loads config based on environment
- `config/webpack.common.js` - Shared webpack config (entry, plugins, loaders)
- `config/webpack.dev.js` - Development config with HMR and BrowserSync
- `config/webpack.prod.js` - Production config with minification and image optimization
- `config/webpack.pwa.js` - PWA-specific config (use with `build:pwa` script)

The webpack build:
- Entry: `_src/index.js`
- Outputs JavaScript bundles and CSS to `assets/`
- Generates `_layouts/default.html` from `_src/template/default.html`
- Copies images from `_images/` to `assets/images/`
- Generates favicons from `icon.png`

### Jekyll Structure
- `_config.yml` - Main Jekyll configuration, site metadata, plugin settings
- `_data/app.yml` - App-specific content (name, description, links, screenshots, press mentions)
- `_data/strings.yml` - Localized strings for UI elements and footer
- `_layouts/` - HTML templates (default, home, page, post, amp)
- `_includes/` - Reusable HTML partials (analytics, cookie consent, doorbell, github banner)
- `_scss/` - SASS stylesheets (imported by `_src/index.scss`)
- `index.md` - Homepage content (uses `home` layout)
- `privacy.md` - Privacy policy page

### Frontend JavaScript Architecture
`_src/index.js` is the webpack entry point and initializes:
- **Tobii** - Lightbox gallery for screenshots
- **ProductHunt Floating Prompt** - Promotional modal (configured inline, can be removed)
- **Darkmode.js** - Automatic dark mode widget (can be removed)

### Customization Points
When customizing the template:
1. **Site Config**: Edit `_config.yml` for metadata, analytics, social links
2. **App Content**: Edit `_data/app.yml` for app name, description, download links, screenshots
3. **Footer/Strings**: Edit `_data/strings.yml` for footer links and UI text
4. **Icons**: Replace `icon.png` in root (auto-generates favicons)
5. **Screenshots**: Add/replace images in `_images/` directory (referenced in `app.yml`)
6. **JavaScript Features**: Edit `_src/index.js` to enable/disable ProductHunt modal or dark mode
7. **Styles**: Edit SASS files in `_scss/` or `_src/index.scss`

### Optional Integrations
Configured in `_config.yml` (commented out by default):
- Google Analytics (`google_analytics` key)
- Google Webmaster Tools (`webmaster_verifications.google`)
- Doorbell widget (`doorbell.id` and `doorbell.appKey`)
- Cookie consent banner (`cookie_consent: true`)

### PWA Support
Running `npm run build:pwa`:
1. Sets `JEKYLL_ENV=pwa` and `NODE_ENV=production`
2. Uses `config/webpack.pwa.js` webpack config
3. Generates service worker using Workbox (`config/sw.config.js`)
4. Manifest file: `config/manifest.json`
