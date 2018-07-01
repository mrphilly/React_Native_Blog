import React, { Component } from 'react';
import {
Platform,
StyleSheet,
Text,
View,
StatusBar,
TouchableOpacity,
PixelRatio,
Image,
TextInput,
ListView,
ScrollView
} from 'react-native';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { Avatar, Badge, Input, } from 'react-native-elements';
import { Container, Content, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Button, Right, Toast } from 'native-base';
import Modal from "react-native-modal";


import { createStackNavigator } from 'react-navigation';
import Logo from '../components/Logo.js';
//import Form from '../components/Form';
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './Login';
import MyHeader from '../components/MyHeader';
import ListItemUser from '../components/ListItemUser';


var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
 const server = firebase.initializeApp(config);
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const getRef=()=> {
return server.database().ref();
}


 const storageReference = (downloadUrl, sessionId) =>{
   let imageRef = server.storage().ref('images').child(`${sessionId}`)
   let currentUser = server.auth().currentUser
   let username = '';
   let name = firebase.database().ref('users/' +currentUser.uid)
   const query = firebase.database().ref('users/' +currentUser.uid );
   name.on('value', (snap)=>{
         username = snap.val().username

         query
         .set({
           email: currentUser.email,
           username: username,
           url: downloadUrl,
           createdAt: sessionId,
         })
   })



 }
 var config = {
   apiKey: "AIzaSyBAlIbALRI5n4tbYQv6v1zgV1q-fDU1Hbg",
   authDomain: "magnetic-nimbus-202118.firebaseapp.com",
   databaseURL: "https://magnetic-nimbus-202118.firebaseio.com",
   projectId: "magnetic-nimbus-202118",
   storageBucket: "magnetic-nimbus-202118.appspot.com",
   messagingSenderId: "739314984766"
 };


export default class Profile extends Component<Props> {
constructor(props) {
super(props);

this.state = { currentUser: null, username: '',  isModalVisible: false,
image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200',
dataSource: new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
})



};
let currentUser = firebase.auth().currentUser
   var uid = currentUser.uid
   this.itemsRef = firebase.database().ref('user-posts/'+uid)
this.getImage = this.getImage.bind(this);


}

_renderItem(item) {
  const onPress = () => {
    alert(
      'Complete',
      null,
      [
        {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
        {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      ]
    );
  };

  return (
     <ListItemUser item={item} onPress={onPress} />
  );
}
listenForItems(itemsRef) {

  itemsRef.on('value', (snap) => {
    var itemsListView = [];
    snap.forEach((data)=>{
      itemsListView.push({
        author: data.val().author,
        title: data.val().title,
        body: data.val().body,
        date: data.val().date,
        uid: data.val().uid,
        _key: data.key ,
        voteP: data.val().votesPositifs,
        voteN: data.val().votesNegatifs
      });
    })

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(itemsListView)
    });

})

}
_toggleModal = () =>{
  this.setState({ isModalVisible: !this.state.isModalVisible });

}

updateUsername(){
  const {currentUser}= firebase.auth()
var query = firebase.database().ref('users/'+currentUser.uid)
query.update({username: this.state.username })
Toast.show({
              text: 'Username modifier avec succès !',
              buttonText: 'Okay',
              duration: 3000
            })
}


componentDidMount() {
  this.listenForItems(this.itemsRef);
const { currentUser } = server.auth()
//const image = server.database().ref('users').child(currentUser.uid);
const query = firebase.database().ref('users/' +currentUser.uid );
query.on('value', (snapchot)=>{
  this.setState({currentUser: currentUser.email, username: snapchot.val().username, image_uri: snapchot.val().url})
})

}

uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri
       const sessionId = new Date().getTime()
      let uploadBlob = null

      const imageRef = server.storage().ref('images').child(`${sessionId}`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })

        })
        .then((blob) => {
          uploadBlob = blob
        return imageRef.put(blob._ref, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
          storageReference(url, sessionId)



        })
        .catch((error) => {
          reject(error)

      })
    })
  }

  getImage(){

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
        alert('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert('erreur');
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
         let source = { uri: response.uri };
         this.setState({image_uri: response.uri})

        // You can also display the image using data:
        // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

      this.uploadImage(response.uri)
        .then(url => {
          Toast.show({
                text: "Photo de profil modifier avec succès !",
                buttonText: "Okay",
                duration: 3000
              })
          this.setState({image_uri: url})

         })
        .catch(error => console.log(error))
      }
    });

  }



