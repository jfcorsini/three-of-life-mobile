import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, ImageBackground} from 'react-native';
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
});



export default class GardenScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <ImageBackground source={this.props.tree} style={styles.mainImage}>
      <Text style={styles.header}>Hellooo wisconson ?? !!!!</Text>
      </ImageBackground>

      );
  }
}