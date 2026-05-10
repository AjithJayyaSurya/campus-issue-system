╔══════════════════════════════════════════════════════════════╗
║                    🎯 VISUAL API TEST GUIDE                ║
║              Campus Issue System - Complete Flow             ║
╚══════════════════════════════════════════════════════════════╝

## 1️⃣ START SERVER

Terminal:
```bash
cd e:\resume projects work\campus-issue-system\server
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 8080
```

✅ Server is READY

---

## 2️⃣ OPEN THUNDER CLIENT

Import collection:
- File → Collections → Import
- Select: Thunder-Client-Collection.json
- All 16 requests appear in sidebar

---

## 3️⃣ TEST CONNECTION

```
GET http://localhost:8080/
```

Click Send ➜

Response:
```
"API is running..."
```

✅ Connection works

---

## 4️⃣ REGISTER STUDENT

```
POST http://localhost:8080/api/auth/register
```

Body (JSON):
```json
{
  "name": "Ajith",
  "email": "ajith@test.com",
  "password": "123456"
}
```

Click Send ➜

Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Ajith",
  "email": "ajith@test.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

💾 **COPY TOKEN**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Save as: **STUDENT_TOKEN**

---

## 5️⃣ REGISTER ADMIN

```
POST http://localhost:8080/api/auth/register
```

Body (JSON):
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123"
}
```

Click Send ➜

Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

💾 **COPY TOKEN**: Save as **ADMIN_TOKEN**

⚠️ **Update MongoDB** (set role to admin):

MongoDB Shell or Compass:
```javascript
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)
```

---

## 6️⃣ REGISTER STAFF

```
POST http://localhost:8080/api/auth/register
```

Body (JSON):
```json
{
  "name": "Staff Member",
  "email": "staff@test.com",
  "password": "staff123"
}
```

Click Send ➜

Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

💾 **COPY TOKEN**: Save as **STAFF_TOKEN**
💾 **COPY _id**: Save as **STAFF_ID**

⚠️ **Update MongoDB** (set role to staff):

```javascript
db.users.updateOne(
  { email: "staff@test.com" },
  { $set: { role: "staff" } }
)
```

---

## 7️⃣ TEST PROTECTED ROUTE

```
GET http://localhost:8080/api/protected
```

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

(Replace STUDENT_TOKEN with actual token from Step 4)

Click Send ➜

Response:
```json
{
  "message": "Protected route accessed",
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Ajith",
    "email": "ajith@test.com",
    "role": "student"
  }
}
```

✅ Authentication works

---

## 8️⃣ CREATE ISSUE (WITH IMAGE)

```
POST http://localhost:8080/api/issues
```

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

⚠️ **IMPORTANT**: Switch body type to "form-data" (not JSON!)

Body → form-data:
```
Key          Type    Value
─────────────────────────────────────
title        Text    Broken Fan
description  Text    Fan not working in room 101
category     Text    infrastructure
image        File    [Select an image file]
```

Click Send ➜

Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
  "title": "Broken Fan",
  "description": "Fan not working in room 101",
  "category": "infrastructure",
  "status": "pending",
  "image": "https://res.cloudinary.com/dfntksopv/image/upload/v1234567890/abc123.jpg",
  "createdBy": "65a1b2c3d4e5f6g7h8i9j0k1",
  "createdAt": "2026-04-24T10:30:00.000Z"
}
```

💾 **COPY ISSUE_ID**:
```
65a1b2c3d4e5f6g7h8i9j0k4
```

✅ Image uploaded to Cloudinary

---

## 9️⃣ GET MY ISSUES

```
GET http://localhost:8080/api/issues/my
```

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

Click Send ➜

Response:
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "title": "Broken Fan",
    "description": "Fan not working in room 101",
    "category": "infrastructure",
    "status": "pending",
    "createdBy": "65a1b2c3d4e5f6g7h8i9j0k1"
  }
]
```

✅ Can see my issues

---

## 🔟 GET ALL ISSUES (ADMIN ONLY)

```
GET http://localhost:8080/api/issues
```

Headers:
```
Authorization: Bearer ADMIN_TOKEN
```

Click Send ➜

Response:
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "title": "Broken Fan",
    "createdBy": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Ajith",
      "email": "ajith@test.com"
    }
  }
]
```

✅ Admin sees all issues

---

## 1️⃣1️⃣ ADD COMMENT

```
POST http://localhost:8080/api/comments
```

Headers:
```
Authorization: Bearer STUDENT_TOKEN
Content-Type: application/json
```

Body (JSON) - ⚠️ Switch back to JSON:
```json
{
  "issueId": "65a1b2c3d4e5f6g7h8i9j0k4",
  "message": "We are working on this issue"
}
```

