'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
	ListView,
	StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
	Text,
  View,
} from 'react-native';

import Header from '../General/Header';
import SecondMenuAction from '../../Actions/SecondMenuAction';
import SecondMenuStore from '../../Stores/SecondMenuStore';
import CheckoutAction from '../../Actions/CheckoutAction';
import OrderActions from '../../Actions/OrderAction';
import CMLabel from '../../Constants/AppLabel';
// import SboxHeader from '../../App/Components/General/SboxHeader';

// const Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;

let viewMarginTop;
let acceptButtonHeight;
if(height == 812){
  viewMarginTop = 27;
	acceptButtonHeight = 80;
}else{
  viewMarginTop = 17;
	acceptButtonHeight = 40;
}
const navigationHeight = viewHeight * (210/2208) - viewMarginTop;

export default class SecondMenu extends Component {
  constructor(props) {
    super(props);
    this.state = SecondMenuStore.getState();
    this._renderToppingGroupList = this._renderToppingGroupList.bind(this);
    this._renderToppingGroup = this._renderToppingGroup.bind(this);
		this._handleToppingOnPress = this._handleToppingOnPress.bind(this);
    this._onChange = this._onChange.bind(this);
		this._deleteHandler = this._deleteHandler.bind(this);
		this._decreaseToppingQuantity = this._decreaseToppingQuantity.bind(this);
		this._updateProductQty = this._updateProductQty.bind(this);
		this._goBack = this._goBack.bind(this);
		this._confirm = this._confirm.bind(this);
  }


  componentDidMount() {
    SecondMenuStore.addChangeListener(this._onChange);
	}
  componentWillUnmount() {
    SecondMenuStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(SecondMenuStore.getState());
  }

 	_handleToppingOnPress({tp_id,tpg_id}) {
		 SecondMenuAction.updateTopping({tp_id,tpg_id});
	}
	_deleteHandler() {
		OrderActions.addItem(Object.assign({},
																			 this.props.dish,
																			 {tpgs: this.state.toppingGroupList, qty: 0, price: this.state.total}));
		this.props.saveModificationCallback();
		this.props.navigator.dismissModal({
			animationType: 'slide-down'
		});
	}
	_decreaseToppingQuantity({tp_id,tpg_id}) {
		SecondMenuAction.decreaseToppingQuantity({tp_id,tpg_id});
	}

	_updateProductQty(difference) {
		SecondMenuAction.updateProductQty(difference);
	}

	_goBack() {
		this.props.navigator.dismissModal({
			animationType: 'slide-down'
		});
	}

	_confirm() {
		for (let tpg_id in this.state.toppingGroupList) {
			if (this.state.toppingGroupList[tpg_id].tpg_min_limit > 0) {
				let counter = 0;
				for (let tp_id in this.state.toppingGroupList[tpg_id].tps) {
					if (this.state.toppingGroupList[tpg_id].tps[tp_id].quantity > 0) {
						counter = counter + parseInt(this.state.toppingGroupList[tpg_id].tps[tp_id].quantity);
					}
				}
				if (counter < this.state.toppingGroupList[tpg_id].tpg_min_limit) {
					alert("请选择必填选项");
					return;
				}
			}
		}
		OrderActions.addItem(Object.assign({},
																			 this.props.dish,
																			 {tpgs: this.state.toppingGroupList, qty: this.state.qty, price: this.state.total}));
		if (this.props.action === 'modify') {
			this.props.saveModificationCallback();
		}
		this.props.navigator.dismissModal({
			animationType: 'slide-down'
		});
	}

