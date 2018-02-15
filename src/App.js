import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);

    this.state = {
      ActiveRoom: ''
    };


  }

  changeActiveRoom(roomName) {
    this.setState({ ActiveRoom: roomName });
  }

  render() {
    return (
      <div className="App">
        <header>
          < RoomList
            firebase={firebase}
            ActiveRoom={this.state.ActiveRoom}
            changeActiveRoom={(roomName) => this.changeActiveRoom(roomName)}
          />
        </header>
        <main>
          < MessageList
            firebase={firebase}
            ActiveRoom={this.state.ActiveRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
