import React, { Component } from 'react';
import './App.css';


let defaultStyle = {
  color: '#eee',
  backgroundColor: '#110a1b',
  borderRadius: '5px',
  margin: '10px 5px'
}

let fakeServerData = {
  user: {
    name: 'Jay',
    playlists: [
      {
        name: 'My favorites',
        songs:[
          {name: 'Beat It', duration: 1234},
          {name: 'Yankee Doodle', duration: 1324},
          {name: 'Quartet for the End of Time', duration: 4321},
          {name: 'Body & Soul', duration: 2431}
        ]
      },
      {
        name: 'Discover Weekly',
        songs:[
          {name: 'Le Song', duration: 1325},
          {name: 'the Song', duration: 1523},
          {name: 'Songysong', duration: 1542}
        ]
      },
      {
        name: 'Another Playlist (#3)',
        songs:[
          {name: 'Beat It', duration: 1234},
          {name: 'Yankee Doodle', duration: 1324},
          {name: 'Quartet for the End of Time', duration: 4321},
          {name: 'Body & Soul', duration: 2431}
        ]
      },
      {
        name: 'Super #4',
        songs:[
          {name: 'Beat It', duration: 1234},
          {name: 'Yankee Doodle', duration: 1324},
          {name: 'Quartet for the End of Time', duration: 4321},
          {name: 'Body & Soul', duration: 2431}
        ]
      }
    ],
  }
};


class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum += eachSong.duration
    }, 0);
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
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
  constructor(props){
    super(props);
    this.state = {
      serverData: {}
    }
  }

  componentDidMount() {
    setTimeout(() => {
        this.setState({
          serverData: fakeServerData
        });
      }, 1000)
  }
  render() {
    return (
      <div className="App">
        {
          this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle,
                        maxWidth: '50%',
                        margin: '10px auto',}}>
              {this.state.serverData.user.name}'s Playlists
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists} />
            <Filter />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
          </div>
          :
          <h1 style={{...defaultStyle,
                      maxWidth: '50%',
                      margin: '10px auto'}}>
            Loading
          </h1>
        }

      </div>
    );
  }
}

export default App;
