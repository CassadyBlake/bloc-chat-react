import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleSignInClick = (event) => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOutClick = (event) => {
    this.props.firebase.auth().signOut();
  }


  render() {
    return(
      <div className="signIn-buttons">
        <h3>User Name: {!this.props.activeUser ? "Guest" : this.props.activeUser.displayName}</h3>
          {
            this.props.activeUser
            ? <button className="sign-out" value="Sign Out" onClick={ this.handleSignOutClick }>Sign Out</button>
            : <button className="sign-in" value="Sign In" onClick={ this.handleSignInClick }>Sign In</button>
          }

      </div>
    )
  }
}

export default User;
