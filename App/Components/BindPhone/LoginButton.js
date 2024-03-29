'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class LoginButton extends Component {
  constructor(){
    super()
		this.state = {
			width:new Animated.Value(width*0.6876),
			height:new Animated.Value(height*0.0765),
			textOpacity:new Animated.Value(1),
			loadingOpacity:new Animated.Value(0),
			showLoading:false,
		}
  }

	_renderBindButton(){
		if(!this.props.ib_showLoading){
			setTimeout(()=>{
				Animated.parallel([
						Animated.timing(this.state.width, {
								toValue: width*0.6876,
								duration: 300,
						}),
						Animated.timing(this.state.textOpacity, {
								toValue: 1,
								duration: 300
						}),
				]).start()
			}, 300);
			return(
				<TouchableWithoutFeedback
						onPress = { this.props.if_handleBindPhone }>
							<Animated.View style={[styles.button,
																		{width:this.state.width,
																		 height:this.state.height}]}
														 >
							 <Animated.Text style={[styles.loginText,{opacity:this.state.textOpacity}]}>
									Bind
							 </Animated.Text>
							</Animated.View>
					</TouchableWithoutFeedback>

			)
		}else{
			setTimeout(()=>{
				Animated.parallel([
						Animated.timing(this.state.width, {
								toValue: height*0.0765,
								duration: 300,
						}),
						Animated.timing(this.state.textOpacity, {
								toValue: 0,
								duration: 300
						}),
						Animated.timing(this.state.loadingOpacity, {
								toValue: 1,
								delay:300,
								duration: 300
						})
				]).start()
			}, 10);

			return(
				<Animated.View style={[styles.button,
															{width:this.state.width,
															 height:this.state.height}]}
											 >
				 <Animated.Image source={require('./Image/loading.gif')}
 												style={{
 												 opacity:this.state.loadingOpacity,
 												 width:height*0.0765,
 												 height:height*0.0765}} />
				</Animated.View>

			)
		}
	}
  render(){
    return(
      <View style={styles.container} ref={"LOGIN"}>
						{this._renderBindButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
  },
  loginText: {
    fontSize: 22,
    color: '#fff',
    backgroundColor:'rgba(0,0,0,0)',
    marginTop:-3,
  },
  button:{
		backgroundColor:"#ea7b21",
		borderRadius:height*0.0765,
    alignItems:'center',
    justifyContent:'center',
  },
	// loading:{
	// 	backgroundColor:"#ffffff",
	// 	width:height*0.0765-10,
	// 	height:height*0.0765-10,
	// 	borderRadius:height*0.0765-10,
	// 	alignItems:'center',
  //   justifyContent:'center',
	// },
	// loadingCover:{
	// 	backgroundColor:"#ea7b21",
	// 	width:height*0.0765-15,
	// 	height:height*0.0765-15,
	// 	borderRadius:height*0.0765-15,
	// },
  registerView:{
    flexDirection:"row",
    width:width*0.6576,
		height:50,
    marginTop:5,
    backgroundColor:"rgba(0,0,0,0)"
  },
  registerText:{
    fontSize:15,
    fontWeight:"500",
    color:"#ffffff",
    marginBottom:5
  },
  forgotText:{
    flex:1,
    fontSize:15,
    fontWeight:"500",
    color:"#ffffff",
    marginBottom:5,
    textAlign:"right"
  },
});
