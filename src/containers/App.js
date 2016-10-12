import React, { Component } from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';

import './../css/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      albumEntries: []
    }

    this.albumFetched = false;
  }

  fetchData(url, stateToUpdate) {
    var that = this;
    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        that.setState({ [stateToUpdate]: response.feed.entry });
      });
  }

  componentWillMount() {
    this.fetchData('https://picasaweb.google.com/data/feed/base/user/112447402726197626187?alt=json&kind=album&hl=en_GB', 'albums');
  }

  componentDidUpdate() {
    var that = this;
    if (this.props.params.album && !that.albumFetched) {
      var currentAlbumObj = this.state.albums.find(function (album) {
        return that.normaliseAlbumTitle(album.title.$t) === that.props.params.album;
      });
      that.albumFetched = true;
      that.fetchData(currentAlbumObj.link[0].href, 'albumEntries');
    } else {
      that.albumFetched = false;
    }
    // console.log(this.props.location.pathname);
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
              (this.state.albums && this.state.albums.length > 0) ?
                this.state.albums.map(
                  (album, index) =>
                    <li key={index}>
                      <Link to={'/album/' + this.normaliseAlbumTitle(album.title.$t)}>
                        <img src={album.media$group.media$thumbnail[0].url} alt={album.title.$t} />
                      </Link>
                    </li>
                )
                : ''
            }
          </ul>
        </div>
        <div className="App__content">
          {this.props.children}
          {
            // ( this.state.albums && this.state.albums.length > 0 ) ?
            //     this.props.children && React.cloneElement(this.props.children, {
            //       albums: this.state.albums
            //     })
            //   : ''
          }
        </div>
      </div>
    );
  }
}

export default App;