'use strict'
import React, {
	Component,
} from 'react';
import {
	Animated,
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
  View,
	ImageBackground,
	Image
} from 'react-native';
import Label from '../../../../App/Constants/AppLabel';
import HomeStore from '../../../Stores/HomeStore';
import RestaurantAction from '../../../Actions/RestaurantAction';
const {width,height} = Dimensions.get('window');
const imageHeight = (width-30)/(3*1.157);
const defaultTagViewHeight = (imageHeight+6) * 3 + 6;

export default class SearchByTag extends Component{
	constructor(props){
		super(props);
		this.state={
			height: new Animated.Value(defaultTagViewHeight),
			tags:props.tags,
			extendViewText: Label.getCMLabel('MORE_TYPE'),
			showingMoreCategories: false
		}
		this._extendViewOnClick = this._extendViewOnClick.bind(this);
		this._extendView = this._extendView.bind(this);
	}

	componentDidMount(){
		this._adjustArrayLength();
	}
	_adjustArrayLength(){
		let num = this.state.tags.length % 3;
		let row =  Math.ceil(this.state.tags.length/3);
		let adjustArray = this.state.tags;
		if(num != 0){
			for(let i = 0; i < 3 - num; i++){
				adjustArray.push({})
			}

		}
		this.setState({
			fullTagsViewHeight:(imageHeight+6)* Math.ceil(this.state.tags.length/3),
		})
	}
	_pressTag(tag){
		this.props.onPressTag(tag);
		RestaurantAction.getRestaurantByTag(tag.cid);
	}
	_extendViewOnClick() {
		if (this.state.showingMoreCategories) {
			this.props.scrollToTop();
		}
		setTimeout(() => {
			const animationDuration = 500;
			Animated.timing(this.state.height, {
					toValue: this.state.showingMoreCategories ? defaultTagViewHeight : this.state.fullTagsViewHeight,
					duration: animationDuration
			}).start();
			this.setState({extendViewText: this.state.showingMoreCategories  ? Label.getCMLabel('MORE_TYPE') : Label.getCMLabel('RETRACT'),
										 showingMoreCategories: !this.state.showingMoreCategories});
		}, 300);
	}
	_extendView(){
		return(
			<View style={{width:width,
										height:42,
										backgroundColor:'white'}}>
				<TouchableOpacity
					activeOpacity={0.4}
					onPress={this._extendViewOnClick}
					style={{flex: 1,
									flexDirection:'row' ,
									justifyContent:'center',
									alignItems:'center',}}>
					<Text style={{color:'#ff8b00',fontFamily:"NotoSans-Regular"}}
								allowFontScaling={false}>{this.state.extendViewText}</Text>
					<Image source={this.state.showingMoreCategories ? require('../Image/up-arrow.png') : require('../Image/down-arrow.png')}
						style={{marginLeft:5,width:10,height:10}}/>
				</TouchableOpacity>
			</View>
		)
	}
    _renderHeader() {
		return(
			<View style={{padding:10,paddingTop:10,paddingBottom:0}}>
				<Text style={{fontSize:18,fontFamily:"NotoSans-Regular"}}
							allowFontScaling={false}>
					{Label.getCMLabel('RES_TAG')}
				</Text>
			</View>
		)
	}
    _renderTag(tag, index) {
		if(tag.name){
			return(
				<TouchableOpacity
					activeOpacity={0.4}
					style={styles.singleTagView}
					key={index}
					onPress={()=>this._pressTag(tag)}>
					<ImageBackground
						source={{uri:tag.mob_banner}}
						style={styles.imageStyle}
						imageStyle={{ borderRadius: 5}}>
						<Text style={{backgroundColor:"rgba(0,0,0,0)",
													color:"#ffffff",
										fontSize:18,
										fontWeight: '600',
										fontFamily:'NotoSans-Regular'}}
									allowFontScaling={false}>
							{tag.name}
						</Text>
					</ImageBackground>
					<View style={[styles.imageStyle,{position:'absolute'}]}></View>
				</TouchableOpacity>
			)
		}else{
			return(
				<View key={index} style={styles.singleTagView}>

				</View>
			)
		}

	}
    _renderTags() {

		let currentHeight = this.state.height;
		return(
			<Animated.View style={{height:currentHeight,flexWrap:'wrap',flexDirection:'row',justifyContent:'center'}}>
				{
					this.state.tags.map((tag, index)=>{return this._renderTag(tag, index)})
				}
			</Animated.View>


		)
    }
    render(){
        return(
            <View>
				{this._renderHeader()}
				{this._renderTags()}
				{this._extendView()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
	singleTagView:{
		marginHorizontal:3,
		marginTop:6,
		width:(width-30)/3,
		height:imageHeight,
	},
	imageStyle:{
		borderRadius:5,
		width:(width-30)/3,
		height:imageHeight,
		alignItems:'center',
		justifyContent:'center',
	}
})
