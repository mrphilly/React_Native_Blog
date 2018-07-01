import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import { Container, Search, Drawer, Header, Title, Content, Footer, Fab, FooterTab, Button, Left, Right, Body, Tab, Tabs, TabHeading, Thumbnail, } from 'native-base';
import { StyleSheet, Platform, Image, Text, View, ScrollView, StatusBar, YellowBox, TouchableOpacity, ListView, TouchableHighlight} from 'react-native';
import NewPost from '../pages/NewPost';
import Logo from '../components/Logo';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import firebase from 'react-native-firebase'


export default class MyHeader extends React.Component<Props> {
constructor(props){
super(props);
this.state = {
currentUser: null,
isModalVisible: false,

};
}
_logout = () => {
firebase.auth().signOut();
this.props.navigation.navigate("Loading");
}
setMenuRef = ref => {
   this._menu = ref;
 };

 hideMenu = () => {
   this._menu.hide();
 };

 showMenu = () => {
   this._menu.show();
 };
_toggleModal = () =>{
  this.setState({ isModalVisible: !this.state.isModalVisible });

}

render(){
return(

<View style={{ flex: 1 }}>
<Header hasTabs  style={styles.header}  androidStatusBarColor="#004D40">
<Left>
<Button transparent style={styles.buttonLeft}>
<Icon size={30} style={styles.icon} name="search-web" />
</Button>

</Left>
<Body>
<Title style={styles.titre}>Xalat</Title>
</Body>
<Right>
<View style={{flexDirection: 'row'}}>
<Button transparent onPress={this._toggleModal} style={{backgroundColor: '#004D40'}}>
<Icon size={30} style={styles.icon}  name='script'/>
</Button>


<View style={{ alignItems: 'center', justifyContent: 'center', width: 20}}>
        <Menu
          ref={this.setMenuRef}
          button={<Icon size={30} style={{color: '#FFFFFF'}} onPress={this.showMenu} name='dots-vertical'/>}
        >
          <MenuItem onPress={this._logout}>Deconnexion</MenuItem>
        </Menu>
      </View>

</View>
</Right>
</Header>


<Modal isVisible={this.state.isModalVisible} animationIn='fadeInUpBig'>
<View style={{ flex:1, justifyContent: 'center',    }}>
<View style={{ flex: 1, justifyContent: 'center', paddingVertical: 50, marginVertical: 10,  }}>
<View style={{alignItems: 'center'}}>
<Icon size={60} style={styles.icon} name="meteor" />
<Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', paddingVertical: 10}}>Publier un sujet</Text>
</View>
<NewPost navigation={this.props.navigation} close={this._toggleModal}/>
</View>
<View style={{ alignItems: 'center' }}>
<TouchableOpacity style={{  flexDirection:'row', width: 100, backgroundColor: 'red', height: 30,  borderRadius: 13}} onPress={this._toggleModal}>
<Icon size={20} style={styles.icon} name="backup-restore" />
<Text style={{fontSize: 16, fontWeight: 'bold', color:'#FFFFFF', paddingHorizontal: 10,}}>Annuler</Text>
</TouchableOpacity>
</View>
</View>
</Modal>

</View>


);
}

}

const styles = StyleSheet.create({
header: {
backgroundColor: '#00BFA5',

},
titre: {
fontWeight: 'bold'
},
icon: {
color: '#FFFFFF',
},
iconRight:{

},
iconLeft: {
color: '#FFFFFF',

},
buttonLeft:{
marginVertical:20,
},
text: {
color: '#FFFFFF',
fontSize: 15,
fontWeight: 'bold',
paddingHorizontal: 10,
},
modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'gray',
    width: '50%',
    height: '20%',
 },
});
