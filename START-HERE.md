╔════════════════════════════════════════════════════════════════╗
║         🚀 THUNDER CLIENT - STEP BY STEP INSTRUCTIONS        ║
║              Run APIs in 5 minutes - Complete Guide          ║
╚════════════════════════════════════════════════════════════════╝

## ⏱️ TOTAL TIME: 5 Minutes Setup + Testing Time

---

## 🎯 STEP 1: START THE BACKEND SERVER (1 minute)

### Action:
1. Open Command Prompt / Terminal
2. Navigate to server folder:
   ```bash
   cd "e:\resume projects work\campus-issue-system\server"
   ```

3. Start server:
   ```bash
   npm run dev
   ```

### Expected Output:
```
✅ MongoDB Connected
🚀 Server running on port 8080
```

✅ **STOP HERE - Keep terminal running**

---

## 📱 STEP 2: OPEN THUNDER CLIENT (1 minute)

### Action:
1. Open Thunder Client app
2. Click "Collections" (left sidebar)
3. Click Import button (or ⋮ → Import)
4. Select file: Thunder-Client-Collection.json
5. Click "Import"

### Expected Result:
You should see 16 API requests organized in folders:
- AUTH (2 requests)
- ISSUES (4 requests)
- COMMENTS (2 requests)
- ADMIN (2 requests)
- LOGS (1 request)
- ANALYTICS (1 request)
- TEST (2 requests)

✅ **Collection imported successfully**

---

## 🧪 STEP 3: TEST CONNECTION (30 seconds)

### Type:
Click: AUTH → Auth/Register User (first request listed)

Wait, that's not the first one. Let me check. Actually, let's go:

Click: TEST → ✅ Test Connection

### Action:
1. Click "Auth → 🚀 1. Register User" request
2. **Before clicking Send**, go back and click:
   "TEST → ✅ Test Connection"
3. Click "Send" button

### Expected Response:
```
"API is running..."
```

✅ **Connection works!**

---

## 👤 STEP 4: REGISTER STUDENTS (1 minute)

### Request 1: Register Student User

1. Click: **AUTH → 🚀 1. Register User**
2. Check body is JSON (should show):
```json
{
  "name": "Ajith",
  "email": "ajith@test.com",
  "password": "123456"
}
```
3. Click "Send" ➜

### Expected Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Ajith",
  "email": "ajith@test.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 💾 COPY & SAVE:
- Token → Save as: **STUDENT_TOKEN**
- _id → Save as: **STUDENT_ID**

---

## 👨‍💼 STEP 5: REGISTER ADMIN USER (1 minute)

### Action:
1. Click: **AUTH → 🚀 1. Register User**
2. Change body to:
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "admin123"
}
```
3. Click "Send" ➜

### Expected Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 💾 COPY & SAVE:
- Token → Save as: **ADMIN_TOKEN**

### ⚠️ IMPORTANT - Set Admin Role in MongoDB:

Open MongoDB Compass or Atlas and run:
```javascript
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)
```

---

## 👨‍🔧 STEP 6: REGISTER STAFF USER (1 minute)

### Action:
1. Click: **AUTH → 🚀 1. Register User**
2. Change body to:
```json
{
  "name": "Staff Member",
  "email": "staff@test.com",
  "password": "staff123"
}
```
3. Click "Send" ➜

### Expected Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 💾 COPY & SAVE:
- Token → Save as: **STAFF_TOKEN**
- _id → Save as: **STAFF_ID**

### ⚠️ Set Staff Role in MongoDB:
```javascript
db.users.updateOne(
  { email: "staff@test.com" },
  { $set: { role: "staff" } }
)
```

---

## 🔒 STEP 7: TEST PROTECTED ROUTE

### Request:
Click: **TEST → 🔒 Protected Route**

### Update Header:
1. Find the "Authorization" header
2. Replace: `Bearer YOUR_TOKEN_HERE`
3. With: `Bearer STUDENT_TOKEN`

Example:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Click "Send" ➜

### Expected Response:
```json
{
  "message": "Protected route accessed",
  "user": {
    "_id": "STUDENT_ID",
    "name": "Ajith",
    "email": "ajith@test.com",
    "role": "student"
  }
}
```

✅ **Authentication works!**

---

## 📝 STEP 8: CREATE ISSUE WITH IMAGE

### Important: Switch to form-data!

Click: **ISSUES → 📝 3. Create Issue (WITH IMAGE)**

### Body Settings:
1. Click "Body" tab
2. Change from "JSON" to "form-data"
3. You should see form fields:
   - title
   - description
   - category
   - image

### Update Values:
```
title → Broken Fan
description → Fan not working
category → infrastructure
image → [SELECT YOUR IMAGE FILE]
```

### Update Header:
Find "Authorization": `Bearer STUDENT_TOKEN`

### Click "Send" ➜

### Expected Response:
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
  "title": "Broken Fan",
  "category": "infrastructure",
  "status": "pending",
  "image": "https://res.cloudinary.com/...",
  "createdBy": "STUDENT_ID"
}
```

### 💾 COPY & SAVE:
- _id → Save as: **ISSUE_ID**

✅ **File uploaded to Cloudinary!**

---

## 💬 STEP 9: ADD COMMENT

