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
      currentAlbumDetails: undefined
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    this.setAlbum(nextProps.params.album);
  }

  fetchData() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=5fa0c369d708145fc8f3a863a40d859c&user_id=149634475%40N07&format=json&nojsoncallback=1')
      .then(response => response.json())
      .then(response => {
        this.setState({ albums: response.photosets.photoset });
      })
      .then(() => {
        this.setAlbum(this.props.params.album)
      })
      .catch(err => {
        console.error(err);
      });
  }

  setAlbum(albumName) {
    if (albumName !== undefined) {
      var currentAlbum = this.currentAlbum(albumName);
      this.setState({
        currentAlbumName: albumName,
        currentAlbumDetails: currentAlbum
      });
    } else {
      this.setState({
        currentAlbumName: undefined,
        currentAlbumDetails: undefined
      });
    }
  }

  currentAlbum(albumName) {
    var album = this.state.albums.find( (album) => {
      return this.normaliseAlbumTitle(album.title._content) === albumName;
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
                      <Link to={'/album/' + this.normaliseAlbumTitle(album.title._content)}>
                        <img src={'https://farm' + album.farm + '.staticflickr.com/' + album.server + '/' + album.primary + '_' + album.secret + '_q.jpg'} alt={album.title._content} />
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
              <Album name={this.state.currentAlbumName} details={this.state.currentAlbumDetails} />
              : ''
          }
        </div>
      </div>
    );
  }
}

export default Albums;