  _renderLeftButton() {
    if (this.props.leftButtonText == 'x' || true) {
      return (
        <TouchableOpacity onPress={this._goBack}>
            <View style={{width:30,
                          height:30,
                          marginLeft:10,
                          borderRadius:15,
                          backgroundColor:"rgba(0,0,0,0.4)"}}>
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
    }else if(this.props.leftButtonText == '<') {
      return (
        <TouchableOpacity onPress={this.props.goBack}>
            <Image style={{marginLeft:10,
                           height:height*0.032,
                           width:height*0.032,}}
                    source={require('../../../App/Components/General/Image/icon-back.png')}>

            </Image>
        </TouchableOpacity>
      )
    }
  }

	_renderRightButton() {
		if (this.props.action === 'modify') {
			return (
				<TouchableOpacity activeOpacity={0.4}
					                onPress={() => this._deleteHandler()}>
						<Text style={{textAlign:'center',
													fontSize:15,
													fontWeight: '300',
													fontFamily:'FZZhunYuan-M02S'}}
									 numberOfLines={1}
									 allowFontScaling={false}>
													删除
						</Text>
				</TouchableOpacity>
			)
		}else {
			return;
		}
	}
  // <Text style={{color: '#a5a5a5', fontSize: 16}}>[{section.title.split('[')[1]}</Text>

	_renderToppingGroup(toppingGroup) {
		let _toppingGroup = [];
		const {tpg_id,tps} = toppingGroup;
		for (let key in tps) {
			let color = 'black';
			if (tps[key].quantity && tps[key].quantity > 0) {
				color = '#ea7b21';
			}
			if (toppingGroup.tpg_max_limit != 1 && tps[key].quantity && tps[key].quantity > 0) {
				_toppingGroup.push(
					<View style={{flexDirection: 'row',
												marginLeft: 20,
												marginBottom: 10,
												borderRadius: 5,
												borderWidth: 1,
												borderColor: color}}
								key={key}>
								<TouchableOpacity
											style={{paddingTop: 5,
															paddingBottom: 5,
															paddingLeft: 10,
															paddingRight: 5,
															flexDirection: 'row'}}
											activeOpacity={0.4}
											onPress={this._handleToppingOnPress.bind(null,{tpg_id, 'tp_id': key})}>
											<Text style={{fontSize: 15,
																		marginRight: 8,
																		fontFamily:'FZZhunYuan-M02S'}}
														allowFontScaling={false}>
													{tps[key].tp_name} ${tps[key].tp_price}
											</Text>
											<Text style={{fontSize: 15,
																		textAlign: 'center',
																		overflow: 'hidden',
																		width: 18,
																		backgroundColor: '#D4D4D4',
																		borderRadius: 9,
																		fontFamily:'FZZhunYuan-M02S'}}
														allowFontScaling={false}>
													{tps[key].quantity}
											</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{paddingTop: 2 , paddingBottom: 2, paddingRight: 5}}
																	onPress={this._decreaseToppingQuantity.bind(null,{'tpg_id':toppingGroup.tpg_id, 'tp_id': key})}>
									<View style={{width:30,
																paddingTop: 2,
																paddingBottom: 2,
																alignSelf:'center',
																alignItems:'center',
																justifyContent:'center',
																borderColor:'#ff8b00',
																borderWidth:1,
																borderRadius:6,}}>
										<Text style={{fontSize: 15,
																	color:'#ff8b00',
																	fontFamily:'FZZhunYuan-M02S'}}
													allowFontScaling={false}> - </Text>
									</View>
								</TouchableOpacity>

					</View>
				)
			} else {
				_toppingGroup.push(
					<View style={{flexDirection: 'row',
												marginLeft: 20,
												marginBottom: 10,
												borderRadius: 5,
												borderWidth: 1,
												borderColor: color}}
								key={key}>
								<TouchableOpacity
											style={{paddingTop: 5,
															paddingBottom: 5,
															paddingLeft: 10,
															paddingRight: 5,
															flexDirection: 'row'}}
											activeOpacity={0.4}
											onPress={this._handleToppingOnPress.bind(null,{tpg_id, 'tp_id': key})}>
											<Text style={{fontSize: 15,
																		marginRight: 8,
																		fontFamily:'FZZhunYuan-M02S'}}
														allowFontScaling={false}>
													{tps[key].tp_name} ${tps[key].tp_price}
											</Text>
								</TouchableOpacity>
					</View>
				)
			}
		}
		return _toppingGroup;

  }

  _renderToppingGroupList(toppingGroupList) {
		let _toppingGroupList = [];
		let optionReminder = "";
		for (let key in toppingGroupList) {
			if (toppingGroupList[key].tpg_max_limit === toppingGroupList[key].tpg_min_limit) {
				optionReminder = "[必选" + toppingGroupList[key].tpg_max_limit + "项]"
			}
			else if (toppingGroupList[key].tpg_min_limit) {
				optionReminder = "[必选" + toppingGroupList[key].tpg_min_limit + "~" + toppingGroupList[key].tpg_max_limit + "项]";
			}
			else {
				optionReminder = "[可选" + toppingGroupList[key].tpg_min_limit + "~" + toppingGroupList[key].tpg_max_limit + "项]";
			}
			_toppingGroupList.push(
				<View key={key}>
						<View style={{flexDirection:'row',
													alignItems: 'center',
													backgroundColor: '#f5f5f5',
													paddingTop: 5,
													paddingBottom: 5}}>
								<Text style={{marginLeft: 20,
															fontSize: 16,
															fontFamily:'FZZhunYuan-M02S'}}
											allowFontScaling={false}>
											{toppingGroupList[key].tpg_name}
								</Text>
								<Text style={{fontSize: 16,
															color: '#a5a5a5',
															fontFamily:'FZZhunYuan-M02S'}}
											allowFontScaling={false}>
											{optionReminder}
								</Text>
						</View>
						<View style={{flexDirection: 'row',
													flexWrap: 'wrap',
													paddingTop: 10}}>
								{this._renderToppingGroup(toppingGroupList[key])}
						</View>
				</View>
			)
		}
		return _toppingGroupList;
  }

