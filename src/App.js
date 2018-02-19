import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeRoom: undefined,
      activeRoomId: undefined,
      activeUser: null,
      displayName: undefined
    };


  }

  setUser = ( user ) => {
    const newUser = user;
    this.setState({ activeUser: newUser });
    this.setState({ displayName: !newUser ? "Guest" : newUser.displayName });
  }

  setDisplayedMessages = ( aRoom, nMessages ) => {
      this.setState({ displayedMessages: nMessages.filter(message => message.roomId === aRoom) });
  }

  changeActiveRoom = ( room ) => {
    const newRoomName = room.name;
    const newRoomKey = room.key;
    this.setState({ activeRoom: newRoomName });
    this.setState({ activeRoomId: newRoomKey });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
            <nav>
              < User
                displayName={this.state.displayName}
                firebase={firebase}
                setUser={this.setUser}
                activeUser={this.state.activeUser}
                />
                < RoomList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                activeRoomId={this.state.activeRoomId}
                changeActiveRoom={this.changeActiveRoom}
                />
            </nav>
        </header>
        <main>
          < MessageList
            displayName={this.state.displayName}
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId}
            activeUser={this.state.activeUser}
          />
        </main>
      </div>
    );
  }
}

export default App;