Click: **COMMENTS → 💬 4. Add Comment**

### Update Body (JSON):
```json
{
  "issueId": "ISSUE_ID_HERE",
  "message": "We are working on this issue"
}
```

### Update Header:
`Authorization: Bearer STUDENT_TOKEN`

### Click "Send" ➜

### Expected Response:
```json
{
  "_id": "COMMENT_ID",
  "issueId": "ISSUE_ID",
  "userId": "STUDENT_ID",
  "message": "We are working on this issue"
}
```

✅ **Comment added!**

---

## 🧑‍💼 STEP 10: ASSIGN ISSUE (ADMIN)

Click: **ADMIN → 🧑‍💼 5. Assign Issue to Staff**

### Update Body (JSON):
```json
{
  "issueId": "ISSUE_ID_HERE",
  "staffId": "STAFF_ID_HERE"
}
```

### Update Header:
`Authorization: Bearer ADMIN_TOKEN`

### Click "Send" ➜

### Expected Response:
```json
{
  "message": "Issue assigned successfully",
  "assignment": {
    "_id": "ASSIGNMENT_ID",
    "issueId": "ISSUE_ID",
    "assignedTo": "STAFF_ID"
  }
}
```

✅ **Issue assigned!**

---

## 🎯 STEP 11: UPDATE ISSUE STATUS (STAFF)

Click: **ISSUES → 🎯 Update Issue Status (Staff)**

### Update URL:
Change from:
```
http://localhost:8080/api/issues/ISSUE_ID/status
```
To:
```
http://localhost:8080/api/issues/65a1b2c3d4e5f6g7h8i9j0k4/status
```
(Replace with your actual ISSUE_ID)

### Update Body (JSON):
```json
{
  "status": "in-progress"
}
```

### Update Header:
`Authorization: Bearer STAFF_TOKEN`

### Click "Send" ➜

### Expected Response:
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

✅ **Status updated!**

---

## 📜 STEP 12: VIEW ACTIVITY LOGS

Click: **LOGS → 📜 Get Logs by Issue**

### Update URL:
Change:
```
http://localhost:8080/api/logs/ISSUE_ID
```
To:
```
http://localhost:8080/api/logs/65a1b2c3d4e5f6g7h8i9j0k4
```

### Update Header:
`Authorization: Bearer STUDENT_TOKEN`

### Click "Send" ➜

### Expected Response:
```json
[
  {
    "action": "UPDATE_STATUS",
    "message": "Status updated to resolved"
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

✅ **All activities logged!**

---

## 📊 STEP 13: VIEW ANALYTICS (ADMIN)

Click: **ANALYTICS → 📊 Get Analytics (Admin)**

### Update Header:
`Authorization: Bearer ADMIN_TOKEN`

### Click "Send" ➜

### Expected Response:
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

✅ **Analytics working!**

---

## ✅ FINAL CHECKLIST

Mark off as you test:

- [ ] Server started (npm run dev)
- [ ] Thunder Client collection imported
- [ ] Test connection OK (/)
- [ ] Registered student user
- [ ] Registered admin user (role set in MongoDB)
- [ ] Registered staff user (role set in MongoDB)
- [ ] Protected route accessible
- [ ] Created issue with image
- [ ] Added comment
- [ ] Assigned issue
- [ ] Updated issue status
- [ ] Viewed logs
- [ ] Viewed analytics

**All checked? 🎉 Your backend is working perfectly!**

---

## 📋 QUICK SAMPLE TOKENS & IDS

Keep these handy while testing:

```
STUDENT_TOKEN = "eyJhbGciii..."
ADMIN_TOKEN = "eyJhbGciii..."
STAFF_TOKEN = "eyJhbGciii..."

STUDENT_ID = "65a1b2c3d4e5f6g7h8i9j0k1"
STAFF_ID = "65a1b2c3d4e5f6g7h8i9j0k3"
ADMIN_ID = "65a1b2c3d4e5f6g7h8i9j0k2"

ISSUE_ID = "65a1b2c3d4e5f6g7h8i9j0k4"
```

---

## 🔧 TROUBLESHOOTING

### "Cannot GET /api/issues"
→ Check Authorization header
→ Make sure token is correct
→ Server might have crashed - restart npm run dev

### "Not authorized, no token"
→ Add Authorization header
→ Format: Bearer TOKEN
→ Copy token from login response exactly

### "Body not showing in Thunder Client"
→ Click on the "Body" tab
→ Make sure Body is enabled (toggle)
→ For file upload: switch to "form-data"

### Server shows error on startup
→ Check MongoDB connection in .env
→ Verify internet for MongoDB Atlas
→ Run npm install again

---

## 📞 NEED HELP?

Check these files for more info:
1. QUICK-REFERENCE.md - Quick lookup
2. API-TESTING-GUIDE.md - Detailed guide
3. VISUAL-TEST-GUIDE.md - Step-by-step with visuals

---

## 🎉 SUCCESS!

You've successfully tested:
- 14 API endpoints
- User authentication
- Role-based access control
- Issue creation with image upload
- Comments system
- Issue assignment
- Status workflow
- Activity logging
- Analytics dashboard

**Your MERN backend is production-ready!** 🚀

---

Generated: April 24, 2026
Ready to test: ✅ YES
