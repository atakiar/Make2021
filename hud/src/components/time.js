import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Time = (props) => {
  return (
    <Header
      style={{
        marginTop: '140px',
        marginLeft: '40px',
        fontSize: '120px',
      }}
      inverted
    >
      <Icon inverted color="red" name="time" />
      {props.time}
    </Header>
  );
};

export default Time;
