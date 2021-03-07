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
      data: {
        electricity: 5,
        sound: 73,
        gas: 3000,
        uv: 10,
        pulse: 70,
      },
    };

    this.failCount = 0;
    this.failCountThreshold = 60;
  }

  componentDidMount = async () => {
    this.getTime();
    await this.getWeather();
    await this.getData();

    this.updateTime = setInterval(this.getTime, 1000);
    this.updateWeather = setInterval(async () => {
      await this.getWeather();
    }, 1000 * 60 * 60);
    this.updateData = setInterval(async () => {
      await this.getData();
    }, 500);
  };

  componentWillUnmount = () => {
    clearInterval(this.updateTime);
    clearInterval(this.updateWeather);
    clearInterval(this.updateData);
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
      if (data && data?.weather && data.weather.length > 0) {
        if (data.weather[0].icon) {
          this.setState({ weather: { icon: data.weather[0].icon } });
        }
        if (data.weather[0].description) {
          this.setState({
            weather: {
              description: data.weather[0].description
                .toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' '),
            },
          });
        }
      }
      if (data && data?.main) {
        if (data.main.temp) {
          this.setState({
            weather: { temperature: Math.round(data.main.temp) },
          });
        }
        if (data.main.feels_like) {
          this.setState({
            weather: { feelsLike: Math.round(data.main.feels_like) },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getData = async () => {
    try {
      if (this.failCount > this.failCountThreshold) {
        console.log(
          `Error. App.getData exceeded failCountThreshold of ${this.failCountThreshold}`,
        );
        clearInterval(this.updateData);
        return;
      }

      const res = await fetch('http://localhost:5000/data');

      if (res.status >= 400) {
        console.log(`Error. App.getData failed with ${res.status}`);
        this.failCount += 1;
      }

      const data = await res.json();
      if (data && data?.electricity && data?.gas && data?.sound) {
        this.setState({ data });
        this.failCount = 0;
      } else {
        console.log('Error. App.getData received bad data');
        this.failCount += 1;
      }
    } catch (error) {
      console.log(error);
      this.failCount += 1;
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
              <Status type="electricity" value={this.state.data.electricity} />
            </Grid.Column>
            <Grid.Column>
              <Status type="sound" value={this.state.data.sound} />
            </Grid.Column>
            <Grid.Column>
              <Status type="gas" value={this.state.data.gas} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
