'use strict'
import React, {
	Component,
} from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
  	View,
	ImageBackground,
	Image
} from 'react-native';
import CMLabel from '../../../Constants/AppLabel';
const {width,height} = Dimensions.get('window');
const imageHeight = (width-30)/(3*1.157);
const defaultTagViewHeight = (imageHeight+6) * 3 + 40+6;

export default class SearchByTag extends Component{
	constructor(){
		super();
		this.state={
			height:defaultTagViewHeight,
			tags:[
				{
					name:'北方菜',
				},
				{
					name:'甜品饮料',
				},
				{
					name:'东北菜',
				},
				{
					name:'港式茶餐厅',
				},
				{
					name:'四川菜',
				},
				{
					name:'面食',
				},
				{
					name:'西餐',
				},
			
			],

		}

	}
	componentDidMount(){
		this._adjustArrayLength();
		
	}
	_adjustArrayLength(){
		let num = this.state.tags.length % 3;
		let adjustArray = this.state.tags;
		if(num != 0){
			for(let i = 0; i < 3 - num; i++){
				adjustArray.push({})
			}
			this.setState({
				tags: adjustArray,
				fullTagsViewHeight:(imageHeight+6)* Math.ceil(this.state.tags.length/3)+ 40 + 20,
			})
		}
	}
	_extendView(){
		return(
			<TouchableOpacity 
				onPress={()=>{
					this.setState({height:this.state.height == defaultTagViewHeight  ? this.state.fullTagsViewHeight  : defaultTagViewHeight })
				}}
				style={{width:width, height:40, 
					flexDirection:'row' , 
					position:'absolute', 
					top: this.state.height,
					justifyContent:'center',
					alignItems:'center',
					backgroundColor:'white'}}>
				<Text style={{color:'#ff8b00',fontFamily:"FZZhunYuan-M02S"}}>更多分类</Text>
				<Image source={this.state.height == defaultTagViewHeight? require('../Image/down-arrow.png') : require('../Image/up-arrow.png')}
					style={{marginLeft:5,width:10,height:10}}/>
			</TouchableOpacity>
		)	
	}
    _renderHeader() {	
		return(
			<View style={{padding:10,paddingTop:20,paddingBottom:0}}>
				<Text style={{fontSize:18,fontFamily:"FZZhunYuan-M02S"}}
							allowFontScaling={false}>
					{CMLabel.getCNLabel('RES_TAG')}
				</Text>
			</View>
		)
	}
    _renderTag(tag, index) {
		if(tag.name){
			return(
				<TouchableOpacity style={styles.singleTagView} key={index}>
					<ImageBackground
						source={require('../Image/button_menu_open.png')}
						style={styles.imageStyle}>
						<Text style={{backgroundColor:"rgba(0,0,0,0)",
													color:"#ffffff",
										fontSize:12,
										fontFamily:'FZZongYi-M05S'}}
									allowFontScaling={false}>
							{tag.name}
						</Text>
					</ImageBackground>
					<View style={[styles.imageStyle,{position:'absolute', backgroundColor:'black', opacity:0.8}]}></View>
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
			<View style={{height:currentHeight,flexWrap:'wrap',flexDirection:'row',justifyContent:'center'}}>
				{
					this.state.tags.map((tag, index)=>{return this._renderTag(tag, index)})
				}
			</View>
				
			
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
