import React, { Component } from 'react';

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
    console.log('[album] will mount', this.props);
    this.fetchData(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoaded: false
    })
    console.log('[album] will receive props', nextProps);
    this.fetchData(nextProps.url);

    var that = this;
    setTimeout(function () {
      that.setState({
        isLoaded: true
      })
    }, 1000);

  }

  fetchData(url) {
    var that = this;
    fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        that.setState({ albumEntries: response.feed.entry });
        console.log(response.feed.entry);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  imageLoaded(image) {
    image.target.classList.add('Album__image--isLoaded');
  }

  render() {

    return (
      <div className="Album">
        <h1>{this.props.name}</h1>
        {
          this.state.isLoaded ?
            <ul className="Album__list">
              {
                this.state.albumEntries.map(
                  (entry, index) =>
                    <li key={entry.id.$t}>
                      <img src={entry.media$group.media$thumbnail[1].url} alt={entry.title.$t} className="Album__image" onLoad={this.imageLoaded.bind(this) }/>
                    </li>
                )
              }
            </ul>
            : 'Loading...'
        }
      </div>
    );
  }
}

export default Album;
