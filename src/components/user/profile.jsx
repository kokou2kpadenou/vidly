import React, { Component } from "react";
import auth from "../../services/authService";
import SimpleInput from "../common/simpleInput";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }

  // handleOnChange = (e) => {
  //   this.setState()
  // }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <SimpleInput
          value={this.state.user.name}
          label="Name"
          visibleLabel={true}
        />
        <SimpleInput
          value={this.state.user.email}
          label="Email"
          visibleLabel={true}
        />
      </div>
    );
  }
}

export default Profile;
