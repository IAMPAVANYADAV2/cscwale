# 🚀 QUICK START - Firebase Setup in 5 Minutes

## Step-by-Step Firebase Setup

### 1️⃣ Create Firebase Project (या existing use करें)

1. Go to: https://console.firebase.google.com/
2. Click **"Add project"**
3. Project name दें (e.g., "CSC Wale")
4. Create करें

### 2️⃣ Enable Gmail Authentication

**Firebase Console में:**
1. Left sidebar से **"Authentication"** click करें
2. **"Sign-in method"** tab खोलें
3. **Google** को search करें और click करें
4. Toggle को **ON** करें
5. ईमेल address दें (आपका Gmail)
6. **Save** करें

```
✅ Gmail login method enabled
```

### 3️⃣ Get Firebase Configuration

**Firebase Console में:**
1. Top में **Settings icon** ⚙️ click करें
2. **"Project settings"** click करें
3. सबसे नीचे **"Your apps"** section में देखें
4. अगर कोई web app है तो उसे select करें, नहीं तो:
   - **"Add app"** click करें
   - **"Web"** select करें
   - App nickname दें (e.g., "CSC Wale Web")
   - "Register app" click करें
5. Firebase SDK config copy करें

### 4️⃣ Add Environment Variables

**अपने project root में .env.local फाइल बनाएं:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

Firebase से copy किए गए values को भरें।

**Example:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD_z1234_5678_abcd
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cscwale-12345.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cscwale-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=cscwale-12345.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcd1234efgh5678
```

### 5️⃣ Create Firestore Database

**Firebase Console में:**
1. Left sidebar से **"Firestore Database"** click करें
2. **"Create database"** click करें
3. **Production mode** select करें (for now)
4. Default location select करें (closest to you)
5. **"Create"** click करें

```
✅ Firestore Database ready
```

### 6️⃣ Test करें

```bash
npm run dev
```

Open करें:
- Browser: `http://localhost:3000/login`
- "Sign in with Gmail" button पर click करें
- अपना Gmail account select करें
- Dashboard पर auto-redirect होंगे

```
✅ Login working!
```

---

## 📋 What Happens Automatically

जब कोई user Gmail से login करता है:

1. Firebase Authentication validate करता है
2. User को authenticate करता है
3. Firestore में `users/{uid}` document बनता है:
   ```javascript
   {
     uid: "firebase_uid_here",
     email: "user@gmail.com",
     displayName: "User Name",
     photoURL: "https://...",
     role: "user",
     createdAt: timestamp,
     lastLogin: timestamp,
     subscriptionTier: "free",
     orders: [],
     customMessages: [],
     isActive: true
   }
   ```

4. User Dashboard में देख सकता है

---

## 🔧 Setting Up Database Structure

### Manual Test Data Add करने के लिए

Firebase Console में:

**1. Test Order Create करें:**

Firestore में:
1. **"+ Add collection"** click करें
2. Collection name: `orders`
3. **"Auto-ID"** के साथ document add करें
4. Fields:
   ```javascript
   {
     userId: "USER_UID_HERE", // अपना UID दे
     serviceName: "PVC Card Printing",
     status: "pending",
     amount: 500,
     createdAt: timestamp,
     updatedAt: timestamp
   }
   ```

**2. Test Message Create करें:**

Collection name: `customMessages`

Fields:
```javascript
{
  userId: "USER_UID_HERE",
  title: "Order Confirmed",
  message: "Your PVC card order has been confirmed",
  type: "success",
  createdAt: timestamp,
  isRead: false
}
```

Dashboard में refresh करने पर ये data दिखेगा।

---

## ❌ Common Issues & Fixes

### Issue: "Missing Firebase config"
**Fix:** 
- .env.local file check करें exists करती है
- All NEXT_PUBLIC_* variables set हैं
- Server restart करें: `npm run dev` फिर से

### Issue: "Gmail button console error"
**Fix:**
- Firebase config values copy-paste करते समय typo check करें
- Double quotes nहीं आने चाहिए

### Issue: "Can't see Orders/Messages"
**Fix:**
1. Firebase Console खोलें
2. Firestore > orders (या customMessages) collection देखें
3. Manually एक document add करें with same userId
4. Dashboard refresh करें

### Issue: "getAuth is not a function"
**Fix:**
- firebaseConfig.ts file में `getAuth` import है
- Auth को export किया है: `export const auth = getAuth(app);`

---

## 🗝️ Security Rules (Important!)

**Firebase Console में जाएं:**
1. Firestore Database select करें
2. **"Rules"** tab खोलें
3. यह paste करें:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Orders - users read their own
    match /orders/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
    }
    
    // Messages - users read their own
    match /customMessages/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
    }
  }
}
```

4. **"Publish"** click करें

```
✅ Security Rules Set!
```

---

## 📱 Testing Checklist

- [ ] Firebase project created
- [ ] Gmail auth enabled
- [ ] Configuration copied to .env.local
- [ ] Firestore database created
- [ ] npm run dev working
- [ ] Login page accessible
- [ ] Gmail sign-in working
- [ ] Dashboard showing
- [ ] User data visible in Firestore Console
- [ ] Security rules published

---

## 🎯 Next: Create API for Admin

After verify कि सब काम कर रहा है, आप create कर सकते हो:

**1. API to create orders (Admin के लिए)**
- Endpoint: `/api/orders/create`
- Admin automatically ko orders add करने दे

**2. API to send messages (Admin के लिए)**
- Endpoint: `/api/messages/send`
- Specific users को messages भेज सकें

**3. API to update order status**
- Pending → Processing → Completed

---

## 📞 Need Help?

Check this if something breaks:

1. **Browser Console**: Open F12 → Console tab → errors देखें
2. **Firestore Console**: Data structure verify करें
3. **.env.local**: सभी values correctly set हैं
4. **Firebase rules**: Deny नहीं कर रहे data

---

**You're all set! Your authentication system is ready! 🎉**
