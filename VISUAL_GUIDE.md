# 📊 Visual Guide - System Architecture & Data Flow

## Complete File Structure

```
cscwale/
├── app/
│   ├── api/
│   │   └── admin/                          ← Admin APIs
│   │       ├── orders/
│   │       │   └── route.ts               ← Create/Update/Get Orders
│   │       ├── messages/
│   │       │   └── route.ts               ← Send/Get Messages
│   │       └── subscriptions/
│   │           └── route.ts               ← Update Subscriptions
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx                ← Auth State Management
│   │
│   ├── login/
│   │   └── page.tsx                       ← Login Page (Gmail)
│   │
│   ├── dashboard/
│   │   └── page.tsx                       ← User Dashboard
│   │
│   ├── layout.tsx                         ← Root Layout (Updated)
│   ├── globals.css
│   └── page.tsx                           ← Home Page
│
├── components/
│   └── Header.tsx                         ← Header (Updated)
│
├── lib/
│   ├── firebaseConfig.ts                  ← Firebase Client Config (NEW)
│   ├── firebaseAdmin.ts                   ← Firebase Admin Config
│   ├── rateLimit.ts
│   └── validation.ts
│
├── middleware.ts                          ← Route Protection (NEW)
│
├── [DOCUMENTATION FILES] ← NEW & IMPORTANT
│   ├── IMPLEMENTATION_SUMMARY.md          ← Start here!
│   ├── FIREBASE_QUICK_START.md           ← Firebase setup (5 min)
│   ├── AUTHENTICATION_SETUP_GUIDE.md     ← Complete guide (detailed)
│   ├── API_DOCUMENTATION.md              ← API usage
│   └── TROUBLESHOOTING_GUIDE.md          ← Common issues
│
└── .env.local                             ← Add this! (Not in repo)
```

---

## 🔄 Data Flow Diagram

### User Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER VISITS APP                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │   Check useAuth() Hook       │
        │   (Is user logged in?)       │
        └──────────────────────────────┘
       /                               \
      /                                 \
     /                                   \
    ↓                                     ↓
┌──────────────┐                  ┌──────────────────┐
│  User Exists │                  │   No User        │
│  (Set)       │                  │   (null)         │
└──────────────┘                  └──────────────────┘
    │                                    │
    ↓                                    ↓
┌────────────────────┐          ┌────────────────────┐
│ Show Dashboard     │          │ Redirect to Login  │
│ - Orders          │          │ /login             │
│ - Messages        │          └────────────────────┘
│ - Settings        │                   │
└────────────────────┘                  ↓
                              ┌─────────────────────┐
                              │ Gmail Login Button  │
                              └─────────────────────┘
                                      │
                                      ↓
                              ┌─────────────────────┐
                              │ Firebase Auth Popup │
                              │ (Gmail OAuth)       │
                              └─────────────────────┘
                                      │
                                      ↓
                              ┌─────────────────────┐
                              │ Create/Update User  │
                              │ in Firestore        │
                              └─────────────────────┘
                                      │
                                      ↓
                              ┌─────────────────────┐
                              │ Store Auth Token    │
                              │ (Firebase)          │
                              └─────────────────────┘
                                      │
                                      ↓
                              ┌─────────────────────┐
                              │ Redirect Dashboard  │
                              └─────────────────────┘
```

---

## 🗄️ Firestore Database Structure

```
Firebase Project
│
├─── users collection
│    │
│    ├─── {uid: "abc123"}
│    │    ├── uid: "abc123"
│    │    ├── email: "user@gmail.com"
│    │    ├── displayName: "John Doe"
│    │    ├── photoURL: "https://..."
│    │    ├── role: "user"
│    │    ├── subscriptionTier: "free"
│    │    ├── createdAt: 2024-01-15T10:30:00Z
│    │    ├── lastLogin: 2024-01-20T14:45:00Z
│    │    ├── isActive: true
│    │    ├── orders: [array of order IDs]
│    │    └── customMessages: [array of message IDs]
│    │
│    └─── {uid: "def456"}
│         ├── uid: "def456"
│         ├── email: "other@gmail.com"
│         └── ...
│
├─── orders collection
│    │
│    ├─── {orderId: "order_001"}
│    │    ├── userId: "abc123"
│    │    ├── serviceName: "PVC Card Printing"
│    │    ├── amount: 500
│    │    ├── status: "processing"
│    │    ├── createdAt: 2024-01-18T10:00:00Z
│    │    └── updatedAt: 2024-01-19T14:00:00Z
│    │
│    └─── {orderId: "order_002"}
│         ├── userId: "abc123"
│         ├── serviceName: "Income Certificate"
│         ├── amount: 300
│         ├── status: "pending"
│         └── ...
│
└─── customMessages collection
     │
     ├─── {messageId: "msg_001"}
     │    ├── userId: "abc123"
     │    ├── title: "Order Status Update"
     │    ├── message: "Your order is ready for pickup"
     │    ├── type: "success"
     │    ├── createdAt: 2024-01-19T09:00:00Z
     │    └── isRead: false
     │
     └─── {messageId: "msg_002"}
          ├── userId: "abc123"
          ├── title: "Special Offer Available"
          ├── message: "50% discount on PVC cards this week"
          ├── type: "info"
          ├── createdAt: 2024-01-20T08:00:00Z
          └── isRead: true
