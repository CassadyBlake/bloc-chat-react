import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: undefined
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }


  handleSubmit = (event) => {
    this.messagesRef.push({
      username: this.props.displayName,
      content: this.state.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomId
    });
    this.setState({ value: '' });
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

render() {
  return(
    <div id="message-room">
      <h2>{this.props.activeRoom}</h2>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Send" />
      </form>
        <table id="message-board">
          <tbody>
            {
                this.props.displayedMessages.map( (message, index) =>
                <tr key={index} className="messages">
                  <td>
                    <p><h3>{ message.username }</h3>{ message.content }</p>
                  </td>
                </tr>
                )
            }
          </tbody>
        </table>
    </div>
  )
}
}

export default MessageList;
