'use strict'

const choo = require('choo')
const createChatStore = require('./store')
const createChatPage = require('./page')

const app = choo()

app.use(createChatStore())
app.route('*', createChatPage())
app.mount('#root')
