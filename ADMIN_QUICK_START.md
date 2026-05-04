# Admin Portal - Quick Start Guide

## 🚀 Complete Admin System - Production Ready

Your CSC Wale admin dashboard is **fully functional** with complete CRUD operations for all website data.

---

## 5-Minute Quick Start

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Access Admin Dashboard
Navigate to: `http://localhost:3000/admin/dashboard`

### Step 3: Try a Feature
- Go to `/admin/plans` to manage subscription plans
- Go to `/admin/users` to manage users
- Go to `/admin/tools` to manage tools/services

---

## 📊 Complete Admin Features

| Feature | Location | Capabilities |
|---------|----------|-----|
| **Plans** | `/admin/plans` | Create, edit, delete, restore subscription plans |
| **Users** | `/admin/users` | Manage users, assign plans, block/unblock |
| **Tools** | `/admin/tools` | Manage tools/services by category |
| **Orders** | `/admin/orders` | View and process user orders |
| **Messages** | `/admin/messages` | Manage contact messages and replies |
| **Dashboard** | `/admin/dashboard` | Real-time statistics and overview |
| **Logs** | `/admin/logs` | Audit trail of all admin actions |
| **Trash** | `/admin/trash` | Manage deleted items and restore |

---

## 🎯 Core Management Pages

### Plans Management
- ✅ Create subscription plans (Trial, Light, Pro, etc.)
- ✅ Set features, pricing, and max tools
- ✅ Activate/deactivate plans
- ✅ Soft delete with restore
- ✅ URL: `/admin/plans`

### Users Management
- ✅ View all users with filters
- ✅ Edit user information
- ✅ Assign subscription plans
- ✅ Block/unblock users with reason
- ✅ Restore deleted users
- ✅ URL: `/admin/users`

### Tools Management
- ✅ Add new tools/services
- ✅ Categorize tools (cropper, pvc, automation, certificate)
- ✅ Set required plan level
- ✅ Enable/disable tools
- ✅ Manage display order
- ✅ URL: `/admin/tools`

### Orders Management
- ✅ View all orders with status
- ✅ Update order status
- ✅ Add admin notes
- ✅ Filter and search
- ✅ Soft delete and restore
- ✅ URL: `/admin/orders`

### Messages Management
- ✅ View contact messages
- ✅ Change message status
- ✅ Add admin replies
- ✅ Mark as spam or follow-up
- ✅ Archive messages
- ✅ URL: `/admin/messages`

---

## 🔗 Important Documentation

| Document | Purpose |
|----------|---------|
| `ADMIN_IMPLEMENTATION_GUIDE.md` | Complete implementation guide |
| `ADMIN_SYSTEM_ARCHITECTURE.md` | System design and architecture |
| `ADMIN_IMPLEMENTATION_SUMMARY.md` | What was built summary |
| `API_DOCUMENTATION.md` | API reference |

---
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
