import React, { Component } from 'react';

import './../css/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: {}
    }
  }

  fetchData() {
    var that = this;
    var routeAlbum = this.props.params.album;
    var currentAlbumObj = this.props.albums.find(function (album) {
      return that.normaliseAlbumTitle(album.title.$t) === routeAlbum;
    });
    fetch(currentAlbumObj.link[0].href)
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        console.log(response.feed);
        // that.setState({ album: response.feed.entry });
      });
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.fetchData();
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
    this.fetchData();
  }

  normaliseAlbumTitle(title) {
    return encodeURIComponent(title.toLowerCase()).replace(/%20/g, "+");
  }

  render() {
    return (
      <div className="Album">
        {this.props.params.album}
      </div>
    );
  }
}

export default Album;
