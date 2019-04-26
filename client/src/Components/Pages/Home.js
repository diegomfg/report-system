import React, { Component } from 'react';
import {Container} from "react-bootstrap";
class Home extends Component {
    state = { 
        ActiveUser: null
     }
     
    render() { 
        return ( 
            <Container>
                <h1>{this.props.user}</h1>
            </Container>
         );
    }
}
 
export default Home;