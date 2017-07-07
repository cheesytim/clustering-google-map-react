import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Marker from '../Marker';

import MarkerGroup from './MarkerGroup';
import MarkerCounter from './MarkerCounter';

class ClusterMarker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    clusterFaceMarkers: this.props.points.slice(0, 2),
  };

  render() {
    return (
      <MarkerGroup length={this.props.points.length}>
        {this.state.clusterFaceMarkers.map(marker =>
          <Marker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            name={marker.id}
            inGroup
          />
        )}
        {this.props.points.length > 2 &&
          <MarkerCounter>
            +{this.props.points.length - 2}
          </MarkerCounter>}
      </MarkerGroup>
    );
  }
}

ClusterMarker.propTypes = {
  points: PropTypes.array,
  users: PropTypes.instanceOf(List),
  selected: PropTypes.bool,
};

export default ClusterMarker;
