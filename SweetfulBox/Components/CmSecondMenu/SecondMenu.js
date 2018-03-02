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
  constructor() {
    super();
		// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		// this.state = Object.assign({},SboxHistoryStore.getState(),{
		// 			dataSource: ds.cloneWithRows([]),
		// 			items: [],
		// 			refreshing: false,
    // })
    this.state = {
        optionsList: [],
        // optionsList: [{title: "尺寸[必选]", limit: 1, options: ["小杯", "中杯 + $0.50", "大杯 + $1.00"]},
        //               {title: "加料[多选]", limit: 6, options: ["中杯 + $0.50", "中杯 + $0.50", "中杯 + $0.50", "中杯 + $0.50", "中杯 + $0.50", "中杯 + $0.50"]},
        //               {title: "甜度[必选]", limit: 1, options: ["0%", "30%", "50%", "100%"]},
        //               {title: "冷热[必选]", limit: 1, options: ["无冰", "少冰", "正常冰", "热饮"]},
        //             {title: "冷热[必选]", limit: 1, options: ["无冰", "少冰", "正常冰", "热饮"]},
        //           {title: "冷热[必选]", limit: 1, options: ["无冰", "少冰", "正常冰", "热饮"]},
        //         {title: "冷热[必选]", limit: 1, options: ["无冰", "少冰", "正常冰", "热饮"]}],
    }
    this._renderOptions = this._renderOptions.bind(this);
    this._renderSection = this._renderSection.bind(this);
    this._onChange = this._onChange.bind(this);
    this._optionsSelectHandler = this._optionsSelectHandler.bind(this);
		this._deleteHandler = this._deleteHandler.bind(this);
  }

  componentDidMount() {
    SecondMenuStore.addChangeListener(this._onChange);
		SecondMenuAction.getSectionList();
	}
  componentWillUnmount() {
    SecondMenuStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(SecondMenuStore.getState());
  }

  _optionsSelectHandler(options, tar_option, limit, index) {
		// console.log(options, tar_option, limit, index);
		var counter = 0;
    for (let option of options) {
			if (option.selected == true) {
				counter ++;
			}
    }
		// console.log(counter);
		if (counter >= limit && limit != 1 && tar_option.selected == false) {
			return;
		}
		else {
			var sectionList = this.state.optionsList;
			for (let option of options) {
	      if (tar_option.tp_name == option.tp_name) {
	        if (option.selected == true) {
	          option.selected = false;
	        }else {
	          option.selected = true;
	        }
	      }else if (limit == 1) {
					option.selected = false;
				}
	    }
			sectionList[index].options = options;
	    SecondMenuAction.updateOptions(sectionList);
		}
  }

	_deleteHandler() {

	}

  _renderLeftButton() {
    if (this.props.leftButtonText == 'x' || true) {
      return (
        <TouchableOpacity onPress={this.props.goBack}>
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
		var action = 'add';
		if (action == 'add') {
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
  _renderSection(list) {
    var res = [];
    var sectionIndex = 0;
    for (let section of list) {
      res.push(
        <View key={sectionIndex}>
            <View style={{flexDirection:'row',
                          alignItems: 'center',
                          backgroundColor: '#f5f5f5',
                          paddingTop: 5,
                          paddingBottom: 5}}>
                <Text style={{marginLeft: 20, fontSize: 16}}>{section.tpg_name}</Text>
            </View>
            <View style={{flexDirection: 'row',
                          flexWrap: 'wrap',
                          paddingTop: 8}}>
                {this._renderOptions(section.tps, section.tpg_limit, sectionIndex)}
            </View>
        </View>
      )
      sectionIndex ++;
    }
    return res;
  }

  // <FlatList
  //     data={section.options}
  //     horizontal={true}
  //     renderItem={(item) => this._renderOption(item)}/>

  _renderOptions(options, limit, sectionIndex) {
    var res = [];
    var index = 0;
    for (let option of options) {
      var color = "black";
      if (option.selected) {
        color = '#ea7b21';
      }
      res.push(
        <TouchableOpacity
				    key={index}
            activeOpacity={0.4}
            onPress={() => this._optionsSelectHandler(options, option, limit, sectionIndex)}>
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
                {option.tp_name} + ${option.tp_price}
            </Text>
        </TouchableOpacity>
      )
      index ++;
    }
    return res;
  }

  _renderConfirmBtn() {
    return (
      <View style={{justifyContent: 'center',
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
      </View>
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
              {this._renderSection(this.state.optionsList)}
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
