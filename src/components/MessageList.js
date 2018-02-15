import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: 'room1',
      messages: [],
      value: ''
    };

    this.roomsRef = this.props.firebase.database().ref('messages');
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      message: this.state.value
    });
    this.setState({ value: '' });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

render() {
  return(
    <div id="message-room">
      <h2>{this.state.roomName}</h2>
      <form onSubmit={this.handleSubmit}>
        <label>
          UserName<input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Send" />
      </form>
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
