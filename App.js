import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

import Login from './app/components/Login'
import Garden from './app/components/Garden'

import storage from './app/lib/storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentTree:{
        uri: 'https://s3.eu-central-1.amazonaws.com/treeoflifesuperapp/birch_3_night.png'
      }
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    this.setState({loggedIn: true});
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
    storage.load({
      key: 'jwt',
      autoSync: false,
      syncInBackground: false,
    })
    .then(() => {
      this.setState({ loggedIn: true });
    })
    .catch((err) => {
      this.setState({ loggedIn: false });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
        <AppLoading />
        </Root>
        );
    }

    if (this.state.loggedIn) {

      return <Garden tree={this.state.currentTree}/>;
    }

    return <Login logIn = { this.logIn } />;
  }
}
