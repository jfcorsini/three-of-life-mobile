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
    };

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn() {
    this.setState({ loggedIn: true });
  }

  logOut() {
    this.setState({ loggedIn: false });
    storage.remove({
      key: 'jwt',
    });
    storage.remove({
      key: 'tree',
    });
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
      return <Garden logOut = { this.logOut } />;
    }

    return <Login logIn = { this.logIn } />;
  }
}
