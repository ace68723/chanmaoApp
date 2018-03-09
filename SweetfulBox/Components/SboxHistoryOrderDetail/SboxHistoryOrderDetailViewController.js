'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
  View,
	StyleSheet
} from 'react-native';

import SboxHistoryOrderDetailHeader from './SboxHistoryOrderDetailHeader';
import SboxHistoryOrderDetailOrderView from './SboxHistoryOrderDetailOrderView';
import SboxHeader from '../../../App/Components/General/SboxHeader';
import SboxProductAction from '../../Actions/SboxProductAction';

const { height, width } = Dimensions.get('window');

export default class HistoryOrderDetailViewController extends Component {
  constructor(props) {
    super(props);
		this.state = Object.assign({},{orderDetail:props.orderDetail});
    this._goBack = this._goBack.bind(this);
    this._goToSboxProductDetial = this._goToSboxProductDetial.bind(this);
  }
  _goBack() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }

	_goToSboxProductDetial(item) {
		// check
		if (item.sku_status === 0) {
			setTimeout( () => {
				this.props.navigator.push({
					screen: 'SboxProductDetial',
					navigatorStyle: {navBarHidden: true},
				})
			}, 150);
		}
  }

  _renderHistoryOrderDetailView() {
    return(
				<SboxHistoryOrderDetailOrderView
          {...{orderDetail:this.state.orderDetail}}
          goToSboxProductDetial={this._goToSboxProductDetial}
          handleOnPressIn = {() => this._handleOnPressIn(item)}
				/>
    )
  }
  render() {
    return(
			<View style={styles.container}>
				<SboxHeader title={"订单详情"}
                goBack={this._goBack}
                leftButtonText={'<'}/>
	      {this._renderHistoryOrderDetailView()}
			</View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex:1,
	}
});
