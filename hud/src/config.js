const weatherURL =
  'https://api.openweathermap.org/data/2.5/weather?id=4513057&appid=20479d1b73eacd0ef1c2bf44c8a36635&units=imperial';

const serverURL = 'http://localhost:5000/data';

const flags = {
  // How many server calls to try before giving up
  failCountThreshold: 60,
  // How fast to update certain metrics
  updateTimeInterval: 1000,
  updateWeatherInterval: 1000 * 60 * 30,
  updateDataInterval: 500,
  // How fast to dismiss warnings automatically
  warningDuration: 1000 * 5,
  // When to trigger warnings
  warningThreshold: {
    electricity: 70,
    sound: 75,
    gas: 3000,
    uv: 70,
  },
  // When to change status icon colors
  statusThreshold: {
    electricity: {
      mid: 50,
      high: 70,
    },
    gas: {
      mid: 1500,
      high: 3000,
    },
    sound: {
      mid: 50,
      high: 75,
    },
  },
};

export { weatherURL, serverURL, flags };
