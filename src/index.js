import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import appStore from './store'
// import './style/fontawesome/css/fontawesome.min.css'
// import './style/fontawesome/css/fa-regular.min.css'
// import './style/fontawesome/css/fa-solid.min.css'
import './styles.css'

import indexRouter from './pages/indexRouter'

ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={indexRouter} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app'),
)
