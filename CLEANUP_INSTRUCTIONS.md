# 🧹 Firebase Data Cleanup - Complete Guide

## 🎯 सबसे आसान तरीका: Browser Console से (RECOMMENDED) ✅

### Prerequisite:
- Dev server चल रहा हो: `npm run dev`
- Admin login किया हो

### Steps:

1. **Admin Dashboard खोलें**
   ```
   http://localhost:3000/admin/dashboard
   ```

2. **Browser Console खोलें**
   - Press: `F12` (या Ctrl+Shift+I)
   - Go to: **Console** tab

3. **यह code paste करें:**
   ```javascript
   async function cleanup() {
     const token = localStorage.getItem("adminToken");
     if (!token) {
       console.error("❌ Token not found. Please login first.");
       return;
     }

     try {
       console.log("🚀 Starting cleanup...");
       const response = await fetch("/api/admin/cleanup", {
         method: "POST",
         headers: {
           "Authorization": `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       });

       const data = await response.json();
       
       if (response.ok) {
         console.log("✅ Cleanup successful!");
         console.log("📊 Deleted:", data.deletedCount, "documents");
         console.log("📦 Collections:", data.collections.join(", "));
         console.log("🎉 Database cleaned! Refresh the page to see changes.");
       } else {
         console.error("❌ Cleanup failed:", data.error);
       }
     } catch (error) {
       console.error("❌ Error:", error);
     }
   }

   cleanup();
   ```

4. **Enter दबाएं**
5. **2-3 seconds wait करें**

### Expected Output:
```
🚀 Starting cleanup...
✅ Cleanup successful!
📊 Deleted: 15 documents
📦 Collections: orders,messages,customMessages,subscriptions
🎉 Database cleaned! Refresh the page to see changes.
```

---

## तरीका 2: Command Line से (Using Node.js)

```bash
cd C:\Users\_\Desktop\CSC\cscwale

# Step 1: Make sure dev server is running in another terminal
# npm run dev

# Step 2: Run cleanup script
node scripts/cleanup.js
```

Expected output:
```
🔐 Firebase Cleanup Tool
Step 1: Logging in as admin...
✅ Login successful!
Step 2: Deleting all data...
✅ Cleanup successful!
📊 Deleted 15 documents
```

---

## तरीका 3: cURL से (Advanced)

```bash
# Step 1: Get admin token
curl -X POST http://localhost:3000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cscwale.com","password":"admin@123"}'

# Response में से TOKEN को copy करें

# Step 2: Run cleanup (replace TOKEN)
curl -X POST http://localhost:3000/api/admin/cleanup \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json"
```

---

## तरीका 4: Firebase Console से (Manual) 🔒

सबसे safe लेकिन manual तरीका:

1. https://console.firebase.google.com/ खोलें
2. Project: **csc-wale** चुनें
3. **Firestore Database** → **Collections**
4. हर collection के लिए:
   - `orders` को क्लिक करें
   - सभी documents select करें
   - **Delete** बटन दबाएं

---

## ✅ Verify Cleanup

Cleanup के बाद check करने के लिए:

1. **Admin Dashboard refresh करें** (F5)
2. Check करें stats:
   ```
   ✅ Total Orders: 0
   ✅ Total Messages: 0  
   ✅ PVC Orders: 0
   ✅ Cropper Orders: 0
   ✅ Service Requests: 0
   ```

---

## 📚 Deleted Collections

| Collection | Status |
|-----------|--------|
| `orders` | ✅ Deleted |
| `messages` | ✅ Deleted |
| `customMessages` | ✅ Deleted |
| `subscriptions` | ✅ Deleted |
| `users` | ❌ Kept (admin जरूरी है) |
| `admin` | ❌ Kept |

---

## 🎯 अब नया Test Data बनाएं

Admin Dashboard से:

### Test Order बनाएं:
1. Dashboard खोलें
2. **Orders** tab
3. नया order बनाएं
4. Status update करें (pending → approved)

### Test Message भेजें:
1. **Messages** tab
2. नया message भेजें
3. Response देखें

---

## ❓ FAQ

**Q: Cleanup के बाद क्या होगा?**
- सभी old test data delete हो जाएगा
- Dashboard clean दिखेगा (सभी counts 0)
- आप fresh शुरू कर सकते हो

**Q: क्या users delete होंगे?**
- नहीं! सिर्फ orders/messages delete होंगे
- Admin user safe रहेगा

**Q: क्या यह reversible है?**
- नहीं! Delete data को recover नहीं कर सकते
- पहले backup लें अगर जरूरी हो

**Q: Dev server जरूरी है?**
- ✅ Browser console method के लिए हाँ
- ✅ cURL method के लिए हाँ
- ❌ Firebase Console के लिए नहीं

**Q: कौन सा method use करें?**
- **सबसे आसान:** Browser Console (तरीका 1)
- **सबसे Safe:** Firebase Console (तरीका 4)
- **सबसे Quick:** Command line (तरीका 2)

---

## 🆘 Troubleshooting

### "Token not found" 
- Login करें पहले
- Page refresh करें (F5)
- localStorage check करें

### "Cleanup failed"
- Dev server चल रहा है check करें
- Admin credentials check करें
- Network tab में error देखें (F12 → Network)

### Collections अभी भी data है
- Page refresh करें (F5)
- Firestore में manually check करें
- दोबारा cleanup run करें

---

## 📊 Example: Before & After

### Before Cleanup:
```
Total Orders: 42
Total Messages: 15
PVC Orders: 10
Cropper Orders: 8
Service Requests: 24
```

### After Cleanup:
```
Total Orders: 0
Total Messages: 0
PVC Orders: 0
Cropper Orders: 0
Service Requests: 0
```

---

## ✨ Next Steps

1. ✅ Cleanup करें (एक method से)
2. ✅ Dashboard refresh करें
3. ✅ नया test data बनाएं
4. ✅ Testing शुरू करें

---

**Ready to cleanup? Choose any method above! 🚀**
