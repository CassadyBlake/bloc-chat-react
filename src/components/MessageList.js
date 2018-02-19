import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedMessages: [],
      messages: [],
      value: undefined
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      const newMessages = this.state.messages.concat(message)
      this.setState({ messages: newMessages });
      this.setDisplayedMessages(this.props.activeRoomId, newMessages);
      });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setDisplayedMessages( nextProps.activeRoomId, this.state.messages);
  }

  setDisplayedMessages = ( aRoom, nMessages ) => {
      this.setState({ displayedMessages: nMessages.filter(message => message.roomId === aRoom) });
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
                this.state.displayedMessages.map( (message, index) =>
                <tr key={index} className="messages">
                  <td>
                    <h3>{ message.username }</h3><p>{ message.content }</p>
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