Click Send ➜

Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
  "issueId": "65a1b2c3d4e5f6g7h8i9j0k4",
  "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "message": "We are working on this issue",
  "createdAt": "2026-04-24T10:35:00.000Z"
}
```

✅ Comment added

---

## 1️⃣2️⃣ GET COMMENTS

```
GET http://localhost:8080/api/comments/65a1b2c3d4e5f6g7h8i9j0k4
```

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

Click Send ➜

Response:
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
    "issueId": "65a1b2c3d4e5f6g7h8i9j0k4",
    "userId": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Ajith",
      "email": "ajith@test.com"
    },
    "message": "We are working on this issue",
    "createdAt": "2026-04-24T10:35:00.000Z"
  }
]
```

✅ Comments retrieved

---

## 1️⃣3️⃣ ASSIGN ISSUE (ADMIN)

```
POST http://localhost:8080/api/admin/assign
```

Headers:
```
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

Body (JSON):
```json
{
  "issueId": "65a1b2c3d4e5f6g7h8i9j0k4",
  "staffId": "65a1b2c3d4e5f6g7h8i9j0k3"
}
```

Click Send ➜

Response:
```json
{
  "message": "Issue assigned successfully",
  "assignment": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
    "issueId": "65a1b2c3d4e5f6g7h8i9j0k4",
    "assignedTo": "65a1b2c3d4e5f6g7h8i9j0k3",
    "assignedBy": "65a1b2c3d4e5f6g7h8i9j0k2",
    "createdAt": "2026-04-24T10:40:00.000Z"
  }
}
```

✅ Issue assigned to staff

---

## 1️⃣4️⃣ VIEW ASSIGNED ISSUES (STAFF)

```
GET http://localhost:8080/api/admin/assigned
```

Headers:
```
Authorization: Bearer STAFF_TOKEN
```

Click Send ➜

Response:
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
    "issueId": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "title": "Broken Fan",
      "status": "pending"
    },
    "assignedTo": "65a1b2c3d4e5f6g7h8i9j0k3",
    "assignedBy": "65a1b2c3d4e5f6g7h8i9j0k2"
  }
]
```

✅ Staff sees assigned issues

---

## 1️⃣5️⃣ UPDATE ISSUE STATUS (STAFF)

```
PUT http://localhost:8080/api/issues/65a1b2c3d4e5f6g7h8i9j0k4/status
```

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

Click Send ➜

Response:
```json
{
  "message": "Issue status updated",
  "issue": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
    "title": "Broken Fan",
    "status": "in-progress"
  }
}
```

Update again to "resolved":

Body (JSON):
```json
{
  "status": "resolved"
}
```

✅ Status updated

---

## 1️⃣6️⃣ GET LOGS (Activity)

```
GET http://localhost:8080/api/logs/65a1b2c3d4e5f6g7h8i9j0k4
```

Headers:
```
Authorization: Bearer STUDENT_TOKEN
```

Click Send ➜

Response:
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k7",
    "action": "UPDATE_STATUS",
    "issueId": "65a1b2c3d4e5f6g7h8i9j0k4",
    "userId": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "name": "Staff Member"
    },
    "message": "Status updated to resolved",
    "createdAt": "2026-04-24T10:45:00.000Z"
  },
  {
    "action": "ASSIGN_ISSUE",
    "message": "Issue assigned"
  },
  {
    "action": "CREATE_ISSUE",
    "message": "Issue created"
  }
]
```

✅ Activity log tracked

---

## 1️⃣7️⃣ GET ANALYTICS (ADMIN)

```
GET http://localhost:8080/api/analytics
```

Headers:
```
Authorization: Bearer ADMIN_TOKEN
```

Click Send ➜

Response:
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

✅ Analytics retrieved

---

## ✅ ALL TESTS PASSED!

You've successfully tested:
✅ User Registration
✅ User Login
✅ JWT Authentication
✅ Role-based Access Control
✅ Issue Creation with Image
✅ Comments System
✅ Issue Assignment
✅ Status Updates
✅ Activity Logging
✅ Analytics

**Congratulations! Your MERN backend is fully functional!** 🎉

---

## 🔗 FILES CREATED FOR REFERENCE

1. Thunder-Client-Collection.json → Import in Thunder Client
2. API-TESTING-GUIDE.md → Detailed step-by-step guide
3. QUICK-REFERENCE.md → Quick lookup sheet

---

## 🚀 NEXT STEPS

1. Integrate with frontend
2. Deploy to production
3. Setup CI/CD pipeline
4. Add more analytics
5. Add notifications

Backend is production-ready! 💪
