import React from 'react';
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import
{
  Text,
  Button,
  StyleSheet
} from 'react-native';

import { SafeAreaView } from 'react-navigation';
import { BarCodeScanner } from 'expo';

class ScannerScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan QR Code',
    headerStyle: {
      backgroundColor: '#077cd3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  async componentDidMount() {
    this.props.getCameraPermission();
  }

  render() {
    const {
      hasCameraPermission,
      scanning
    } = this.props.scanner;

    if (hasCameraPermission === null) {
      return <Text>Requesting camera access...</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>Permission to access camera denied.</Text>;
    }

    if (scanning) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
              <BarCodeScanner
                type={BarCodeScanner.Constants.Type.back}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                onBarCodeScanned={this.handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
            />
            <Button title="Cancel" onPress={this.cancelCamera} />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.centre}>
          <Text>Waiting...</Text>
          <Button style={styles.centre} title='Scan' onPress={this.startScanning} />
        </SafeAreaView>
      );
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.props.barCodeScanned(data);
    this.props.navigation.navigate('ScannerDetails', {data});
  }

  startScanning = ({}) => {
    this.props.toggleScanning(true);
  }

  cancelCamera = ({}) => {
    this.props.toggleScanning(false);
  }
};

const styles = StyleSheet.create({
  centre: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
      scanner: state.scannerReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen);