```

---

## 🚀 Request-Response Cycle

### Example: User Loads Dashboard

```
1. User visits: http://localhost:3000/dashboard
   ↓
2. Next.js loads dashboard/page.tsx
   ↓
3. Component calls useAuth() hook
   ↓
4. AuthContext checks if user logged in
   ├─ If not → redirect to /login
   └─ If yes → continue
   ↓
5. Dashboard component calls:
   ├─ getDocs(collection(db, "orders"))
   ├─ getDocs(collection(db, "customMessages"))
   └─ getDocs(doc(db, "users", uid))
   ↓
6. Firestore returns data
   ├─ 3 orders
   ├─ 2 messages
   └─ User profile
   ↓
7. React renders dashboard with data
   ├─ Shows overview tab with stats
   ├─ Shows orders in table
   ├─ Shows messages in list
   └─ Shows user profile in settings
   ↓
8. User interacts with page
   └─ Click logout → calls logout() → clears auth
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│ Step 1: Initial Load                                │
├─────────────────────────────────────────────────────┤
│ app/layout.tsx wraps with <AuthProvider>            │
│ AuthProvider: useEffect → onAuthStateChanged()      │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│ Step 2: Firebase Checks Stored Token                │
├─────────────────────────────────────────────────────┤
│ Browser localStorage has Firebase token?            │
│ If YES → Auto-login                                 │
│ If NO → Stay logged out                             │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│ Step 3: Set Global Auth State                       │
├─────────────────────────────────────────────────────┤
│ AuthContext:                                        │
│ - user = Firebase User object                       │
│ - userProfile = Firestore user document             │
│ - loading = false                                   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────┐
│ Step 4: Components Access Auth                      │
├─────────────────────────────────────────────────────┤
│ const { user } = useAuth()                          │
│ Can now use user.email, user.uid, etc              │
└─────────────────────────────────────────────────────┘
```

---

## 🛣️ Route Protection Strategy

```
User Visits URL
    │
    ↓
Next.js Router
    │
    ├──→ /                    ← Public ✅
    ├─→ /login                ← Public ✅
    ├─→ /pvc                  ← Public ✅
    ├─→ /tools                ← Public ✅
    │
    └─→ /dashboard            ← Protected 🔒
         │
         ↓
      Load page.tsx
         │
         ↓
      useAuth() Hook
         │
    ┌────┴────┐
    │          │
    ↓          ↓
  user?    router.push("/login")
    │
    ↓
  Show Dashboard
```

---

## 📡 API Structure

### Admin Creating Order

```
Admin System
    │
    ↓
POST /api/admin/orders
{
  "userId": "abc123",
  "serviceName": "PVC Card",
  "amount": 500
}
    │
    ↓
Next.js API Route
   (app/api/admin/orders/route.ts)
    │
    ├─→ Validate data
    ├─→ Check auth (if implemented)
    ├─→ Create Firestore document
    └─→ Return response
    │
    ↓
Firebase Admin SDK
    │
    ↓
users/{abc123}
  orders: [..., new_order_id]
    │
    ↓
orders/{new_order_id}
{
  userId: "abc123",
  serviceName: "PVC Card",
  amount: 500,
  status: "pending",
  createdAt: timestamp,
  updatedAt: timestamp
}
    │
    ↓
User's Dashboard
    │
    ↓
Orders Tab
    │
    ↓
Shows new order in list
```

---

## 🔄 Component Hierarchy

```
RootLayout
├─ AuthProvider (Context Wrapper)
│  │
│  ├─ Header
│  │  ├─ Logo
│  │  ├─ Navigation Menu
│  │  └─ Auth Buttons/Profile
│  │      └─ useAuth() hook
│  │
│  └─ Page Content
│     ├─ Page (home)
│     ├─ LoginPage
│     │  └─ useAuth() hook
│     │
│     └─ DashboardPage
│        ├─ useAuth() hook (protection)
│        ├─ useEffect (data fetching)
│        │
│        └─ Tabs
│           ├─ Overview
│           │  ├─ Stats Cards
│           │  └─ Recent Orders
│           │
│           ├─ Orders
│           │  └─ Orders Table
│           │
│           ├─ Messages
│           │  └─ Messages List
│           │
│           └─ Settings
│              ├─ Profile Info
│              ├─ Subscription Plans
│              │
│              └─ Preferences
```

---

## 🎚️ State Management Flow

```
                     AuthContext
                          │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ↓                 ↓                 ↓
       user            userProfile         loading
       (Firebase)      (Firestore)        (boolean)
          │                 │                 │
          ├─ uid            ├─ uid            └─ true/false
          ├─ email          ├─ email
          ├─ displayName    ├─ displayName
          ├─ photoURL       ├─ photoURL
          └─ emailVerified  ├─ role
                            ├─ subscriptionTier
                            └─ createdAt
                            
              ↓
          Components use useAuth()
              │
        ┌─────┼─────┐
        │     │     │
        ↓     ↓     ↓
      Header Login Dashboard
      
      All components have access to:
      { user, userProfile, loading, logout }
