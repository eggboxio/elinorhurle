import React, { Component } from 'react';
import classnames from 'classnames';

import './../css/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumEntries: [],
      isLoaded: false
    }
  }

  componentWillMount() {
    this.fetchData(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoaded: false
    })
    this.fetchData(nextProps.url);
  }

  fetchData(url) {
    var that = this;
    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        setTimeout(function () {
          that.setState({ albumEntries: response.feed.entry });
          setTimeout(function () {
            that.setState({ isLoaded: true })
          }, 500);
        }, 500);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  render() {

    return (
      <div className="Album">
        <h1>{this.props.name}</h1>
        <div className={classnames('Album__loader', {'Album__loader--isHidden': this.state.isLoaded})}>
          Loading...
        </div>
        <ul className={classnames('Album__list', { 'Album__list--isLoaded': this.state.isLoaded }) }>
          {
            this.state.albumEntries.map(
              (entry, index) =>
                <li key={entry.id.$t} className="Album__image" style={ {backgroundImage:'url(' + entry.media$group.media$thumbnail[1].url + ')'} }></li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Album;
