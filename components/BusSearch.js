import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import Modal from "react-native-modal";

function BusStopDisplayer(props) {
    console.log({"el boos": props.stopGroupList});
    let stopLists = [];

    for (let i = 0; i < props.stopGroupList.length; i++) {
        stopLists[i] = [];
        for (let j = 0; j < props.stopGroupList[i].stopIds.length; j++) {
            stopLists[i].push(<Text key={i + j + props.stopGroupList[i].stopIds[j]}>{props.stopGroupList[i].stopIds[j]}</Text>)
        }
    }

    return(<View>
        {stopLists[0]}
    </View>)
}

export class BusSearch extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            isModalVisible: false,
            modalLoading: true
        }

        this.allBusObjects = [];
        this.displayedBusObjects;
        this.busStopGroups = [];
    }

    async getAllBusRoutes() {
        fetch("https://us-central1-csc438-project.cloudfunctions.net/app/bus/all_routes")
            .then(data => data.json())
            .then(json => {
                let i = 0;
                for (let prop in json) {
                    this.allBusObjects.push(
                        <TouchableOpacity onPress={e => this.handleBusTapped(json[prop].id[0])} key={i + prop} name={prop}>
                            <View>
                                <Text >{prop} - {json[prop].longName[0]}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                    i++;
                }
                this.displayedBusObjects = this.allBusObjects;
                this.setState({ loading: false });
            });
    }

    handleBusTapped = async (busId) => {
        this.toggleModal();
        await fetch(`https://us-central1-csc438-project.cloudfunctions.net/app/bus/all_route_stops/${busId}`)
        .then(data => data.json())
        .then(json => {
            this.busStopGroups = json;
            this.setState({modalLoading: false});
        });
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    updateDisplayedBusObjects = (value) => {
        this.setState({ loading: true });
        this.displayedBusObjects = [];

        console.log(this.allBusObjects);
        for (let i = 0; i < this.allBusObjects.length; i++) {
            let matchingCase = true;
            for (let j = 0; j < value.length; j++) {
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
                    <View>
                        <Modal isVisible={this.state.isModalVisible} backdropColor="white">
                            <View style={{ flex: 1 }}>
                                <Text>{this.state.modalLoading ? "Loading" : <BusStopDisplayer stopGroupList={this.busStopGroups}/>}</Text>
                                <Button value="Close" onPress={this.toggleModal}></Button>
                            </View>
                        </Modal>
                    </View>
                    <TextInput onChange={e => this.updateDisplayedBusObjects(e.target.value)}></TextInput>
                    {this.displayedBusObjects}
                </View>
            )
        }
    }
}
