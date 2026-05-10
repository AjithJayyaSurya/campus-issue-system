╔══════════════════════════════════════════════════════════╗
║  CAMPUS ISSUE SYSTEM - API TESTING GUIDE (Thunder Client) ║
║                         Day 1-10                          ║
╚══════════════════════════════════════════════════════════╝

## 🚀 STEP 0: START THE SERVER

Open Terminal in: e:\resume projects work\campus-issue-system\server

Run:
```bash
npm run dev
```

✅ You should see:
```
✅ MongoDB Connected
🚀 Server running on port 8080
```

---

## 📋 API TESTING SEQUENCE (Step-by-Step)

### STEP 1️⃣: TEST CONNECTION
POST http://localhost:8080/
Expected: "API is running..."

---

### STEP 2️⃣: REGISTER STUDENT USER
POST http://localhost:8080/api/auth/register

Body (JSON):
```json
{
  "name": "Ajith",
  "email": "ajith@test.com",
  "password": "123456"
}
```

✅ Response (save the TOKEN):
```json
{
  "_id": "USER_ID_1",
  "name": "Ajith",
  "email": "ajith@test.com",
  "token": "STUDENT_TOKEN_1"
}
```

💾 **Copy Token**: STUDENT_TOKEN_1

---

### STEP 3️⃣: REGISTER ADMIN USER
POST http://localhost:8080/api/auth/register

Body (JSON):
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123"
}
```

⚠️ **After response**, you need to UPDATE user role in MongoDB:

Use MongoDB Compass or Studio 3T:
```javascript
// Find this admin user and manually set role
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)
```

OR use MongoDB Shell:
```bash
db.users.updateOne({email: "admin@test.com"}, {$set: {role: "admin"}})
```

💾 **Copy Token**: ADMIN_TOKEN

---

### STEP 4️⃣: REGISTER STAFF USER
POST http://localhost:8080/api/auth/register

Body (JSON):
```json
{
  "name": "Staff Member",
  "email": "staff@test.com",
  "password": "staff123"
}
```

Update in MongoDB:
```javascript
db.users.updateOne(
  { email: "staff@test.com" },
  { $set: { role: "staff" } }
)
```

💾 **Copy Token**: STAFF_TOKEN
💾 **Copy _id**: STAFF_ID

---

### STEP 5️⃣: LOGIN AND GET TOKENS
POST http://localhost:8080/api/auth/login

Body (JSON):
```json
{
  "email": "ajith@test.com",
  "password": "123456"
}
```

✅ Response:
```json
{
  "_id": "USER_ID_1",
  "name": "Ajith",
  "email": "ajith@test.com",
  "role": "student",
  "token": "STUDENT_TOKEN_1"
}
```

💾 **Keep all 3 tokens for next steps:**
- STUDENT_TOKEN
- ADMIN_TOKEN
- STAFF_TOKEN

---

## 🎯 NOW TEST ALL FEATURES

### TEST 6️⃣: PROTECTED ROUTE
GET http://localhost:8080/api/protected

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

✅ Response:
```json
{
  "message": "Protected route accessed",
  "user": {
    "_id": "USER_ID_1",
    "name": "Ajith",
    "email": "ajith@test.com",
    "role": "student"
  }
}
```

---

### TEST 7️⃣: CREATE ISSUE (WITH IMAGE)
POST http://localhost:8080/api/issues

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

Body: form-data (SWITCH FROM JSON!)
```
Form Key    | Type  | Value
title       | Text  | Broken Fan
description | Text  | Fan not working in room 101
category    | Text  | infrastructure
image       | File  | (Select any .jpg/.png file)
```

✅ Response (save ISSUE_ID):
```json
{
  "_id": "ISSUE_ID",
  "title": "Broken Fan",
  "description": "Fan not working in room 101",
  "category": "infrastructure",
  "status": "pending",
  "image": "https://cloudinary.../...",
  "createdBy": "USER_ID_1",
  "createdAt": "2026-04-24T...",
  "updatedAt": "2026-04-24T..."
}
```

💾 **Copy ISSUE_ID**

---

### TEST 8️⃣: GET MY ISSUES
GET http://localhost:8080/api/issues/my

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

✅ Response:
```json
[
  {
    "_id": "ISSUE_ID",
    "title": "Broken Fan",
    "category": "infrastructure",
    "status": "pending",
    "createdBy": "USER_ID_1"
  }
]
```

---

### TEST 9️⃣: GET ALL ISSUES (ADMIN ONLY)
GET http://localhost:8080/api/issues

Headers:
```
Authorization: Bearer ADMIN_TOKEN
```

✅ Response: (All issues from all students)
```json
[
  {
    "_id": "ISSUE_ID",
    "title": "Broken Fan",
    "createdBy": {
      "_id": "USER_ID_1",
      "name": "Ajith",
      "email": "ajith@test.com"
    }
  }
]
```

---

### TEST 🔟: ADD COMMENT
POST http://localhost:8080/api/comments

Headers:
```
Authorization: Bearer STUDENT_TOKEN
Content-Type: application/json
```

Body (JSON):
```json
{
  "issueId": "ISSUE_ID",
  "message": "We are working on this issue"
}
```

✅ Response:
```json
{
  "_id": "COMMENT_ID",
  "issueId": "ISSUE_ID",
  "userId": "USER_ID_1",
  "message": "We are working on this issue",
  "createdAt": "2026-04-24T..."
}
```

---

### TEST 1️⃣1️⃣: GET COMMENTS
GET http://localhost:8080/api/comments/ISSUE_ID

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

✅ Response:
```json
[
  {
    "_id": "COMMENT_ID",
    "issueId": "ISSUE_ID",
    "userId": {
      "_id": "USER_ID_1",
      "name": "Ajith",
      "email": "ajith@test.com"
    },
    "message": "We are working on this issue",
    "createdAt": "2026-04-24T..."
  }
]
```

---

### TEST 1️⃣2️⃣: ASSIGN ISSUE (ADMIN)
POST http://localhost:8080/api/admin/assign

Headers:
```
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

