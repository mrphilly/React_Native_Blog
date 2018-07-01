import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, StatusBar,
YellowBox, AppRegistry} from 'react-native';
import { Root } from "native-base";

import firebase from 'react-native-firebase';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import { createStackNavigator } from 'react-navigation';
import Login from './src/pages/Login';
import SignUp from './src/pages/Signup';
import Loading from './src/pages/Loading';
import Profile from './src/pages/Profile';
import Home from './src/pages/Home';
import LoadingInscription from './src/pages/LoadingInscription';

const RootStack = createStackNavigator(
{
Loading: {screen : Loading},
Connexion: {screen: Login},
Inscription: {screen: SignUp},
Home: {screen: Home},
Profile: {screen: Profile},
LoadingInscription: {screen: LoadingInscription},
initialRouteName: 'Loading',
},
{ headerMode: 'none' }
);

export default class App extends React.Component<Props> {
constructor(props) {
super(props);
super();
this.state = {
// firebase things?
};
}

componentDidMount() {
// firebase things?

}

render() {

return (
  <Root>
  <RootStack navigation={this.props.navigation}/>
  </Root>
);


}
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#E53935',
},
});
