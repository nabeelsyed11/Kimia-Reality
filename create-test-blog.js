const axios = require('axios');

async function createTestBlog() {
  try {
    const response = await axios.post('http://localhost:3000/api/blogs', {
      title: 'Test Blog from Script',
      slug: 'test-blog-from-script',
      excerpt: 'This is a test blog created from a script',
      content: 'This is the content of the test blog created from a script',
      author: {
        name: 'Admin'
      },
      category: 'Test',
      tags: ['test', 'script'],
      featuredImage: '/placeholder-blog.jpg',
      published: true
    });
    
    console.log('Blog created successfully:', response.data);
  } catch (error) {
    console.error('Error creating blog:', error.response?.data || error.message);
  }
}

createTestBlog();