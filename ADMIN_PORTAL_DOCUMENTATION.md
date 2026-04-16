# 🛡️ CSC Wale Admin Portal System

## Overview

A complete admin management system for CSC Wale platform with full control over orders, users, messages, and system settings.

## ✨ Features

### 👨‍💼 Admin Authentication
- Email/password based login
- Secure credential storage in environment variables
- Role-based access control
- Admin-only dashboard access

### 📊 Dashboard Components

#### Overview Tab
- **System Statistics**
  - Total active users
  - Total orders in system
  - Total revenue generated
  - Pending & completed orders count
- **Recent Activity**
  - Latest 5 orders
  - Quick overview metrics
  - Platform health status

#### Orders Tab
- **Order Management**
  - View all orders from all users
  - Search by email or service name
  - Filter by status (pending, processing, completed, rejected)
  - Update order status in real-time
  - View user details per order
- **Order Data**
  - Order ID
  - Customer email
  - Service name
  - Amount
  - Order status
  - Created date

#### Messages Tab
- **Message Management**
  - Send system-wide messages to users
  - Delete messages
  - Message types: info, warning, success, urgent
  - View all system messages
  - Color-coded by message type
  - Timestamp tracking

#### Users Tab
- **User Monitoring**
  - View all registered users
  - Search users by email
  - Track user activity
  - Check subscription tier (free, lite, trail, pro)
  - Monitor active/inactive status
  - View last login date
  - Identify admin users

#### Settings Tab
- **Configuration**
  - Email notifications toggle
  - System alerts configuration
  - Data export functionality
  - System maintenance tools
  - Advanced settings panel

## 🚀 Quick Start

### 1. Set Environment Variables

Edit `.env.local`:
```env
ADMIN_EMAIL=admin@cscwale.com
ADMIN_PASSWORD=your_secure_password_here
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Admin Portal
Navigate to: `http://localhost:3000/admin/login`

### 4. Login
Enter admin credentials:
- Email: `admin@cscwale.com`
- Password: the password you set

## 📂 File Structure

```
app/
├── api/
│   ├── auth/
│   │   └── admin-login/
│   │       └── route.ts          # Admin login endpoint
│   └── admin/
│       ├── messages/
│       │   └── route.ts          # Admin message API
│       ├── orders/
│       │   └── route.ts          # Admin order API
│       └── subscriptions/
│           └── route.ts          # Admin subscription API
├── admin/
│   ├── login/
│   │   └── page.tsx              # Admin login page
│   └── dashboard/
│       └── page.tsx              # Admin dashboard
├── contexts/
│   └── AuthContext.tsx           # User authentication context
└── ...
lib/
├── adminAuth.ts                  # Admin auth utilities
├── firebaseConfig.ts             # Firebase config
└── firebaseAdmin.ts              # Firebase admin SDK
components/
└── Header.tsx                    # Updated with admin link
```

## 🔐 Security Architecture

### Authentication Flow
```
1. Admin submits email & password
   ↓
2. Validated against ADMIN_EMAIL & ADMIN_PASSWORD
   ↓
3. Firebase authentication created
   ↓
4. Firestore document created with role: "admin"
   ↓
5. Admin redirected to dashboard
   ↓
6. ID token stored for API calls
```

### API Protection
- All admin APIs require `X-User-ID` header
- All admin APIs require valid Firebase token
- Role verification on every request
- Non-admin users get 401 Unauthorized

### Role-Based Access Control
```
role: "admin"  → Full system access
role: "user"   → Limited to own data only
```

## 📊 Data Flow

### Orders Management
```javascript
Admin Dashboard → Firestore Query → Display All Orders
                                 → Update Order Status
                                 → Real-time Refresh
```

### Message System
```javascript
Admin → Create Message → Save to Firestore → User Receives
                      → Send API Call
```

### User Monitoring
```javascript
Admin Dashboard → Query all users → Display Stats
                                 → Track Activity
                                 → Monitor Subscriptions
```

## 🔧 API Endpoints

### Authentication
**POST** `/api/auth/admin-login`
```json
{
  "email": "admin@cscwale.com",
  "password": "password123"
}
```

### Admin Routes (Require Auth)

**POST** `/api/admin/messages`
```json
{
  "userId": "user_id",
  "title": "Message Title",
  "message": "Message content",
  "type": "info|warning|success|urgent"
}
```

**POST** `/api/admin/orders`
```json
{
  "userId": "user_id",
  "serviceName": "Service Name",
  "amount": 500
}
```

**PUT** `/api/admin/subscriptions`
```json
{
  "userId": "user_id",
  "subscriptionTier": "free|lite|trail|pro"
}
```

## 🎨 UI Components

