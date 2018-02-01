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

	_goToSboxProductDetial(product) {
		console.log("_goToSboxProductDetial");
		console.log(product);
    this.props.navigator.push({
      screen: 'SboxProductDetial',
      navigatorStyle: {navBarHidden: true},
      passProps:{spu_id: product.spu_id,},
    })
  }

  _renderHistoryOrderDetailView() {
    return(
				<SboxHistoryOrderDetailOrderView
          {...{orderDetail:this.state.orderDetail}}
					goToSboxProductDetial={this._goToSboxProductDetial}
				/>
    )
  }
  render() {
    return(
			<View style={styles.container}>
				<SboxHistoryOrderDetailHeader goBack={this._goBack}/>
	        {this._renderHistoryOrderDetailView()}
			</View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex:1
	}
});
