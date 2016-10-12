import React, { Component } from 'react';

class Album extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     albumEntries: []
  //   }

  //   this.albumFetched = false;
  // }

  componentWillUpdate() {
    console.log('componentWillUpdate');
    console.log(this.props.name);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    console.log(this.props.name);
    // console.log(this.props.url);
  }

  componentWillReceiveProps() {
    console.log('will receive props');
  }

  // fetchData() {
  //   var that = this;
  //   var routeAlbum = this.props.params.album;
  //   console.log(this.props.albums);
  //   var currentAlbumObj = this.props.albums.find(function (album) {
  //     return that.normaliseAlbumTitle(album.title.$t) === routeAlbum;
  //   });
  //   fetch(currentAlbumObj.link[0].href)
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(function (response) {
  //       that.setState({ albumEntries: response.feed.entry });
  //     })
  //     .catch(function (err) {
  //       console.error(err);
  //     });
  // }

  // componentDidMount() {
  //   console.log('didmount');
  //   this.getAlbumEntries();
  // }

  // componentDidUpdate() {
  //   console.log('didupdate');
  //   this.getAlbumEntries();
  // }

  // getAlbumEntries() {
  //   if (this.props.params.album && !this.albumFetched) {
  //     console.log('get');
  //     this.albumFetched = true;
  //     this.fetchData();
  //   } else {
  //     console.log('dont get');
  //     this.albumFetched = false;
  //   }
  // }

  // componentWillMount() {
  //   this.fetchData();
  // }

  // componentWillReceiveProps() {
  //   this.fetchData();
  // }

  // normaliseAlbumTitle(title) {
  //   return encodeURIComponent(title.toLowerCase()).replace(/%20/g, "+");
  // }

  render() {
    return (
      <div className="Album">
        Album<br/>
        {
          this.props.name
          //this.props.params.album
        }
        <br/>
        {this.props.url}
        {
          // this.state.albumEntries.map(
          //   (entry, index) =>
          //     <li key={entry.id.$t}>
          //       <img src={entry.content.src} alt={entry.title.$t}/>
          //     </li>
          // )
        }
      </div>
    );
  }
}

export default Album;
