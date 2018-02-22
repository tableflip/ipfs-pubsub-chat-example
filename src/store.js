'use strict'

const cbor = require('cbor')
const TOPIC = 'chat'

function createChatStore () {
  return function chatStore (state, emitter) {
    state.id = null
    state.name = window.localStorage.getItem('name') || 'anonymous coward'
    state.text = ''
    state.messages = []
    state.posting = false
    state.subscribed = false
    state.error = null

    const onMessage = async (msg) => {
      const exists = state.messages.some(m => m.seqno.equals(Buffer.from(msg.seqno)))
      if (exists) return

      try {
        msg.seqno = Buffer.from(msg.seqno)
        msg.data = await cbor.decodeFirst(msg.data)
      } catch (err) {
        return console.warn('Invalid message data', err)
      }

      state.messages = [msg].concat(state.messages).slice(0, 1000)
      emitter.emit('render')
    }

    emitter.on('DOMContentLoaded', async () => {
      try {
        await window.ipfs.pubsub.subscribe(TOPIC, onMessage)
        state.subscribed = true
      } catch (err) {
        console.error('Failed to subscribe', err)
        state.subscribed = false
        state.error = err
      }

      try {
        state.id = await window.ipfs.id()
      } catch (err) {
        console.error('Failed to get node ID')
      }

      emitter.emit('render')
    })

    emitter.on('nameChange', (name) => {
      window.localStorage.setItem('name', name)
      state.name = name
      emitter.emit('render')
    })

    emitter.on('textChange', (text) => {
      state.text = text
      emitter.emit('render')
    })

    emitter.on('postMessage', async () => {
      if (!state.subscribed || !state.text) return

      state.posting = true
      emitter.emit('render')

      try {
        const { name, text } = state
        const data = cbor.encode({ name, text })
        await window.ipfs.pubsub.publish(TOPIC, data)
        state.text = ''
      } catch (err) {
        console.error('Failed to publish', err)
        state.error = err
      }

      state.posting = false
      emitter.emit('render')
    })

    window.addEventListener('unload', () => window.ipfs.pubsub.unsubscribe(TOPIC, onMessage))
  }
}

module.exports = createChatStore
