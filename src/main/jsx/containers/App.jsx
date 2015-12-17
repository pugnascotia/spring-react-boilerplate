import React from 'react';
import { IndexLink, Link } from 'react-router';

class App extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <IndexLink to="/" className="navbar-brand">spring-react-boilerplate</IndexLink>
            </div>
            <div id="navbar" className="collapse navbar-right navbar-collapse">
              <ul className="nav navbar-nav">
                <li><IndexLink to="/">Home</IndexLink></li>
                <li><Link to="/add">Add Comment</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <div id="app" className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
