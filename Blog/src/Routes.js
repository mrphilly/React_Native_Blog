import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from './pages/Login';
import SignUp from './pages/Signup';

export default class Routes extends Component<Props>{
   
  render(){
    return(
      <Router>
    <Stack key="root">
      <Scene key="login" component={Login} title="Login"/>
      <Scene key="register" component={SignUp} title="Register"/>
    </Stack>
  </Router>
    );
 }
}
