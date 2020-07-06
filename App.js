import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MemoListScreens from './src/screens/MemoListScreens';
import MemoDetailScreens from './src/screens/MemoDetailScreens';
import MemoEditScreens from './src/screens/MemoEditScreens';
import LoginScreens from './src/screens/LoginScreens';
import SignUpScreens from './src/screens/SignUpScreens';
import MemoCreateScreens from './src/screens/MemoCreateScreens';
import { Platform } from 'react-native';

require("firebase/firestore");
import firebase from 'firebase';
import ENV from './env.json';

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_RRJ_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MJM_ID
};
firebase.initializeApp(firebaseConfig);

const App = createStackNavigator({
     Login:      { screen: LoginScreens },
     SignUp:     { screen: SignUpScreens },
     Home:       {screen: MemoListScreens },
     MemoCreate: { screen: MemoCreateScreens },
     MemoDetail: { screen: MemoDetailScreens },
     MemoEdit:   { screen: MemoEditScreens },

  }, {
  defaultNavigationOptions: { 
  headerTitle:'Memot',
  headerTintColor:'#fff',
  headerTitleAlign:'center',
  headerBackTitle: null,
  headerStyle:{
    ...Platform.select({
      android: {
        backgroundColor:'#8B4513',
      },
      ios: {
        backgroundColor:'#CCCC00',
      }
    })
  },
  headerTitleStyle:{
    color:'#fff',
  },
},
});


export default createAppContainer(App);
