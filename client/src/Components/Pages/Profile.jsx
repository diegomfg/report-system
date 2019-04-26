import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class UserProfile extends Component {
    state = {  }
    render() {
        return ( 
            <Container>
                <h1>User profile <code>{this.props.user}</code></h1>
            </Container>
         );
    }
}
 
export default UserProfile;