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

import SecondMenuAction from './SecondMenuAction';
import SecondMenuStore from './SecondMenuStore';
import OrderActions from '../../Actions/OrderAction';
// import SboxHeader from '../../App/Components/General/SboxHeader';

// const Icon = createIconSetFromIcoMoon(icoMoonConfig);
const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;

let viewMarginTop;
if(height == 812){
  viewMarginTop = 27;
}else{
  viewMarginTop = 17;
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
    this._optionsSelectHandler = this._optionsSelectHandler.bind(this);
		this._deleteHandler = this._deleteHandler.bind(this);
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

  _optionsSelectHandler(option) {
		console.log(option)
		// var counter = 0;
    // for (let option of options) {
		// 	if (option.selected == true) {
		// 		counter ++;
		// 	}
    // }
		// if (counter >= limit && limit != 1 && tar_option.selected == false) {
		// 	return;
		// }
		// else {
		// 	var sectionList = this.state.optionsList;
		// 	for (let option of options) {
	  //     if (tar_option.tp_name == option.tp_name) {
	  //       if (option.selected == true) {
	  //         option.selected = false;
	  //       }else {
	  //         option.selected = true;
	  //       }
	  //     }else if (limit == 1) {
		// 			option.selected = false;
		// 		}
	  //   }
		// 	sectionList[index].options = options;
	  //   SecondMenuAction.updateOptionsList(sectionList);
		// }
  }
 	_handleToppingOnPress({topping,tpg_id}) {
		 SecondMenuAction.updateTopping({topping,tpg_id});
	}
	_deleteHandler() {

	}

	_goBack() {
		this.props.navigator.dismissModal({
			animationType: 'slide-down'
		});
	}

	_confirm() {
		OrderActions.addItem(this.props.dish);
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
                <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
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
													fontWeight: '300'}}
									 numberOfLines={1}>
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
		toppingGroup.tps.forEach((topping,index)=>{
			const tpg_id = toppingGroup.tpg_id;
			var color = "black";
      if (topping.selected) {
        color = '#ea7b21';
      }
      _toppingGroup.push(
				<TouchableOpacity
					    key={index}
	            activeOpacity={0.4}
							onPress={this._handleToppingOnPress.bind(null,{topping,tpg_id})}
	            >
	            <Text style={{marginLeft: 20,
	                          marginBottom: 8,
	                          fontSize: 15,
	                          borderRadius: 5,
	                          borderWidth: 1,
	                          borderColor: color,
	                          paddingTop: 5,
	                          paddingBottom: 5,
	                          paddingLeft: 10,
	                          paddingRight: 10}}>
	                {topping.tp_name} + ${topping.tp_price}
	            </Text>
	        </TouchableOpacity>
			)
		})
		return _toppingGroup;

  }

  _renderToppingGroupList(toppingGroupList) {
		let _toppingGroupList = [];
		toppingGroupList.forEach((toppingGroup,index)=>{
			_toppingGroupList.push(
				<View key={index}>
						<View style={{flexDirection:'row',
													alignItems: 'center',
													backgroundColor: '#f5f5f5',
													paddingTop: 5,
													paddingBottom: 5}}>
								<Text style={{marginLeft: 20, fontSize: 16}}>{toppingGroup.tpg_name}</Text>
						</View>
						<View style={{flexDirection: 'row',
													flexWrap: 'wrap',
													paddingTop: 8}}>
								{this._renderToppingGroup(toppingGroup)}
						</View>
				</View>
			)
		})
		return _toppingGroupList;
  }

  _renderConfirmBtn() {
    return (
      <TouchableOpacity
				  onPress={() => this._confirm()}
				  activeOpacity={0.4}
				  style={{justifyContent: 'center',
                  backgroundColor: '#ea7b21',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  paddingTop: 15,
                  paddingBottom: 15,
                  flexDirection: 'row'}}>
          <View style={{flex: 1, marginLeft: 20}}></View>
          <Text style={{flex: 1,
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '700'}}>
              确认修改
          </Text>
          <Text style={{flex: 1,
                        textAlign: 'right',
                        marginRight: 20,
                        color: 'white',
                        fontSize: 16}}>
              $ 5.50
          </Text>
      </TouchableOpacity>
    )
  }

  render() {
    return(
      <View style={styles.viewController}>
          <View style={[styles.navigation, {height: navigationHeight}]}>
              <View style={styles.back}>
                  {this._renderLeftButton()}
              </View>
              <View style={styles.title}>
                  <Text style={{textAlign:'center',
                                fontSize:20,
                                fontWeight: '700'}}
                         numberOfLines={1}>
                                {this.props.title}原味奶茶
                  </Text>
              </View>
              <View style={styles.right}>
								  {this._renderRightButton()}
              </View>
          </View>
          <ScrollView style={{paddingBottom: 50}}>
              {this._renderToppingGroupList(this.state.toppingGroupList)}
              <View style={{flexDirection: 'row',
                            width: 100,
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            borderRadius: 6,
                            borderWidth: 1,
														paddingTop: 3,
														paddingBottom: 3,
                            borderColor: '#ea7b21',
                            marginTop: 15}}>
                  <TouchableOpacity style={{}}
										                activeOpacity={0.4}>
                      <Text style={{fontSize: 15, paddingTop: 5, paddingBottom: 5, width: 30, textAlign: 'center'}}>-</Text>
                  </TouchableOpacity>
                  <Text style={{paddingTop: 5, paddingBottom: 5}}>
                      1
                  </Text>
                  <TouchableOpacity style={{}}
										                activeOpacity={0.4}>
                      <Text style={{fontSize: 15, paddingTop: 5, paddingBottom: 5, width: 30, textAlign: 'center'}}>+</Text>
                  </TouchableOpacity>
              </View>
          </ScrollView>
          {this._renderConfirmBtn()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
    justifyContent: 'space-between'
    // backgroundColor: '#D5D5D5',
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
});
