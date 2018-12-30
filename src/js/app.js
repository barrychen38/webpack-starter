import EventEmitter from './util/event'

export default function init () {
    const event = new EventEmitter()

    const addBtn = document.getElementById('add')
    const triggerBtn = document.getElementById('trigger')
    const removeBtn = document.getElementById('remove')
    const show = document.getElementById('show')

    addBtn.onclick = () => {
        event.on('show', () => {
            show.innerText = 'Event Triggered.'
        })
        show.innerText = 'Event Added.'
    }

    triggerBtn.onclick = () => {
        event.trigger('show')
    }

    removeBtn.onclick = () => {
        event.off('show')
        show.innerText = 'Event Removed.'
    }
}
