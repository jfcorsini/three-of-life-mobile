import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Label, Input, Button, Item } from 'native-base';

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
});

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
    };
  }

  setMessage = (message) => {
    this.setState({ message });
  }

  userLogin = () => {
    const params = {
      email: this.state.email,
      password: this.state.password,
    };

    if (!params.email || !params.password) {
      this.setMessage('Both fields are required');
      return;
    }

    const URI = 'https://0yrd46t4w3.execute-api.eu-central-1.amazonaws.com/dev/auth/login';
  
    axios.post(URI, params)
      .then((response) => {
        if (!response.status === 200) {
          console.log('Authentication of terminal failed. Status is ', response.status);
          this.setMessage('Could not login. Try again.');
          return;
        }

      }).catch((err) => {
        console.log(err.response);
        const errMessage = err.response.data.message || 'Could not perform login';
        this.setMessage(errMessage);
      });
  }

  clearEmail = () => {
    this.email.setNativeProps({ text: '' });
    this.setState({ email: '' });
  }

  clearPassword = () => {
    this.password.setNativeProps({ text: '' });
    this.setState({ password: '' });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.cellContainer}>
          <Text style={styles.header}>Welcome</Text>

          <Item floatingLabel style={styles.item}>
            <Label>Email</Label>
            <Input
              getRef={component => this.email = component}
              onChangeText={email => this.setState({ email })}
              autoFocus
              onFocus={this.clearEmail}
              onSubmitEditing={this.userLogin}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              getRef={component => this.password = component}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              onFocus={this.clearPassword}
              onSubmitEditing={this.userLogin}
            />
          </Item>

          {!!this.state.message && (
            <Text style={styles.message}>
              {this.state.message}
            </Text>
          )}

          <Button
            full
            info
            style={styles.button}
            onPress={this.userLogin}
          >
            <Text>Log in</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}
