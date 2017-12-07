'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './screens/App'

ReactDOM.render((<App />), document.getElementById('app-root'))

if (module.hot) {
  module.hot.accept('./screens/App', function () {
    const App = require('./screens/App')
		ReactDOM.render((<App />), document.getElementById('app-root'))
	})
}
