import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCc_9menYvcB_m6XvhPUoKBschSKw1cZYM",
    authDomain: "bloc-chat-react-48768.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-48768.firebaseio.com",
    projectId: "bloc-chat-react-48768",
    storageBucket: "bloc-chat-react-48768.appspot.com",
    messagingSenderId: "1043748299394"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
          < RoomList
            firebase={firebase}
          />
        </header>
        <main>
        </main>
      </div>
    );
  }
}

export default App;
