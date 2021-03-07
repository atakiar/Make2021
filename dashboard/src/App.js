import React, { Component } from 'react';
import { GiElectric, GiGasMask, GiSpeaker } from 'react-icons/gi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Grid, Divider, Icon, Feed } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [
        { name: 'Jon Zimmerman', location: [40.0049, -83.01297] },
        { name: 'Jack Canaday', location: [39.9995, -83.0127] },
        { name: 'James Buck', location: [40.0931, -83.0181] },
        { name: 'Lebron Smith', location: [40.0935, -83.0121] },
        { name: 'Emma Cassidy', location: [39.9732, -83.2747] },
        { name: 'Jessica Shane', location: [39.9732, -83.2797] },
        { name: 'Jon Zang', location: [39.9792, -83.2747] },
      ],
      warnings: [
        { time: '', person: 'Jon Zimmerman', type: 'gas', value: '75' },
        { time: '', person: 'Jon Zang', type: 'gas', value: '75' },
        { time: '', person: 'Jack Canaday', type: 'electricity', value: '75' },
        { time: '', person: 'Emma Cassidy', type: 'sound', value: '75' },
        { time: '', person: 'Jack Canaday', type: 'gas', value: '75' },
        { time: '', person: 'Jessica Shane', type: 'sound', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'gas', value: '75' },
        { time: '', person: 'Lebron Smith', type: 'sound', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'electricity', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'gas', value: '75' },
        { time: '', person: 'Jon Zang', type: 'gas', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'gas', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'sound', value: '75' },
        { time: '', person: 'James Buck', type: 'gas', value: '75' },
        { time: '', person: 'James Buck', type: 'gas', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'electricity', value: '75' },
        { time: '', person: 'Jessica Shane', type: 'gas', value: '75' },
        { time: '', person: 'Jessica Shane', type: 'sound', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'sound', value: '75' },
        { time: '', person: 'Jon Zang', type: 'gas', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'gas', value: '75' },
        { time: '', person: 'Jack Canaday', type: 'electricity', value: '75' },
        { time: '', person: 'Jack Canaday', type: 'sound', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'sound', value: '75' },
        { time: '', person: 'Jon Zimmerman', type: 'gas', value: '75' },
      ],
    };
  }

  getIcon = (type) => {
    const size = '50px';
    switch (type) {
      case 'electricity':
        return <GiElectric size={size} />;
      case 'gas':
        return <GiGasMask size={size} />;
      case 'sound':
        return <GiSpeaker size={size} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <Grid>
        <Grid.Column width="10">
          <MapContainer
            style={{ height: '100vh', width: '100wh' }}
            center={[40.00494, -83.012972]}
            zoom={11}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.people.map((person) => {
              return (
                <Marker position={person.location}>
                  <Popup>{person.name}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </Grid.Column>
        <Grid.Column width="6">
          <div style={{ margin: '10px', marginBottom: '20px' }}>
            <Feed
              style={{
                height: '100vh',
                overflow: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {this.state.warnings.map((warning) => (
                <>
                  <Feed.Event>
                    <Feed.Label>{this.getIcon(warning.type)}</Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        {`${
                          warning.type.charAt(0).toUpperCase() +
                          warning.type.substring(1)
                        } Warning - ${warning.person}`}
                      </Feed.Summary>
                      <Feed.Extra text>
                        <Feed.Date>1 Day Ago</Feed.Date>
                      </Feed.Extra>
                    </Feed.Content>
                  </Feed.Event>
                  <Divider />
                </>
              ))}
            </Feed>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