Body (JSON):
```json
{
  "issueId": "ISSUE_ID",
  "staffId": "STAFF_ID"
}
```

✅ Response:
```json
{
  "message": "Issue assigned successfully",
  "assignment": {
    "_id": "ASSIGNMENT_ID",
    "issueId": "ISSUE_ID",
    "assignedTo": "STAFF_ID",
    "assignedBy": "ADMIN_ID",
    "createdAt": "2026-04-24T..."
  }
}
```

---

### TEST 1️⃣3️⃣: VIEW ASSIGNED ISSUES (STAFF)
GET http://localhost:8080/api/admin/assigned

Headers:
```
Authorization: Bearer STAFF_TOKEN
```

✅ Response:
```json
[
  {
    "_id": "ASSIGNMENT_ID",
    "issueId": {
      "_id": "ISSUE_ID",
      "title": "Broken Fan",
      "status": "pending"
    },
    "assignedTo": "STAFF_ID",
    "assignedBy": "ADMIN_ID"
  }
]
```

---

### TEST 1️⃣4️⃣: UPDATE ISSUE STATUS (STAFF)
PUT http://localhost:8080/api/issues/ISSUE_ID/status

Headers:
```
Authorization: Bearer STAFF_TOKEN
Content-Type: application/json
```

Body (JSON):
```json
{
  "status": "in-progress"
}
```

✅ Response:
```json
{
  "message": "Issue status updated",
  "issue": {
    "_id": "ISSUE_ID",
    "title": "Broken Fan",
    "status": "in-progress"
  }
}
```

Update again to "resolved":
```json
{
  "status": "resolved"
}
```

---

### TEST 1️⃣5️⃣: GET LOGS (Activity Tracking)
GET http://localhost:8080/api/logs/ISSUE_ID

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

