'use strict';
import React, {
	Component,
} from 'react';
import {
	Alert,
	Animated,
	Dimensions,
	Image,
	KeyboardAvoidingView,
	ListView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
  	View,
	FlatList,
	Platform,
	ScrollView
} from 'react-native';
import {
    filter,
} from 'lodash';

import RestaurantCard from './RestaurantCard';
const {width,height} = Dimensions.get('window');
const searchViewMarginHorizontal = 30;
const iconSearchInputSize = 35;

export default class CmRestaurantSearch extends Component {

    constructor(props){
        super(props);
            this.state = {
				searchText:'',
				restaurant:props.restaurant,
				filteredRestaurant:[],
				restaurantList: [],
				length:5,
            }
		this.setState = this.setState.bind(this);
		this._setSearchText = this._setSearchText.bind(this);
		this._renderRestaurant = this._renderRestaurant.bind(this);
		this._keyExtractor = this._keyExtractor.bind(this);
    }
	componentDidMount(){
	}
	componentWillUnmount() {
    }
    _goBack(){
        this.props.navigator.pop({animated: false,});
	}
	_filterNotes(searchText, restaurants) {

		let text = searchText.toLowerCase();
		return filter(restaurants, (rest) => {
			if(rest.name){
				let lowerCaseName = rest.name.toLowerCase();
				return lowerCaseName.search(text) !== -1;
			}
		});

	}
    _setSearchText(text){
		if(text){
			let filteredData = this._filterNotes(text, this.state.restaurant);
			this.setState({
				 searchText: text,
				 filteredRestaurant:filteredData,
				 restaurantList: filteredData.slice(0, 5)
			 });
		}else{
			this.setState({
				 searchText:'',
				 filteredRestaurant:[],
				 restaurantList:[],
			 });
		}
    }
    _cleanInput(){
		this.setState({
			searchText:''
		},()=>this.refs.searchInput.clear());
	}
	_renderSearchInput(){
		return(
			<View style={styles.header}>
				<View style={styles.searchView}>
						<Image
							source={require('./Image/icon_search_input.png')}
							style={{
								height:iconSearchInputSize*0.5,
								width:iconSearchInputSize*0.45,
								marginLeft:10,
							}}
						/>
						<TextInput
							ref={'searchInput'}
							style={styles.searchInput}
							selectionColor={'#ea7b21'}
							keyboardType = {'default'}
							autoCorrect= { false}
							autoFocus={true}
							returnKeyType={'next'}
							onChangeText={this._setSearchText}
							underlineColorAndroid={"rgba(0,0,0,0)"}
						/>
						<TouchableOpacity onPress={()=>this._cleanInput()}>
							<Image
								source={require('./Image/cancel.png')}
								style={{
									height:15,
									width:15,
									marginRight:10}}
							/>
						</TouchableOpacity>
				</View>
				<TouchableOpacity
						style={{flex:0.1}}
						onPress={()=>this._goBack()}>
					<Text style={{fontSize:40}}>×</Text>
				</TouchableOpacity>
			</View>
		)
	}
	_renderRestaurant({item}) {
		const restaurant = item;
				if(restaurant){
					return <RestaurantCard restaurant={restaurant}
										navigator={this.props.navigator}/>
				}
	  }
	_keyExtractor = (item, index) => item.area + item.rid;
	_renderRestaurants() {
		return(
			<FlatList
  			style={styles.scrollView}
  			key={this.props.index}
  			data={this.state.restaurantList}
        keyboardDismissMode={"on-drag"}
        keyboardShouldPersistTaps={"always"}
  			renderItem={(res) => this._renderRestaurant(res)}
  			keyExtractor={this._keyExtractor}
  			removeClippedSubviews={true}
  			initialNumToRender={1}
  			onEndReachedThreshold={0.5}
  			extraData={this.state.restaurantList}
  			onEndReached = {({distanceFromEnd})=>{

  				this.setState({
  				  length: this.state.length + 5,
  				  restaurantList:this.state.filteredRestaurant.slice(0, this.state.length)
  				})
			  }}

		/>
		)
	  }
	render(){
		return(
			<KeyboardAvoidingView
						style={{flex:1,backgroundColor:"#ffffff"}}
						behavior={Platform.OS === 'ios'?"padding":null}
						>
					{this._renderSearchInput()}

					{this._renderRestaurants()}
			</KeyboardAvoidingView>

		)
	}
}


const styles = StyleSheet.create({
	input:{
		fontSize: 18,
		borderRadius: 8,
		color: '#ea7b21',
		height:40,
		width:width,
		marginTop:5,
	},
	header:{
		width:width,
		height:60,
		flexDirection:'row',
		alignItems:'center',
		marginTop:Platform.OS === 'ios'? 20 : 0,
	},
	searchView:{
		borderRadius:30,
		borderWidth:1,
		borderColor:'#e2e2e2',
		marginTop:10,
		marginHorizontal:10,
		flex:0.9,
		backgroundColor:'#f4f4f4',
		flexDirection:'row',
		alignItems:'center',
		width: width-searchViewMarginHorizontal*2,
	},
	searchInput:{
		fontSize: 18,
		height:40,
		marginHorizontal:5,
		width:width-searchViewMarginHorizontal*2-20-15-iconSearchInputSize*0.45-10,

	},

});
