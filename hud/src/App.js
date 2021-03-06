import React, { Component } from 'react';
import fetch from 'cross-fetch';
import { Grid } from 'semantic-ui-react';
import Status from './components/status';
import Time from './components/time';
import Weather from './components/weather';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: '3:00 PM',
      weather: {
        description: 'Clear Sky',
        feelsLike: 21,
        icon: '01d',
        temperature: 33,
      },
      electricity: 5,
      gas: 3000,
      sound: 73,
    };
  }

  componentDidMount = async () => {
    this.getTime();
    await this.getWeather();

    this.updateTime = setInterval(this.getTime, 1000 * 60);
    this.updateWeather = setInterval(async () => {
      await this.getWeather();
    }, 1000 * 60 * 60);
  };

  componentWillUnmount = () => {
    clearInterval(this.updateTime);
    clearInterval(this.updateWeather);
  };

  getTime = () => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.setState({ time });
  };

  getWeather = async () => {
    try {
      const res = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?id=4513057&appid=20479d1b73eacd0ef1c2bf44c8a36635&units=imperial',
      );

      if (res.status >= 400) {
        console.log(`Error. App.getWeather failed with ${res.status}`);
      }

      const data = await res.json();
      this.setState({
        weather: {
          icon: data.weather[0].icon,
          description: data.weather[0].description
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' '),
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Grid style={{ height: '100%', width: '100%' }} columns={2}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Time time={this.state.time} />
            </Grid.Column>
            <Grid.Column>
              <Weather weather={this.state.weather} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Status type="electricity" value={this.state.electricity} />
            </Grid.Column>
            <Grid.Column>
              <Status type="sound" value={this.state.sound} />
            </Grid.Column>
            <Grid.Column>
              <Status type="gas" value={this.state.gas} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
