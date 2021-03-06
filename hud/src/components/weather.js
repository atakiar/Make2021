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
    const size = '300px';
    const color = ' #ff695e';
    switch (iconName.substring(0, 2)) {
      case '01':
        return <WiDaySunny size={size} color={color} />;
      case '02':
        return <WiDayCloudy size={size} color={color} />;
      case '03':
        return <WiCloudy size={size} color={color} />;
      case '04':
        return <WiCloudyWindy size={size} color={color} />;
      case '09':
        return <WiShowers size={size} color={color} />;
      case '10':
        return <WiRain size={size} color={color} />;
      case '11':
        return <WiThunderstorm size={size} color={color} />;
      case '13':
        return <WiSnowflakeCold size={size} color={color} />;
      case '50':
        return <WiFog size={size} color={color} />;
      default:
        return <WiCloud size={size} color={color} />;
    }
  };

  const icon = props.weather?.icon || '01d';
  const description = props.weather?.description || 'Clear Sky';
  const feelsLike = props.weather?.feelsLike || 25;
  const temperature = props.weather?.temperature || 30;

  return (
    <Header
      style={{
        marginTop: '80px',
        marginLeft: '40px',
        fontSize: '100px',
      }}
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
