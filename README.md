
## Example of Clustering for Google Map!

based on [google-map-react](https://github.com/istarkov/google-map-react) (without recompose :)

### [Demo](https://tim152.github.io/clustering-google-map-react/)
[<img src="https://github.com/Tim152/clustering-google-map-react/blob/master/public/demo.png" alt="clustering google map react" width="410">](https://tim152.github.io/clustering-google-map-react/)

/src/components/GoogleMap/index.js
```javascript
import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';

import mapStyles from './mapStyles.json';
import { markersData, susolvkaCoords } from '../../fakeData';

import MapWrapper from './MapWrapper';

const MAP = {
  defaultZoom: 8,
  defaultCenter: susolvkaCoords,
  options: {
    styles: mapStyles,
    maxZoom: 19,
  },
};

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    mapOptions: {
      center: MAP.defaultCenter,
      zoom: MAP.defaultZoom,
    },
    clusters: [],
  };

  getClusters = props => {
    const clusters = supercluster(markersData, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [],
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          defaultCenter={MAP.defaultCenter}
          options={MAP.options}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: 'AIzaSyAS3ix4rVY4A-T4yPzWlEi766ycl2mY818' }}
        >
          {this.state.clusters.map(item => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                />
              );
            }

            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
```
This project has bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
