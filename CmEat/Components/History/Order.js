'use strict';

import React, { Component } from 'react';
import {
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import PhoneNumberVerify from './PhoneNumberVerify';
import CMLabel from '../../Constants/AppLabel';
const { width } = Dimensions.get('window');
const deviceWidth = width;
export default class pastOrderEN extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isCheaking: props.isCheaking,
          orderInfo: props.order,
          page: props.page
      };
      this._renderDetialButton = this._renderDetialButton.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      orderInfo:nextProps.order,
    })
  }
  _renderFoodList(){
      return this.state.orderInfo.items.map((item, index) => {
        const soldoutColor = item.soldout == '1'? '#ef473a':'#000000';
        const soldoutText = ()=>{
          if(item.soldout == '1'){
              return (
                <Text
                    allowFontScaling = {false}
                    style={{ flex: 1,
                              fontSize: 16,
                              paddingLeft: 20,
                              fontFamily: 'FZZhunYuan-M02S',
                              textAlign: 'center',
                              color: soldoutColor }}
                >
                        {CMLabel.getCNLabel('SOLD_OUT')}
                </Text>
              );
          }
        };
        const toppingGroup = () => {
          let _toppingGroup = [];
          if(item.tps) {
            for (let tp of item.tps) {
              if (parseInt(tp.amount) > 0) {
                _toppingGroup.push(
                  <View key={tp.tp_id}
                        style={{flexDirection: 'row', marginTop: 5, marginLeft: 38}}>

                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{color:'#ababb0',
                                      fontSize:16,
                                      fontFamily:'FZZhunYuan-M02S'}}
                              allowFontScaling={false}>
                          {tp.tp_name}
                        </Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
                      <Text style={{color:'#ababb0',
                                    fontSize:16,
                                    fontFamily:'FZZhunYuan-M02S',
                                    textAlign: 'left'}}
                            allowFontScaling={false}>
                        ${tp.price} × {tp.amount}
                      </Text>
                    </View>
                  </View>
                )
              }
            }
            return _toppingGroup;
          }
        };
      return(
        <View key={index} style={{flexDirection:'column',alignItems:'center',paddingTop:10,paddingBottom:10}}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.quantityIcon}><Text style={{fontSize:10,fontFamily:'FZZhunYuan-M02S',}}>{item.amount}</Text></View>
                <Text style={{fontSize:16,paddingLeft:20,fontFamily:'FZZhunYuan-M02S',color:soldoutColor}}
                      allowFontScaling={false}>
                        {item.ds_name}
                </Text>
                {soldoutText()}
                <View style={{flex:1,alignItems:'flex-end'}}>
                  <Text style={{fontSize:16,paddingLeft:20,fontFamily:'FZZhunYuan-M02S',color:soldoutColor}}
                        allowFontScaling={false}>
                          ${(item.amount*item.price).toFixed(2)}
                  </Text>
                </View>
            </View>
            {toppingGroup()}
        </View>
      )
    })
  }

  _handleWechatBtn(){
     Clipboard.setString('chanmaoweixin');
     Alert.alert(
            '已复制',
            '馋猫公众号: chanmaoweixin',
            [
              {text: 'OK', onPress: () => {}},
            ]
          )
  }

  _phoneNumberVerify (){
    if(this.state.orderInfo.order_status == 55){
      return(
          <PhoneNumberVerify  orderId={this.state.orderInfo.order_oid}
                              phoneNumber ={this.state.orderInfo.user_tel}
                              scrollRef={this.props.scrollRef}
                              getCurrentPosition={this.props.getCurrentPosition}/>
      )
    }
  }

  _renderDetialButton() {
    if (this.props.page == 0) {
      if(this.state.orderInfo.order_status == '5'){
        return (
          <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
              <TouchableOpacity style={{flex:1,
                                        justifyContent:'center',
                                        alignItems:'center'}}
                                 onPress={this.props.reorder.bind(null,this.state.orderInfo.rr_rid)}>
                <Text style={{fontSize:13,color:'#ef473a',fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}}
                      allowFontScaling={false}>
                      {CMLabel.getCNLabel('REORDER')}
                </Text>
              </TouchableOpacity>
          </View>
        )
      }else{
        return(
          <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
              <TouchableOpacity style={{flex:1,
                                        justifyContent:'center',
                                        alignItems:'center'}}
                                 onPress={this.props.orderOnClick.bind(null,this.state.orderInfo)}>
                <Text style={{fontSize:13,color:'#666666',fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}}
                        allowFontScaling={false}>{CMLabel.getCNLabel('DETAIL')}</Text>
              </TouchableOpacity>
          </View>
        )
      }
    }
    else if (this.props.page == 1) {
      return(
        <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
            <TouchableOpacity style={{flex:1,
                                      justifyContent:'center',
                                      alignItems:'center'}}
                               onPress={this.props.orderOnClick.bind(null,this.state.orderInfo)}>
              <Text style={{fontSize:13,color:'#666666',fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}}
                      allowFontScaling={false}>{CMLabel.getCNLabel('COMMENT')}</Text>
            </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
            <TouchableOpacity style={{flex:1,
                                      justifyContent:'center',
                                      alignItems:'center'}}
                               onPress={this.props.reorder.bind(null,this.state.orderInfo.rr_rid)}>
              <Text style={{fontSize:13,color:'#ef473a',fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}}
                    allowFontScaling={false}>
                    {CMLabel.getCNLabel('REORDER')}
              </Text>
            </TouchableOpacity>
        </View>
      )
    }
  }
  render() {
    let statusMessage = "现金支付";
    let statusColor;
    switch (this.state.orderInfo.order_status) {
        case 0:
            statusColor = {color:'#b2b2b2'};
            statusMessage = '等待商家确认';
            break;
        case 10:
            statusColor = {color:'#33cd5f'};
            statusMessage = '商家已确认, 准备中';
            break;
        case 20:
            statusColor = {color:'#33cd5f'};
            statusMessage = '商家已确认, 准备中';
            break;
        case 30:
            statusColor = {color:'#9bc8df'};
            statusMessage = '送餐员已开始送餐';
            break;
        case 40:
            statusColor = {color:'#11c1f3'};
            statusMessage = '已送到, 满意吗？';
            break;
        case 55:
            statusColor = {color:'#886aea'};
            statusMessage = '新用户订单确认中';
            break;
        case 60:
            statusColor = {color:'#11c1f3'};
            statusMessage = '客服稍后联系您改运费';
            break;
        case 5:
            statusColor = {color:'#ef473a'};
            statusMessage = '糟糕, 有的菜没了';
            break;
        case 90:
            statusColor = {color:'#ef473a'};
            statusMessage = '订单已取消';
            break;
    }
      return(
        <TouchableOpacity style={styles.orderContainer}
                          onPress={this.props.orderOnClick.bind(null,this.state.orderInfo)}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <TouchableOpacity style={{flex: 1}} onPress={this.props.reorder.bind(null,this.state.orderInfo.rr_rid)}>
                    <ImageBackground style={{flex:1,width:deviceWidth-56,alignSelf:'center'}} source={{uri:this.state.orderInfo.rr_url}}>
                      <View style={styles.opacityView}/>
                        <View style={styles.imageTextContainer}>
                          <Text style={styles.imageText} allowFontScaling={false}>{this.state.orderInfo.rr_name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.info}>
                  <Text style={[styles.infoTitle,statusColor]} allowFontScaling={false}>{statusMessage}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.infoText} allowFontScaling={false}>{CMLabel.getCNLabel('ORDER_NO')} #{this.state.orderInfo.order_oid}</Text>
                    <Text style={[styles.infoText,{textAlign:'right'}]} allowFontScaling={false}>{this.state.orderInfo.order_created}</Text>
                  </View>
              </View>
              <View style={styles.orderList}>
                {this._renderFoodList()}
              </View>
              <View style={styles.orderTotal}>
                <Text style={{fontSize:18,marginLeft:40,fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}} allowFontScaling={false}>{CMLabel.getCNLabel('PRICE')}: ${this.state.orderInfo.order_total}</Text>
              </View>
              {this._phoneNumberVerify()}
              <View style={styles.buttonContainer}>
                  {this._renderDetialButton()}
                  <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:10,}]}>
                      <TouchableOpacity style={{flex:1,
                                                flexDirection:'row',
                                                justifyContent:'center',
                                                alignItems:'center'}}
                                        onPress={this._handleWechatBtn}>
                        <Image style={{width:25,height:25}}source={require('./Image/wechat3.png')}/>
                        <Text style={{marginLeft:5,fontSize:13,color:'#666666',fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}} allowFontScaling={false}>chanmaoweixin</Text>

                      </TouchableOpacity>
                  </View>
              </View>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:50,
    backgroundColor: '#e6e6e6',
  },
  orderContainer:{
    margin:10,
    backgroundColor:"#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
       height: 1,
       width: 1,
    },
  },
  itemContainer: {
    // backgroundColor: 'white',
    // height:500
  },
  imageContainer:{
    height:110,
    marginTop:18,
    marginLeft:18,
    marginRight:18,
    justifyContent: 'center',
  },

  opacityView:{
    flex:1,
    opacity: 0.3,
    backgroundColor:'#000000'
  },
  imageTextContainer:{
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0)',
    //flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
   fontSize: 20,
   color:'white',
   alignSelf:'center',
   fontFamily:'FZZongYi-M05S',
  },
  info:{
    flex:1,
    paddingTop:15,
    marginLeft:18,
    marginRight:18,
  },
  infoTitle:{
    paddingBottom:5,
    // marginLeft:40,
    fontWeight:'bold',
    fontSize:17,
    fontFamily:'FZZhunYuan-M02S',
  },
  infoText:{
    flex:1,
    paddingBottom:5,
    // marginLeft:40,
    color:'#666666',
    fontFamily:'FZZhunYuan-M02S',
  },
  orderList:{
    flex:1,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#d9d9d9',
    marginLeft:18,
    marginRight:18,
    paddingBottom:5,

  },
  quantityIcon:{
    borderColor:'#d9d9d9',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    height:18,
    width:18,
  },
  orderTotal:{
    flex:1,
    paddingTop:18,
    paddingBottom:18,
    paddingLeft:18,
    paddingRight:18,
    justifyContent:'center'
  },
  buttonContainer:{
    flex:1,
    flexDirection:'row',
  },
  ButtonStyle:{
    flex:1,
    backgroundColor:'#f9f9f9',
    borderTopWidth: 1,
    borderBottomWidth:1,


    borderColor:'#d9d9d9'
  },



});
