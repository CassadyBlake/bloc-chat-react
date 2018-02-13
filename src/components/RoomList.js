import React, { Component } from 'react';
import firebase from '../App.js';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      console.log(room);
      room.key = snapshot.key;
      console.log(room.key);
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }


  render() {
    return(
      <nav>
        <h1>Bloc Chat</h1>
        <table id="roomList">
          <tbody>
            {
              this.state.rooms.map( (rooms, index) =>
              <tr className="rooms">{ "Room " + (index + 1) }</tr>
              )
            }
          </tbody>
        </table>
      </nav>
      );
    }
}
export default RoomList;
