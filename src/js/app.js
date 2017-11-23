import { EventEmitter } from './util/event'

export function init() {
  let event = new EventEmitter()

  let addBtn = document.getElementById('add')
  let triggerBtn = document.getElementById('trigger')
  let removeBtn = document.getElementById('remove')
  let show = document.getElementById('show')

  addBtn.onclick = function() {
    event.on('show', function() {
      show.innerText = 'Event Triggered.'
    })
    show.innerText = 'Event Added.'
  }

  triggerBtn.onclick = function() {
    event.trigger('show')
  }

  removeBtn.onclick = function() {
    event.off('show')
    show.innerText = 'Event Removed.'
  }
}
