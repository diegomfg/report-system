import React, { Component } from 'react';

class UserProfile extends Component {
    state = {  }
    render() {
        return ( 
            // <Container>
                <div className="content">
                    <h1>User profile <code>{this.props.user ? this.props.user : "null"}</code></h1>
                </div>
            // </Container>
         );
    }
}
 
export default UserProfile;