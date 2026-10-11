# Bekam Photo Studio

A responsive photography studio landing page built with HTML, Tailwind CSS (CDN), and vanilla JavaScript.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser.
3. Internet access is needed for Tailwind CDN and the online sample photography images.

You can also use VS Code + Live Server.

## Before publishing
1. Open `script.js` and replace `YOUR_EMAIL@example.com` with the studio's real email.
2. In `index.html`, replace “Add studio email here” and “Add studio location here” with real details.
3. Replace sample Unsplash photography images with the studio's own photos when available.
4. Check every booking and contact detail with the photographer.

## Deploy
- **Netlify:** Drag the extracted project folder into Netlify Drop, or connect a Git repository.
- **Vercel:** Import the repository and use the project root. No build command is needed for this static HTML site; the output directory can be `.`.

## Important notes
- The light/dark toggle updates text, surfaces, borders, and the browser theme color. It remembers the selected theme when browser storage is available.
- The booking form opens the visitor's email application using `mailto:`. It does not send/store enquiries on a server. For automatic delivery without opening an email app, connect a form backend/service.
- Sample photos load from Unsplash and therefore require internet access.
