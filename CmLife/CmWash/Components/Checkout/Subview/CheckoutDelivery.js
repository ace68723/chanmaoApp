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
import Common from '../../../Constants/Common'

export default class CheckoutUserInfo extends Component{
  constructor(props) {
    super(props);
    this.renderDeliveryContent=this.renderDeliveryContent.bind(this);
  }
  renderDeliveryContent(){
    // Only enable shipping for now
    const shippingType = 0;
    let content;
    switch (shippingType) {
      case 0:
        {
          // console.log(this.props);
          if (this.props.selectedPickUpDate && this.props.selectedDeliveryDate) content = (
            <View style={this.props.cardStyle}>
              <View style={[styles.content, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                <TouchableOpacity style={{marginLeft: -20}} onPress={this.props.onPressedPickupTime}>
                  <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>取件</Text>
                  <View style={{flexDirection: 'column', justifyContent:'space-between', marginBottom: 10,}}>
                    <Text style={{fontWeight: '700', fontSize: 15, marginBottom: 6}}>{this.props.selectedPickUpDate}</Text>
                    <Text style={{fontWeight: '600', fontSize: 12,}}>{this.props.selectedPickUpTime}</Text>
                  </View>
                </TouchableOpacity>
                <View style={{height: 60, width: 1, backgroundColor: '#999999', opacity: 0.4}}></View>
                <TouchableOpacity onPress={this.props.onPressedDeliverTime}>
                  <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>送达</Text>
                  <View style={{flexDirection: 'column', justifyContent:'space-between', marginBottom: 10,}}>
                    <Text style={{fontWeight: '700', fontSize: 15, marginBottom: 6}}>13:30-14:30</Text>
                    <Text style={{fontWeight: '600', fontSize: 12,}}>2018-10-12</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
          else if (this.props.selectedPickUpDate && (!this.props.selectedDeliveryDate)) content= (
            <View style={this.props.cardStyle}>
              <View style={[styles.content, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                <TouchableOpacity style={{marginLeft: -20}} onPress={this.props.onPressedPickupTime}>
                  <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>取件</Text>
                  <View style={{flexDirection: 'column', justifyContent:'space-between', marginBottom: 10,}}>
                    <Text style={{fontWeight: '700', fontSize: 15, marginBottom: 6}}>{this.props.selectedPickUpDate}</Text>
                    <Text style={{fontWeight: '600', fontSize: 12,}}>{this.props.selectedPickUpTime}</Text>
                  </View>
                </TouchableOpacity>
                <View style={{height: 60, width: 1, backgroundColor: '#999999', opacity: 0.4}}></View>
                <TouchableOpacity onPress={this.props.onPressedDeliverTime}>
                  <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>送达</Text>
                  <View style={{flexDirection: 'column', justifyContent:'space-between', marginBottom: 10,}}>
                    <Text style={{fontWeight: '700', fontSize: 15, marginBottom: 6}}>请选择送达时间</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
          else content=(
            <View style={this.props.cardStyle}>
              <View style={[styles.content, {flexDirection: 'row', justifyContent: 'space-around'}]}>
                <TouchableOpacity style={{marginLeft: -20}} onPress={this.props.onPressedPickupTime}>
                  <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>取件</Text>
                  <View style={{flexDirection: 'column', justifyContent:'space-between', marginBottom: 10,}}>
                    <Text style={{fontWeight: '700', fontSize: 15, marginBottom: 6}}>请选择取件时间</Text>
                  </View>
                </TouchableOpacity>
                <View style={{height: 60, width: 1, backgroundColor: '#999999', opacity: 0.4}}></View>
                <TouchableOpacity onPress={this.props.onPressedDeliverTime}>
                  <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>送达</Text>
                  <View style={{flexDirection: 'column', justifyContent:'space-between', marginBottom: 10,}}>
                    <Text style={{fontWeight: '700', fontSize: 15, marginBottom: 6}}>请先选择取件时间</Text>

                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        break;
      case 1:
        {
          content = (
            <View style={this.props.cardStyle}>
              <View style={styles.content}>
                <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>自取地址</Text>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 10,}}>
                  <Text style={{fontWeight: '600', fontSize: 13,}}>North York</Text>
                  <Text>></Text>
                </View>
              </View>
            </View>
          )
        }
        break;
      default:
    }
    return content;
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.select} source={require('../Image/selected.png')}/>
            <Text style={{fontWeight: '700', fontSize: 13,}}>馋猫配送</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.select} source={require('../Image/unselected.png')}/>
            <Text style={{fontWeight: '700', fontSize: 13,}}>自送自取</Text>
          </TouchableOpacity>
        </View>
        {this.renderDeliveryContent()}
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
    marginTop: 12,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    height: 4,
    opacity:0,
  },
  select: {
    width: 20,
    height: 20,
    marginRight: 8,
  }
});
