import React, {
	Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import OrderActions from '../../Actions/OrderAction';
import SecondMenuStore from '../../Stores/SecondMenuStore';

import Label from '../../../App/Constants/AppLabel';

class MenuCard extends Component {
  constructor(props) {
      super(props);
			this._handleAddItem = this._handleAddItem.bind(this);
  }
  // OrderActions.addItem.bind(null, props.dish)
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.qty != this.props.qty){
      return true
    }else{
      return false
    }
  }
	_handleAddItem() {
		if (!this.props.dish.tpgs) {
			OrderActions.addItem(this.props.dish);
		}else {
			let qty = 1;
			if (this.props.qty) {
				qty = this.props.qty;
			}
			SecondMenuStore.getOptions({'toppingGroupList': this.props.dish.tpgs, 'price': this.props.dish.price, qty});
			Navigation.showModal({
				screen: 'CmSecondMenu',
				animated: true,
				passProps:{'dish': this.props.dish,
				           'action': 'add'},
				navigatorStyle: {navBarHidden: true},
			});
		}
	}
  render(){
    let _decreaseButton = () => {
			if(this.props.dish.tpgs) {
				return(
					<View style={{flex:0.4,flexDirection:'row',}}>
            <View style={{flex:1,alignItems:'flex-end'}}>
            </View>
						<View style={{flex:1,}}>
									<View style={{width:54,
														    height:32,
														    alignSelf:'center',
														    alignItems:'center',
														    justifyContent:'center',
														    borderColor:'#ff8b00',
																backgroundColor:'#ff8b00',
														    borderWidth:2,
														    borderRadius:8,}}>
		                <Text style={{fontSize:16,
								    							backgroundColor:'#ff8b00',
																  color: 'white'}}
													allowFontScaling={false}>
													{Label.getCMLabel('OPTION')}
										</Text>
		              </View>
            </View>
          </View>
				)
			}
      else if(this.props.qty > 0){
        return(
          <View style={{flex:0.4,flexDirection:'row',}}>
            <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
              <Text style={styles.quantity}
										allowFontScaling={false}>
                数量: {this.props.dish.qty}
              </Text>
            </View>
            <TouchableOpacity style={{flex:1,}}
                              onPress={() => {OrderActions.decreaseItem( this.props.dish)}}>
              <View style={styles.decreaseButton}>
                <Text style={styles.decreaseIcon}
											allowFontScaling={false}> - </Text>
              </View>
            </TouchableOpacity>
          </View>

        )
      }
    }
    return (
      <TouchableOpacity activeOpacity={0.4}
                        onPress={this._handleAddItem.bind(this)}>
         <View style={styles.container}>
            <View style={{flex:0.6}}>
              <Text style={styles.itemTitle}
                    numberOfLines={2}
										allowFontScaling={false}>
                {this.props.ds_name}
              </Text>
              <Text style={styles.price}
										allowFontScaling={false}>
                 {this.props.dish.price}
              </Text>
            </View>
              {_decreaseButton()}
         </View>
      </TouchableOpacity>
		)
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:100,
    backgroundColor: '#ffffff',
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding:20,
    flexDirection:'row',
    alignItems:'center'

  },
  itemTitle:{
    color:'#4d4d4d',
    fontSize:16,
		fontFamily:'NotoSansCJKsc-Regular',
  },
  price:{
    marginTop:10,
    color:'#ff8b00',
    fontSize:15,
    fontWeight:'500',
		fontFamily:'NotoSansCJKsc-Regular',
  },
  quantity:{
    color:'#4d4d4d',
    fontSize:18,
		fontFamily:'NotoSansCJKsc-Regular',
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
})
module.exports = MenuCard;
