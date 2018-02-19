import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      value: undefined
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  renameRoomClick = (roomKey, newName) => {
    this.roomsRef.child(roomKey).update({name: newName})
  }

  deleteRoomClick = (roomKey, index) => {
    const removeKey = this.state.rooms[index].key;
    this.roomsRef.child(roomKey).remove();
    this.setState({ rooms: this.state.rooms.filter(room => removeKey !== room.key) });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    this.roomsRef.push({
      name: this.state.value,
    });
    this.setState({ value: '' });
    event.preventDefault();
  }



  render() {
    return(
      <div className="room-display">
        <form onSubmit={this.handleSubmit}>
          <label>
            Room name:<input type="text" value={this.state.value} onChange={this.handleChange} />
          </label><br />
          <input type="submit" value="Create Room" />
        </form><br />
        <table id="roomList">
          <tbody>
            {
              this.state.rooms.map( (room, index) =>
              <tr key={index}>
                <td className="rooms" onClick={() => this.props.changeActiveRoom( room )}>{ room.name }</td>

                <td><button value="Delete" onClick={() => this.deleteRoomClick(room.key, index)}>Delete</button></td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
      );
    }
}
export default RoomList;


//<td><button value="Rename" onClick={() => this.renameRoomClick(room.key, input)}>Rename</button></td>
