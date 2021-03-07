import React, { Component } from 'react';
import fetch from 'cross-fetch';
import { Grid } from 'semantic-ui-react';
import Status from './components/status';
import Time from './components/time';
import Warning from './components/warning';
import Weather from './components/weather';
import { weatherURL, serverURL, flags } from './config';

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
        fall: false,
      },
      warningActive: false,
      warningType: 'electricity',
    };

    this.failCount = 0;
    this.failCountThreshold = flags.failCountThreshold;
  }

  componentDidMount = async () => {
    this.getTime();
    await this.getWeather();
    await this.getData();

    this.updateTime = setInterval(this.getTime, flags.updateTimeInterval);
    this.updateWeather = setInterval(async () => {
      await this.getWeather();
    }, flags.updateWeatherInterval);
    this.updateData = setInterval(async () => {
      await this.getData();
    }, flags.updateDataInterval);
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
      const res = await fetch(weatherURL);

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

      const res = await fetch(serverURL);

      if (res.status >= 400) {
        console.log(`Error. App.getData failed with ${res.status}`);
        this.failCount += 1;
      }

      const data = await res.json();
      if (data) {
        this.createWarnings(data);
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

  createWarnings = (data) => {
    const warningCreated = this.analyzeData(data);
    if (warningCreated) {
      setTimeout(() => {
        this.setState({ warningActive: false });
      }, flags.warningDuration);
    }
  };

  analyzeData = (data) => {
    if (!data || this.state.warningActive) {
      return false;
    }

    if (Object.prototype.hasOwnProperty.call(data, 'fall')) {
      this.setState({ warningType: 'fall', warningActive: true });
      return true;
    }
    if (Object.prototype.hasOwnProperty.call(data, 'electricity')) {
      if (data.electricity > flags.warningThreshold.electricity) {
        this.setState({ warningType: 'electricity', warningActive: true });
        return true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'sound')) {
      if (data.sound > flags.warningThreshold.sound) {
        this.setState({ warningType: 'sound', warningActive: true });
        return true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'gas')) {
      if (data.gas > flags.warningThreshold.gas) {
        this.setState({ warningType: 'gas', warningActive: true });
        return true;
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'uv')) {
      if (data.uv > flags.warningThreshold.uv) {
        this.setState({ warningType: 'uv', warningActive: true });
        return true;
      }
    }

    return false;
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
          {this.state.warningActive ? (
            <Grid.Row columns={1}>
              <Grid.Column>
                <Warning type={this.state.warningType} />
              </Grid.Column>
            </Grid.Row>
          ) : null}
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
