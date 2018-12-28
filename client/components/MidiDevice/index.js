import React from 'react';
import styles from './styles'

class MidiDevice extends React.Component {

  render() {
    let device = this.props.device || {}
    return (
      <div className="MidiDevice">
        { device.manufacturer } - { device.name } ({ device.id })
      </div>
    )
  }
}

export default MidiDevice;
