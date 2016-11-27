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
    this.fetchData(this.props.url + '&imgmax=800');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      albumEntries: []
    })
    this.fetchData(nextProps.url);
  }

  componentWillUnmount() {
    this.ignoreLastFetch = true;
  }

  fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then( response => {
        if (!this.ignoreLastFetch) {
          this.setState({ albumEntries: response.feed.entry });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="Album">
        <h1>{this.props.name}</h1>
        <div className={classnames('Album__loader', { 'Album__loader--isHidden': this.state.albumEntries.length > 0 })}>
          Loading...
        </div>
        <div className={classnames('Album__list', { 'Album__list--isLoaded': this.state.albumEntries.length >= 1 })}>
          {
            this.state.albumEntries.map(
              (entry, index) =>
                <img key={entry.id.$t} src={entry.media$group.media$content[0].url} alt={entry.title.$t} className="Album__image" />
            )
          }
        </div>
      </div>
    );
  }
}

export default Album;
