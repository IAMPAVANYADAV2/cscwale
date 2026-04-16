# 📡 Admin APIs - How to Use Them

## Overview

ये 3 APIs हैं जो admin के लिए बनाए गए हैं:
1. **Orders API** - Orders create/update/fetch करने के लिए
2. **Messages API** - Custom messages users को भेजने के लिए
3. **Subscriptions API** - User subscription tier change करने के लिए

---

## 1️⃣ Orders API

**Location:** `/api/admin/orders`

### Create New Order
```
POST /api/admin/orders
```

**Request:**
```json
{
  "userId": "firebase_uid_12345",
  "serviceName": "PVC Card Printing",
  "amount": 500
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "auto_generated_id",
  "message": "Order created successfully"
}
```

**Example (JavaScript/Fetch):**
```javascript
async function createOrder() {
  const response = await fetch("/api/admin/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "user_uid_here",
      serviceName: "Income Certificate",
      amount: 300,
    }),
  });

  const data = await response.json();
  console.log("Order created:", data);
}

createOrder();
```

### Update Order Status
```
PUT /api/admin/orders
```

**Request:**
```json
{
  "orderId": "order_id_12345",
  "status": "completed"
}
```

**Allowed Status Values:**
- `pending` - New order
- `processing` - Being processed
- `completed` - ✅ Finished
- `rejected` - ❌ Rejected

**Response:**
```json
{
  "success": true,
  "message": "Order status updated to completed"
}
```

**Example:**
```javascript
async function updateOrder() {
  const response = await fetch("/api/admin/orders", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: "order_12345",
      status: "processing",
    }),
  });

  const data = await response.json();
  console.log("Order updated:", data);
}
```

### Get All Orders (या specific user के)
```
GET /api/admin/orders
GET /api/admin/orders?userId=user_uid_12345
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "orders": [
    {
      "id": "order_1",
      "userId": "user_123",
      "serviceName": "PVC",
      "amount": 500,
      "status": "completed",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

---

## 2️⃣ Messages API

**Location:** `/api/admin/messages`

### Send Message to User
```
POST /api/admin/messages
```

**Request:**
```json
{
  "userId": "firebase_uid_12345",
  "title": "Order Completed",
  "message": "Your PVC card order has been completed. Ready for delivery!",
  "type": "success"
}
```

**Message Types:**
- `info` - ℹ️ Information (blue)
- `warning` - ⚠️ Warning (yellow)
- `success` - ✅ Success (green)
- `urgent` - 🔴 Urgent (red)

**Response:**
```json
{
  "success": true,
  "messageId": "msg_auto_id",
  "message": "Message sent successfully"
}
```

**Example:**
```javascript
async function sendMessage() {
  const response = await fetch("/api/admin/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "user_uid_12345",
      title: "Custom Service Available",
      message: "We now offer resume writing services. Interested?",
      type: "info",
    }),
  });

  const data = await response.json();
  console.log("Message sent:", data);
}

sendMessage();
```

### Get All Messages
```
GET /api/admin/messages
GET /api/admin/messages?userId=user_uid_12345
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "messages": [
    {
      "id": "msg_1",
      "userId": "user_123",
      "title": "Welcome",
      "message": "Welcome to CSC Wale",
      "type": "info",
      "createdAt": "timestamp",
      "isRead": false
    }
  ]
}
```

### Mark Message as Read
```
PUT /api/admin/messages
```

**Request:**
```json
{
  "messageId": "msg_12345"
}
```

---

## 3️⃣ Subscriptions API

**Location:** `/api/admin/subscriptions`

### Update User Subscription
```
PUT /api/admin/subscriptions
```

**Request:**
```json
{
  "userId": "firebase_uid_12345",
  "subscriptionTier": "pro"
}
```

**Allowed Tiers:**
- `free` - 🆓 Free plan
- `lite` - ⭐ Lite plan  
- `trail` - ✨ Trial plan
- `pro` - 👑 Professional plan

**Response:**
```json
{
  "success": true,
  "message": "Subscription updated to pro"
}
```

**Example:**
```javascript
async function upgradeUser() {
  const response = await fetch("/api/admin/subscriptions", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "user_uid_12345",
      subscriptionTier: "lite",
    }),
  });

  const data = await response.json();
  console.log("Subscription updated:", data);
}

