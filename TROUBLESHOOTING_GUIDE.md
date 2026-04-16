# 🔧 Troubleshooting Guide

## Common Issues & Solutions

---

## 🔴 Login Issues

### Issue 1: "Gmail button not showing" or "Sign in button not working"

**Check These:**

1. **Is .env.local file created?**
   ```bash
   # Check if file exists in root directory
   ls .env.local
   ```

2. **All environment variables set?**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   ```

3. **Is server running?**
   ```bash
   npm run dev
   ```

4. **Browser cache issue?**
   - Press Ctrl+Shift+Del (Clear Cache)
   - Or open in Incognito/Private tab

**Solution:**
- Verify all env variables
- Restart server: `npm run dev`
- Hard refresh: Ctrl+F5

---

### Issue 2: "Gmail popup not opening"

**Chrome might be blocking popups.**

1. Check address bar for popup blocker icon
2. Click and select "Always allow popups"
3. Refresh page and try again

Or check browser console (F12 → Console) for errors.

---

### Issue 3: "Invalid OAuth credentials" error

**Firebase not authenticating properly.**

1. Open Firebase Console
2. Go to Authentication → Sign-in method
3. Verify **Google** is enabled (toggle ON)
4. Check Email address is verified

If still failing:
- Delete web app from settings
- Add new web app
- Copy fresh configuration
- Update .env.local

---

### Issue 4: "Redirects to login even after signing in"

**Auth state not properly loading.**

Solution:
1. Clear browser cookies: Ctrl+Shift+Del
2. Clear localStorage:
   ```javascript
   // Open browser console and run:
   localStorage.clear();
   sessionStorage.clear();
   // Refresh page
   ```
3. Restart server and try again

---

## 🔴 Dashboard Issues

### Issue 5: "Dashboard is blank or shows loading forever"

**Check these steps:**

1. **Are you logged in?**
   - Check if user email shows in top-right corner
   - If not → Login page की तरफ जाएं

2. **Check browser console for errors** (F12 → Console)
   - Copy error message
   - Search in AUTHENTICATION_SETUP_GUIDE.md

3. **Is AuthProvider wrapping app?**
   - Check `app/layout.tsx`
   - Should have: `<AuthProvider>`

---

### Issue 6: "Orders tab shows nothing"

**Orders data not in Firestore.**

**Solution:**
1. Open Firebase Console
2. Go to Firestore Database
3. Check if `orders` collection exists
4. If not, create it manually
5. Add test order with your userId:
   ```javascript
   {
     userId: "your_firebase_uid",
     serviceName: "Test Service",
     amount: 100,
     status: "pending",
     createdAt: timestamp,
     updatedAt: timestamp
   }
   ```

How to find your Firebase UID:
```javascript
// Open browser console while logged in and run:
alert(JSON.stringify(localStorage.getItem('firebase:authUser:...')));
// Or check Firebase Console → Authentication tab
```

---

### Issue 7: "Messages tab shows nothing"

**Same as orders issue.**

1. Create `customMessages` collection in Firestore
2. Add test message:
   ```javascript
   {
     userId: "your_firebase_uid",
     title: "Test Message",
     message: "This is a test",
     type: "info",
     createdAt: timestamp,
     isRead: false
   }
   ```

---

### Issue 8: "Settings tab not showing profile info"

**Profile data not loading.**

Check Firestore:
1. Firebase Console → Firestore → users collection
2. Your document (same as uid): is it there?
3. Does it have your email and displayName?

If not, manually create it:
```javascript
{
  uid: "your_firebase_uid",
  email: "your@gmail.com",
  displayName: "Your Name",
  photoURL: "https://...",
  role: "user",
  createdAt: timestamp,
  subscriptionTier: "free",
  isActive: true
}
```

---

## 🔴 API Issues

### Issue 9: "API returns 400 error"

**Missing or wrong parameters.**

Check:
1. **Are all required fields provided?**
   ```javascript
   // ✅ Correct
   {
     userId: "abc123",
     serviceName: "PVC",
     amount: 500
   }

   // ❌ Wrong - missing userId
   {
     serviceName: "PVC",
     amount: 500
   }
   ```

2. **Is data type correct?**
   ```javascript
   // ✅ Correct
   { amount: 500 } // number

   // ❌ Wrong
   { amount: "500" } // string
   ```

3. **Check API Response:**
   - Copy error message
   - Look in documentation

---

### Issue 10: "POST request returning 500 error"

**Server error.**

Check:
1. **Is firebaseAdmin initialized?**
   - Check `lib/firebaseAdmin.ts`

2. **Environment variables for admin SDK?**
   ```env
   FIREBASE_PROJECT_ID=xxx
   FIREBASE_CLIENT_EMAIL=xxx
   FIREBASE_PRIVATE_KEY=xxx
   ```

3. **Check console logs:**
   ```bash
   npm run dev  # Look for error messages
   ```

4. **Check Firestore security rules:**
   - Might be blocking write permissions

---

### Issue 11: "Can't fetch data - CORS error"

**Cross-origin issue (unlikely in Next.js).**

Solution:
1. Make sure using `/api/` route
2. Not calling external API directly from client
3. Use API middleware

---

## 🔴 Database Issues

### Issue 12: "Can't write to Firestore - Permission Denied"

**Security rules blocking writes.**

Check Firebase Console:
1. Firestore Database → Rules tab
2. Make sure rules include:
   ```javascript
   match /orders/{document=**} {
     allow create: if request.auth.uid != null;
   }
   ```

3. Click "Publish" if changed

---

### Issue 13: "Data structure mismatch"

**Firestore data doesn't match code expectations.**

**Solution:**
1. Check expected structure in AUTHENTICATION_SETUP_GUIDE.md
2. Compare with actual data in Firestore
3. Fix mismatches or update code to match

**Common issues:**
- ❌ `userId` vs `uid` (make it consistent)
- ❌ `createdAt` as string instead of timestamp
- ❌ Missing required fields

---

## 🔴 Performance Issues

### Issue 14: "Dashboard loading very slowly"

**Too many Firestore reads.**

Solution:
1. Add pagination to orders/messages
2. Use `.limit(10)` in queries
3. Only fetch needed data

Example:
```javascript
const q = query(
  ordersRef,
  where("userId", "==", userId),
  limit(10),  // Only get 10 orders
  orderBy("createdAt", "desc")
);
```

---

### Issue 15: "Getting "Quota exceeded" error"

**Too many database calls.**

Solution:
1. Implement caching
2. Reduce query frequency
3. Use `.limit()` and pagination
4. Consider upgrading Firebase plan

---

## 🔴 Authentication Issues

### Issue 16: "Logout not working"

**Logout button doesn't remove authentication.**

Check:
1. **Is logout function being called?**
   ```typescript
   // In dashboard.tsx
   await logout(); // Should clear user
   ```

2. **After logout, are you redirected?**
   ```typescript
   router.push("/login");
   ```

3. **Try manual clear:**
   ```javascript
   // Browser console:
   localStorage.clear();
   sessionStorage.clear();
   // Then refresh
   ```

---

### Issue 17: "Can't access dashboard even after login"

**Route protection not working.**

Check:
1. `useAuth()` hook in dashboard
2. Is it redirecting non-logged users?
3. Clear browser cache and try again

---

## 🟡 Warning Messages

### Warning 1: "React Hook useEffect..."

**Normal warning in development.**

Not a problem - will disappear in production.

---

### Warning 2: "Next.js image warning"

**About unoptimized images.**

Solution:
```typescript
// Add width/height to images
<img 
  src={url}
  width={200}
  height={200}
