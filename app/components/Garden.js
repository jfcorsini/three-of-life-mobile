import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import axios from 'axios';

import storage from '../lib/storage';
import TreeButton from './TreeButton';

const styles = StyleSheet.create({
  mainImage: {
    flex:1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 40,
    color: 'white',
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  topbar: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default class Garden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: 'https://s3.eu-central-1.amazonaws.com/three-of-life-images/trees/garden_day.png',
      death: null,
      hasTree: false,
    };
    this.updateTree();

    this.updateTree = this.updateTree.bind(this);
    this.createTree = this.createTree.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  createTree() {
    storage.load({
      key: 'jwt'
    })
      .then((jwt) => {
        const uri = 'https://85yfxbqh90.execute-api.eu-central-1.amazonaws.com/dev/tree/create';
        axios.post(uri, {}, { headers: { Authorization: jwt } })
          .then((response) => {
            if (response.status !== 201) {
              console.log('Creating tree failed. Status is ', response.status);
              return;
            }
            this.setState({
              hasTree: true,
              background: `https://s3.eu-central-1.amazonaws.com/three-of-life-images/trees/${response.data.image}.png`,
              death: response.data.death,
            });
          })
          .catch((err) => {
            console.log('Something weird happened when creating tree', err);
          });
      });
  }

  updateTree() {
    storage.load({
      key: 'jwt'
    })
      .then((jwt) => {
        const uri = 'https://85yfxbqh90.execute-api.eu-central-1.amazonaws.com/dev/tree/update';
        axios.post(uri, {}, { headers: { Authorization: jwt } })
          .then((response) => {
            if (response.status !== 200) {
              console.log('Updating tree failed. Status is ', response.status, 'and data is', response.data);
              return;
            }
            this.setState({
              background: `https://s3.eu-central-1.amazonaws.com/three-of-life-images/trees/${response.data.image}.png`,
              death: response.data.death,
              hasTree: true,
            });
          })
          .catch((err) => {
            console.log('Something weird happened when updating tree', err);
          });
      });
  }

  logOut() {
    this.props.logOut();
  }

  render() {
    const seedButton = 'https://s3.eu-central-1.amazonaws.com/three-of-life-images/buttons/seed_button.png';
    const waterButton = 'https://s3.eu-central-1.amazonaws.com/three-of-life-images/buttons/water_button.png';
    const shamanButton = 'https://s3.eu-central-1.amazonaws.com/three-of-life-images/buttons/summon_shaman_button.png';
    const logoutButton = 'https://s3.eu-central-1.amazonaws.com/three-of-life-images/buttons/account_button.png';

    if (this.state.death) {
      return (
        <ImageBackground
        source={{ uri: this.state.background }}
        style={styles.mainImage}
        >
          <Text style={styles.header}>{ this.state.death }</Text>
        </ImageBackground>
      );
    }

    return (
      <ImageBackground
        source={{ uri: this.state.background }}
        style={styles.mainImage}
      >
        <View  style={{ flex: 1 }}>

          <View style={styles.topbar}>
          </View>
          
          <View style={styles.contentContainer}>
          </View>
          
          <View style={styles.footer}>
          {!this.state.hasTree && (
            <TreeButton action={this.createTree} image={seedButton} />
          )}
          {!!this.state.hasTree && (
            <TreeButton action={this.updateTree} image={waterButton} />
          )}
          {!!this.state.hasTree && (
            <TreeButton action={this.updateTree} image={shamanButton} />
          )}
            <TreeButton action={this.logOut} image={logoutButton} />
          </View>
        
        </View>
      
      </ImageBackground>
    );
  }
}
