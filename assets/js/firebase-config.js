/* ═══════════════════════════════════════════════════════════
   NEXT RIDES UGANDA — Firebase Configuration
   
   HOW TO SET UP (takes 3 minutes, free):
   ────────────────────────────────────────
   1. Go to https://console.firebase.google.com
   2. Click "Create a project" → name it "next-rides-ug"
   3. Skip Google Analytics → Create Project
   4. Click "Realtime Database" in the left sidebar
   5. Click "Create Database" → choose any region → Start in TEST MODE
   6. Copy the database URL (looks like: https://next-rides-ug-xxxxx-default-rtdb.firebaseio.com)
   7. Replace the URL below with YOUR URL
   
   That's it — likes and reviews will sync for all visitors!
═══════════════════════════════════════════════════════════ */

window.NR_FB_DB = 'https://realtime-database-89080-default-rtdb.firebaseio.com';
/* ↑ Replace this with YOUR Firebase Realtime Database URL */

/* ── Optional: set security rules in Firebase console ──
   Paste these rules to allow public read + write:
   {
     "rules": {
       "likes":   { ".read": true, ".write": true },
       "reviews": { ".read": true, ".write": true }
     }
   }
══════════════════════════════════════════════════════════ */
