import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import OrderAction from '../../Actions/OrderAction';
import OrderStore from '../../Stores/OrderStore';
import OrderCell from './OrderCell.js'
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = OrderStore.getState();
    this._onChange = this._onChange.bind(this)
  }
  _onChange() {
    const state = Object.assign({}, OrderStore.getState());
    this.setState(state);
    console.log(this.state);
  }
  componentDidMount() {
    let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDA3ODU5NDUsImV4cCI6MTU3MjMyMTk0NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVpZCI6IjEifQ.RIk_KgD_Oq31NkB6FSL0_PsRhmRWA3DwOLz2Fj4bjhI';
    OrderAction.getHistoryOrder(token);
    OrderStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    OrderStore.removeChangeListener(this._onChange);
  }
  onPressedCell(key) {
    console.log(key);
  }
  renderCells(item) {
    return (
      <OrderCell
        cardStyle={styles.card}
        onPressedCell={this.onPressedCell}
        orderInfo={item}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={{marginTop: 6}} data={this.state.historyOrder} renderItem={({item}) => (this.renderCells(item))}/>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 6,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
});
