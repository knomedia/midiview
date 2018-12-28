class Midi {
  constructor(onMessage) {
    this.onMessage = onMessage || console.log
    this.access = undefined
    this.inputs = undefined
    this.outputs = undefined
  }

  initialize() {
    return new Promise((resolve, reject) => {
      navigator.requestMIDIAccess().then((access) => {
        this.access = access;
        this.inputs = access.inputs.values()
        this.outputs = access.outputs.values()
        for(var input of this.inputs) {
          input.onmidimessage = this._handleInput.bind(this)
        }
        resolve(this)
      }).catch(reject)
    })
  }

  getInputs() {
    return this._getDevices('inputs')
  }

  getOutputs() {
    return this._getDevices('outputs')
  }

  _getDevices(type='inputs'){
    let values = this.access[type].values()
    let devices = []
    for(var device of values) {
      devices.push(device)
    }
    return devices
  }

  _handleInput(midiEvent) {
    let [type, note, velocity] = midiEvent.data
    let data = {
      message: midiEvent.data,
      time: midiEvent.timeStamp
    }
    this.onMessage(data)
  }

}

export default Midi;
