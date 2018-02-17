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
      activeRoom: '',
      activeRoomId: '',
      messages: [],
      displayedMessages: []
    };

    this.messagesRef = firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
      });
  }

  setDisplayedMessages() {
    const activeRoomId = this.state.activeRoomId;
    const messages = this.state.messages;
    const newDisplayedMessages = messages.filter(message => message.roomId === activeRoomId);
    this.setState({ displayedMessages: newDisplayedMessages });

  }

  changeActiveRoom( room ) {
    const newRoomName = room.name;
    const newRoomKey = room.key;
    this.setState({ activeRoom: newRoomName });
    this.setState({ activeRoomId: newRoomKey });
    this.setDisplayedMessages();
  }

  render() {
    return (
      <div className="App">
        <header>
          < RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId}
            changeActiveRoom={( room ) => this.changeActiveRoom( room )}
            setDisplayedMessages={() => this.setDisplayedMessages()}
          />
        </header>
        <main>
          < MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId}
            displayedMessages={this.state.displayedMessages}
            setDisplayedMessages={() => this.setDisplayedMessages()}
          />
        </main>
      </div>
    );
  }
}

export default App;
