import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import Common from '../../Constants/Common'
import Separator from '../Common/Separator'

import OrderItemList from './OrderItemList'

export default class OrderCell extends Component{
  constructor(props) {
    super(props);
  }
  renderHeader(){
    let date = new Date(this.props.orderInfo.created*1000);
    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>No.{this.props.orderInfo.oid}</Text>
          <Text style={styles.headerText}>{date.getFullYear() + '-' + (date.getMonth()+1) + "-" + date.getDate() + "  " +  
date.getHours() + ":" + date.getMinutes()}</Text>
        </View>
      </View>
    )
  }
  renderDeliverInfo(){
    return (
      <View style={styles.deliverInfo}>
        <View style={styles.deliverInfoContent}>
          <Text style={{color: Common.MAIN_COLOR, fontWeight: '800'}}>配送</Text>
          <View style={styles.deliverStatus}>
            <Text style={styles.deliverStatusText}>{this.props.orderInfo.status_zh}</Text>
          </View>
        </View>
        <View style={[styles.deliverInfoContent, {flexDirection: 'column'}]}>
          <View style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
            <Image style={{width: 15, height: 15, marginRight: 8}} source={require("./Image/1.png")}/>
            <Text style={{fontWeight: '600', fontSize: 12,}}>{this.props.orderInfo.user_name}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
            <Image style={{width: 15, height: 15, marginRight: 8}} source={require("./Image/1.png")}/>
            <Text style={{fontWeight: '600', fontSize: 12,}}>{this.props.orderInfo.user_phone}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
            <Image style={{width: 15, height: 15, marginRight: 8}} source={require("./Image/1.png")}/>
            <Text style={{fontWeight: '600', fontSize: 12,}}>{this.props.orderInfo.user_addr}</Text>
          </View>
        </View>
      </View>

    )
  }
  renderDeliverTime(){
    return (
      <View style={styles.deliverTime}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.deliverTimeText}>取件时间</Text>
          <Text style={styles.deliverTimeText}>2018-10-12  13:40-14:30</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.deliverTimeText}>取件时间</Text>
          <Text style={styles.deliverTimeText}>2018-10-12  13:40-14:30</Text>
        </View>
      </View>
    )
  }
  renderOrderItems(){
    return (
      <View style={styles.order}>
        <OrderItemList item={this.props.orderInfo.product} />
      </View>
    )
  }
  renderOrderSummary(){
    return (
      <View style={styles.orderSummary}>
        <Text style={[styles.orderSummaryText, {}]}>运费: ${this.props.orderInfo.delifee}</Text>
        <Text style={[styles.orderSummaryText, {}]}>税: $4.99</Text>
        <Text style={[styles.orderSummaryText, {fontSize: 14, color: Common.MAIN_COLOR, marginBottom: 0}]}>总计: ${this.props.orderInfo.total}</Text>
      </View>
    )
  }
  renderOrderComment(){
    return (
      <View style={{borderRadius: 4, backgroundColor: '#F0F0F0', marginTop: 6, }}>
        <Text style={styles.orderCommentText}>{this.props.orderInfo.comment}</Text>
      </View>

    )
  }
  render() {
    return (
      <View>
        <View style={this.props.cardStyle}>
          <View style={styles.content}>
            {this.renderHeader()}
            {this.renderDeliverInfo()}
            <Separator/>
            {this.renderDeliverTime()}
            <Separator/>
            {this.renderOrderItems()}
            <Separator/>
            {this.renderOrderSummary()}
            {this.renderOrderComment()}
          </View>
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
  header: {
    backgroundColor: Common.MAIN_COLOR,
    height: 32,
    marginTop: -16,
    marginLeft: -24,
    marginRight: -24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  headerContent: {
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginRight: 24,
    flex: 1,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '900',
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center'
  },
  deliverInfo: {
    height: 28 * 3,
    marginTop: 12,
    marginBottom: 12,
  },
  deliverInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliverStatus: {
    width: 76,
    height: 26,
    backgroundColor: '#F5A84C',
    borderRadius: 16,
  },
  deliverStatusText: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '900',
    padding: 6,
    color: 'white',
  },
  deliverTime: {
    height: 28 * 1.5,
    marginTop: 12,
  },
  deliverTimeText: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  order: {
    marginTop: 6,
    marginBottom: 6,
  },
  orderSummary: {
    marginTop: 6,
    marginBottom: 6,
    alignSelf: 'flex-end'
  },
  orderSummaryText: {
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 6,
  },
  orderCommentText: {
    flex: 1,
    padding: 8,
    fontWeight: '700',
    fontSize: 11,
    borderRadius: 10,
    color: '#565656',
  }
});
