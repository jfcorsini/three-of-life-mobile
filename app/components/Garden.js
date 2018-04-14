import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';

const resizeMode = 'center';

const styles = StyleSheet.create({
  cellContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 40,
  },
  item: {
    margin: 10,
  },
  mainImage: {
    flex:1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 40,
    color:'white',
  },
  button: {
    marginTop: 70,
  },
  message: {
    fontSize: 14,
    color: 'red',
    padding: 5,
  },
  anchor: {
    marginTop: 15,
    color: 'blue',
  },
  logoutButton: {
    height: 60,
    width: 60,
    right: 20,
    top: 100,
  },
  treeButton: {
    height: 60,
    width: 60,
  },
});



class TreeButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image style={styles.treeButton} source={this.props.button}/>
      </TouchableOpacity>
      );
  }
}

export default class GardenScreen extends Component {
  constructor(props) {
    super(props);
  }

  onPress() {
    return "heeloo";
  } 
  render() {
    let logoutButton={ 'uri': 'https://s3.eu-central-1.amazonaws.com/treeoflifesuperapp/Asset+4%404x.png'};

    return (

      <ImageBackground source={this.props.tree} style={styles.mainImage}>


      <TreeButton button={logoutButton}  onPress={this.onPress}/>

      <Text style={styles.header}>CC</Text>
      </ImageBackground>

      );
  }
}