# Admin System Architecture & Design

## Overview
Complete admin dashboard for CSC Wale with full control over users, plans, tools, orders, and messages with soft deletes and audit logging.

---

## 1. Data Schema & Collections

### Firebase Collections Structure

```
Firestore Collections:
├── users/                  # Regular users
│   ├── uid (doc ID)
│   ├── email, displayName, photoURL
│   ├── subscription: { planId, tier, startDate, endDate, isActive }
│   ├── isBlocked, blockedAt, blockedBy, blockedReason
│   ├── isDeleted, deletedAt, deletedBy
│   └── createdAt, updatedAt, lastLogin
│
├── plans/                  # Subscription plans
│   ├── id (doc ID)
│   ├── name, slug, description
│   ├── features: string[]
│   ├── pricing, pricingLabel, pricingNote
│   ├── maxTools, isActive, sortOrder
│   ├── isDeleted, deletedAt, deletedBy
│   └── createdAt, updatedAt
│
├── tools/                  # Available tools/services
│   ├── id (doc ID)
│   ├── name, slug, description, category
│   ├── icon, requiredPlan
│   ├── isActive, sortOrder
│   ├── isDeleted, deletedAt, deletedBy
│   └── createdAt, updatedAt
│
├── orders/                 # User orders/requests
│   ├── id (doc ID)
│   ├── userId, userEmail, userName
│   ├── orderType, serviceName
│   ├── status: pending|processing|approved|rejected|declined|completed
│   ├── amount, description, adminNotes, adminId
│   ├── isDeleted, deletedAt, deletedBy
│   └── createdAt, updatedAt
│
├── messages/               # Contact/support messages
│   ├── id (doc ID)
│   ├── userId, userEmail, userName, userPhone
│   ├── type: contact|service-request|custom-message|contact-form
│   ├── subject, message
│   ├── status: unread|read|replied|archived|spam|follow-up
│   ├── adminReply, adminId
│   ├── isDeleted, deletedAt, deletedBy
│   └── createdAt
│
└── adminLogs/              # Audit trail
    ├── id (doc ID)
    ├── adminId, adminEmail
    ├── action: CREATE|UPDATE|DELETE|RESTORE|BLOCK|etc
    ├── resource: users|plans|tools|orders|messages
    ├── resourceId, changes
    ├── ipAddress, userAgent
    └── timestamp
```

---

## 2. API Route Structure

### Admin API Endpoints

```
/api/admin/
├── plans/
│   ├── GET    - List all plans (including deleted)
│   ├── POST   - Create plan
│   ├── /[id]
│   │   ├── GET    - Get plan details
│   │   ├── PUT    - Update plan
│   │   ├── DELETE - Soft delete plan
│   │   └── /restore
│   │       └── POST - Restore deleted plan
│   │
├── users/
│   ├── GET    - List all users
│   ├── /[uid]
│   │   ├── GET    - Get user details
│   │   ├── PUT    - Update user
│   │   ├── DELETE - Soft delete user
│   │   ├── /block - Block user
│   │   ├── /unblock - Unblock user
│   │   ├── /plan - Update user plan
│   │   └── /restore - Restore user
│   │
├── tools/
│   ├── GET    - List tools
│   ├── POST   - Create tool
│   ├── /[id]
│   │   ├── GET    - Get tool
│   │   ├── PUT    - Update tool
│   │   ├── DELETE - Soft delete
│   │   └── /restore - Restore
│   │
├── orders/
│   ├── GET    - List orders
│   ├── /[id]
│   │   ├── GET    - Get order
│   │   ├── PUT    - Update status/notes
│   │   ├── DELETE - Soft delete
│   │   └── /restore - Restore
│   │
├── messages/
│   ├── GET    - List messages
│   ├── /[id]
│   │   ├── GET    - Get message
│   │   ├── PUT    - Update status/reply
│   │   ├── DELETE - Soft delete
│   │   └── /restore - Restore
│   │
├── stats/ - GET dashboard statistics
├── logs/ - GET audit logs
└── dashboard-data/ - GET combined dashboard data
```

---

## 3. Admin Pages Structure

```
/admin/
├── dashboard/ - Main dashboard (stats, recent activity)
├── plans/ - Plan management
│   └── [id]/ - Plan editor
├── users/ - User management
│   └── [uid]/ - User details
├── tools/ - Tools management
│   └── [id]/ - Tool editor
├── orders/ - Order management
│   └── [id]/ - Order details
├── messages/ - Message management
├── trash/ - Soft deleted items (with restore)
├── logs/ - Audit logs
└── settings/ - Admin settings
```

---

## 4. Core Features

### Plans Management
- ✅ Create/Read/Update/Delete plans
- ✅ Manage features list
- ✅ Set pricing and terms
- ✅ Activate/deactivate plans
- ✅ Sort order control
- ✅ Soft delete with restore

### Users Management
- ✅ View all users with filters
- ✅ Assign/change plans
- ✅ Block/unblock users
- ✅ View user history
- ✅ Soft delete with restore
- ✅ Ban management

### Tools Management
- ✅ Add/edit tools
- ✅ Set required plans
- ✅ Enable/disable tools
- ✅ Categorize tools
- ✅ Sort order control
- ✅ Soft delete with restore

### Orders Management
- ✅ View all orders
- ✅ Update status
- ✅ Add admin notes
- ✅ Filter by status/type
- ✅ Soft delete with restore

### Messages Management
- ✅ View contact messages
- ✅ Mark as read/replied
- ✅ Add replies
- ✅ Categorize as spam
- ✅ Archive messages
- ✅ Soft delete with restore

### Trash & Recovery
- ✅ View all deleted items
- ✅ Restore deleted items
- ✅ Permanent delete option (be careful!)
- ✅ Soft delete filter toggle

### Audit Logging
- ✅ Log all admin actions
- ✅ Track who changed what
- ✅ Timestamp and IP tracking
- ✅ Searchable audit logs

---

## 5. Key Patterns

### Soft Delete Pattern
```typescript
interface SoftDeletable {
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: string | null;
}
```
- Always filter `isDeleted !== true` in queries
- Provide restore endpoint
- Keep deleted data for audit trail

### CRUD Operations
- **Create**: Validate, set timestamps, log action
- **Read**: Filter deleted by default, support filter toggle
- **Update**: Track changes, log action
- **Delete**: Soft delete, log with reason
- **Restore**: Undelete, clear deletion flags, log action

### Error Handling
- Proper try/catch on all endpoints
- Return 400/401/403/404/500 with meaningful messages
- Frontend shows toast notifications
- No silent failures

### Validation
- Type-safe with TypeScript
- Input validation on backend
- Prevent duplicate slugs
- Ensure referential integrity

---

## 6. Implementation Priority

1. **Phase 1**: Core types & utilities
2. **Phase 2**: Plans API & UI
3. **Phase 3**: Users API & UI
4. **Phase 4**: Tools API & UI
5. **Phase 5**: Orders & Messages (already partial)
6. **Phase 6**: Trash & Logs
7. **Phase 7**: Full integration & testing

---

## 7. Security & Permissions

- ✅ Admin authentication required
- ✅ Token validation on all endpoints
- ✅ Firebase Admin SDK for server operations
- ✅ No client-side data exposure
- ✅ Audit logging for compliance
- ✅ Rate limiting on sensitive endpoints

---

## 8. Tech Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Backend**: Next.js API Routes + Firebase Admin SDK
- **Database**: Firestore
- **UI**: Tailwind CSS + Lucide Icons
- **State**: React Hooks + Local State

