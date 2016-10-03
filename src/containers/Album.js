import React, { Component } from 'react';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumEntries: []
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
        console.log(response.feed.entry);
        that.setState({ albumEntries: response.feed.entry });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.fetchData();
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
    this.fetchData();
  }

  normaliseAlbumTitle(title) {
    return encodeURIComponent(title.toLowerCase()).replace(/%20/g, "+");
  }

  render() {
    console.log('render', this.state);
    return (
      <div className="Album">
        {this.props.params.album}
        {
          this.state.albumEntries.map(
            (entry, index) =>
              <li key={entry.id.$t}>
                <img src={entry.content.src} alt={entry.title.$t}/>
              </li>
          )
        }
      </div>
    );
  }
}

export default Album;
