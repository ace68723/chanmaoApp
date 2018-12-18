'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  PixelRatio,
} from 'react-native';

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

import {cme_GetRestaurantWithRid} from '../../../App/Modules/Database'

const {width,height} = Dimensions.get('window');
class RestaurantCard extends Component {
      constructor(props) {
          super();
					const rid = Number(props.restaurant.rid);
          this.state={
						// restaurantData:cme_GetRestaurantWithRid(rid),
						restaurant:props.restaurant,
            ref:props.restaurant.rid,
            imgUrl:{uri:props.restaurant.mob_banner},
          }
          this._openMenu = this._openMenu.bind(this);
					this._renderDesc = this._renderDesc.bind(this);
      }
			componentWillReceiveProps(nextProps){
				const rid = Number(nextProps.restaurant.rid);
				this.setState({
					// restaurantData:cme_GetRestaurantWithRid(rid),
					restaurant:nextProps.restaurant,
					ref:nextProps.restaurant.rid,
					imgUrl:{uri:nextProps.restaurant.mob_banner},
				})
			}
			_renderDesc() {
				const _discountInfo = () => {
			    if (this.state.restaurant.discount_message && this.state.restaurant.discount_message.length > 0) {
			      return (
			        <View style={{flex:2, flexDirection:'row', marginTop: 3}}>
			          <Image
			            source={require('./Image/icon_coupon_small.png')}
			            style={{height:14,width:23,alignSelf: 'center'}}
			          />
			          <Text style={{color:'#40a2e7',
			                        marginLeft:7,
			                        marginRight: 20,
			                        fontWeight:'200',
			                        alignSelf: 'center',
			                        fontFamily:'NotoSansCJKsc-Regular'}}
			                allowFontScaling={false}>
			              {this.state.restaurant.discount_message}
			          </Text>
			        </View>
			      )
			    }
			  };
				return(
					<View style={{flex:2,}}>
						<Text style={{color: '#666666',
													// color:'#ababb0',
													fontSize:14,
													fontWeight:'200',
													marginTop:2,
													fontFamily:'NotoSansCJKsc-Regular'}}
									allowFontScaling={false}>
								{this.state.restaurant.desc}
						</Text>
						{_discountInfo()}
					</View>
				);
				// For discount info
				// return(
				// <View style={{flex:2, flexDirection:'row'}}>
				// 	<Image
				// 		source={require('./Image/icon_coupon_small.png')}
				// 		style={{height:18,width:30,alignSelf: 'center'}}
				// 	/>
				// 	<Text style={{color:'#40a2e7',
				// 								marginLeft:7,
				// 								fontWeight:'200',
				// 								alignSelf: 'center',
				// 								fontFamily:'NotoSansCJKsc-Regular'}}
				// 				allowFontScaling={false}>
				// 			税前满$66.66可享受85折
				// 	</Text>
				// </View>
				// );
			}
      _renderCloseCover(){


        if(this.state.restaurant.open == 0){
          return(
            <View style={{position:'absolute',
													top:0,left:0,bottom:0,right:0,
                          backgroundColor:'rgba(0,0,0,0.5)',}}>
                <Text style={{fontWeight:'700',
                              fontSize:20,
                              color:'#ffffff',
                              textAlign:'center',
                              top:90,}}
											allowFontScaling={false}>
                  商家休息啦
                </Text>
            </View>
          )
        }

      }
      pormotion(){
        //  if(true){
        //    return(
        //      <View style={styles.col}>
        //          <View style={styles.pormotion}>
        //              <Text style={styles.pormotionText}>
        //                  全店满$100减$50{}
        //              </Text>
        //          </View>
        //      </View>
        //    )
         //
        //  }
      }
      recommend(){
        if(this.state.restaurant.rank > 0){
          return(
            <Image
              source={require('./Image/recommend.png')}
              style={[{height:50,width:50,top:7,right:7,position:'absolute'}]}
            />
          )
        }
      }
      _openMenu(){
        this.refs[this.state.ref].measure( (fx, fy, width, height, px, py) => {
            this.props.navigator.showModal({
              screen: 'CmEatMenu',
              animated: false,
              navigatorStyle: {navBarHidden: true},
              passProps: {
                py:py,
                restaurant:this.state.restaurant,
              },
            });
        })
      }
      _renderDistance(){
        if(this.state.restaurant.distance > 0){
          return(
            <View style={{flex:1,
													flexDirection:"row",
													justifyContent:"flex-end",
													alignItems:"flex-end",
												}}>
							<Image
								source={require('./Image/icon_distance.png')}
								style={[{height:12,width:8.7,top:-2}]}
							/>
              <Text style={{color:'#ababb0',
														fontSize:12,
														fontWeight:'400',
														fontFamily:'NotoSansCJKsc-Regular',
														marginLeft:3,
														textAlign:'right'}}
										allowFontScaling={false}>

                  {(this.state.restaurant.distance/1000).toFixed(2)} km
              </Text>
            </View>
          )
        }

      }
      render(){
        return(
          <TouchableWithoutFeedback
            onPress={this._openMenu}
            >
            <View style={{marginTop:0,
													marginBottom:5,
													shadowColor: "#e2e2e4",
                          shadowOpacity: 1,
                          shadowOffset: {
                           height: 2,
                           width: 2
												 },
												 	marginLeft:7,
												 	marginRight:7,
													backgroundColor:'#ffffff',
                          borderRadius:5,
												 }}>
                <View  style={{ borderTopLeftRadius:5,borderTopRightRadius:5,height:200,
                                marginTop:0,
                                overflow: 'hidden',
                                left:0,
                                right:0,
                                borderColor:"#e2e2e4",
                                borderTopWidth:StyleSheet.hairlineWidth,
                                borderLeftWidth:StyleSheet.hairlineWidth,
                                borderRightWidth:StyleSheet.hairlineWidth,
                              }}
                          ref={this.state.ref} >
                    <Image
                      source={{uri:this.state.restaurant.mob_banner}}
                      style={[{height:width/1.25,
                               width:null,}]}
                    />
										{this.recommend()}
										{this._renderCloseCover()}

                </View>

                <View style={{borderBottomLeftRadius:5,borderBottomRightRadius:5,backgroundColor:'#ffffff',
                              padding:8,
                              borderColor:"#e2e2e4",
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              borderLeftWidth:StyleSheet.hairlineWidth,
                              borderRightWidth:StyleSheet.hairlineWidth,}}>
                  <Text style={{color:'#363646',
																fontSize:15,
																fontFamily:'NotoSansCJKsc-Black',}}
												allowFontScaling={false}>
                      {this.state.restaurant.name}
                  </Text>
                  <View style={{flexDirection:"row"}}>
                    {this._renderDesc()}
                    {this._renderDistance()}

                  </View>

                </View>

            </View>
           </TouchableWithoutFeedback>
        )
      }

}
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom:5,
    width: null,
  },
  restaurant:{
      flex: 1,
      marginLeft:15,
      marginRight:15,
      borderRadius: 8,
      height: (Dimensions.get('window').width-30)/3.56,

      // width: null,
  },
  pormotionRestaurant:{
      flex: 1,
      marginLeft:15,
      marginRight:15,
      borderRadius: 8,
      borderColor: '#ff8b00',
      borderWidth:3,
      height: (Dimensions.get('window').width-30)/3.56,
  },
  pormotionBox:{
      flex:1,
      flexDirection: 'row',
      marginLeft:15,
      marginRight:15,
  },
  col: {
    flex: 1,
  },
  recommend:{
      alignSelf: 'flex-start',
      backgroundColor:'#ff8b00',
      width:80,
      height:30,
      marginBottom:-8,
      borderRadius: 5,
      borderColor: '#ff8b00',
      borderWidth:1,
  },
  recommendText:{
      color:'#fff',
      marginTop:5,
      marginLeft:7,
  },
  pormotion:{
      alignSelf: 'flex-end',
      // width:150,
      height:30,
      marginBottom:-8,
  },
  pormotionText:{
    textAlign:'right',
    color:'#d9553f',
    fontSize:18,
  },
  close:{
    alignSelf: 'flex-end',
    backgroundColor:'#ff8b00',
    marginTop:5,
    marginRight:5,
    width:80,
    height:25,
    borderRadius: 5,
    borderColor: '#ff8b00',
    borderWidth:1,
    justifyContent:'center',
  },
  closeText:{
    color:'#ffffff',
    alignSelf:'center',
  }
})
module.exports = RestaurantCard;
