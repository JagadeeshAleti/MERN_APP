require('dotenv').config();

//Initialize
const { initializeApp } = require('firebase/app');
const { getStorage, getDownloadURL, ref, uploadBytes } = require('firebase/storage');

const firebaseConfig = {
    bucketName: process.env.FIREBASE_BUCKET_NAME,
    credentials: {
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID,
    },
    storageBucket: 'mern-stack-service-app.appspot.com'
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports.FirebaseService = {
    uploadFile: async (file, key) => {
        const storageRef = ref(storage, `service/${file.name}`);
        await uploadBytes(storageRef, file.data);
        return await getDownloadURL(storageRef);   
    }
}