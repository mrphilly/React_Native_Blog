import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Title, Content, Footer, Fab, FooterTab, Button, Left, Right, Body, Tab, Tabs, TabHeading, Thumbnail, } from 'native-base';
import { StyleSheet, Platform, Image, Text, View, ScrollView, StatusBar, YellowBox} from 'react-native';
import Accueil from './Accueil';
import Profile  from './Profile';
import News from './News';
import Login from './Login';
import MyHeader from '../components/MyHeader';
import firebase from 'react-native-firebase';
import {createStackNavigator} from 'react-navigation';
const Routes = createStackNavigator({
Login: {screen:Login}
})

export default class MyTabs extends React.Component<Props>{
state = { currentUser: null };


componentDidMount() {
const { currentUser } = firebase.auth()
this.setState({ currentUser })
}

render(){
const { currentUser } = this.state
return(
<Content>
<MyHeader navigation={this.props.navigation}/>
<Tabs style={{flex:1}}>
<Tab heading={ <TabHeading style={styles.tab}><Icon size={30} style={styles.icon} name="home-account"/>
<Text style={styles.text}>Accueil</Text></TabHeading>}>
<Accueil navigation={this.props.navigation}/>
</Tab>
<Tab style={{flex: 1}}heading={ <TabHeading style={styles.tab}><Icon size={25} style={{marginLeft: 10, color: '#FFFFFF'}} name="heart" /><Text  style={styles.text}>Likes</Text></TabHeading>}>
<News />
</Tab>
<Tab heading={ <TabHeading style={styles.tab}><Icon size={30} style={styles.icon} name="account-settings-variant" /><Text  style={styles.text}>Profil</Text></TabHeading>}>
<Profile navigation={this.props.navigation}/>
</Tab>

</Tabs>
</Content>
);

}


}

const styles = StyleSheet.create({
icon: {
color: '#FFFFFF',
},
tab: {
flex: 1,
backgroundColor: '#00BFA5',

},
text: {
color: '#FFFFFF',
fontSize: 15,
fontWeight: 'bold',
paddingHorizontal: 10,
},

});