- **Modern Dashboard** - Dark theme with purple accents
- **Real-time Search** - Instant filtering
- **Status Badges** - Color-coded status indicators
- **Data Tables** - Sortable, searchable user data
- **Statistics Cards** - Metric visualization
- **Responsive Design** - Works on all devices

## 📱 Responsive Design

- ✅ Mobile friendly
- ✅ Tablet optimized
- ✅ Desktop full-featured
- ✅ Touch-friendly controls
- ✅ Adaptive layouts

## 🔄 Real-time Features

- Live Firestore data sync
- Auto-refresh on tab changes
- Manual refresh button
- Real-time order status updates
- Live user monitoring

## 💾 Data Storage

Uses **Firestore Database**:
- `users/` - User profiles with role information
- `orders/` - All orders with status tracking
- `messages/` - System messages to users
- `customMessages/` - Admin messages

## 🚨 Error Handling

- Input validation on all forms
- Network error recovery
- User-friendly error messages
- Console logging for debugging
- Retry mechanisms for failed requests

## 🔍 Search & Filter

### Orders Tab
- Search by: email, service name
- Filter by: status (all, pending, processing, completed, rejected)
- Real-time filtering

### Users Tab
- Search by: email
- Filter by: role, status, tier
- Real-time search results

## 📈 Monitoring & Analytics

Dashboard tracks:
- Total platform users
- Active user count
- Total orders processed
- Total revenue generated
- Order statistics
- User engagement

## ⚙️ Configuration

### Environment Variables
```
ADMIN_EMAIL=              # Admin login email
ADMIN_PASSWORD=           # Admin login password
NEXT_PUBLIC_FIREBASE_*    # Firebase config
FIREBASE_*                # Firebase admin SDK
```

### Firestore Collections
```
users/
├── uid
│   ├── email
│   ├── role: "admin" | "user"
│   ├── displayName
│   ├── lastLogin
│   └── ...

orders/
├── orderId
│   ├── userId
│   ├── serviceName
│   ├── amount
│   ├── status
│   └── ...

messages/
├── messageId
│   ├── userId
│   ├── title
│   ├── message
│   ├── type
│   └── ...
```

## 🔒 Best Practices

1. **Password Security**
   - Use strong passwords (12+ chars, mix of case, numbers, symbols)
   - Change default credentials before production
   - Store in secure environment variables
   - Never commit credentials to git

2. **Access Control**
   - Only provide admin access to trusted users
   - Regularly audit admin activity
   - Use different admins for different functions
   - Log all admin actions

3. **Data Protection**
   - Enable HTTPS in production
   - Use firewall rules
   - Regular data backups
   - Encrypt sensitive data

4. **Monitoring**
   - Set up admin action logging
   - Monitor failed login attempts
   - Track order changes
   - Alert on suspicious activity

## 🐛 Troubleshooting

### "Invalid admin credentials"
- Check `.env.local` file
- Verify no extra spaces in credentials
- Restart dev server after changing `.env.local`
- Browser cache may be stale

### Dashboard not loading
- Check Firebase configuration
- Verify Firestore database is accessible
- Check browser console for errors
- Ensure user has admin role in Firestore

### Orders not updating
- Verify admin authentication
- Check Firestore permissions
- Ensure order ID is valid
- Check network requests in browser dev tools

### API returns 401 Unauthorized
- Check authorization headers
- Verify X-User-ID header is set
- Confirm user role is "admin"
- Verify token hasn't expired

## 📚 Related Documentation

- [ADMIN_SETUP_GUIDE.md](ADMIN_SETUP_GUIDE.md) - Detailed setup & APIs
- [ADMIN_QUICK_START.md](ADMIN_QUICK_START.md) - 5-minute quick start
- [AUTHENTICATION_SETUP_GUIDE.md](AUTHENTICATION_SETUP_GUIDE.md) - Auth setup
- [FIREBASE_QUICK_START.md](FIREBASE_QUICK_START.md) - Firebase setup
- [README.md](README.md) - Main project documentation

## 🎯 Next Steps

1. ✅ Admin system complete
2. ⏳ Build public user login
3. ⏳ Add user profile management
4. ⏳ Implement service ordering
5. ⏳ Add payment processing
6. ⏳ Set up email notifications
7. ⏳ Add audit logging

## 🆘 Support

For issues:
1. Check troubleshooting section above
2. Review error messages in browser console
3. Check Firebase Console
4. Review API response in Network tab
5. Check environment variables

## 📝 License

CSC Wale Platform - Private

## 👨‍💻 Developer Notes

- Built with Next.js 14+
- Uses Firebase for auth & database
- Firestore for real-time data
- Tailwind CSS for styling
- React for UI components
- TypeScript for type safety

---

**Last Updated:** April 2026  
**Status:** ✅ Production Ready  
**Version:** 1.0
