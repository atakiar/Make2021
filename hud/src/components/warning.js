import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Warning = (props) => {
  const getWarningFromType = (type) => {
    switch (type) {
      case 'electricity':
        return 'Warning. Nearby electric lines!';
      case 'sound':
        return 'Warning. High decibel area!';
      case 'gas':
        return 'Warning. High gas exposure!';
      case 'uv':
        return 'Warning. High UV exposure!';
      case 'fall':
        return 'Fall detected. Are you ok?';
      default:
        return '';
    }
  };

  return (
    <Header
      style={{
        marginTop: '-20px',
        marginLeft: '180px',
      }}
      inverted
    >
      <Icon
        style={{ fontSize: '180px' }}
        inverted
        color="yellow"
        name="warning sign"
      />
      <Header.Content style={{ fontSize: '100px', marginLeft: '40px' }}>
        {getWarningFromType(props.type)}
      </Header.Content>
    </Header>
  );
};

export default Warning;
