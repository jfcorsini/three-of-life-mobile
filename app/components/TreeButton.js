import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';


const styles = StyleSheet.create({
    treeButton: {
      height: 60,
      width: 60,
    },
  });

export default class TreeButton extends Component {
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
