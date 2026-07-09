# How to Access Blog Admin Panel

## Quick Steps

### 1. Make Sure Servers Are Running

**Backend Server (Port 5000):**
```bash
cd server
npm start
```

**Frontend Server (Port 3000):**
```bash
cd client
npm start
```

### 2. Access Admin Panel

1. Open your browser
2. Go to: **http://localhost:3000/admin**
3. Enter password: **`admin123`** (default)
4. Click "Login"

### 3. Access Blog Management

Once logged in:
1. Look at the **left sidebar**
2. Click on **"Blogs"** (last item in the sidebar)
3. You'll see the Blog Management interface

## Blog Admin Features

### View All Blogs
- See a table of all your blogs
- Columns: Title, Category, Date, Featured status
- Shows excerpt preview

### Add New Blog
1. Click **"+ Add New Blog"** button (top right)
2. Fill in the form:
   - **Title*** (required)
   - **Excerpt** (optional - auto-generated if empty)
   - **Content*** (required - supports markdown)
   - **Author** (defaults to "Venus Tech Team")
   - **Category** (dropdown: AI & Technology, ESG, etc.)
   - **Image URL** (path to blog image)
   - **Date** (defaults to today)
   - **Slug** (auto-generated from title, editable)
   - **Featured** (checkbox)
3. Click **"Create Blog"**

### Edit Existing Blog
1. Find the blog in the table
2. Click **"Edit"** button
3. Modify any fields
4. Click **"Update Blog"**

### Delete Blog
1. Find the blog in the table
2. Click **"Delete"** button
3. Confirm deletion

## Default Login Credentials

- **Password**: `admin123`

To change the password, edit `server/.env`:
```
ADMIN_PASSWORD=your-new-password
ADMIN_TOKEN=your-secure-token
```

## Troubleshooting

### Can't Access Admin Panel?
- ✅ Make sure backend server is running on port 5000
- ✅ Make sure frontend server is running on port 3000
- ✅ Check browser console for errors
- ✅ Try: http://localhost:3000/admin

### Login Fails?
- ✅ Verify backend server is running
- ✅ Check password is correct (default: `admin123`)
- ✅ Check browser console for error messages
- ✅ Verify API is accessible: http://localhost:5000/api/admin/login

### Blog Section Not Showing?
- ✅ Make sure you're logged in
- ✅ Check that "Blogs" appears in the sidebar
- ✅ Refresh the page
- ✅ Check browser console for errors

### Can't Save Blogs?
- ✅ Make sure backend server is running
- ✅ Check that you're authenticated (token saved)
- ✅ Verify API endpoint is working
- ✅ Check browser console for error messages

## Blog Data Storage

Blogs are stored in **Firestore** (if using cloud function) or can be stored in the backend database. The blog management system uses the `/api/blogs` endpoints.

## Quick Test

To verify everything works:
1. Start both servers
2. Go to http://localhost:3000/admin
3. Login with `admin123`
4. Click "Blogs" in sidebar
5. Click "+ Add New Blog"
6. Fill in a test blog
7. Click "Create Blog"
8. You should see it in the table!

