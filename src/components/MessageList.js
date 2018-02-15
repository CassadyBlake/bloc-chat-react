import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: 'room1',
      messages: []
    };

    this.roomsRef = this.props.firebase.database().ref('messages');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const message = snapshot.val();
      console.log(message);
      message.key = snapshot.key;
      console.log(message.key);
      this.setState({ messages: this.state.messages.concat( message ) })
      console.log(this.state.messages);
    });
  }

  handleSubmit(event) {
    this.roomsRef.push({
      name: this.state.value
    });
    this.setState({ value: '' });
    event.preventDefault();
  }


render() {
  return(
    <div id="message-room">
      <h2>{this.state.roomName}</h2>
        <table id="message-board">
        {
          this.state.messages.map( (messages, index) =>
          <tr key={index} className="messages">{ this.state.messages[index].message }</tr>
        )
        }
        </table>
    </div>
  )
}
}

export default MessageList;
