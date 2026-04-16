# 🧹 Firebase Cleanup Guide

## तरीका 1: Firebase Console से (सबसे आसान) ✅

### Step 1: Firebase Console खोलें
1. https://console.firebase.google.com/ खोलें
2. Project चुनें: **csc-wale**
3. **Firestore Database** → जाएं

### Step 2: सभी Collections को Delete करें

हर collection के लिए यह करें:

#### Orders Collection
1. **Collections** में `orders` को क्लिक करें
2. सभी documents select करें (या एक-एक delete करें)
3. प्रत्येक doc पर क्लिक करके **Delete** button दबाएं

#### Messages Collection
1. `messages` collection खोलें
2. सभी documents delete करें

#### Custom Messages Collection
1. `customMessages` collection खोलें
2. सभी documents delete करें

#### Subscriptions Collection
1. `subscriptions` collection खोलें
2. सभी documents delete करें

---

## तरीका 2: Terminal से (Automated) 🚀

अगर script बनाना चाहते हैं तो:

```bash
# TypeScript के साथ run करने के लिए पहले ts-node install करें
npm install -D ts-node

# फिर cleanup script run करें
npx ts-node scripts/cleanup-firebase.ts
```

---

## तरीका 3: Firebase Console का Built-in Delete Feature

यह सबसे सुरक्षित तरीका है:

### Bulk Delete करने के लिए:
1. Firebase Console खोलें
2. Firestore Database जाएं
3. प्रत्येक collection में जाएं
4. Top में select all button दबाएं
5. Delete button दबाएं

---

## ✅ Data सफलतापूर्वक Delete होने के बाद

```
Collections Empty:
✅ orders - 0 documents
✅ messages - 0 documents  
✅ customMessages - 0 documents
✅ subscriptions - 0 documents
✅ admin - 0 documents
```

---

## 🎯 अब नए Test Data बनाएं

Admin Dashboard से:

### नया Order Create करने के लिए:
1. Admin login करें
2. Dashboard → Orders tab
3. नया order create करें
4. Status update करें (pending → approved)

### नया Message भेजने के लिए:
1. Messages tab खोलें
2. नया message भेजें
3. Status update करें

---

## ⚠️ सावधानी

- यह सभी data को **permanently** delete कर देगा
- Delete होने के बाद recover नहीं कर सकते
- पहले backup ले लें अगर जरूरी data है

---

**अब शुरू करो नए test data के साथ! 🎉**
