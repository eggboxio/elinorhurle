import React, { Component } from 'react';
import { Link } from 'react-router';

import './../css/Albums.css';

import Album from './../components/Album';

class Albums extends Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      currentAlbumName: undefined,
      currentAlbumUrl: undefined
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    this.setAlbum(nextProps.params.album);
  }

  fetchData() {
    var that = this;
    fetch('https://picasaweb.google.com/data/feed/base/user/112447402726197626187?alt=json&kind=album&hl=en_GB')
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        that.setState({ albums: response.feed.entry });
      })
      .then(function () {
        that.setAlbum(that.props.params.album)
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  setAlbum(albumName) {
    if (albumName !== undefined) {
      var currentAlbum = this.currentAlbum(albumName);
      this.setState({
        currentAlbumName: albumName,
        currentAlbumUrl: currentAlbum.link[0].href
      });
    } else {
      this.setState({
        currentAlbumName: undefined,
        currentAlbumUrl: undefined
      });
    }
  }

  currentAlbum(albumName) {
    var that = this;
    var album = this.state.albums.find(function (album) {
      return that.normaliseAlbumTitle(album.title.$t) === albumName;
    });
    return album;
  }

  normaliseAlbumTitle(title) {
    return encodeURIComponent(title.toLowerCase()).replace(/%20/g, "+");
  }

  render() {
    return (
      <div className="Albums">
        <div className="Albums__header">
          <ul className="Albums__nav">
            {
              (this.state.albums && this.state.albums.length > 0) ?
                this.state.albums.map(
                  (album, index) =>
                    <li key={index}>
                      <Link to={'/album/' + this.normaliseAlbumTitle(album.title.$t) }>
                        <img src={album.media$group.media$thumbnail[0].url} alt={album.title.$t} />
                      </Link>
                    </li>
                )
                : ''
            }
          </ul>
        </div>
        <div className="Albums__content">
          {
            this.state.currentAlbumName !== undefined ?
              <Album name={this.state.currentAlbumName} url={this.state.currentAlbumUrl}/>
              : ''
          }
        </div>
      </div>
    );
  }
}

export default Albums;