export class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(type, callback) {
    if (!this.events[type]) {
      this.events[type] = [callback]
      return
    }
    this.events[type].push(callback)
  }

  off(type, callback) {
    let _events = this.events[type]
    if (!_events) {
      return
    }
    let _len = _events.length
    for (let i = 0; i < _len; i++) {
      _events[i] = null
    }
    this.events[type].length = 0
  }

  trigger(type) {
    let self = this
    let _events = this.events[type]
    if (!_events) {
      return
    }
    let _len = _events.length
    for (let i = 0; i < _len; i++) {
      if (_events[i]) {
        _events[i].apply(self, [].slice.call(arguments, 1))
      }
    }
  }
}
