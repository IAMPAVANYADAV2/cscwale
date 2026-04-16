# 🔐 Firestore Security Rules Configuration

## Problem Fixed
✅ Admin dashboard now fetches data through secure API endpoints instead of direct Firestore access
✅ Better security - all admin requests are authenticated with admin token
✅ Better error handling - graceful fallback for missing collections

## But You Still Need: Firestore Security Rules

To allow the admin dashboard and other services to read/write data safely, you need to set up Firestore security rules.

---

## 🔧 How to Set Up Firestore Security Rules

### Step 1: Go to Firebase Console

1. Open: https://console.firebase.google.com/
2. Select your project: **"csc-wale"**
3. Left sidebar → **Firestore Database**
4. Go to **Rules** tab

### Step 2: Replace the Rules

Copy and paste these rules:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ========== USERS COLLECTION ==========
    match /users/{uid} {
      // User can read/write their own document
      allow read, write: if request.auth.uid == uid;
      
      // Admin can read all user documents
      allow read: if isAdmin();
      
      // Admin can update user documents
      allow update: if isAdmin();
    }
    
    // ========== ORDERS COLLECTION ==========
    match /orders/{document=**} {
      // Users can read their own orders
      allow read: if isOwner() || isAdmin();
      
      // Users can create orders
      allow create: if request.auth != null;
      
      // Only admin can update orders
      allow update, delete: if isAdmin();
    }
    
    // ========== MESSAGES COLLECTION ==========
    match /messages/{document=**} {
      // Users can read their own messages
      allow read: if getUserId() == resource.data.userId || isAdmin();
      
      // Only admin can create messages
      allow create: if isAdmin();
      
      // Users can update their message status
      allow update: if getUserId() == resource.data.userId || isAdmin();
      
      // Only admin can delete messages
      allow delete: if isAdmin();
    }
    
    // ========== CUSTOM MESSAGES COLLECTION ==========
    match /customMessages/{document=**} {
      // Users can read their custom messages
      allow read: if getUserId() == resource.data.userId || isAdmin();
      
      // Only admin can create custom messages
      allow create: if isAdmin();
      
      // Only admin can update/delete
      allow update, delete: if isAdmin();
    }
    
    // ========== SUBSCRIPTIONS COLLECTION ==========
    match /subscriptions/{document=**} {
      // Users can read their own subscription
      allow read: if getUserId() == resource.data.userId || isAdmin();
      
      // Only admin can write subscriptions
      allow write: if isAdmin();
    }
    
    // ========== ADMIN COLLECTION ==========
    match /admin/{document=**} {
      // Only admin can read/write admin documents
      allow read, write: if isAdmin();
    }
    
    // ========== DEFAULT: DENY ALL ==========
    match /{document=**} {
      allow read, write: if false;
    }
    
    // ========== HELPER FUNCTIONS ==========
    function isAdmin() {
      // Check if user has admin role in Firestore
      return exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
        || request.auth.token.admin == true;
    }
    
    function isOwner() {
      return request.auth.uid == resource.data.userId;
    }
    
    function getUserId() {
      return request.auth.uid;
    }
  }
}
```

### Step 3: Click Publish

1. Review the rules in the editor
2. Click **"Publish"** button
3. Wait for the deployment to complete

---

## ✅ What These Rules Do

| Collection | Rule |
|-----------|------|
| `users` | Users can read/edit their own, admins read all |
| `orders` | Users create orders, only admin can update |
| `messages` | Users read their messages, only admin can send |
| `customMessages` | Only admin can create/manage |
| `subscriptions` | Users read their own, admin manages |
| `admin` | Only admin can access |
| Everything else | **DENIED** (secure by default) |

---

## 🔍 Helper Functions Explained

```javascript
// Check if user is an admin
function isAdmin() {
  return exists(...) && get(...).data.role == 'admin'
    || request.auth.token.admin == true;
}

// Check if user owns the resource
function isOwner() {
  return request.auth.uid == resource.data.userId;
}

// Get current user's ID
function getUserId() {
  return request.auth.uid;
}
```

---

## 🚨 Important Notes

1. **These rules assume:**
   - Admin users have `role: "admin"` in their Firestore document
   - User IDs are their Firebase UID
   - Data has `userId` field for ownership

2. **Test Mode Warning:**
   - If you're using "Test Mode" rules (open to everyone), change to these rules
   - Never go to production with open rules

3. **Custom Claims (Optional Advanced):**
   - For better security, set custom claims in Firebase Authentication:
     ```javascript
     admin.auth().setCustomUserClaims(uid, {admin: true});
     ```

---

## 🧪 Testing the Rules

After publishing, test by:

1. **Logged-in user accessing own data:** ✅ Should work
2. **User accessing another user's data:** ❌ Should fail
3. **Admin accessing any data:** ✅ Should work
4. **Anonymous user:** ❌ Should fail

---

## 📱 Testing in Firebase Console

Go to **Firestore Database** → **Rules** → **Simulate**

Example test:

1. **Simulation type:** Read
2. **Location:** `orders/order123`
3. **Authentication:** `Signed in` (uid: test_user)
4. **Click Simulate:** Shows if access is allowed

---

## 🐛 Troubleshooting

### "Permission denied" error on dashboard
- ✅ Publish the security rules above
- ✅ Wait 1-2 minutes for deployment
- ✅ Refresh the page

### Admin can't read orders
- ✅ Check admin `role` field is set to `"admin"`
- ✅ Verify admin document exists in `users` collection
- ✅ Check Rules tab shows rules are deployed

### Users can see others' orders
- ✅ This is a security issue! Update rules above
- ✅ Check `isOwner()` function is working

---

## 📚 Firebase Security Rules Documentation

For more info: https://firebase.google.com/docs/firestore/security/get-started

---

## ✨ Next Steps

After setting these rules:
1. ✅ Admin dashboard will load data correctly
2. ✅ User data will be private
3. ✅ Admin can manage everything
4. ✅ System is secure for production

---

**Status:** 🎯 You're ready to secure your database!
