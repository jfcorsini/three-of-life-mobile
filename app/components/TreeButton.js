import React, { Component } from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    button: {
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
        <TouchableOpacity onPress={this.props.action}>
          <Image style={styles.button} source={{ uri: this.props.image }}/>
        </TouchableOpacity>
        );
    }
}
