import React, { Component } from 'react';
import {Text, View, Image} from 'react-native';
import SvgUri from 'react-native-svg-uri';

export default class GardenScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tree = {
      uri: 'https://s3.eu-central-1.amazonaws.com/treeoflifesuperapp/tree-of-dots-foliage.svg'
    };
    return (
      <View>
      <Text>HEYYYYYY!! You!!</Text>

    <SvgUri
      width="200"
      height="200"
      source={tree}
    />
      <Text>Picture from Freepikis licensed by CC 3.0 BY</Text>

      </View>
      );
  }
}