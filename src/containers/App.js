import React, { Component } from 'react';
import {Link} from 'react-router';
import 'whatwg-fetch';

import './../css/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      albums: []
    }
  }

  fetchData() {
    var that = this;
    fetch('https://picasaweb.google.com/data/feed/base/user/112447402726197626187?alt=json&kind=album&hl=en_GB')
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        that.setState({ albums: response.feed.entry });
      });
  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    console.log(this.props);
    console.log(this.props.location.pathname);
  }

  normaliseAlbumTitle(title) {
    return encodeURIComponent(title.toLowerCase()).replace(/%20/g, "+");
  }

  render() {
    return (
      <div className="App">
        <div className="App__header">
          <h2><Link to="/">Welcome to React</Link></h2>
          <ul className="App__nav">
            {
              ( this.state.albums && this.state.albums.length > 0 ) ?
                this.state.albums.map(
                  (album, index) =>
                    <li key={index}>
                      <Link to={ '/album/' + this.normaliseAlbumTitle(album.title.$t) }>
                        <img src={album.media$group.media$thumbnail[0].url} alt={album.title.$t}/>
                      </Link>
                    </li>
                )
              : ''
            }
          </ul>
        </div>
        <div className="App__content">
          {
            ( this.state.albums && this.state.albums.length > 0 ) ?
                this.props.children && React.cloneElement(this.props.children, {
                  albums: this.state.albums
                })
              : ''
          }
        </div>
      </div>
    );
  }
}

export default App;