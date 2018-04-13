import React, { Component } from 'react';
import { Text } from 'react-native';
import { Root } from "native-base";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    return (
      <Root>
        <Text>This is the main app</Text>
      </Root>
    );
  }
}
