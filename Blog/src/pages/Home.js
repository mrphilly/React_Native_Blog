import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container } from 'native-base';
import { StyleSheet} from 'react-native';
import MyHeader from '../components/MyHeader';
//import MyTabs from '../components/MyTabs';
import firebase from 'react-native-firebase';
import MyTabs from './MyTabs';
import Login from './Login';
import NewPost from './NewPost';
const RootStack = createStackNavigator({
Index: {screen: MyTabs},
Login: {screen: Login},
Post: {screen: NewPost},
},
{ headerMode: 'none' }
)


export default class Home extends React.Component<Props> {
constructor(props){
super(props);
this.navigate  = props.navigation;
this.state = { currentUser: null };
}


componentDidMount() {
const { currentUser } = firebase.auth()
this.setState({ currentUser })
}
render() {
//const {navigate}= this.props.navigation;
const { currentUser } = this.state
return (
  <Container style={styles.container}>
   <RootStack/>
  </Container>
)
}

}

const styles = StyleSheet.create({
container: {
flex: 1,
},

});
