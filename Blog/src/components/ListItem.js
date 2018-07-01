import React, {Component} from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
const { View, TouchableHighlight, Text, StyleSheet, Image } = ReactNative;
import firebase from 'react-native-firebase';
import Moment from 'moment';
import {Toast} from 'native-base'


export default class ListItem extends Component {
  constructor(props){
  super(props);
  this.state = { currentUser: null , username: '' , image_uri: null, uid: null, key: null};
}

  componentDidMount() {
  const { currentUser } = firebase.auth()
   let name = firebase.database().ref('users/' +currentUser.uid)
   name.on('value', (snap)=>{
    let username = snap.val().username
      this.setState({username: username})
})
  const image = firebase.database().ref('users').child(this.props.item.uid);
  image.on('value', (snap) => {
  this.setState({ currentUser: currentUser, image_uri: snap.val().url, uid: this.props.item.uid, key: this.props.item._key })

  });

  }
  render() {
    return (
  <TouchableHighlight onPress={this.props.onPress}>
  <View style={{borderBottomColor: '#eee', borderWidth: 1, borderColor: 'transparent',}}>
  <View style={{flexDirection: 'row',   }}>
  <View style={{paddingTop: 40, paddingHorizontal: 5}}>
    <Image source={{uri: this.state.image_uri}} style={{width: 70, height: 70,  borderRadius:100,}}/>
  </View>
    <View style={styles.li}>
          <Text style={styles.email}>{this.props.item.author}</Text>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.liText}>{this.props.item.body}</Text>
          <Text style={styles.date}>{this.props.item.date}</Text>
    </View>
  </View>
  <View style={styles.Icon}>

  <Icon size={20} name="heart" onPress={()=>{
    var vote = firebase.database().ref('user-posts/'+this.props.item.uid+'/'+this.props.item._key)
    var _vote_update = firebase.database().ref('posts/'+this.props.item._key)
    vote.update({votesPositifs: this.props.item.voteP + 1})
    _vote_update.update({votesPositifs: this.props.item.voteP + 1})

    Moment.locale('en');
   //var dt = firebase.database.ServerValue.TIMESTAMP;

   var date = new Date().toString();
   var dt = Moment(dt).format('LLL')

    var messages = firebase.database().ref('messages/'+this.props.item.uid)
    messages.push({ user: this.state.username, title: this.props.item.title, date: dt, url: this.state.image_uri})
    Toast.show({
              text: 'Vous avez aimé ce status!',
              buttonText: 'Okay',
              duration: 3000
            })}}/>
  <Text style={{fontSize: 16}}>{this.props.item.voteP}</Text>
  <Icon size={20} name="thumbs-down" style={{paddingHorizontal: 15, color: '#004D40'}} onPress={()=>{
    var vote = firebase.database().ref('user-posts/'+this.props.item.uid+'/'+this.props.item._key)
    var _vote_update = firebase.database().ref('posts/'+this.props.item._key)
    vote.update({votesNegatifs: this.props.item.voteN + 1})
    _vote_update.update({votesNegatifs: this.props.item.voteN + 1})

    Toast.show({
              text: "Vous n'avez pas aimé ce status",
              buttonText: 'Okay',
              duration: 3000
            })
  }}/>
  <Text style={{fontSize: 16, color: 'red'}}>{this.props.item.voteN}</Text>

  </View>
  </View>
  </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  li: {
    flex: 1,
    backgroundColor: '#fff',
  //  borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    //paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,

  },
  email: {
    color: '#24CE84',
    fontSize: 16,
    fontWeight: 'bold'
  },

  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'

  },
  liText: {
    flex: 1,
    color: '#333',
    fontSize: 16,


  },
  liTextName: {
    color: '#24CE84',
    fontSize: 16,

  },
  date: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  Icon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

});
