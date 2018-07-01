import firebase from 'react-native-firebase';

const config = {
    apiKey: "AIzaSyBAlIbALRI5n4tbYQv6v1zgV1q-fDU1Hbg",
    authDomain: "magnetic-nimbus-202118.firebaseapp.com",
    databaseURL: "https://magnetic-nimbus-202118.firebaseio.com",
    projectId: "magnetic-nimbus-202118",
    storageBucket: "magnetic-nimbus-202118.appspot.com",
    messagingSenderId: "739314984766"
  };

export default Firebase = firebase.initializeApp(config);
