import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

export class BusSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }

        this.allBusObjects = [];
        this.displayedBusObjects;
    }

    async getAllBusRoutes() {
        fetch("https://us-central1-csc438-project.cloudfunctions.net/app/bus/all_routes")
            .then(data => data.json())
            .then(json => {
                let i = 0;
                for (let prop in json) {
                    this.allBusObjects.push(<Text key={i + prop} name={prop}>{prop} - {json[prop].longName[0]}</Text>);
                    i++;
                }
                this.displayedBusObjects = this.allBusObjects;
                this.setState({ loading: false });
            });
    }

    updateDisplayedBusObjects = (value) => {
        this.setState({ loading: true });
        this.displayedBusObjects = [];

        console.log(this.allBusObjects);
        for (let i = 0; i < this.allBusObjects.length; i++) {
            let matchingCase = true;
            for (let j = 0; j < value.length; j++) {
                console.log("this.allBusObjects[i].name[j] = " + this.allBusObjects[i].props.name[j]);
                console.log("value[j] = " + value[j]);
                if (this.allBusObjects[i].props.name[j] !== value[j]) {
                    matchingCase = false;
                }
            }

            if (matchingCase) {
                this.displayedBusObjects.push(this.allBusObjects[i]);
            }
        }
        this.setState({ loading: false });

    }

    componentDidMount() {
        this.getAllBusRoutes();
        console.log("is mounted");
    }


    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            );
        }
        else {
            return (
                <View>
                    <TextInput onChange={e => this.updateDisplayedBusObjects(e.target.value)}></TextInput>
                    {this.displayedBusObjects}
                </View>
            )
        }
    }
}
