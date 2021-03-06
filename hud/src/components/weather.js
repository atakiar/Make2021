import React from 'react';
import {
  WiCloud,
  WiCloudy,
  WiCloudyWindy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiShowers,
  WiSnowflakeCold,
  WiThunderstorm,
} from 'react-icons/wi';
import { Header } from 'semantic-ui-react';

const Weather = (props) => {
  const getWeatherIconFromName = (iconName) => {
    const size = '250px';
    switch (iconName.substring(0, 2)) {
      case '01':
        return <WiDaySunny size={size} />;
      case '02':
        return <WiDayCloudy size={size} />;
      case '03':
        return <WiCloudy size={size} />;
      case '04':
        return <WiCloudyWindy size={size} />;
      case '09':
        return <WiShowers size={size} />;
      case '10':
        return <WiRain size={size} />;
      case '11':
        return <WiThunderstorm size={size} />;
      case '13':
        return <WiSnowflakeCold size={size} />;
      case '50':
        return <WiFog size={size} />;
      default:
        return <WiCloud size={size} />;
    }
  };

  const icon = props.weather?.icon || '01d';
  const description = props.weather?.description || 'Clear Sky';
  const feelsLike = props.weather?.feelsLike || 25;
  const temperature = props.weather?.temperature || 30;

  return (
    <Header
      style={{
        marginTop: '110px',
        marginLeft: '40px',
        fontSize: '100px',
      }}
      color="red"
      inverted
    >
      {getWeatherIconFromName(icon)}
      <Header.Content>
        {description}
        <Header.Subheader style={{ fontSize: '50px', color: 'white' }}>
          {`Feels Like: ${feelsLike}°F`}
        </Header.Subheader>
        <Header.Subheader style={{ fontSize: '50px', color: 'white' }}>
          {`Temperature: ${temperature}°F`}
        </Header.Subheader>
      </Header.Content>
    </Header>
  );
};

export default Weather;