/>
```

---

## ✅ Verification Checklist

**Before declaring "Setup Complete":**

- [ ] Firebase project created
- [ ] Gmail auth enabled
- [ ] Firestore database created
- [ ] .env.local has all values
- [ ] `npm run dev` running without errors
- [ ] Login page opens
- [ ] Gmail login works
- [ ] Dashboard shows after login
- [ ] User name displays
- [ ] Can logout
- [ ] Firestore rules published
- [ ] Test order created
- [ ] Test message created
- [ ] Orders show in dashboard
- [ ] Messages show in dashboard

---

## 🆘 Still Stuck?

### Step-by-step debugging:

1. **Open browser console** (F12 → Console)
   - Any red errors?
   - Copy the error message

2. **Check Firestore Console**
   - Collections exist?
   - Data looks correct?

3. **Check Firebase Authentication**
   - Your account showing?
   - Email verified?

4. **Check environment variables**
   - `cat .env.local`
   - All values present?

5. **Check file structure**
   - All files in correct locations?
   - No typos in imports?

6. **Try restart:**
   ```bash
   # Kill server: Ctrl+C
   # Clear cache:
   npm cache clean --force
   # Reinstall:
   npm install
   # Run:
   npm run dev
   ```

---

## 📞 Getting Help

### When reporting issues, include:

1. **Error message:** (Copy from console)
2. **What were you doing:** (Step-by-step)
3. **Screenshot** (if visual issue)
4. **Browser:** Chrome/Safari/Firefox
5. **Node version:** `node --version`

### Useful commands:

```bash
# Check Node version
node --version

# Check npm version  
npm --version

# Check if Firebase installed
npm list firebase

# See full error output
npm run dev

# Clear cache
npm cache clean --force

# Check environment
echo $PATH
```

---

## 🎓 Prevention Tips

1. **Always use .env.local for sensitive data**
   - Never commit to git

2. **Test often:**
   - Login after each change
   - Check console for warnings

3. **Read error messages carefully:**
   - They usually tell what's wrong

4. **Use browser DevTools:**
   - Network tab shows API calls
   - Application tab shows storage
   - Console tab shows errors

5. **Keep backups:**
   - Backup .env.local somewhere safe
   - Regular Firestore backups

---

**Happy troubleshooting! You got this! 💪**
