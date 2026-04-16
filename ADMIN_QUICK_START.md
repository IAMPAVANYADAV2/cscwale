# Admin Portal - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Configure Admin Credentials
Edit `.env.local` and set:
```
ADMIN_EMAIL=admin@cscwale.com
ADMIN_PASSWORD=SecurePassword123!
```

### Step 2: Start the Application
```bash
npm run dev
```

### Step 3: Access Admin Portal
- Go to: `http://localhost:3000/admin/login`
- Enter your admin credentials
- You'll be redirected to the admin dashboard

## 📊 Admin Dashboard Features

| Feature | Description | Location |
|---------|-------------|----------|
| **Overview** | System stats, recent orders, platform overview | Home tab |
| **Orders** | View/manage all user orders, change status | Orders tab |
| **Messages** | Send & manage system messages to users | Messages tab |
| **Users** | View all users, subscriptions, activity | Users tab |
| **Settings** | Configure notifications, export data | Settings tab |

## 🔑 Admin Credentials Location

```
.env.local
├── ADMIN_EMAIL
└── ADMIN_PASSWORD
```

### Default Demo Credentials
```
Email: admin@cscwale.com
Password: admin@123
```
⚠️ Change these before going to production!

## 🔗 Important Links

| Page | URL | Type |
|------|-----|------|
| Admin Login | `/admin/login` | Public |
| Admin Dashboard | `/admin/dashboard` | Admin Only |
| User Login | `/login` | Public |
| User Dashboard | `/dashboard` | User Only |

## ❌ Common Issues & Solutions

### Issue: "Invalid admin credentials"
**Solution:** 
- Check `.env.local` has correct ADMIN_EMAIL and ADMIN_PASSWORD
- Ensure no extra spaces in credentials
- Restart the dev server after changing `.env.local`

### Issue: Admin page shows "Redirecting..."
**Solution:**
- Clear browser cookies/cache
- Check that you're logged in as admin (not regular user)
- Look at browser console for error messages

### Issue: "Unauthorized - Admin access required"
**Solution:**
- Admin API routes need authentication headers
- The dashboard handles this automatically
- If calling API directly, include X-User-ID header

## 🎯 What's Included

✅ Admin login system with email/password
✅ Full admin dashboard with real-time data
✅ Order management (view & update status)
✅ Message management (send & delete)
✅ User management and monitoring
✅ System statistics & analytics
✅ Role-based API protection
✅ Settings and configuration panel

## 📚 Full Documentation

See **ADMIN_SETUP_GUIDE.md** for:
- Detailed feature documentation
- Security best practices
- API endpoint details
- Firebase setup instructions
- Troubleshooting guide
- Advanced configuration

## 🔒 Security Reminders

⚠️ **Before Production:**
1. Change default admin password
2. Use environment variables for credentials
3. Enable HTTPS/SSL
4. Implement audit logging
5. Set up regular backups
6. Monitor admin access logs

## 👤 User Types

### Admin
- View all orders, messages, users
- Manage system-wide settings
- Create/update user subscriptions
- Send system messages
- Full system control

### Regular User (Coming Next)
- View their own orders
- Receive messages
- Manage their profile
- See their subscription

## 🚀 Next Steps

1. ✅ Admin system complete
2. ⏳ Build public user login
3. ⏳ Create user profile management
4. ⏳ Build service ordering system
5. ⏳ Implement payment processing

---

**Last Updated:** April 2026
**Status:** Production Ready ✅
