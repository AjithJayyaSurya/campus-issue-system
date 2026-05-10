╔════════════════════════════════════════════════════════════╗
║     THUNDER CLIENT - QUICK REFERENCE CARD                  ║
║          Campus Issue System (Day 1-10)                    ║
╚════════════════════════════════════════════════════════════╝

## 🚀 QUICK START (2 minutes)

1. START SERVER:
   cd server
   npm run dev

2. IMPORT THUNDER CLIENT:
   - Open Thunder Client
   - Collections → Import
   - Select: Thunder-Client-Collection.json

3. GET TOKENS:
   - Run: Auth → Register User
   - Copy token from response
   - Paste in Authorization header for other requests

---

## 📋 TOKENS YOU NEED

Save these from responses:

STUDENT_TOKEN = from register/login (ajith@test.com)
ADMIN_TOKEN = from register/login (admin@test.com) [manually set role in MongoDB]
STAFF_TOKEN = from register/login (staff@test.com) [manually set role in MongoDB]

STUDENT_ID = _id from student response
STAFF_ID = _id from staff response
ISSUE_ID = _id from create issue response

---

## ⚡ FASTEST TEST SEQUENCE

1. ✅ GET / → Test connection
2. 📝 POST /api/auth/register → Get STUDENT_TOKEN
3. 🔐 GET /api/protected → Verify auth works
4. 📤 POST /api/issues → Create issue (use form-data, add image)
5. 💬 POST /api/comments → Add comment
6. 📜 GET /api/logs/ISSUE_ID → View activity

---

## 🔑 HEADERS FOR EACH ENDPOINT

### Public (No auth needed):
- POST /api/auth/register
- POST /api/auth/login

### Protected (Need Bearer token):
- GET /api/protected
- POST /api/issues
- GET /api/issues/my
- PUT /api/issues/:id/status
- POST /api/comments
- GET /api/comments/:issueId
- GET /api/logs/:issueId

### Admin Only:
- POST /api/admin/assign
- GET /api/analytics

### Staff Only:
- GET /api/admin/assigned

---

## 📝 FORM-DATA vs JSON

### Use FORM-DATA for:
✓ POST /api/issues (file upload)

In Thunder Client:
1. Click "Body"
2. Select "form-data"
3. Add fields as text
4. Add image as "File" type

### Use JSON for:
✓ POST /api/auth/register
✓ POST /api/auth/login
✓ POST /api/comments
✓ POST /api/admin/assign
✓ PUT /api/issues/:id/status

In Thunder Client:
1. Click "Body"
2. Select "JSON"
3. Paste JSON

---

## 💾 SETUP MONGODB ROLES (Important!)

After registering admin@test.com and staff@test.com:

MongoDB Compass / Atlas / Shell:
```javascript
// Make admin
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)

// Make staff
db.users.updateOne(
  { email: "staff@test.com" },
  { $set: { role: "staff" } }
)
```

---

## 🎯 SAMPLE REQUEST BODIES

### Register
```json
{
  "name": "Ajith",
  "email": "ajith@test.com",
  "password": "123456"
}
```

### Login
```json
{
  "email": "ajith@test.com",
  "password": "123456"
}
```

### Create Issue (form-data)
```
title → Broken Fan
description → Fan not working
category → infrastructure
image → [select file]
```

### Add Comment
```json
{
  "issueId": "PASTE_ISSUE_ID",
  "message": "We are working on this"
}
```

### Assign Issue
```json
{
  "issueId": "PASTE_ISSUE_ID",
  "staffId": "PASTE_STAFF_ID"
}
```

### Update Status
```json
{
  "status": "in-progress"
}
```

Status options: "pending" | "in-progress" | "resolved"

---

## 🔗 ALL ENDPOINTS

BASE_URL: http://localhost:8080

AUTH:
POST /api/auth/register
POST /api/auth/login

ISSUES:
POST /api/issues
GET /api/issues
GET /api/issues/my
PUT /api/issues/:id/status

COMMENTS:
POST /api/comments
GET /api/comments/:issueId

ADMIN:
POST /api/admin/assign
GET /api/admin/assigned

LOGS:
GET /api/logs/:issueId

ANALYTICS:
GET /api/analytics

TEST:
GET /api/protected
GET /api/admin-test

---

## ❌ COMMON ERRORS & FIXES

Error: "Not authorized, no token"
→ Add Authorization header: Bearer YOUR_TOKEN

Error: "Not authorized, token failed"
→ Token expired or invalid, login again

Error: "Access denied"
→ Your role doesn't have permission
→ Use correct role (admin/staff/student)

Error: "Issue already assigned"
→ That issue is already assigned
→ Create a new issue

Error: "Cannot upload file"
→ Switch to form-data
→ Check file type (jpg, png, gif)

Error: "You are not assigned to this issue"
→ Only assigned staff can update status
→ Admin must assign first

---

## ✅ EXPECTED RESPONSES

### Success (2xx):
- 200 OK
- 201 Created
- 204 No Content

### Client Error (4xx):
- 400 Bad Request (invalid data)
- 401 Unauthorized (no token)
- 403 Forbidden (role denied)
- 404 Not Found

### Server Error (5xx):
- 500 Internal Server Error

---

## 📊 TESTING CHECKLIST

Complete the quick test sequence:

□ Server starts without errors
□ Thunder Client collection imported
□ Test connection works (/)
□ Register student user
□ Login returns token
□ Protected route accessible
□ Create issue with image
□ Get my issues
□ Add comment
□ View logs
□ (Optional) Setup admin/staff roles
□ (Optional) Assign and update status
□ (Optional) View analytics

All green? 🎉 You're done!

---

## 📞 SUPPORT

Check these if something fails:

1. Server running? npm run dev
2. MongoDB connected? Check console
3. Token correct? Copy from response
4. Role set? Update in MongoDB
5. Form-data for file upload? Switch type
6. Base URL correct? http://localhost:8080
7. .env variables set? Check .env file

Good luck! 🚀
