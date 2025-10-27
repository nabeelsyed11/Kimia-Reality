# Kimia Realty - Real Estate Website

A modern, full-stack real estate website built with Next.js, MongoDB, and AI-powered chatbot.

## Features

### 🏠 Frontend
- **Homepage**: Stunning hero section with search, featured properties, and statistics
- **Property Listings**: Advanced search and filter functionality
- **Property Details**: Detailed property pages with image galleries
- **Blog Section**: Real estate insights and articles
- **Contact Page**: Easy-to-use contact form
- **Responsive Design**: Mobile-friendly across all devices
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations

### 🤖 AI Chatbot
- Integrated AI assistant for answering real estate queries
- Fallback responses for common questions
- OpenAI GPT integration (optional)

### 🔧 Admin Panel
- **Dashboard**: Overview of properties, blogs, and analytics
- **Property Management**: Add, edit, and delete properties
- **Blog Management**: Create and manage blog posts
- **User-friendly Interface**: Intuitive admin controls

### 📊 Backend
- **Next.js API Routes**: RESTful API endpoints
- **MongoDB Database**: Mongoose ODM for data modeling
- **Image Handling**: Support for multiple images per property
- **Search & Filters**: Advanced querying capabilities

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud like MongoDB Atlas)
- OpenAI API key (optional, for AI chatbot)

### Installation

1. **Clone the repository** (or you're already in the project directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   
   The `.env.local` file is already created. Update it with your credentials:
   
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/kimia-realty
   # or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kimia-realty
   
   # NextAuth (for future authentication)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-change-this-in-production
   
   # OpenAI API (optional, for AI Chatbot)
   OPENAI_API_KEY=your-openai-api-key-here
   ```

4. **Set up MongoDB**:
   
   **Option A - Local MongoDB**:
   - Install MongoDB locally
   - Start MongoDB service
   - Use: `mongodb://localhost:27017/kimia-realty`
   
   **Option B - MongoDB Atlas (Recommended)**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Replace in `.env.local`

5. **Add the Kimia Realty logo**:
   
   Save your logo image as `public/logo.png`

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser**:
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
kimia-realty/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── properties/     # Property management
│   │   ├── blogs/          # Blog management
│   │   └── page.tsx        # Admin dashboard
│   ├── api/                # API routes
│   │   ├── properties/     # Property endpoints
│   │   ├── blogs/          # Blog endpoints
│   │   └── chat/           # AI chatbot endpoint
│   ├── blog/               # Blog pages
│   ├── properties/         # Property pages
│   ├── contact/            # Contact page
│   └── page.tsx            # Homepage
├── components/             # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ChatBot.tsx
│   └── HomePage.tsx
├── lib/                    # Utility functions
│   └── mongodb.ts          # MongoDB connection
├── models/                 # Mongoose models
│   ├── Property.ts
│   ├── Blog.ts
│   └── User.ts
└── public/                 # Static files
```

## Usage Guide

### Adding Properties

1. Go to `/admin/properties`
2. Click "Add Property"
3. Fill in all property details
4. Add image URLs (you can use placeholder images or upload to a service like Cloudinary)
5. Click "Create Property"

### Creating Blog Posts

1. Go to `/admin/blogs`
2. Click "New Post"
3. Write your content
4. Choose to publish or save as draft
5. Click "Publish Post" or "Save as Draft"

### Using the AI Chatbot

- Click the chat button in the bottom-right corner
- Ask questions about real estate
- Get instant responses (powered by AI or fallback responses)

## Features Checklist

- ✅ Homepage with hero section and search
- ✅ Property listings with filters
- ✅ Individual property detail pages
- ✅ Blog section with posts
- ✅ Admin dashboard
- ✅ Property management (CRUD)
- ✅ Blog management (CRUD)
- ✅ AI chatbot for customer queries
- ✅ Responsive design
- ✅ Modern UI/UX

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `POST /api/properties` - Create new property
- `GET /api/properties/[id]` - Get single property
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[slug]` - Get single blog
- `PUT /api/blogs/[slug]` - Update blog
- `DELETE /api/blogs/[slug]` - Delete blog

### AI Chat
- `POST /api/chat` - Send message to AI chatbot

## Customization

### Logo
Place your logo at `public/logo.png` (already configured in the Navbar)

### Colors
The site uses a blue and cyan color scheme. To change:
- Edit Tailwind classes in components
- Main colors: `blue-600`, `cyan-500`

### Sample Data
To add sample properties and blogs, use the admin panel or directly insert into MongoDB.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Other Platforms
- Railway
- Render
- DigitalOcean App Platform

## Troubleshooting

**MongoDB Connection Issues**:
- Check your `MONGODB_URI` is correct
- Ensure MongoDB is running (if local)
- Check network access in MongoDB Atlas

**Build Errors**:
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check for TypeScript errors

**Images Not Loading**:
- Use full URLs for images
- Or set up Cloudinary/similar service

## Future Enhancements

- [ ] Authentication for admin panel
- [ ] User accounts for saving favorites
- [ ] Property comparison feature
- [ ] Advanced map integration
- [ ] Email notifications
- [ ] Payment integration for premium listings

## Support

For issues or questions:
- Email: info@kimiarealty.com
- Check the code documentation
- Review API responses in browser devtools

## License

Copyright © 2025 Kimia Realty. All rights reserved.

---

Built with ❤️ using Next.js and modern web technologies.
