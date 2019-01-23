import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/scanner/ScannerScreen';
import ScannerDetailsScreen from '../screens/scanner/ScannerDetailsScreen';
import BlockchainScreen from '../screens/blockchain/BlockchainScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

const ScannerStack = createStackNavigator({
  Scanner: ScannerScreen,
  ScannerDetails: ScannerDetailsScreen
},
{
  initialRouteName: 'Scanner',
});

const BlockchainStack = createStackNavigator({
  Blockchain: BlockchainScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

ScannerStack.navigationOptions = {
  tabBarLabel: 'Scanner',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ? `ios-barcode`
        : 'md-barcode'
      }
      />
  ),
};

BlockchainStack.navigationOptions = {
  tabBarLabel: 'Blockchain',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
        ? `ios-link`
        : 'md-link'
      }
      />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ScannerStack,
  BlockchainStack
});
