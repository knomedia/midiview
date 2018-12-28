import React from 'react';
import styles from './styles'

class MidiMessages extends React.Component {

  render() {
    let messages = (this.props.messages || []).map((message) => {
      let [code, note, velocity] = message.message
      return (
        <div key={ message.message.toString() + message.time }>
          <span className="MidiMessages__Value">{ code }</span>
          <span className="MidiMessages__Value">{ note }</span>
          <span className="MidiMessages__Value">{ velocity }</span>
        </div>
      )
    })
    return (
      <div className="MidiMessages">
        { messages }
      </div>
    )
  }
}

export default MidiMessages;
