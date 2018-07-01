import React, { Component } from "react";
import { Container, Header, Left, Body, Title, Right, Content, Textarea, Form, Toast } from "native-base";
import { TextInput, Text, View, StyleSheet, TouchableOpacity, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'react-native-firebase';
import Moment from 'moment';
import Firebase from '../firebase/Firebase';



export default class NewPost extends Component<Props>{
  constructor(props) {
      super(props);
      this.state = {
        titre: '',
        username: '',
        description: '',
        currentUser: null,
        date: '',
        navigate: this.props.navigation.navigate,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        })
      }

      this.itemsRef = this.getRef();
    }

      getRef() {
        let currentUser = firebase.auth().currentUser
        var uid = currentUser.uid
   return firebase.database().ref('Post/'+uid);
 }


 writeNewPost() {
   // A post entry.
   Moment.locale('en');
   //var dt = firebase.database.ServerValue.TIMESTAMP;
   let currentUser = firebase.auth().currentUser
   var uid = currentUser.uid
   var date = new Date().toString();
   var dt = Moment(dt).format('LLL')
   var postData = {
     author: this.state.username,
     uid: this.state.currentUser.uid,
     body: this.state.description,
     title: this.state.title,
     date: dt,
     votesPositifs: 0,
     votesNegatifs: 0,
   };
   // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  this.setState({title: '', description: '', date: ''})
  Toast.show({
              text: 'Status publié avec succès !',
              buttonText: 'Okay',
              duration: 3000
            })
}

 componentDidMount() {
 const { currentUser } = firebase.auth()
 let username = '';
 let name = firebase.database().ref('users/' +currentUser.uid)
 name.on('value', (snap)=>{
       username = snap.val().username

       this.setState({ currentUser: currentUser, username: username })
 })
 }



render() {

return (
<Container style={{flex: 1 }}>

<View style={{ flexDirection: 'row' }}>
<Icon size={30} style={styles.icon} name="feather" />
<Text style={{fontSize:18, fontWeight: 'bold', color: '#FFFFFF'}}>Titre</Text>
</View>
<TextInput
style={{borderBottomColor: '#000000',
borderRadius: 26, backgroundColor: '#FFFFFF', fontSize: 18}}
onChangeText={title=> this.setState({ title })}
value={this.state.title}
    />

<View style={{flexDirection: 'row', paddingVertical: 10}}>
<Icon size={30} style={styles.icon} name="leaf" />
<Text style={{fontSize:18, fontWeight: 'bold', marginVertical: 10, color: '#FFFFFF'}}>Description</Text>
</View>
<TextInput
style={{ borderBottomColor: '#000000',
borderRadius: 26, backgroundColor: '#FFFFFF'}}
multiline = {true}
numberOfLines = {10}
//{...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
editable = {true}
maxLength = {500}
onChangeText={description => this.setState({ description })}
value={this.state.description}
/>

<View style={{ alignItems: 'center', paddingVertical: 30 }}>
<TouchableOpacity onPress={this.writeNewPost.bind(this)} style={{ flexDirection: 'row', paddingHorizontal: 10, width:'40%', backgroundColor: '#004D40', width: 100, height: 30, borderRadius: 15}}>
<Icon size={20} style={styles.icon} name="approval" />
<Text style={{fontSize: 16, fontWeight: 'bold', color:'#FFFFFF', paddingHorizontal: 10,}}>Publier</Text>

</TouchableOpacity>
 <Toast
                    ref="toast"
                    style={{backgroundColor:'#24CE84'}}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#FFFFFF'}}
                />
</View>
</Container>
);
}
}

const styles = StyleSheet.create({
  icon: {
  color: '#FFFFFF',
  },
})
