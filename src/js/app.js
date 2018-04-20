import { EventEmitter } from './util/event'

export function init() {
  let event = new EventEmitter()

  let addBtn = document.getElementById('add')
  let triggerBtn = document.getElementById('trigger')
  let removeBtn = document.getElementById('remove')
  let show = document.getElementById('show')

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
