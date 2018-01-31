// @flow
// SboxProductDetial


import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import {
    findIndex,
} from 'lodash';

import ScrollableTabView from 'react-native-scrollable-tab-view'
import SboxProductDetialScrollView from './SboxProductDetialScrollView';
import SboxProductDetialDesc from './SboxProductDetialDesc';
import SboxProductDetialAttr from './SboxProductDetialAttr';
import SboxProductService from './SboxProductService';
import SboxProductFacts from './SboxProductFacts';

import SboxBox from '../SboxBox/SboxBox';

import SboxProductAction from '../../Actions/SboxProductAction';
import SboxProductStore from '../../Stores/SboxProductStore';

const {height, width} = Dimensions.get('window');

export default class SweetProductDetial extends Component {
	constructor(props) {
    super(props);
    this.state = {
        selectedPage: '',
        selectedProduct:{},
        selectedAmount:1,
        sku_image:[],
        sku_list:[],
        totalQuantity:0,
        loading:false,
    };

    this._onPageChange = this._onPageChange.bind(this);
    this._changeSelectAttr = this._changeSelectAttr.bind(this);
    this._addAmount = this._addAmount.bind(this);
    this._subAmount = this._subAmount.bind(this);
    this._addToCart = this._addToCart.bind(this);
    this._goToSboxCart = this._goToSboxCart.bind(this);
    this._goBack = this._goBack.bind(this);
    this._onChange = this._onChange.bind(this);
    this._getCartQuantity = this._getCartQuantity.bind(this);
  }
  componentWillMount() {
    
  }
  componentDidMount(){
      SboxProductStore.addChangeListener(this._onChange);
      const spu_id = this.props.spu_id
      SboxProductAction.getSingleProduct(spu_id);
      this._getCartQuantity();
  }
  componentWillUnmount() {
    SboxProductStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    const productData = SboxProductStore.getSboxProductDetialState();
    const newState = Object.assign({},
      productData);
    this.setState(Object.assign({}, newState),() => console.log(this.state));
    this.state.sku_list.forEach(item => {
      this.setState(Object.assign(item, {sku_quantity: 1}),() => console.log(this.state))
    });
    this.setState({
      selectedProduct: this.state.sku_list[0],
      serviceImg: this.state.spu_service_img,
      loading: true
    })
    if(this.state.spu_status === 1) {
      this.props.navigator.pop({
        animated: true, // does the pop have transition animation or does it happen immediately (optional)
        animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
      });
    }
}
  _changeSelectAttr({attr}) {
      const selectPage = findIndex(this.state.sku_image,{image_id: attr.sku_image_id})
      this.setState({ 
        selectedProduct: attr,
        selectedPage:selectPage
      });
  }
  _onPageChange(page){
      const selectIndex = findIndex(this.state.sku_list,{sku_image_id: this.state.sku_image[page].image_id});
      this.setState({
        selectedProduct: this.state.sku_list[selectIndex],
        selectedPage: page
      })
  }

  _getCartQuantity() {
    const cartQuantity = SboxProductAction.getCartQuantity();
    this.setState({
      totalQuantity:cartQuantity
    })
  }
  _addAmount(){
    if(this.state.selectedProduct.sku_quantity<this.state.selectedProduct.sku_amount){
      let selectedProduct = Object.assign({}, this.state.selectedProduct);    //creating copy of object
      selectedProduct.sku_quantity  = selectedProduct.sku_quantity + 1 ;
      selectProductIndex  = findIndex(this.state.sku_list, {sku_id: this.state.selectedProduct.sku_id})
      let sku_list = [ ...this.state.sku_list ];
      sku_list[selectProductIndex].sku_quantity = selectedProduct.sku_quantity ;  //new value
      this.setState({ sku_list },() => console.log(this.state.sku_list));
      this.setState({selectedProduct});
    }
  }
  _subAmount(){
    if(this.state.selectedProduct.sku_quantity > 1){
      let selectedProduct = Object.assign({}, this.state.selectedProduct);    //creating copy of object
      selectedProduct.sku_quantity  = selectedProduct.sku_quantity - 1 ;
      selectProductIndex  = findIndex(this.state.sku_list, {sku_id: this.state.selectedProduct.sku_id})
      let sku_list = [ ...this.state.sku_list ];
      sku_list[selectProductIndex].sku_quantity = selectedProduct.sku_quantity ;  //new value
      this.setState({ sku_list },() => console.log(this.state.sku_list));
      this.setState({selectedProduct});
    }
  }
  _addToCart() {
    const selectedProduct = this.state.selectedProduct;
    selectedProduct.spu_name = this.state.spu_name
    const total = SboxProductAction.addToCart(selectedProduct);
    this.setState({
      totalQuantity:total
    },() => {
      this.props.navigator.showLightBox({
        screen: "SboxCartAlert",

        passProps: {
          message:`成功添加入购物车`}, // simple serializable object that will pass as props to the lightbox (optional)
        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
       });
       setTimeout(() => {
        this.props.navigator.dismissLightBox();
      }, 1500);
    })
  }