upgradeUser();
```

---

## 📊 Complete Admin Workflow Example

```javascript
// 1️⃣ Create an order for user
async function completeWorkflow() {
  // Create order
  const orderRes = await fetch("/api/admin/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "user_uid_12345",
      serviceName: "Voter ID",
      amount: 250,
    }),
  });
  const orderData = await orderRes.json();
  console.log("✅ Order created:", orderData.orderId);

  // 2️⃣ Send notification message
  await fetch("/api/admin/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "user_uid_12345",
      title: "Order Placed",
      message: "Your Voter ID application has been submitted.",
      type: "info",
    }),
  });
  console.log("✅ Notification sent");

  // 3️⃣ Update order to processing
  setTimeout(async () => {
    await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderData.orderId,
        status: "processing",
      }),
    });
    console.log("✅ Order status updated to processing");

    // Send processing update
    await fetch("/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_uid_12345",
        title: "Application Processing",
        message: "Your application is under processing. ETA: 1-2 days.",
        type: "warning",
      }),
    });
  }, 5000);

  // 4️⃣ Mark as completed
  setTimeout(async () => {
    await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderData.orderId,
        status: "completed",
      }),
    });
    console.log("✅ Order completed");

    // Send success message
    await fetch("/api/admin/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_uid_12345",
        title: "Application Approved",
        message: "Your Voter ID application has been approved! Ready for pickup.",
        type: "success",
      }),
    });
  }, 15000);
}

completeWorkflow();
```

---

## 🔐 Security Notes

### Important: Add Admin Authentication

ये APIs currently में publicly accessible हैं। Production में आपको add करना चाहिए:

```javascript
// Check if user is admin
async function checkAdminAuth(request) {
  const token = request.headers.get("Authorization");
  // Verify token from Firebase
  // Check if user has admin role in Firestore
  // Return true/false
}
```

### Firestore में Admin Role Set करें:

```javascript
// users collection में admin user के लिए:
{
  uid: "admin_uid",
  email: "admin@cscwale.com",
  role: "admin", // ← This is important
  displayName: "Admin Name"
}
```

---

## 🧪 Testing APIs with curl

### Create Order:
```bash
curl -X POST http://localhost:3000/api/admin/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_123",
    "serviceName": "PVC Card",
    "amount": 500
  }'
```

### Get Orders:
```bash
curl http://localhost:3000/api/admin/orders
```

### Send Message:
```bash
curl -X POST http://localhost:3000/api/admin/messages \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_123",
    "title": "Test",
    "message": "This is a test message",
    "type": "info"
  }'
```

---

## ⚡ Real-World Usage Examples

### Example 1: Auto-send message when order created
```javascript
// Can add webhook or trigger in Firestore
// When order status changes → automatically send message

if (orderStatus === "completed") {
  sendMessage({
    userId: order.userId,
    title: "Your order is ready!",
    message: "Your order is ready for pickup. Visit us soon!",
    type: "success",
  });
}
```

### Example 2: Bulk upgrade users
```javascript
const usersToUpgrade = ["uid1", "uid2", "uid3"];

usersToUpgrade.forEach(async (uid) => {
  await fetch("/api/admin/subscriptions", {
    method: "PUT",
    body: JSON.stringify({
      userId: uid,
      subscriptionTier: "lite",
    }),
  });
});
```

### Example 3: Daily order status reports
```javascript
// Get all pending orders
const response = await fetch("/api/admin/orders");
const { orders } = await response.json();

const pendingOrders = orders.filter((o) => o.status === "pending");
console.log(`${pendingOrders.length} orders pending`);
```

---

## 📞 Error Handling

```javascript
async function apiCall(endpoint, options) {
  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "API Error");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error.message);
    // Handle error - show user message, retry, etc.
  }
}
```

---

## ✅ Next Steps

1. **Add Admin Authentication** - Secure these endpoints
2. **Create Admin Dashboard** - UI to manage orders/messages
3. **Add Rate Limiting** - Prevent abuse
4. **Setup Webhooks** - Auto-trigger messages on events
5. **Add Logging** - Track all admin actions

Happy coding! 🚀
