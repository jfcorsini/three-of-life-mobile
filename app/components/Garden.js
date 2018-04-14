import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import SvgUri from 'react-native-svg-uri';

import storage from '../lib/storage';
import axios from 'axios';

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
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    height: 65,
    'flexDirection': 'row',
    justifyContent: 'space-evenly',
  },
  'topbar': {
    'flexDirection': 'row',
    'flex': 1,
  }

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
    this.state = {
      background: '',
      death: null,
    }
  }

  onPress() {
    return "heeloo";
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
            this.setState({hasTree: true});
            storage.save({
              key: 'tree',
              data: true,
              expires: null,
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
              background: response.data.image,
              death: response.data.death,
            })
          })
          .catch((err) => {
            console.log('Something weird happened when creating tree', err);
          });
      });
  }

  async componentWillMount() {
    await storage.load({
      key: 'tree',
      autoSync: false,
      syncInBackground: false,
      expi
    })
    .then(() => {
      this.setState({ hasTree: true });
    })
    .catch((err) => {
      this.setState({ hasTree: false });
    });
  }

  render() {
    let seedButton={ 'uri': 'https://s3.eu-central-1.amazonaws.com/treeoflifesuperapp/Buttons/seed_button.png'};

    let waterButton={ 'uri': 'https://s3.eu-central-1.amazonaws.com/treeoflifesuperapp/Buttons/water_button.png'};

    let logoutButton={ 'uri': 'https://s3.eu-central-1.amazonaws.com/treeoflifesuperapp/Buttons/account_button.png'};

    let shamanButton = { 'uri': 'https://s3.eu-central-1.amazonaws.com/treeoflifesuperapp/Buttons/summon_shaman_button.png'};


    if (this.state.death) {
      return (
        <ImageBackground source={{ uri: this.state.background }} style={styles.mainImage}>
          <Text style={styles.header}>{ this.state.death }</Text>
        </ImageBackground>
      );
    }

    return (
      <ImageBackground
        source={{ uri: ((this.state.hasTree) ? this.state.background : this.props.defaultBackground) }}
        style={styles.mainImage}
      >
        <View  style={{flex: 1}}>

          <View style={styles.topbar}>
          
          </View>
          
          <View style={styles.contentContainer}>
          </View>
          
          <View style={styles.footer}>
            <TreeButton button={seedButton}  onPress={this.createTree} style={styles.logOutButton}/>
            <TreeButton button={waterButton}  onPress={this.updateTree} style={styles.logOutButton}/>
            <TreeButton button={shamanButton}  onPress={this.onPress} style={styles.logOutButton}/>
            <TreeButton button={logoutButton}  onPress={this.onPress} style={styles.logOutButton}/>
          </View>
        
        </View>
      
      </ImageBackground>
    );
  }
}

