import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class LocationScreen extends Component {
    state = {
        location: null,
        errorMessage: null,
        interval: null
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            // Update Location every second
            let interval = setInterval(this._getLocationAsync, 1000)
            this.setState({interval})
        }
    }

    componentWillUnmount() {
        this._clearInterval()
    }

    _clearInterval = () => {
        clearInterval(this.state.interval)
        this.setState({interval: null})
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
        const location = this.state.location;
        let view
        if(location) {
            view = 
                [
                    <Text key="timestamp" style={styles.paragraph}>{String(new Date(location.timestamp))}</Text>,
                    <Text key="latitude" style={styles.paragraph}>Latitude: {String(location.coords.latitude)}</Text>,
                    <Text key="Longitude" style={styles.paragraph}>Longitude: {String(location.coords.longitude)}</Text>,
                ]
        } else {
            let text = 'Waiting..';
            if (this.state.errorMessage) {
                text = this.state.errorMessage;
            }
            view = <Text style={styles.paragraph}>{text}</Text>
                
        }

        test = <Text style={styles.paragraph}>Test</Text>

        return (
            <View style={styles.container}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});