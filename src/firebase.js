import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCb1Dm058cz5YnG9fhmFQisxC_qlbh4NUg",
    authDomain: "quick-chat-2-e5f24.firebaseapp.com",
    databaseURL: "https://quick-chat-2-e5f24.firebaseio.com",
    projectId: "quick-chat-2-e5f24",
    storageBucket: "quick-chat-2-e5f24.appspot.com",
    messagingSenderId: "566253500700"
};

firebase.initializeApp(config);

export default firebase;