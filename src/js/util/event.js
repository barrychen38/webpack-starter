export default class EventEmitter {
    constructor () {
        this.events = {}
    }

    on (type, callback) {
        if (!this.events[type]) {
            this.events[type] = [ callback ]
            return
        }
        this.events[type].push(callback)
    }

    off (type) {
        const events = this.events[type]
        if (!events) {
            return
        }
        const len = events.length
        for (let i = 0; i < len; i += 1) {
            events[i] = null
        }
        this.events[type].length = 0
    }

    trigger (type) {
        const self = this
        const events = this.events[type]
        if (!events) {
            return
        }
        const len = events.length
        for (let i = 0; i < len; i += 1) {
            if (events[i]) {
                events[i].apply(self, [].slice.call(arguments, 1))
            }
        }
    }
}
