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
        <table id="roomList">
          <form onSubmit={this.handleSubmit}>
            <tbody>
              <tr>
                <td>
                  <button type="submit" value="Create Room">Create</button>
                </td>
                <td>
                  <label>
                    <input type="text" placeholder="type new room name" value={this.state.value} onChange={this.handleChange} />
                  </label>
                </td>
              </tr>
            {
              this.state.rooms.map( (room, index) =>
              <tr key={index}>
                <td><button value="Delete" onClick={() => this.deleteRoomClick(room.key, index)}>Delete</button></td>
                <td className="rooms" onClick={() => this.props.changeActiveRoom( room )}>{ room.name }</td>
              </tr>
              )
            }
          </tbody>
          </form>
        </table>
      </div>
      );
    }
}
export default RoomList;


//<td><button value="Rename" onClick={() => this.renameRoomClick(room.key, input)}>Rename</button></td>
