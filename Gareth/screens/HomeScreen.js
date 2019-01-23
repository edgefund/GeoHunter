import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Blockchain Asset Tracking',
    headerStyle: {
      backgroundColor: '#077cd3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Text>Welcome to our blockchain based asset tracking app.</Text>
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  }
});
