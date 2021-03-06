import React from 'react';
import { GiElectric, GiGasMask, GiSpeaker } from 'react-icons/gi';
import { Header } from 'semantic-ui-react';

const Status = (props) => {
  const getColor = (type, value) => {
    let color = null;
    switch (type) {
      case 'electricity':
        if (value >= 0 && value < 50) {
          color = null;
        } else if (value >= 50 && value < 70) {
          color = 'yellow';
        } else if (value >= 70 && props.value <= 100) {
          color = 'red';
        }
        return color;
      case 'gas':
        if (value >= 0 && value < 1500) {
          color = null;
        } else if (value >= 1500 && value < 3000) {
          color = 'yellow';
        } else if (value >= 3000) {
          color = 'red';
        }
        return color;
      case 'sound':
        if (value >= 0 && value < 50) {
          color = null;
        } else if (value >= 50 && value < 75) {
          color = 'yellow';
        } else if (value >= 75) {
          color = 'red';
        }
        return color;
      default:
        return color;
    }
  };

  const getIcon = (type) => {
    const size = '200px';
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

  const getValue = (type, value) => {
    switch (type) {
      case 'electricity':
        return <Header.Content>{`${value}%`}</Header.Content>;
      case 'gas':
        return <Header.Content>{`${value} ppm`}</Header.Content>;
      case 'sound':
        return <Header.Content>{`${value} dB`}</Header.Content>;
      default:
        return null;
    }
  };

  return (
    <Header
      style={{
        marginTop: '100px',
        marginLeft: '40px',
        fontSize: '80px',
      }}
      color={getColor(props.type, props.value)}
      inverted
    >
      {getIcon(props.type)}
      <Header.Content
        style={{ marginTop: '50px', marginLeft: '20px', fontSize: '70px' }}
      >
        {getValue(props.type, props.value)}
      </Header.Content>
    </Header>
  );
};

export default Status;
