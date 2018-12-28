import React from 'react';
import Midi from '../../utils/midi'
import MidiDevice from '../MidiDevice'
import MidiMessages from '../MidiMessages'

class MidiView extends React.Component {

  constructor() {
    super()
    this.state = {
      device: {},
      messages: []
    }
  }

  handleInput(message) {
    let messages = this.state.messages
    messages.push(message)
    this.setState({messages})
  }

  handleKey(e) {
    const ESC = 27
    if (e.keyCode === ESC) {
      this.setState({messages: []})
    }
  }

  componentDidMount() {
    const midi = new Midi(this.handleInput.bind(this))
    midi.initialize().then(() => {
      let midiDevice = midi.getInputs()[1]
      this.setState({device: midiDevice})
    }).catch(console.error)
    this.keyHandler = this.handleKey.bind(this)
    document.addEventListener('keydown', this.keyHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyHandler)
  }

  render() {
    return (
      <div>
        <MidiDevice device={ this.state.device } />
        <MidiMessages messages={ this.state.messages } />
      </div>
    )
  }
}

export default MidiView;
