import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import
{
  Text,
  Picker
} from 'react-native';

import { ActionCreators } from '../../actions';

class BlockchainScreen extends React.Component {
  static navigationOptions = {
    title: 'Blockchain',
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
      <SafeAreaView>
        <Text>Connected to: {this.props.blockchain.network}</Text>
        <Picker
          selectedValue={this.props.blockchain.network}
          onValueChange={
            (itemValue, itemIndex) => this.props.chooseNetwork(itemValue)
          }>
            <Picker.Item label="Select a network..." value="unknown" />
            <Picker.Item label="Mainnet" value="Mainnet" />
            <Picker.Item label="Rinkeby" value="Rinkeby" />
            <Picker.Item label="localhost" value="localhost" />
          </Picker>
      </SafeAreaView>
    );
  }
};

function mapStateToProps(state) {
  return {
      blockchain: state.blockchainReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockchainScreen);
