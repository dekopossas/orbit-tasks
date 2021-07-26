import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../../views/home'

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home}></Route>
      </Switch>
    </div>
  )
}

export default Routes
