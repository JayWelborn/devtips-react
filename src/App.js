import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';


let defaultStyle = {
  color: '#eee',
  backgroundColor: '#110a1b',
  borderRadius: '5px',
  margin: '10px 5px'
}

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
        <input type="text" onKeyUp={
          // Pass event text to onTextChange function of the parent
          event => this.props.onTextChange(event.target.value)
        }/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{
        ...defaultStyle,
        width: '30%',
        display: 'inline-block',
        minHeight: '300px',
      }}>
        <img style={{width:'160px', margin:'20px'}} src={this.props.playlist.imageUrl} alt=""/>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {
            this.props.playlist.songs.map(song =>
              <li>{song.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
}



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      serverData: {},
      filterString: '',
    }
  }

  componentDidMount() {

    // Get spotify access token from url querystring
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken)  {
      return;
    }

    // Fetch spotify data using access toekn
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    // set component's state with relevent data
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    // Fetch spotify data using access token
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    // data is list of playlists
    .then(playlistData => {
      let playlists = playlistData.items
      // fetch each track in playlists
      let trackDataPromises = playlists.map(playlist => {
        // get promises
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        // convert promise to json data when promise is fulfilled
        let trackDataPromise = responsePromise
          .then(response => response.json())
        // return data
        return trackDataPromise
      })
      // convert tracks datas promises to an array once they are all fulfilled
      let allTracksDatasPromises = Promise.all(trackDataPromises)
      // map the arrays of tracks to the array of playlists
      let playlistsPromise =  allTracksDatasPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          // Spotify track item is nested too deeply. Only care about track info
          playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name,
              // convert duration to seconds
              duration: trackData.duration_ms / 1000,
            }))
        })
        return playlists
      })
      return playlistsPromise
    })
    // set component's state with relevent data
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        console.log(item.trackDatas)
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: item.trackDatas.slice(0,4)
        }
      })
    }))
  };

  render() {
    // Filter playlists according to search string
    let playlistsToRender =
      this.state.user &&
      this.state.playlists
      // If user is set, create list of playlists
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
      : [] // Else return empty array


    return (
      <div className="App">
        {
          this.state.user ?
          <div>
            <h1 style={{...defaultStyle,
                        maxWidth: '50%',
                        margin: '10px auto',
                        padding: '10px',
                      }}>
              {this.state.user.name}'s Playlists
            </h1>

            <PlaylistCounter playlists={playlistsToRender} />
            <HoursCounter playlists={playlistsToRender} />
            <Filter onTextChange={text => this.setState({filterString: text})} />
            { // Map playlists to components
              playlistsToRender.map(playlist =>
                <Playlist playlist={playlist} />
              ) // End map
            }

          </div>
          :
          <button onClick={() => {
            window.location = window.location.href.includes('localhost')
              ? 'http://localhost:8888/login'
              : 'https://devtips-react-backend.herokuapp.com/login'
            }
          }
            style={{padding: '20px', fontSize: '50px', marginTop: '20px',}}>
            Sign in with Spotify
          </button>
        }

      </div>
    );
  }
}

export default App;
