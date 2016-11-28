import React, { Component } from 'react';
import classnames from 'classnames';

import './../css/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumEntries: [],
    }

    this.ignoreLastFetch = false;
  }

  componentWillMount() {
    this.fetchData(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5fa0c369d708145fc8f3a863a40d859c&photoset_id=${this.props.details.id}&format=json&nojsoncallback=1`);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      albumEntries: []
    })
    this.fetchData(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=5fa0c369d708145fc8f3a863a40d859c&photoset_id=${nextProps.details.id}&format=json&nojsoncallback=1`);
  }

  componentWillUnmount() {
    this.ignoreLastFetch = true;
  }

  fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then( response => {
        if (!this.ignoreLastFetch) {
          this.setState({ albumEntries: response.photoset.photo });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="Album">
        <div className={classnames('Album__loader', { 'Album__loader--isHidden': this.state.albumEntries.length > 0 })}>
          Loading...
        </div>
        <div className={classnames('Album__list', { 'Album__list--isLoaded': this.state.albumEntries.length >= 1 })}>
          {
            this.state.albumEntries.map(
              (entry, index) =>
               <img key={entry.id} src={`https://farm${entry.farm}.staticflickr.com/${entry.server}/${entry.id}_${entry.secret}_n.jpg`} alt={entry.title} className="Album__image" />
            )
          }
        </div>
      </div>
    );
  }
}

export default Album;