  //route
  _goBack() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }
  _goToSboxCart() {
    this.props.navigator.push({
      screen: 'SboxCheckout',
      navigatorStyle: {
        navBarHidden: true,
      },
    })
  }

  //render
  _renderServiceImage() {
    if(this.state.serviceImg){
      return(
        <SboxProductService serviceImg={this.state.serviceImg} />
      )
    }
  }
  _renderProductFacts() {
      const selectIndex = findIndex(this.state.sku_fact,{image_id: this.state.selectedProduct.sku_fact_image_id});
      if (selectIndex !== -1) {
        return(
          <SboxProductFacts productFactsImg={this.state.sku_fact[selectIndex].image_url} />
        )
      } else {
        return
      }
     
  }
  _renderGoBackBtn() {
    return(
      <TouchableOpacity style={{paddingTop:22,
                                paddingLeft:8,
                                paddingRight:20,
                                paddingBottom:20,
                                position:'absolute',
                                top:0,
                                left:0,}}
                        onPress={this._goBack}>
        <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderAddAmountBtn(){
    if(this.state.selectedProduct.sku_amount > 0 && this.state.selectedProduct.spu_status !== 1 ) {
      return(
        <View style={{flexDirection:'row',
                      alignItems:'flex-start',
                      paddingLeft:20,
                      paddingRight:20,
                    }}>
          <Text style={{
                        color:'#848689',
                        fontWeight:'500',
                        fontSize:15,
                        marginTop:25,
                      }}>
            数量
          </Text>
          <View style={{flexDirection:'row',
                        backgroundColor:"#ffffff",
                        marginLeft:18,
                        marginTop:18,
                      }}>
              <TouchableOpacity
                    onPress={this._subAmount}
                    activeOpacity={0.6}
                    >
                <View style={{
                          width:33,
                          height:33,
                          borderColor:'#efefef',
                          borderWidth:1,
                          alignItems:'center',
                          justifyContent:'center',
                        }}>
                        <Text style={{
                                  fontSize: 20,
                                  fontFamily:'FZZhunYuan-M02S',
                                  color:'#ff768b',
                                }}>
                          -
                        </Text>
                </View>
              </TouchableOpacity>
  
  
              <View style={{
                        width:80,
                        height:33,
                        borderColor:'#efefef',
                        borderTopWidth:1,
                        borderBottomWidth:1,
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                  <Text style={{
                            fontSize: 18,
                            fontFamily:'FZZhunYuan-M02S',
                            color:'#ff768b',
                          }}>
                    {this.state.selectedProduct.sku_quantity}
                  </Text>
              </View>
              <TouchableOpacity
                    onPress={this._addAmount}
                    activeOpacity={0.6}
                    >
                <View style={{
                          width:33,
                          height:33,
                          borderColor:'#efefef',
                          borderWidth:1,
                          alignItems:'center',
                          justifyContent:'center',
                        }}>
                    <Text style={{
                              fontSize: 20,
                              fontFamily:'FZZhunYuan-M02S',
                              color:'#ff768b',
                            }}>
                      +
                    </Text>
                </View>
  
              </TouchableOpacity>
  
          </View>
        </View>
      )
    } else {
      return(
        <View style={{flexDirection:'row',
                      alignItems:'flex-start',
                      paddingLeft:20,
                      paddingRight:20,
                    }}>
          <Text style={{
                        color:'#848689',
                        fontWeight:'500',
                        fontSize:15,
                        marginTop:25,
                      }}>
            数量
          </Text>
          <View style={{flexDirection:'row',
                        backgroundColor:"#ffffff",
                        marginLeft:18,
                        marginTop:18,
                      }}>
              <TouchableOpacity
                    disabled = {true}
                    onPress={this._subAmount}
                    activeOpacity={0.6}
                    >
                <View style={{
                          width:33,
                          height:33,
                          borderColor:'#efefef',
                          borderWidth:1,
                          alignItems:'center',
                          justifyContent:'center',
                        }}>
                        <Text style={{
                                  fontSize: 20,
                                  fontFamily:'FZZhunYuan-M02S',
                                  color:'#ff768b',
                                }}>
                          -
                        </Text>
                </View>
              </TouchableOpacity>
  
  
              <View style={{
                        width:80,
                        height:33,
                        borderColor:'#efefef',
                        borderTopWidth:1,
                        borderBottomWidth:1,
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                  <Text style={{
                            fontSize: 18,
                            fontFamily:'FZZhunYuan-M02S',
                            color:'#ff768b',
                          }}>
                    0
                  </Text>
              </View>
              <TouchableOpacity
                    disabled = {true}
                    onPress={this._addAmount}
                    activeOpacity={0.6}
                    >
                <View style={{
                          width:33,
                          height:33,
                          borderColor:'#efefef',
                          borderWidth:1,
                          alignItems:'center',
                          justifyContent:'center',
                        }}>
                    <Text style={{
                              fontSize: 20,
                              fontFamily:'FZZhunYuan-M02S',
                              color:'#ff768b',
                            }}>
                      +
                    </Text>
                </View>
  
              </TouchableOpacity>
  
          </View>
        </View>
      )
    }
    
  }
  _renderAddCartBtn() {
    if(this.state.selectedProduct.sku_amount > 0 && this.state.selectedProduct.status !== 1 ) {
      let backgroundColor = this.state.selectedProduct ? '#ff768b' : '#efefef' ;
      return(
        <TouchableOpacity
              onPress={this._addToCart}
              activeOpacity={0.6}
              >
          <View style={{
                  width:width*0.4251,
                  height:width*0.4251*0.25,
                  marginTop:20,
                  backgroundColor:backgroundColor,
                  alignSelf:'center',
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                <Text style={{
                        color:'white',
                        fontSize:17,
                        fontFamily:'FZZhunYuan-M02S',
                      }}>
                    加入购物箱
                </Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      let backgroundColor = '#efefef' ;
      return(
        <TouchableOpacity
              disabled = {true}
              onPress={this._addToCart}
              activeOpacity={0.6}
              >
          <View style={{
                  width:width*0.4251,
                  height:width*0.4251*0.25,
                  marginTop:20,
                  backgroundColor:backgroundColor,
                  alignSelf:'center',
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                <Text style={{
                        color:'white',
                        fontSize:17,
                        fontFamily:'FZZhunYuan-M02S',
                      }}>
                    加入购物箱
                </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
  _renderHeaderImage() {
    return(
      <Image source={require('./Images/header.png')}
             style={{
                      width:width,
                      height:width*0.216,
                      position:'absolute',
                      top:0,left:0,
                      // backgroundColor:'red'
                   }}
      />
    )
  }

  render() {
      if(!this.state.loading) {
        return(
          <View style={{flex: 1,
            justifyContent: 'center'}}>
               <ActivityIndicator size="large" color="red" />
          </View>
        )
      } else {
        return (
          <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                <SboxProductDetialScrollView
                  page={this.state.sku_image}
                  selectedPage={this.state.selectedPage}
                  onPageChange={this._onPageChange}
                  attr={this.state.sku_list}/>
  
                <SboxProductDetialDesc  selectedProduct={this.state.selectedProduct}
                                        productName={this.state.spu_name}/>
                <SboxProductDetialAttr  attr={this.state.sku_list}
                                        selectAttr={this.state.selectedProduct}
                                        changeSelectAttr={this._changeSelectAttr}
                                        />
                {this._renderAddAmountBtn()}
                {this._renderAddCartBtn()}
                <ScrollableTabView
                          ref = 'fact'
                          initialPage = {0}
                          prerenderingSiblingsNumber = {2}
                          tabBarUnderlineStyle={{backgroundColor:'#ff768b',
                                                 width:80,
                                                 marginLeft:55,
                                                 height:3,
  
                                               }}
                          style={{marginTop:20}}
                          tabBarActiveTextColor={"#ff768b"}
                          tabBarTextStyle={{ fontSize: 15} }
                  >
                  <View tabLabel="服务明细">
                    {this._renderServiceImage()}
                  </View>
                  <View tabLabel="产品详情">
                    {this._renderProductFacts()}
                  </View>
                  
                  
               </ScrollableTabView>
            </ScrollView>
            {this._renderHeaderImage()}
            {this._renderGoBackBtn()}
            <SboxBox total={this.state.totalQuantity} goToSboxCart={this._goToSboxCart}/>
          </View>
  
  
        );
      }
      
    // } else {
    //   return(
    //     <View>
    //       {this._renderGoBackBtn()}
    //     </View>
    //   )
    // }

  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
