# Firebase Setup Guide

This guide will help you set up Firebase as the backend for the voting system.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Realtime Database

1. In your Firebase project, navigate to **Build** > **Realtime Database**
2. Click "Create Database"
3. Choose a database location (preferably closest to your users)
4. Start in **test mode** for development (see security rules below for production)

## Step 3: Configure Database Security Rules

For development/testing, you can use these rules (in the Firebase Console under Database > Rules):

```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": true
    },
    "userVotes": {
      ".read": true,
      "$userId": {
        ".write": true
      }
    }
  }
}
```

**⚠️ Warning:** These rules allow anyone to read and write. For production, consider more restrictive rules:

```json
{
  "rules": {
    "votes": {
      ".read": true,
      ".write": "auth != null"
    },
    "userVotes": {
      ".read": true,
      "$userId": {
        ".write": "auth != null && auth.uid == $userId"
      }
    }
  }
}
```

## Step 4: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "LSEG Unconference")
5. Copy the Firebase configuration object

## Step 5: Update firebase-config.js

Replace the placeholder values in `firebase-config.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 6: Test the Integration

1. Open your website in a browser
2. Open the browser's Developer Tools (F12)
3. Check the Console tab for:
   - "Firebase initialized successfully" message
   - No error messages
4. Try voting on a session
5. Open the website in a different browser/incognito window
6. You should see the votes synchronized in real-time!

## Features Included

✅ **Real-time synchronization** - Votes update across all connected clients instantly
✅ **Persistent storage** - Votes are saved to Firebase and survive page refreshes
✅ **Fallback support** - If Firebase is unavailable, uses localStorage as a backup
✅ **Unique user tracking** - Each user gets a unique ID for vote tracking
✅ **One vote per category** - Users can only vote once per category (can change their vote)

## Troubleshooting

### "Firebase not available" warning
- Check that `firebase-config.js` has valid credentials
- Verify Firebase SDK scripts are loading correctly in `index.html`
- Check browser console for CORS or network errors

### Votes not syncing
- Verify Realtime Database is enabled in Firebase Console
- Check security rules allow reading/writing
- Ensure `databaseURL` in config points to your database

### Permission denied errors
- Review and update security rules in Firebase Console
- For testing, use permissive rules (see Step 3)
- For production, implement proper authentication

## Next Steps (Optional)

- Add Firebase Authentication for user login
- Implement more restrictive security rules
- Add vote validation and rate limiting
- Create an admin dashboard to view all votes
- Export voting data for analysis
