# Quick Setup Guide for Kimia Realty

## ✅ What's Been Built

Your complete Kimia Realty website is ready! Here's what you have:

### Frontend Features
- 🏠 **Homepage** with hero section, search, and featured properties
- 🔍 **Property Listings** with advanced filters
- 📝 **Property Details** with image galleries
- 📰 **Blog Section** with articles
- 💬 **AI Chatbot** for customer support
- 📧 **Contact Page**
- 📱 **Fully Responsive** design

### Admin Panel
- 📊 **Dashboard** with analytics
- ➕ **Add/Edit/Delete Properties**
- ✍️ **Manage Blog Posts**
- 👤 **User-friendly Interface**

## 🚀 Getting Started

### Step 1: MongoDB Setup

You have **two options**:

#### Option A: MongoDB Atlas (Recommended - Free & Easy)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a **free account**
3. Create a **new cluster** (select Free tier)
4. Click **"Connect"**
5. Choose **"Connect your application"**
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)
7. Open `.env.local` file in your project
8. Replace the `MONGODB_URI` with your connection string
9. Replace `<password>` with your actual password
10. Replace `test` with `kimia-realty`

Example:
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/kimia-realty
```

#### Option B: Local MongoDB

1. Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. The default connection string is already in `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/kimia-realty
   ```

### Step 2: Add Your Logo

1. Save your Kimia Realty logo image
2. Place it in: `public/logo.png`
3. The website will automatically use it!

### Step 3: Optional - OpenAI API (for Advanced AI Chatbot)

If you want the chatbot to use real AI:

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to `.env.local`:
   ```
   OPENAI_API_KEY=sk-...your-key-here...
   ```

**Note**: The chatbot works without this using smart fallback responses!

### Step 4: Start Development

The server is already running at **http://localhost:3000**

You can click the preview button to see your website!

## 📱 Navigating Your Website

### Public Pages
- **Homepage**: http://localhost:3000
- **Properties**: http://localhost:3000/properties
- **Blog**: http://localhost:3000/blog
- **Contact**: http://localhost:3000/contact

### Admin Panel
- **Dashboard**: http://localhost:3000/admin
- **Manage Properties**: http://localhost:3000/admin/properties
- **Manage Blogs**: http://localhost:3000/admin/blogs

## 🎯 Next Steps

### 1. Add Sample Data

**Add Your First Property:**
1. Go to: http://localhost:3000/admin/properties
2. Click "Add Property"
3. Fill in the details
4. For images, you can use placeholder URLs like:
   - `https://images.unsplash.com/photo-1570129477492-45c003edd2be`
   - Or upload to [Imgur](https://imgur.com/upload) and use those URLs

**Create Your First Blog Post:**
1. Go to: http://localhost:3000/admin/blogs
2. Click "New Post"
3. Write your content
4. Publish it!

### 2. Customize

- **Colors**: Edit Tailwind classes in components (look for `blue-600`, `cyan-500`)
- **Content**: Update text in components
- **Logo**: Replace `public/logo.png`
- **Contact Info**: Update in `components/Footer.tsx`

### 3. Deploy to Production

When ready to go live:

1. Push code to GitHub
2. Deploy to [Vercel](https://vercel.com) (free!)
3. Add environment variables in Vercel dashboard
4. Your site will be live!

## 🎨 Features You Can Use Now

### AI Chatbot
- Click the blue chat button (bottom-right)
- Ask questions like:
  - "I want to buy a house"
  - "Show me rental properties"
  - "What's the buying process?"

### Search & Filters
- Search properties by location
- Filter by price, bedrooms, property type
- View property details with image galleries

### Admin Features
- Full CRUD operations for properties
- Blog post management
- Dashboard analytics
- Featured property marking

## 🐛 Troubleshooting

**Can't see the website?**
- Make sure the server is running (you should see "Ready" in terminal)
- Try refreshing the browser
- Check http://localhost:3000

**MongoDB Connection Error?**
- Check your `.env.local` file has correct `MONGODB_URI`
- Make sure MongoDB is running (if using local)
- Verify network access in MongoDB Atlas

**Build Errors?**
- Run `npm install` again
- Delete `.next` folder and restart: `npm run dev`

## 📚 File Structure

```
- app/
  - page.tsx              → Homepage
  - properties/           → Property pages
  - blog/                 → Blog pages
  - admin/                → Admin panel
  - api/                  → Backend API
- components/             → Reusable UI components
- models/                 → Database models
- lib/                    → Utility functions
- public/                 → Static files (put logo here!)
```

## 🎉 You're All Set!

Your Kimia Realty website is complete and running! 

**Preview your website** using the button in your IDE panel, or visit http://localhost:3000 in your browser.

Need help? Check the main README.md for detailed documentation.

Happy selling! 🏡
