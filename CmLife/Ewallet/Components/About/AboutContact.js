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
  Image,
	Text,
  View,
} from 'react-native';

// import UserAction from '../../Actions/UserAction';
import UserStore from '../../Stores/UserStore';
import SboxHeader from '../SboxHeader';

const { height, width } = Dimensions.get('window');
let viewMarginTop;
if(height == 812){
  viewMarginTop = 45;
}else{
  viewMarginTop = 20;
}
let contentWidth = width * 0.85;
let qrWidth = width * 0.42;

export default class About extends Component {
  constructor(props) {
    super(props);
		// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		// this.state = Object.assign({},SboxHistoryStore.getState(),{
		// 			dataSource: ds.cloneWithRows([]),
		// 			items: [],
		// 			refreshing: false,
    // })
 
		// this.setSource = this.setSource.bind(this);
    // this._goToSboxHistoryOrderDetail = this._goToSboxHistoryOrderDetail.bind(this);
  }
  render() {
    // console.log("SboxAbout");
    // console.log(this.state);
    return(
      <View style={styles.viewController}>
          <SboxHeader title={"联系客服"}/>
				  <View style={{backgroundColor: '#efefef', width: width, height: height, alignItems: 'center'}}>
						<View style={{justifyContent: 'center',
							            alignItems: 'center',
													backgroundColor: 'white',
													marginTop: 20,
													paddingTop: 60,
													paddingBottom: 80,
													width: contentWidth,
													shadowColor: '#000',
											    shadowOffset: { width: 2, height: 2 },
											    shadowOpacity: 0.3,
											    shadowRadius: 2,}}>
								<Image style={{width: qrWidth, height: qrWidth, marginBottom: 20}}
									     source={require('./img/wechat.jpg')}/>
										 <Text style={{marginBottom: 10, fontSize: 16}}
										 			 allowFontScaling={false}>
									WeChat: sweetfulinc
								</Text>
								<Text style={{fontSize: 16}}
											allowFontScaling={false}>
									Email: sweet4u@sweetful.ca
								</Text>
	          </View>
					</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
    // backgroundColor: '#D5D5D5',
  },
  navigation: {
    flexDirection:'row'
  },
  back: {
    flex: 1,
    justifyContent:'center',
  },
  title: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:'center',
    // backgroundColor: "blue",
  },
  separator: {
		borderBottomWidth: 1,
		borderColor: "#D5D5D5"
	},
});