```

---

## 🔌 API Endpoints Reference

```
BASE: http://localhost:3000

┌─ Orders Management
├─ POST   /api/admin/orders          → Create order
├─ PUT    /api/admin/orders          → Update order status
├─ GET    /api/admin/orders          → Get all orders
└─ GET    /api/admin/orders?userId=X → Get user orders

┌─ Messages Management
├─ POST   /api/admin/messages          → Send message
├─ GET    /api/admin/messages          → Get all messages
├─ GET    /api/admin/messages?userId=X → Get user messages
└─ PUT    /api/admin/messages          → Mark as read

┌─ Subscriptions
└─ PUT    /api/admin/subscriptions   → Update subscription
```

---

## 🔒 Security Layers

```
User Request
    │
    ↓
┌─────────────────────────────────────┐
│ Layer 1: Firebase Authentication    │ ← Gmail login
│ (Token validation)                  │
└─────────────────────────────────────┘
    │
    ↓
┌─────────────────────────────────────┐
│ Layer 2: Route Protection           │ ← useAuth() hook
│ (Client-side)                       │
└─────────────────────────────────────┘
    │
    ↓
┌─────────────────────────────────────┐
│ Layer 3: Firestore Rules            │ ← userId match
│ (Server-side)                       │
└─────────────────────────────────────┘
    │
    ↓
┌─────────────────────────────────────┐
│ Layer 4: API Validation             │ ← Check parameters
│ (Optional admin check)              │
└─────────────────────────────────────┘
    │
    ↓
┌─────────────────────────────────────┐
│ Layer 5: Data Returned              │ ← Only user's data
│ (Secure connection)                 │
└─────────────────────────────────────┘
```

---

## 📊 Data Flow - Complete Journey

```
User Lands → Login Page → Gmail OAuth → Firebase Auth
                                              │
                                              ↓
                              Create User in Firestore
                                              │
                                              ↓
                              Store Auth Token (localStorage)
                                              │
                                              ↓
                              AuthContext Updates
                                              │
                                  ┌───────────┴───────────┐
                                  │                       │
                                  ↓                       ↓
                            user != null            loading = false
                                  │
                                  ↓
                          Redirect to Dashboard
                                  │
                          ┌────────┼────────┐
                          │        │        │
                          ↓        ↓        ↓
                        Overview Orders Messages Settings
                          │        │        │        │
           ┌──────────────┼────────┼────────┼────────┴─────┐
           │              │        │        │              │
           ↓              ↓        ↓        ↓              ↓
         Fetch         Fetch    Fetch   Display      Get User
         Stats        Orders   Messages Profile     Data
           │            │        │        │           │
           └────────┬───┴────┬───┴────┬───┴─────┬─────┘
                    │        │        │         │
                    ↓        ↓        ↓         ↓
              Firestore Queries (with userId filter)
                    │        │        │         │
                    ↓        ↓        ↓         ↓
              Only User's Data Returned
                    │        │        │         │
                    └────────┴────────┴────────┘
                              │
                              ↓
                      Render Dashboard
                              │
                              ↓
                         User Sees:
                    - Personal Dashboard
                    - Their Orders
                    - Their Messages
                    - Their Profile
```

---

## ✨ How Everything Works Together

```
1. USER SIGNS IN
   └─ Gmail OAuth via Firebase

2. FIREBASE AUTHENTICATES
   └─ Validates Gmail credentials
   └─ Returns auth token
   └─ Stores in localStorage

3. AUTHCONTEXT DETECTS
   └─ onAuthStateChanged fires
   └─ Fetches user profile from Firestore
   └─ Sets global state

4. DASHBOARD LOADS
   └─ Checks useAuth() hook
   └─ Fetches user's orders
   └─ Fetches user's messages
   └─ Displays all data

5. USER INTERACTS
   └─ Can view orders/messages
   └─ Can manage settings
   └─ Can logout

6. ADMIN ACTS
   └─ Creates order via API
   └─ Sends message to user
   └─ User gets notification

7. USER SEES UPDATE
   └─ Refreshes dashboard
   └─ New order appears
   └─ New message appears
```

---

This visual guide shows how every component, API, and data point connects! 🎯
