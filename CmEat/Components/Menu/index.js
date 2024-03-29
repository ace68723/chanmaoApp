/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Alert,
  Dimensions,
  Image,
  InteractionManager,
  ListView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MenuStore from '../../Stores/MenuStore';
import Label from '../../../App/Constants/AppLabel';

const {width,height} = Dimensions.get('window');
const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
let marginTop,headerHeight;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 34;
  headerHeight = 88
}else{
  marginTop = 20;
  headerHeight = 64
}

import MenuList from './MenuList';
import Header from '../General/Header';
import Background from '../General/Background';
import MenuHeader from './MenuHeader';
import Util from '../../Modules/Util';

class Menu extends Component {
    static navigatorStyle = {
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overFullScreen'
    }
    constructor(props){
      super()
      this.state = {
        anim: new Animated.Value(0), //for background image
        showMenuAnimation: new Animated.Value(0),
        menuListCoverOpacity:new Animated.Value(1),
        HV_Top:new Animated.Value(-150),
        restaurantViewOpacity: new Animated.Value(0), // init opacity 0
        restaurantCardTop:new Animated.Value(props.py),
        restaurantCardMargin:new Animated.Value(7),
        top:props.py,
        restaurant:props.restaurant,
        renderMenuList:true,
        showHeader:false,
        renderHeader:false,
				renderBackgroundCover:false,
        cartTotals:'',
      };
			this._goToCheckout = this._goToCheckout.bind(this);

			//for menuList
			this._changeCartTotals = this._changeCartTotals.bind(this);
			this._checkOpen = this._checkOpen.bind(this);
			this._handleScroll = this._handleScroll.bind(this);
			this._closeMenuAnimation = this._closeMenuAnimation.bind(this);
			this._goToMenuSearch = this._goToMenuSearch.bind(this);
    }

    componentDidMount(){
      setTimeout( () =>{
        this.setState({
          renderHeader:true,
					renderBackgroundCover:true,
        },this._openMenuAnimation());
      }, 200);

    }
    _openMenuAnimation(){
      	InteractionManager.runAfterInteractions(() => {

          Animated.parallel([
            Animated.timing(this.state.restaurantCardTop, {
              toValue: 0,
              duration: 300,
            }),
            Animated.timing(this.state.restaurantViewOpacity, {
              toValue:1,
              duration: 300,
            }),
            Animated.timing(this.state.restaurantCardMargin, {
              toValue:0,
              duration: 300,
            }),
            Animated.timing(this.state.showMenuAnimation, {
              toValue:1,
              duration: 300,
            })
          ]).start()
          setTimeout(()=>{
            this.setState({
              renderHeader:true,
            })
          }, 400);
        })
    }

