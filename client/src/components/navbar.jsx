import React, {Component} from 'react';

class Navbar extends Component{
  
  state={
    isOpen: false
  }
  
  render(){
  
    
    this.handleToggle = ()=>{
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
    
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    
   return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" onClick={this.handleToggle}  type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/"><i className="fa fa-home" aria-hidden="true"></i>  Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user/dashboard"><i className="fa fa-bar-chart" aria-hidden="true"></i>  Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/log/new"><i className="fa fa-file-text" aria-hidden="true"></i>  New Log</a>
              </li>
               <li className="nav-item">
                <a className="nav-link" href="/log/all"><i className="fa fa-archive" aria-hidden="true"></i> Logs</a>
              </li>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><a href="/" className="nav-link"><i className="fa fa-sign-in" aria-hidden="true"></i>  Login</a></li>
                    <span className="nax-item nav-link">Logged in as: Diego</span>
                    <li className="nav-item"><a href="/user/logout" className="nav-link"><i className="fa fa-sign-in" aria-hidden="true"></i>  Logout</a></li>
                </ul>
            </ul>
          </div>
        </nav>
        
    ); 
  }
}

export default Navbar;


// <ul className="nav navbar-nav navbar-right">
//                           <% if (typeof(currentUser) === "undefined") { %>
//                             <li className="nav-item"><a href="/" className="nav-link"><i className="sign in alternate icon"></i> Login</a></li>
//                           <% } else { %>
//                             <span className="nax-item nav-link">Logged in as: <%= currentUser.username %></span>
//                             <li className="nav-item"><a href="/user/logout" className="nav-link"><i className="sign out alternate icon"></i> Logout</a></li>
//                           <% } %>
//                         </ul>