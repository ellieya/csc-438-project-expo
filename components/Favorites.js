import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

export class Favorites extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            UID: null
        }
    }

    render() {

        if (this.state.isLoggedIn) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>You is logged on</Text>
                </View>
            )
        }
        else {
            return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text>Login to view favorites!</Text>
                <TextInput placeholder="E-mail"></TextInput>
                <TextInput placeholder="Password"></TextInput>
                <Button title="Login"></Button>
                <Button title="Register"></Button>
                </View>
            </View>)
        }
    }
}