    _closeMenuAnimation(){
      MenuStore.initMenu();
			this.state.anim.setValue(0);
      this.setState({renderMenuList:false,renderHeader:false,})
      InteractionManager.runAfterInteractions(() => {
        Animated.parallel([
          Animated.timing(this.state.restaurantCardTop, {
            toValue: this.state.top,
            duration: 300,
          }),
          Animated.timing(this.state.restaurantViewOpacity, {
            toValue: 0,
            duration: 300,
          }),
          Animated.timing(this.state.restaurantCardMargin, {
            toValue:7,
            duration: 300,
          }),
          Animated.timing(this.state.showMenuAnimation, {
            toValue:0,
            duration: 300,
          })
        ]).start()
        this.MenuHeader.close();
        setTimeout( ()=> {
          // !important for history reorder
          if(!this.props.closeMenu) {
            this.props.navigator.dismissModal({
                animationType: 'none'
            })
            return
          };
        }, 500);
      })




    }
		_goToMenuSearch(){

      this.props.navigator.push({
        screen: 'CmEatMenuSearch',
        animated: false,
        navigatorStyle: {navBarHidden: true},
        passProps: {
          restaurant:this.state.restaurant,
        },
      });
		}
		_goToCheckout(){
			if(Number(this.state.cartTotals.total)>0){
				if(Number(this.state.cartTotals.total)>=Number(this.state.restaurant.start_amount)){
					if (Util.getWaitingStatus() === true){
					  return;
					}
					Util.toggleWaitingStatus();

          this.props.navigator.push({
            screen: 'CmEatCheckout',
            animated: true,
            navigatorStyle: {navBarHidden: true},
            passProps: {
              restaurant:this.state.restaurant,
            },
          });
				}else{
					Alert.alert(
						'馋猫订餐提醒您',
						'不足'+this.state.restaurant.start_amount+'只能自取哦～',
						[
							{text: Label.getCMLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
							{text: Label.getCMLabel('CONFIRM'), onPress: () => {
									 this.props.navigator.push({
											id: 'Checkout',
											restaurant:this.state.restaurant,
										})
									}
							},
						],
					);
				}

			}
		}
    _handleScroll( e: any) {
			return(
	      Animated.event(
	          [{nativeEvent: {contentOffset: {y: this.state.anim}}}],
            // { useNativeDriver: true }
	        )
	    )

    }

    _renderMenuList(){
      // console.log(this.state)
      if(this.state.renderMenuList){
        return(<MenuList  restaurant={this.state.restaurant}
                          changeCartTotals={this._changeCartTotals}
                          checkOpen={this._checkOpen}
													handleScroll={this._handleScroll}
													closeMenuAnimation = {this._closeMenuAnimation}
													goToMenuSearch = {this._goToMenuSearch}
													showMenuAnimation = {this.state.showMenuAnimation}/>)
      }
    }
    _changeCartTotals(cartTotals){
      this.setState({
        cartTotals:cartTotals
      })
      if(cartTotals.total>0 ){
        this.setState({
          showHeader:true
        })
        Animated.timing(this.state.HV_Top, {
          toValue: 0,
          duration: 200,
        }).start();
      }else if(this.state.showHeader){
        this.setState({
          showHeader:false
        })
        Animated.timing(this.state.HV_Top, {
          toValue: -150,
          duration: 200,
        }).start();
      }
    }
    _checkOpen(open){
      if(open == 1){
        this.setState({
          close:false
        })
      }else{
        this.setState({
          close:true
        })
      }
    }
    _header(){
        if(!this.state.close && this.state.renderHeader){
          const _rightButtonText = '$'+this.state.cartTotals.total+'结账';
          return(
            <Animated.View style={{top:this.state.HV_Top,
                                  position:'absolute',left:0,right:0,
                                }}>
              <Header title={this.state.restaurant.name}
                      goBack={this._closeMenuAnimation}
                      rightButton={this._goToMenuSearch}
                      rightButtonText={Label.getCMLabel('SEARCH')}
                      leftButtonText={'×'}/>

							<TouchableOpacity onPress={this._goToCheckout}
													style={{backgroundColor:"rgba(234,123,33,0.9)",
														width:width,
														height:50,
														position:'absolute',
												    top:headerHeight,
														flexDirection:"row",
														alignItems:"center",
														justifyContent:"center",
													}}>
								<Text style={{color:"#ffffff",
															fontSize:16,
															margin:3,
															fontFamily:'NotoSansCJKsc-Black',}}
											allowFontScaling={false}>
										${this.state.cartTotals.total}
								</Text>
								<View style={{margin:3,
															borderRadius:15,
															borderWidth:1,
															paddingLeft:10,
															paddingRight:10,
															paddingTop:2,
															paddingBottom:2,
															borderColor:"#ffffff"}}>
									<Text  style={{color:"#ffffff",
																 fontSize:13,
																 fontFamily:'NotoSansCJKsc-Black',}}
												 allowFontScaling={false}>
												 {Label.getCMLabel('GO_CHECKOUT')}
									</Text>
								</View>

							</TouchableOpacity>

            </Animated.View>
          )
        }else if(this.state.renderHeader){
          const _rightButtonText = Label.getCMLabel('RESTAURANT_CLOSED');
          return(
            <View style={{position:'absolute',left:0,right:0}}>
              <Header title={Label.getCMLabel('RESTAURANT_CLOSED_LAH')}
                      goBack={this._closeMenuAnimation}
                      leftButtonText={'×'}/>
            </View>
          )
        }

    }
    _renderClose(){
      if(this.state.renderHeader && !this.state.showHeader){
        return(
          <TouchableOpacity style={{paddingTop:0,
                                    paddingLeft:8,
                                    paddingRight:20,
                                    paddingBottom:20,
                                    position:'absolute',
                                    top:marginTop,
                                    left:0,}}
                            onPress={this._closeMenuAnimation}>
            <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
              <Text style={{fontSize:25,
														textAlign:"center",
														color:"#ffffff",
														marginTop:-2}}
										allowFontScaling={false}>
                ×
              </Text>
            </View>
          </TouchableOpacity>

        )
      }
    }
    _renderSearch(){
      if(this.state.renderHeader && !this.state.showHeader){
        return(
          <TouchableOpacity style={{paddingTop:0,
                                      paddingRight:20,
                                      paddingBottom:20,
                                      position:'absolute',
                                      top:marginTop,
                                      right:0,}}
                              onPress={this._goToMenuSearch}>
              <Image style={{  height: 40,width:44,}}
                   source = { require('./Image/button_search.png') }/>
          </TouchableOpacity>
        )
      }
    }
		_renderBackgroundCover(){
			if(this.state.renderBackgroundCover){
				return(
					<View style={{position:'absolute',
																 backgroundColor:"#ffffff",
																 left:0,top:this.state.top,right:0,height:254,
															 }}>
					</View>
				)
			}

		}
    render(){
      if(this.state.renderBackgroundCover){
        return(
          <View style={{
                        flex:1,
                        backgroundColor:'rgba(0,0,0,0)'}}>
            <Animated.View style={{position:'absolute',
                                   backgroundColor:"#ffffff",
                                   left:0,top:0,right:0,bottom:0,
                                   opacity:this.state.restaurantViewOpacity
                                 }}>
            </Animated.View>
  					{this._renderBackgroundCover()}
            <Animated.View style={{top:this.state.restaurantCardTop,
                                   marginLeft:this.state.restaurantCardMargin,
                                   marginRight:this.state.restaurantCardMargin,
                                 }}>
              <Background
                   minHeight={0}
                   maxHeight={230}
                   offset={this.state.anim}
                   backgroundImage={{uri:this.props.restaurant.mob_banner}}
                   backgroundShift={0}
                   backgroundColor={"rgba(0,0,0,0)"}>
               </Background>
               <MenuHeader
                  ref={(MenuHeader) => { this.MenuHeader = MenuHeader; }}
                  minHeight={0}
                  maxHeight={230}
                  offset={this.state.anim}
                  restaurant = {this.state.restaurant}
                  py={this.props.py}
                  start_time = {this.props.restaurant.start_time}
                  end_time = {this.props.restaurant.end_time}
                  />
            </Animated.View>
            <View style={{position:'absolute',left:0,top:10,right:0,bottom:0,}}>
              {this._renderMenuList()}
            </View>


            {this._renderClose()}
            {this._renderSearch()}
            {this._header()}

          </View>
        )
      }else{
        return(<View/>)
      }

    }
}


let styles = StyleSheet.create({
  rightButton:{
    position:'absolute',
    top:0,
    right:10,
    height:20,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#363646',
    borderWidth:2,
    borderRadius:8,
    paddingLeft:5,
    paddingRight:5,
  },
  rightButtonText:{
    fontSize:16,
    color:'#363646',
  },
});

module.exports = Menu;