✅ Response (All activities):
```json
[
  {
    "_id": "LOG_ID",
    "action": "UPDATE_STATUS",
    "issueId": "ISSUE_ID",
    "userId": {
      "_id": "STAFF_ID",
      "name": "Staff Member"
    },
    "message": "Status updated to resolved",
    "createdAt": "2026-04-24T..."
  },
  {
    "_id": "LOG_ID",
    "action": "ASSIGN_ISSUE",
    "issueId": "ISSUE_ID",
    "userId": {
      "_id": "ADMIN_ID",
      "name": "Admin User"
    },
    "message": "Issue assigned",
    "createdAt": "2026-04-24T..."
  },
  {
    "_id": "LOG_ID",
    "action": "CREATE_ISSUE",
    "issueId": "ISSUE_ID",
    "userId": {
      "_id": "USER_ID_1",
      "name": "Ajith"
    },
    "message": "Issue created",
    "createdAt": "2026-04-24T..."
  }
]
```

---

### TEST 1️⃣6️⃣: GET ANALYTICS (ADMIN ONLY)
GET http://localhost:8080/api/analytics

Headers:
```
Authorization: Bearer ADMIN_TOKEN
```

✅ Response:
```json
{
  "totalIssues": 1,
  "statusBreakdown": {
    "resolved": 1,
    "pending": 0,
    "inProgress": 0
  },
  "byCategory": {
    "infrastructure": 1,
    "academic": 0,
    "hostel": 0
  }
}
```

---

## 🔒 ROLE-BASED ACCESS TEST

### ❌ Try to access ADMIN route as STUDENT
GET http://localhost:8080/api/analytics

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

❌ Response (Expected 403):
```json
{
  "message": "Access denied"
}
```

---

### ❌ Try to update status as STUDENT (not assigned)
PUT http://localhost:8080/api/issues/ISSUE_ID/status

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

Body:
```json
{
  "status": "in-progress"
}
```

❌ Response (Expected 403):
```json
{
  "message": "You are not assigned to this issue"
}
```

---

## 📊 SUMMARY - ALL TESTS PASSED ✅

| Feature | Endpoint | Method | Status |
|---------|----------|--------|--------|
| Test Connection | / | GET | ✅ |
| Register | /api/auth/register | POST | ✅ |
| Login | /api/auth/login | POST | ✅ |
| Protected Route | /api/protected | GET | ✅ |
| Create Issue | /api/issues | POST | ✅ |
| Get My Issues | /api/issues/my | GET | ✅ |
| Get All Issues | /api/issues | GET | ✅ |
| Add Comment | /api/comments | POST | ✅ |
| Get Comments | /api/comments/:id | GET | ✅ |
| Assign Issue | /api/admin/assign | POST | ✅ |
| View Assigned | /api/admin/assigned | GET | ✅ |
| Update Status | /api/issues/:id/status | PUT | ✅ |
| Get Logs | /api/logs/:id | GET | ✅ |
| Get Analytics | /api/analytics | GET | ✅ |

---

## 🛠️ TROUBLESHOOTING

### ❌ "MongoDB Connected" not showing
- Check .env MONGO_URI is correct
- Check internet connection
- Check MongoDB Atlas cluster is running

### ❌ "Cannot find module" error
- Run: npm install
- Restart server

### ❌ "Not authorized, no token"
- Ensure you have Authorization header with "Bearer TOKEN"
- Copy token correctly from login response

### ❌ "File upload failed"
- Switch to form-data in Thunder Client
- Select actual image file
- Wait for Cloudinary to process

### ❌ "Issue already assigned"
- Each issue can only be assigned once
- Try creating a new issue

---

## 📁 THUNDER CLIENT IMPORT

1. Open Thunder Client
2. Click "Collections" → "Import"
3. Select: Thunder-Client-Collection.json
4. All 16 requests are ready to use!

Replace tokens as you test.

Happy Testing! 🎉
