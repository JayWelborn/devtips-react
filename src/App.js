import React, { Component } from 'react';
import './App.css';


let defaultStyle = {
  color: '#ddd',
  backgroundColor: '#111',
  borderRadius: '5px',
  margin: '10px 5px'
}


class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>Number Text</h2>
      </div>
    );
  }
}


class Filter extends Component {
  render() {
    return (
      <div style={{
        ...defaultStyle,
        maxWidth: '50%',
        padding: '10px',
        margin: '0px auto'
      }}>
        <img src="" alt=""/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '23%', display: 'inline-block'}}>
        <img src="" alt=""/>
        <h3>Playlist Name</h3>
        <ul style={{listStyleType: 'none', padding: '0px'}}>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{
          ...defaultStyle,
          maxWidth: '50%',
          margin: '10px auto',
        }}>
          Title
        </h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />

      </div>
    );
  }
}

export default App;