	_renderQtyButton() {
		return (
			<View style={{flexDirection: 'row',
										marginTop: 15,
										marginLeft: 20,
										marginRight: 20,
										alignItems: 'center'}}>
					<Text style={{flex: 0.3, fontSize: 16, fontFamily:'FZZhunYuan-M02S', color: '#a5a5a5'}}
								allowFontScaling={false}>
					{CMLabel.getCNLabel('DISH_QUANTITY')}:
					</Text>
					<View style={{flex: 0.4}}>
							<View style={{flexDirection: 'row',
														width: 100,
														justifyContent: 'space-between',
														alignSelf: 'center',
														borderRadius: 6,
														borderWidth: 1,
														paddingTop: 3,
														paddingBottom: 3,
														borderColor: '#ea7b21'}}>
									<TouchableOpacity style={{}}
																		onPress={this._updateProductQty.bind(null,-1)}
																		activeOpacity={0.4}>
											<Text style={{fontSize: 15,
																		paddingTop: 5,
																		paddingBottom: 5,
																		width: 30,
																		textAlign: 'center',
																		fontFamily:'FZZhunYuan-M02S'}}
														allowFontScaling={false}>
														-
											</Text>
									</TouchableOpacity>
									<Text style={{paddingTop: 5,
																paddingBottom: 5,
																fontFamily:'FZZhunYuan-M02S'}}
												allowFontScaling={false}>
											{this.state.qty}
									</Text>
									<TouchableOpacity style={{}}
																		onPress={this._updateProductQty.bind(null,1)}
																		activeOpacity={0.4}>
											<Text style={{fontSize: 15,
																		paddingTop: 5,
																		paddingBottom: 5,
																		width: 30,
																		textAlign: 'center',
																		fontFamily:'FZZhunYuan-M02S'}}
														allowFontScaling={false}>
														+
											</Text>
									</TouchableOpacity>
							</View>
					</View>
					<View style={{flex: 0.3}}>
					</View>
			</View>
		)
	}

  _renderConfirmBtn() {
		let confirmMsg = ''
		if (this.props.action === 'add') {
			confirmMsg = "添加" + this.state.qty + "份";
		}
		else {
			confirmMsg = "确认修改";
		}
    return (
      <TouchableOpacity
				  onPress={() => this._confirm()}
				  activeOpacity={0.4}
				  style={{justifyContent: 'center',
                  backgroundColor: '#ea7b21',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: acceptButtonHeight,
                  flexDirection: 'row'}}>
          <View style={{flex: 1, marginLeft: 20}}></View>
          <Text style={{flex: 1,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '700',
												fontFamily:'FZZhunYuan-M02S',
												alignSelf: 'center'}}
								allowFontScaling={false}>
              {confirmMsg}
          </Text>
          <Text style={{flex: 1,
                        textAlign: 'right',
                        marginRight: 20,
                        color: 'white',
                        fontSize: 16,
												fontFamily:'FZZhunYuan-M02S',
												alignSelf: 'center'}}
								allowFontScaling={false}>
              ${(this.state.total * this.state.qty).toFixed(2)}
          </Text>
      </TouchableOpacity>
    )
  }
	// <View style={[styles.navigation, {height: navigationHeight}]}>
	// 		<View style={styles.back}>
	// 				{this._renderLeftButton()}
	// 		</View>
	// 		<View style={styles.title}>
	// 				<Text style={{textAlign:'center',
	// 											fontSize:20,
	// 											fontWeight: '700',
	// 											fontFamily:'FZZhunYuan-M02S'}}
	// 							 numberOfLines={1}>
	// 											{this.props.dish.ds_name}
	// 				</Text>
	// 		</View>
	// 		<View style={styles.right}>
	// 				{this._renderRightButton()}
	// 		</View>
	// </View>
  render() {
		let shouldRenderRightButton;
		if(this.props.action == 'modify') {
			shouldRenderRightButton = this._deleteHandler;
		}
    return(
      <View style={styles.viewController}>
					<Header title={this.props.dish.ds_name}
									goBack={this._goBack}
									leftButtonText={'x'}
									rightButtonText={'删除'}
									rightButton={shouldRenderRightButton}
									/>
          <ScrollView style={{paddingBottom: 50}}>
              {this._renderToppingGroupList(this.state.toppingGroupList)}
              {this._renderQtyButton()}
          </ScrollView>
          {this._renderConfirmBtn()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  navigation: {
    flexDirection:'row',
    backgroundColor: 'white',
    marginTop: viewMarginTop,
    borderBottomWidth: 1,
    borderColor: "#D5D5D5",
  },
  back: {
    flex: 0.2,
    justifyContent:'center',
    backgroundColor: 'white',
  },
  title: {
    flex:0.6,
    backgroundColor: 'white',
    justifyContent:'center',

  },
  right: {
    flex: 0.2,
    justifyContent:'center',
    backgroundColor: 'white',
  },
	decreaseButton:{
    width:50,
    height:40,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#ff8b00',
    borderWidth:2,
    borderRadius:8,
  },
  decreaseIcon:{
    fontSize:20,
    color:'#ff8b00',
  }
});
