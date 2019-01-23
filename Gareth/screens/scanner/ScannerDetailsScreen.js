import React from 'react';
import
{
  Text,
} from 'react-native';

import { SafeAreaView } from 'react-navigation';

export default class ScannerDetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Scanned Data',
    headerStyle: {
      backgroundColor: '#077cd3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', null);

    return (
      <SafeAreaView>
        <Text>QR Data: {data}</Text>
      </SafeAreaView>
    );
  }
};
