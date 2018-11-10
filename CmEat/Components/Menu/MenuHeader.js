'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
	InteractionManager,
  View,
	Image,
} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class MenuHeader extends Component {

  constructor(props){
    super();
		this.state = {
			restaurantCardTop:new Animated.Value(200),
			margin:new Animated.Value(0),
			intrOpacity:new Animated.Value(1),
			rrOpacity:new Animated.Value(0),
			height:new Animated.Value(53),
		}

  }
	componentDidMount(){
			InteractionManager.runAfterInteractions(() => {
				Animated.parallel([
					Animated.timing(this.state.margin, {
						toValue: 20,
						duration: 300,
					}),
					Animated.timing(this.state.intrOpacity, {
						toValue: 0,
						duration: 300,
					}),
					Animated.timing(this.state.rrOpacity, {
						toValue: 1,
						delay:100,
						duration: 200,
					}),
					Animated.timing(this.state.height, {
						toValue: 200,
						duration: 300,
					}),
				]).start()
			})
	}
	close(){
		InteractionManager.runAfterInteractions(() => {
			Animated.parallel([
				Animated.timing(this.state.margin, {
					toValue: 0,
					delay:100,
					duration: 200,
				}),
				Animated.timing(this.state.intrOpacity, {
					toValue: 1,
					duration: 300,
				}),
				Animated.timing(this.state.rrOpacity, {
					toValue: 0,
					duration: 300,
				}),
				Animated.timing(this.state.height, {
					toValue: 53,
					delay:100,
					duration: 200,
				}),
			]).start()
		})
	}
	_renderStartMount(){
		if(Number(this.props.restaurant.start_amount)!=0){
			return(
				<Text style={{textAlign:'center',
															 marginTop:7,
															 fontSize:13,
															 color:'#3a3b47',
															 fontFamily:'FZZhunYuan-M02S'}}
							 allowFontScaling={false}>
						最低起送价: {this.props.restaurant.start_amount}
				</Text>
			)
		}else{
			<Text style={{marginBottom:15,}}
						allowFontScaling={false}/>
		}
	}

  render(){
		const translateY = this.props.offset.interpolate({
      inputRange: [-400, 350],
      outputRange: [600, -150],
      extrapolate: 'clamp',
    });
		const _discountInfo = () => {
		  let _discountInfo = [];
		  if (this.props.restaurant.discount_message && this.props.restaurant.discount_message.length > 0) {
		    _discountInfo.push(
		      <View key={'discount_message'}
		            style={{flexDirection: 'row',
		                    marginTop: 3,
		                    marginHorizontal: 50,
		                    justifyContent: 'center'}}>
		        <Image style={{width:23,height:14,alignSelf: 'flex-start'}}
		               source={require('./Image/icon_coupon_small.png')}/>
		             <Text style={{textAlign:'left',
		                      color:'#40a2e7',
		                      lineHeight: 16,
		                      marginLeft: 10,
		                      fontFamily:'FZZhunYuan-M02S'}}
		              allowFontScaling={false}>
		          {this.props.restaurant.discount_message}
		        </Text>
		      </View>
		    );
		  }
		  return _discountInfo;
		}
    return(
			<Animated.View style={{backgroundColor:'#ffffff',
										padding:8,
										borderColor:"#e2e2e4",
										shadowColor: "#e2e2e4",
										shadowOpacity: 1,
										shadowOffset: {
										 height: 2,
										 width: 2
									 },
										borderBottomWidth: StyleSheet.hairlineWidth,
										borderLeftWidth:StyleSheet.hairlineWidth,
										borderRightWidth:StyleSheet.hairlineWidth,
										transform: [{translateY}],
										marginLeft:this.state.margin,
										marginRight:this.state.margin,
										maxHeight:this.state.height,
										paddingBottom:23,
									}}>
				<Animated.View style={{opacity:this.state.intrOpacity}}>
					<Text style={{color:'#363646',
												fontSize:15,
												fontWeight:'500',
												fontFamily:'FZZongYi-M05S',}}
								allowFontScaling={false}>
							{this.props.restaurant.name}
					</Text>
					<View style={{flexDirection:"row"}}>
						<View style={{flex:1,}}>
							<Text style={{color:'#ababb0',
														fontSize:12,
														fontWeight:'200',
														marginTop:5,
														fontFamily:'FZZhunYuan-M02S'}}
										allowFontScaling={false}>
									{this.props.restaurant.desc}
							</Text>
						</View>
					</View>
				</Animated.View>
				<Animated.View style={{opacity:this.state.rrOpacity,marginTop:-25,}}>
					<Text style={{color:'#363646',
												fontSize:25,
												fontWeight:'500',
												fontFamily:'FZZongYi-M05S',
												textAlign:'center',}}
								allowFontScaling={false}>
							{this.props.restaurant.name}
					</Text>
					<Text style={{color:'#ababb0',
												fontSize:13,
												fontWeight:'400',
												fontFamily:'FZZhunYuan-M02S',
												marginTop:5,
												textAlign:'center',}}
								allowFontScaling={false}>
						{this.props.restaurant.desc}
					</Text>
					{this._renderStartMount()}
					<Text style={{textAlign:'center',
												color:'#84828d',
												fontFamily:'FZZhunYuan-M02S'}}
								allowFontScaling={false}>
						{this.props.start_time} - {this.props.end_time}
					</Text>
					{_discountInfo()}
				</Animated.View>

			</Animated.View>
    )
  }
}
