# TheraRider

A single-file web app for scheduling hippotherapy sessions — horses, therapists,
lead/side walker guides, equipment, recurring lessons, horse care tasks, and
exercises, all on a shared calendar that syncs across everyone's devices.

## 1. Set up Firebase (free, ~5 minutes)

This gives you the shared database so everyone on your team sees the same
schedule in real time.

1. Go to **https://console.firebase.google.com** and sign in with any Google
   account. Click **Add project**, give it a name (e.g. "thera-rider"), and
   finish the wizard (you can decline Google Analytics, you don't need it).
2. In the left sidebar, click **Build → Firestore Database**, then
   **Create database**. Choose **Start in production mode**, pick any region
   close to you, and click **Enable**.
3. Click the **Rules** tab at the top of the Firestore page. Replace
   everything there with the rules below, then click **Publish**:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

   **What this means:** anyone who has your app's web address can read and
   write your schedule data — there's no login built into this app. That's
   fine for a small team using a private link, but don't post the link
   publicly. If you'd like real per-user logins and tighter security later,
   that's a bigger follow-up project — just ask.

4. Click the **gear icon** (top left, next to "Project Overview") →
   **Project settings**. Scroll down to **"Your apps"** and click the web
   icon (`</>`). Give it any nickname and click **Register app**. You'll see
   a code block with a `firebaseConfig` object containing six values
   (`apiKey`, `authDomain`, `projectId`, `storageBucket`,
   `messagingSenderId`, `appId`).
5. Open `index.html` in this folder, find the `firebaseConfig` block near
   the top of the `<script>` section, and replace each `"REPLACE_ME"` with
   the matching value from step 4. Save the file.

## 2. Put it on GitHub Pages (free hosting)

1. Create a new repository on GitHub (e.g. `thera-rider`).
2. Upload the edited `index.html` to the root of that repo.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. GitHub will give you a URL like `https://<your-username>.github.io/thera-rider/`
   after a minute or two. That's your live app — share that link with your
   team, and everyone who opens it will see and edit the same schedule.

No build step, no npm, no server beyond Firebase — it's one HTML file plus a
free Google database.

## Checking it's working

Open the app and look at the status bar under the tabs. It should say
**"Shared sync on ✓"**. If it instead says "Firebase not set up yet," double
check the six values you pasted into `firebaseConfig`. If it says "Firebase
setup error," the message after it will usually say what's wrong (often a
typo in one of the pasted values).

## Installing it as an app

Once it's live on GitHub Pages, you and your team can install TheraRider as
a real app with its own icon — no app store needed:

- **Android / Chrome:** open the site, tap the **⋮** menu → **Install app**
  (or **Add to Home screen**).
- **iPhone / Safari:** open the site, tap the **Share** button → **Add to
  Home Screen**.
- **Desktop Chrome/Edge:** open the site, click the **install icon** in the
  address bar (or **⋮** menu → **Install TheraRider...**).

It'll open in its own window with the horse icon, separate from your regular
browser tabs, and keeps working offline for viewing — though you'll need a
connection for changes to sync through Firebase.

## Editing

Everything — HTML, CSS, and JavaScript — lives in `index.html`. Open it in
any text editor to make further changes; there's nothing to compile or
install.
