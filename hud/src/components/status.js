import React from 'react';
import { GiElectric, GiGasMask, GiSpeaker } from 'react-icons/gi';
import { Header } from 'semantic-ui-react';
import { flags } from '../config';

const Status = (props) => {
  const getColor = (type, value) => {
    let color = null;
    switch (type) {
      case 'electricity':
        if (value < flags.statusThreshold.electricity.mid) {
          color = null;
        } else if (
          value >= flags.statusThreshold.electricity.mid &&
          value < flags.statusThreshold.electricity.high
        ) {
          color = 'yellow';
        } else if (value >= flags.statusThreshold.electricity.high) {
          color = 'red';
        }
        return color;
      case 'gas':
        if (value < flags.statusThreshold.gas.mid) {
          color = null;
        } else if (
          value >= flags.statusThreshold.electricity.mid &&
          value < flags.statusThreshold.electricity.high
        ) {
          color = 'yellow';
        } else if (value >= flags.statusThreshold.electricity.high) {
          color = 'red';
        }
        return color;
      case 'sound':
        if (value < flags.statusThreshold.sound.mid) {
          color = null;
        } else if (
          value >= flags.statusThreshold.sound.mid &&
          value < flags.statusThreshold.sound.high
        ) {
          color = 'yellow';
        } else if (value >= flags.statusThreshold.sound.high) {
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
        marginTop: '40px',
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
