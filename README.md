<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Forest Tree Hole 🌳

A modern React social media app with AI integration, built with Vite and TypeScript.

## Features

- 🐾 Animal-themed user interface
- 📝 Post creation and management
- 💬 Reply system
- 🏷️ Tag system
- 🤖 AI-powered features with Gemini
- 📱 Responsive design
- 🔐 User authentication

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router DOM
- **AI**: Google Gemini API
- **Styling**: CSS Modules
- **Deployment**: Cloudflare Pages

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Create a `.env.local` file
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploy to Cloudflare Pages

1. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Connect to Git"
   - Select your GitHub repository: `forest-tree-hole`

2. **Configure Build Settings**
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave empty)

3. **Set Environment Variables**
   - Add `GEMINI_API_KEY` with your Gemini API key

4. **Deploy**
   - Click "Save and Deploy"
   - Your site will be available at `https://forest-tree-hole.pages.dev`

## Project Structure

```
forest-tree-hole/
├── components/          # React components
├── pages/              # Page components
├── context/            # React context
├── services/           # API services
├── types.ts           # TypeScript types
└── constants.tsx       # App constants
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
