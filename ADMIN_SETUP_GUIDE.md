# Admin Portal Setup Guide

## Overview
This admin portal provides complete system control and management capabilities. Admins can:
- View all orders from all users
- Manage message delivery
- Control user subscriptions  
- Monitor user activity
- Access system statistics

## Configuration

### 1. Set Admin Credentials

Add these environment variables to your `.env.local`:

```
ADMIN_EMAIL=admin@cscwale.com
ADMIN_PASSWORD=your_secure_password_here
```

**Security Notes:**
- Use a strong, unique password
- Change the default email to your actual admin email
- Never commit `.env.local` to version control
- Store credentials securely in production

### 2. Firebase Setup

The admin system uses Firebase:
- Existing Firebase configuration in `.env.local` is used
- Users get a `role` field (either "user" or "admin")
- Admin users can manage all other users

### 3. Accessing Admin Portal

#### Login
1. Go to `/admin/login`
2. Enter admin email and password
3. You'll be redirected to `/admin/dashboard`

#### Admin Dashboard Features

**Overview Tab**
- System statistics
- Recent orders
- Platform overview
- Active users count

**Orders Tab**
- View all orders from all users
- Search and filter by status
- Update order status (pending → processing → completed/rejected)
- See user details for each order

**Messages Tab**
- View all system messages
- See message type (info, warning, success, urgent)
- Delete messages
- Filter by recipient

**Users Tab**
- View all registered users
- Check subscription tier
- Monitor last login
- See user status (active/inactive)
- Identify admin users

**Settings Tab**
- Configure notifications
- System maintenance tools
- Export data
- Advanced settings

## API Integration

### Admin-Only API Routes

All admin API routes now require authentication headers:

```
Authorization: Bearer <firebase_token>
X-User-ID: <admin_user_id>
```

#### Available Endpoints

1. **POST /api/admin/messages**
   - Send custom messages to users
   - Requires: userId, title, message, type
   - Types: info, warning, success, urgent

2. **POST /api/admin/orders**
   - Create orders for users
   - Requires: userId, serviceName, amount

3. **PUT /api/admin/subscriptions**
   - Update user subscription tier
   - Requires: userId, subscriptionTier
   - Tiers: free, lite, trail, pro

## Creating First Admin User

If you need to create the first admin user manually:

1. Go to Firebase Console
2. Create a user with admin email
3. In Firestore, create a document in `users` collection:

```json
{
  "uid": "user_id",
  "email": "admin@cscwale.com",
  "displayName": "System Administrator",
  "role": "admin",
  "createdAt": "timestamp",
  "lastLogin": "timestamp",
  "permissions": [
    "view_all_users",
    "manage_orders",
    "manage_messages",
    "manage_subscriptions",
    "system_settings"
  ]
}
```

## Security Best Practices

1. **Password Security**
   - Use strong, unique passwords
   - Change default credentials before production
   - Store in secure environment variables

2. **Access Control**
   - Only share admin credentials with trusted administrators
   - Rotate credentials periodically
   - Monitor admin login activities

3. **Data Protection**
   - Admin can view all user data - handle with care
   - Implement audit logging for important actions
   - Restrict admin access to necessary personnel only

4. **Session Management**
   - Admin sessions expire after inactivity
   - Log out after completing tasks
   - Don't share admin sessions

## Troubleshooting

### Admin Login Failed
- Check `.env.local` has correct ADMIN_EMAIL and ADMIN_PASSWORD
- Verify Firebase configuration is working
- Check browser console for detailed error messages

### Orders/Messages Not Loading
- Verify Firestore database is accessible
- Check user has admin role in Firestore
- Ensure X-User-ID header is being sent

### Authentication Header Errors
- Make sure Authorization header is set correctly
- Token should be prefixed with "Bearer "
- X-User-ID must match the authenticated admin's UID

## Next Steps

After setting up admin portal:

1. Create public user login (already partially built)
2. Implement audit logging for admin actions
3. Add email notification system
4. Set up analytics dashboards
5. Implement user role management UI
6. Add data export functionality

## Support

For issues or questions, check:
- Firebase Console logs
- Browser Developer Console
- Server-side logs in terminal
- TROUBLESHOOTING_GUIDE.md
