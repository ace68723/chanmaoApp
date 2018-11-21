import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

import Common from '../../../Constants/Common'
import CheckoutOrderList from './CheckoutOrderList'
import Separator from '../../Common/Separator'

export default class CheckoutUserInfo extends Component{
  constructor(props) {
    super(props);
    this.renderOrderItems = this.renderOrderItems.bind(this);
    this.state = {
      height: 50
    }
  }
  updateSize(height){
    this.setState({ height });
  }
  renderOrderItems(){
    return (
      <View style={styles.order}>
        <CheckoutOrderList productList={this.props.productList} />
      </View>
    )
  }

  renderOrderSummary(){
    return (
      <View style={styles.orderSummary}>
        <Text allowFontScaling={false} style={[styles.orderSummaryText, {}]}>运费: ${this.props.delifee}</Text>
        <Text allowFontScaling={false} style={[styles.orderSummaryText, {}]}>税: ${this.props.tax}</Text>
        <Text allowFontScaling={false} style={[styles.orderSummaryText, {fontSize: 14, color: Common.MAIN_COLOR, marginBottom: 0}]}>总计: ${this.props.total}</Text>
      </View>
    )
  }

  renderOrderComment(){
    const {newValue, height} = this.state;

    let newStyle = { height };
    return (
      <View style={{borderRadius: 4, backgroundColor: '#F0F0F0', marginTop: 6, }}>
        <TextInput
          placeholder={'添加备注'}
          style={[styles.orderCommentText, newStyle]}
          onChangeText={(text) => this.props.onChangeComment(text)}
          multiline={true}
          onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height + 14)}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={this.props.cardStyle}>
        <View style={styles.content}>
          <Text style={{fontFamily:'NotoSans-Regular',fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>订单小计</Text>
          {this.renderOrderItems()}
          <Separator/>
          {this.renderOrderSummary()}
          {this.renderOrderComment()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 24,
    marginRight: 24,
  },
  orderSummary: {
    marginTop: 6,
    marginBottom: 6,
    alignSelf: 'flex-end'
  },
  orderSummaryText: {
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 4,
    fontFamily:'NotoSans-Regular',
  },
  orderCommentText: {
    flex: 1,
    padding: 8,
    fontWeight: '700',
    fontSize: 13,
    borderRadius: 10,
    color: '#565656',
    fontFamily:'NotoSans-Regular',
  }
});
