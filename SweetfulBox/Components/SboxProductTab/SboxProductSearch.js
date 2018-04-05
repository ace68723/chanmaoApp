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
import Settings from '../../Config/Setting';
import SboxProductView from './SboxProductView';
import SboxProductAction from '../../Actions/SboxProductAction';

import SboxProductTabStore from '../../Stores/SboxProductTabStore';
import SboxProductTabAction from '../../Actions/SboxProductTabAction';
const {width,height} = Dimensions.get('window');
const searchViewMarginHorizontal = 30;
const iconSearchInputSize = 35;


export default class SboxProductSearch extends Component {

    constructor(props){
      super(props);
			this.state = {
				searchText:'',
				prod_list:props.productList,
				filteredProduct:[],
				productList: [],
			  }
			this._setSearchText = this._setSearchText.bind(this);
			this._keyExtractor = this._keyExtractor.bind(this);
			this._goToSboxProductDetial = this._goToSboxProductDetial.bind(this);
			this._cleanInput = this._cleanInput.bind(this);
			this._renderProduct =this._renderProduct.bind(this);
			this._renderSearchInput = this._renderSearchInput.bind(this);
    }
		componentDidMount(){
		}
		componentWillUnmount() {
		}
		_goBack(){
				this.props.navigator.pop({animated: false,});
		}
		_filterNotes(searchText, prods) {

			let text = searchText.toLowerCase();
			let prodsData =  filter(prods, (prod) => {
				if(prod.name){
					let lowerCaseName = prod.name.toLowerCase();
					return lowerCaseName.search(text) !== -1;
				}
			});
			if(prodsData.length % 3 == 1) {
				prodsData.push({
					"score": 29999.97,
					"type": "empty"
				});
				prodsData.push({
					"score": 29999.97,
					"type": "empty"
				});
			} else if (prodsData.length % 3 == 2) {
				prodsData.push({
					"score": 29999.97,
					"type": "empty"
				});
			}
			return prodsData;

		}
		_setSearchText(text){
			if(text){
				let filteredData = this._filterNotes(text, this.state.prod_list);
				this.setState({
					searchText: text,
					filteredProduct:filteredData,
					productList: filteredData
				});
			}else{
				this.setState({
					searchText:'',
					filteredProduct:[],
					productList:[],
				});
			}
			}
			_cleanInput(){
			this.setState({
				searchText:''
			},()=>this.refs.searchInput.clear());
		}
		_goToSboxProductDetial(item) {
			if (item.spu_status === 1 || item.sku_status === 1) return;
			const {spu_id, image} = item;
			if (item.sku_id) {SboxProductAction.getSingleProduct(spu_id,item.sku_id)}
			else {SboxProductAction.getSingleProduct(spu_id,-1)}
			setTimeout( () => {
				this.props.navigator.push({
				screen: 'SboxProductDetial',
				navigatorStyle: {navBarHidden: true},
				passProps:{spu_image:image},
				})
			}, 150);
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
						<Text style={{fontSize:40}} allowFontScaling={false}>×</Text>
					</TouchableOpacity>
				</View>
			)
		}
		_renderProduct({item}) {
			if (item.type === "spu" || item.type === "sku"){
				return (
				<TouchableOpacity
				onPress={this._goToSboxProductDetial.bind(null,item)}
				>
				<SboxProductView
						product={item}
					/>
				</TouchableOpacity>
				);

			}
			else if (item.type === "empty") {
				return (
				<View style={{
					flex:1,
					alignItems:'center',
					justifyContent:'center',
				}}>
				</View>
				)
			}
			else if(item.type === "section"){
				return (
				<View style={{
					flex:1,
					alignItems:'center',
					justifyContent:'center',
				}}>
				<Text style={{
											fontWeight: 'bold',
										}}
							allowFontScaling={false}>{item.section_name}
				</Text>
				</View>
				);
			}else{
				return(
				<View
				style={{
					flex:1,
					alignItems:'center',
					justifyContent:'center',
				}}>
				<View style={{ backgroundColor: '#a5a5a5',
								height: 1,
								width: Settings.getX(258)
								}}>
				</View>
				</View>
				)
			}
		}
		_keyExtractor = (product, index) => product.section_id+'index'+index;
		render(){
			return(
						<FlatList
								keyboardDismissMode = {"on-drag"}
								keyboardShouldPersistTaps = {"always"}
								scrollEventThrottle={1}
								style={this.props.style}
								ListHeaderComponent={this._renderSearchInput()}
								ref={(comp) => this._scrollVew = comp}
								onScroll={this.props.scrollEventBind()}
								data={this.state.filteredProduct}
								renderItem={this._renderProduct}
								keyExtractor={this._keyExtractor}
								getItemLayout={(data, index) => (
									{length: 250, offset: 250 * index, index}
								)}
								stickyHeaderIndices={[0]}
								numColumns={3}
								columnWrapperStyle={{ marginTop: 10,alignSelf:'center' }}
						/>
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
		marginTop:Platform.OS === 'ios'? 0 : 0,
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
