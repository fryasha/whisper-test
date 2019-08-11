import React, { Component } from 'react';
import './App.css';

import Microphone from './lib/mic';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0,
    };
  }

  startListening() {
    this.mic = new Microphone();
  }

  componentDidMount() {
    const tick = () => {
      this.mic &&
        this.setState({ volume: this.mic.getVolume() }, () => console.log(this.state.volume));
      requestAnimationFrame(tick);
    };
    tick();
  }

  render() {
    return (
      <div className="App">
        <div className="main-wrap">
          <div className="button-wrap">
            <div className="header">Press button to listen</div>
            <div className="button" onClick={() => this.startListening()} />
          </div>
          <div className="noise-level">
            <div className="noise-bar">
              <div className="noise-inside" style={{ height: this.state.volume + '%' }} />
            </div>
            <div className="noise-marks">
              {new Array(10).fill(null).map((el, ind) => (
                <div className="level">{100 - ind * 10}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
