# Ontrack - project management
Check live [demo](https://ontrack.onrender.com/).

## Project set up

If you want to set up this project to run locally on your computer, here's how.

### Install dependencies

Open the terminal with the path to your cloned project > run cmd

```
npm install
```

### Firebase.js config

1. Go to Firebase and set up your project. Firebase will then give you the configs that you need.
2. Open the project in your prefered code editor and navigate to src folder. Find and open the Firebase.js file.
3. Replace the code below with your own credentials, or just simply copy and paste the whole config object.

```
// Copy your project config from Firebase and paste to replace everything between the dashed lines

// ----------------------------------------------------
const firebaseConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  projectId: YOUR_PROJECT_ID,
  storageBucket: YOUR_STORAGE_BUCKET,
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  appId: YOUR_APP_ID,
  measurementId: YOUR_MEASUREMENT_ID,
};
// -----------------------------------------------------
```

### Start your project on localhost

In your terminal run cmd

```
npm run dev
```

### Additional Firebase set up

You might have to do some additional set up to get your app run properly.

- Can't login ? Make sure that you enabled authentication with Google in Firebase project settings.
- On login page, login button doesn't work, login popup doesn't open or briefly appear then disappear ? Go to your Firebase project > Authentication > Settings > Authorized domain > Add your current domain. Firebase set localhost as authorized domain as default. But if your page is running on 127.0.0.1 (which is the same as localhost) this error will definitely appear.
- After you signed in, you'll be able to access the app, afterward please check the console on your browser. Firebase will throw some errors that tell you to add the indexes, just follow the instruction and the Firebase set up is complete.
