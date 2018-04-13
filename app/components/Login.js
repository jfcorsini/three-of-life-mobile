import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Label, Input, Button, Item } from 'native-base';

import auth from '../lib/auth';

const styles = StyleSheet.create({
  cellContainer: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 40,
  },
  item: {
    margin: 10,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 40,
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

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      message: '',
      signUp: true,
    };
  }

  setMessage = (message) => {
    this.setState({ message });
  }

  submitAction = () => {
    const params = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
    };

    if (this.state.signUp) {
      return auth.submitRegistration(params, this.setMessage);
    }

    return auth.submitLogin(params, this.setMessage);
  }

  clearUsername = () => {
    this.username.setNativeProps({ text: '' });
    this.setState({ username: '' });
  }

  clearPassword = () => {
    this.password.setNativeProps({ text: '' });
    this.setState({ password: '' });
  }

  toggleSignUp = () => {
    this.setState({
      signUp: !this.state.signUp
    });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.cellContainer}>
          <Text style={styles.header}>Welcome</Text>

          <Item floatingLabel style={styles.item}>
            <Label>Username</Label>
            <Input
              getRef={component => this.username = component}
              onChangeText={username => this.setState({ username })}
              autoFocus
              onFocus={this.clearUsername}
              onSubmitEditing={this.submitAction}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              getRef={component => this.password = component}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              onFocus={this.clearPassword}
              onSubmitEditing={this.submitAction}
            />
          </Item>

          {!!this.state.signUp && (
            <Item floatingLabel>
            <Label>Name</Label>
            <Input
              onChangeText={name => this.setState({ name })}
              onSubmitEditing={this.submitAction}
            />
          </Item>
          )}

          {!!this.state.message && (
            <Text style={styles.message}>
              {this.state.message}
            </Text>
          )}

        <TouchableOpacity onPress={this.toggleSignUp}>
          <Text style={styles.anchor}>
            { this.state.signUp ? 'Already have account?' : "Don't have account?" }
          </Text>
        </TouchableOpacity>

          <Button
            full
            info
            style={styles.button}
            onPress={this.submitAction}
          >
            <Text>{ this.state.signUp ? 'Sign up' : 'Login' }</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}
