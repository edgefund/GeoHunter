import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import { LinearGradient, Constants, Location, Permissions, BarCodeScanner } from 'expo';

export default class LocationScannerScreen extends Component {
    state = {
        location: null,
        qrData: null,
        errorMessage: null,
        scanning: false
    };

    _getLocationAsync = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
            }
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        return location;
    };

    _handleBarCodeRead = async data => {
        let location = await this._getLocationAsync()
        console.log(`Data: `, data);
        console.log('Location: ', location)
        this.setState({scanning: false, qrData: data})
    }

    render() {
        const { qrData, location, scanning } = this.state;
        let view
        if (location && qrData) {
            view =
                <View style={styles.container}>
                    {[
                        <Text key="data" style={styles.paragraph}>QR-Data: {String(qrData.data)}</Text>,
                        <Text key="timestamp" style={styles.paragraph}>{String(new Date(location.timestamp))}</Text>,
                        <Text key="latitude" style={styles.paragraph}>Latitude: {String(location.coords.latitude)}</Text>,
                        <Text key="Longitude" style={styles.paragraph}>Longitude: {String(location.coords.longitude)}</Text>,
                    ]}
                </View>
            // view = 
                // <Text key="Longitude" style={styles.paragraph}>Longitude: {String(location.coords.longitude)}</Text> 
        } else {
            let text = 'Waiting..';
            if (this.state.errorMessage) {
                text = this.state.errorMessage;
            }
            view = <Text style={styles.paragraph}>{text}</Text>

        }

        view = 
            <View style={styles.container}>
                {view}
                <Button
                    onPress={() => this.setState({ scanning: true })}
                    title="Scan"
                    color="#303030"
                    accessibilityLabel="Tap to scan a barcode"
                />
            </View>            

        // test = <Text style={styles.paragraph}>Test</Text>

        return (
            <LinearGradient
                colors={['#F0CB35', '#C02425']}
                style={[styles.container, {alignItems: 'center'}]}
                start={[1.0,0.0]}
            >
                {scanning ?
                    <BarCodeScanner
                        torchMode="on"
                        onBarCodeRead={this._handleBarCodeRead}
                        style={{ height: 200, width: 200 }}
                    /> : (
                    view 
                )}
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'transparent',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});