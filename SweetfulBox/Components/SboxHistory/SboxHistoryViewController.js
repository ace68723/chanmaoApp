'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
	ListView,
	StyleSheet,
	Text,
	Image,
  View,
} from 'react-native';

import SboxHistoryAction from '../../Actions/SboxHistoryAction';
import SboxHistoryStore from '../../Stores/SboxHistoryStore';
import SboxHistoryFlatlist from './SboxHistoryFlatlist';
import SboxHeader from '../../../App/Components/General/SboxHeader';

const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const navigationHeight = viewHeight * (212/2208) - 12;
let viewMarginTop;
if(height == 812){
  viewMarginTop = 45;
}else{
  viewMarginTop = 20;
}

export default class HistoryViewController extends Component {
  constructor() {
    super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = Object.assign({},SboxHistoryStore.getState(),{
					dataSource: ds.cloneWithRows([]),
					items: [],
					refreshing: false,
    })
    this._onChange = this._onChange.bind(this);
		this.setSource = this.setSource.bind(this);
		this._goBack = this._goBack.bind(this);
    this._goToSboxHistoryOrderDetail = this._goToSboxHistoryOrderDetail.bind(this);
  }
	componentDidMount() {
    SboxHistoryStore.addChangeListener(this._onChange);
		SboxHistoryAction.getHistoryList();
	}
  componentWillUnmount() {
    SboxHistoryStore.removeChangeListener(this._onChange);
  }
  // _handleOnPressIn(product) {
  //   const {spu_id} = product;
  //   SboxProductAction.getSingleProduct(spu_id);
  // }
	setSource(items, itemsDatasource, otherState) {
		this.setState({
			items,
			dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
			...otherState
		})
	}
  _goToSboxHistoryOrderDetail (orderDetail) {
    this.props.navigator.push({
      screen: 'SboxHistoryOrderDetail',
      navigatorStyle: {navBarHidden: true},
      passProps: {orderDetail:orderDetail},
    })
  }
	_goBack() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }
	_onRefresh() {
		this.setState({refreshing: true});
		SboxHistoryAction.getHistoryList();
	}

  _onChange() {
    const state = Object.assign({},SboxHistoryStore.getState());
    this.setState(state);
  }
  _renderHistoryView() {
		// if(this.state.items.length === 0 ) return;
		if (this.state.items.length > 0) {
			return(
	      <SboxHistoryFlatlist
					onRefresh={() => this._onRefresh()}
					{...{items: this.state.items,
	             refreshing: this.state.refreshing,
	             goToSboxHistoryOrderDetail: this._goToSboxHistoryOrderDetail
	           }}
				/>
	    )
		}else {
			return(
				<Image style={{height: height, width: width}} source={require('./Image/no_order.png')}></Image>
			)
		}
  }
  render() {
    return(
      <View style={styles.viewController}>
				<SboxHeader title={"历史订单"}
                goBack={this._goBack}
                leftButtonText={'<'}/>
        {this._renderHistoryView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
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
