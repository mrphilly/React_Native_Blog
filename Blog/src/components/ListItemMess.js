import React, {Component} from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
const { View, TouchableHighlight, Text, StyleSheet, Image } = ReactNative;
import firebase from 'react-native-firebase';
import Moment from 'moment';


export default class ListItemMess extends Component {
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
  this.setState({ currentUser: currentUser.email, uid: this.props.item.uid, key: this.props.item._key })

  });

  }
  render() {
    return (
  
  <TouchableHighlight onPress={this.props.onPress}>
  <View style={{paddingTop: 40, paddingHorizontal: 5, alignItems: 'center'}}>
    <Image source={{uri: this.props.item.url}} style={{width: 70, height: 70,  borderRadius:100,}}/>
    <Text style={styles.title}><Text style={{color: "#24CE84"}}>{this.props.item.user}</Text> a aimer votre commentaitre intitulé <Text style={{color: "red"}}>{this.props.item.title }</Text> </Text>
  </View>

  </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
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
    fontSize: 14,
    fontWeight: 'bold'
  },
  liText: {
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
