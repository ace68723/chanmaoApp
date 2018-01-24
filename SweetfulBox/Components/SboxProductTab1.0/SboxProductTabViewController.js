'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
	StyleSheet,
	Text,
  View,
} from 'react-native';

import SboxProductTab from './SboxProductTab';

import SboxProductTabAction from '../../Actions/SboxProductTabAction';
import SboxProductTabStore from '../../Stores/SboxProductTabStore';

const { height, width } = Dimensions.get('window');

export default class ProductTabViewController extends Component {
  constructor(props) {
    super(props);
    SboxProductTabStore.getStateFormProps(this.props.prod_list,props.tmid);
    this.state = Object.assign({},SboxProductTabStore.getStateByTmid(props.tmid),{
    });

		this.iv_tmid = props.tmid;
		this.iv_lastid = 0;
    this.onEndReachEndCalled = true;

    this._onChange = this._onChange.bind(this);
		this._onReachEnd = this._onReachEnd.bind(this);
  }


	componentDidMount() {
    SboxProductTabStore.addChangeListener(this._onChange);
    setTimeout(() => {
      this.onEndReachEndCalled = false;
    }, 200);
		// const io_data = Object.assign({}, {iv_tmid: this.iv_tmid,
		// 																 	 iv_lastid: this.iv_lastid});

		// SboxProductTabAction.getProductList(io_data);
	}

  componentWillUnmount() {
    SboxProductTabStore.removeChangeListener(this._onChange);
  }

	// 当Store所保存的state发生改变时,
  _onChange() {
    const state = Object.assign({},this.state,SboxProductTabStore.getStateByTmid(this.props.tmid));
    this.setState(state);
  }

	// 当flatlist拉到最底下时, 若prod_list为空的, 忽略初始情况
	// 若prod_list最尾端的id等于prod_list长度时, 已提取所有数据, 不对后台触发数据提取动作

  _onReachEnd() {
    if(this.onEndReachEndCalled) return
    //avoid Called On Load
    //https://github.com/facebook/react-native/issues/16067

		if(this.state.prod_list.length === 0) return;
		if(this.iv_lastid === this.state.prod_list.length) return;
		this.iv_lastid = this.state.prod_list.length;
		const io_data = Object.assign({}, {iv_lastid: this.iv_lastid,
																		 	 iv_tmid: this.iv_tmid});
		SboxProductTabAction.getProductList(io_data);
	}


  _renderProductTabView() {
    return(
      <SboxProductTab
				getScrollViewRefs={this.props.getScrollViewRefs}
				goToSboxProductDetial={this.props.goToSboxProductDetial}
				reachEnd={this._onReachEnd}
				scrollEventBind={this.props.scrollEventBind}
				{...{prod_list: this.state.prod_list}}/>
    )
  }
  render() {
    return(
      <View style={styles.viewController}>
        {this._renderProductTabView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
  }
});