render(){
//const {navigate} = this.props.navigation;
Moment.locale('en');
var dt = new Date();
//const { currentUser } = this.state.currentUser
return(
<Container>



<Content>
<Card style={{flex: 0}}>
<CardItem>
<Left>

<TouchableOpacity onPress={this.getImage} style={{borderRadius:25}}>


            { this.state.image_uri === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={{uri: this.state.image_uri}} />
            }



</TouchableOpacity>
<Body>
<Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}} onPress={this._toggleModal}>{this.state.username }</Text>
<Text style={{fontSize: 15, fontWeight: 'bold',}} note> {Moment(dt).format('LLL')}</Text>
</Body>
</Left>
</CardItem>
<CardItem>
<Body>
<View style={{alignItems: 'center', justifyContent: 'center'}}>
<Text style={{color: '#004D40', fontSize: 18, fontWeight: 'bold', paddingLeft: 20}}>Mes status</Text>
</View>


<ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderItem.bind(this)}
           enableEmptySections={true}

           />


<Modal isVisible={this.state.isModalVisible} animationIn='fadeInUpBig'>
<View style={{ flex:1, justifyContent: 'center',    }}>
<View style={{ flex: 1, justifyContent: 'center', paddingVertical: 50, marginVertical: 10,  }}>
<View style={{alignItems: 'center'}}>
<Icon size={60} style={styles.icon} name="feather" />
<Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', paddingVertical: 10}}>Modifier votre username</Text>
</View>
<View style={{alignItems: 'center'}}>
<TextInput style={styles.inputBox}
underlineColorAndroid='rgba(0,0,0,0)'
placeholder='Username'
placeholderTextColor='#FFFFFF'
onChangeText={username => this.setState({ username })}
value={this.state.username}
/>
</View>
</View>

<View style={{ alignItems: 'center', justifyContent: 'space-between'}}>
<TouchableOpacity style={{  flexDirection:'row', width: 100, backgroundColor: '#004D40', height: 30,  borderRadius: 13, marginVertical: 15 }} onPress={this.updateUsername.bind(this)} >
<Icon size={20} style={styles.icon} name="approval" />
<Text style={{fontSize: 16, fontWeight: 'bold', color:'#FFFFFF', paddingHorizontal: 10, paddingVertical: 5}}>Modifier</Text>
</TouchableOpacity>
<TouchableOpacity style={{  flexDirection:'row', width: 100, backgroundColor: 'red', height: 30,  borderRadius: 13,  paddingVertical: 5, paddingTop: 5}} onPress={this._toggleModal}>
<Icon size={20} style={styles.icon} name="backup-restore" />
<Text style={{fontSize: 16, fontWeight: 'bold', color:'#FFFFFF', paddingHorizontal: 10, }}>Annuler</Text>
</TouchableOpacity>

</View>
</View>
</Modal>


</Body>
</CardItem>

</Card>
</Content>

</Container>


);
}
}



const styles = StyleSheet.create({
container: {
flex: 1,
//justifyContent: 'center',
//alignItems: 'center',
backgroundColor: '#E53935',
},
avatar: {
flex: 2,
alignItems: 'center',
backgroundColor: '#FFFFFF',
},
badge: {
justifyContent: 'space-between',
flexDirection: 'column',
paddingVertical: 15,
marginRight: 30,
width: '30%',
height: '30%'
},
textBadge: {
color: '#FFFFFF',
fontSize: 15
},
itemUser: {
flexDirection: 'row',
},
container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF8E1'
    },

    ImageContainer: {
      borderRadius: 10,
      width: 250,
      height: 250,
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CDDC39',

    },
    inputBox: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingLeft: 25,
    fontSize: 18,
    color: 'black'
    },
    icon: {
    color: '#FFFFFF',
    },


});
