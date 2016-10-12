import React, { Component } from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';

import './../css/Albums.css';

import Album from './../components/Album';

class Albums extends Component {
  constructor() {
    super();

    this.state = {
      albums: [],
      currentAlbumName: undefined,
      currentAlbumUrl: undefined
      // albumEntries: []
    }

    this.albumFetched = false;
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
      .catch(function (err) {
        console.error(err);
      });
  }

  componentWillMount() {
    this.fetchData();
  }

  componentWillUpdate() {
    // console.log('componentWillUpdate', this.props.params.album );
  }

  componentDidUpdate() {
    if ( !this.albumFetched ) {
      this.albumFetched = true;
      var url = this.props.params.album === undefined ? undefined : this.urlOfCurrentAlbum(this.props.params.album);
      this.setState({
        currentAlbumName: this.props.params.album,
        currentAlbumUrl: url
      });
    } else {
      this.albumFetched = false;
    }
  }

  urlOfCurrentAlbum(albumName) {
    var that = this;
    var url = this.state.albums.find(function (album) {
      return that.normaliseAlbumTitle(album.title.$t) === albumName;
    });
    return url.link[0].href;
  }

  // componentDidUpdate() {
  //   var that = this;
  //   if (this.props.params.album && !that.albumFetched) {
  //     var currentAlbumObj = this.state.albums.find(function (album) {
  //       return that.normaliseAlbumTitle(album.title.$t) === that.props.params.album;
  //     });
  //     that.albumFetched = true;
  //     that.fetchData(currentAlbumObj.link[0].href, 'albumEntries');
  //   } else {
  //     that.albumFetched = false;
  //   }
  //   // console.log(this.props.location.pathname);
  // }

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
                      <Link to={'/album/' + this.normaliseAlbumTitle(album.title.$t)}>
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