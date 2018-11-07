import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,Image,Dimensions,
} from 'react-native';
import Common from '../../../Constants/Common'
const {height, width} = Dimensions.get('window');
export default class CheckoutUserInfo extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);
    const _display_card = () => {
      if (this.props.cardInfo.last4)
      {
        if (this.props.cardInfo.brand=='Visa') {
          return (
            <View style={{flex:1,}}>
              <Image source={require('../Image/icon_visa.png')} style={{
                  width: 0.05 * height,
                  height: 0.03 * height,
                }}/>
            </View>
          )
        }
      }
    }
    if (this.props.cardInfo.last4) return (
      <View style={this.props.cardStyle}>
        <TouchableOpacity>
          <View style={styles.content}>
            <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>支付方式</Text>
            <View style={{flexDirection: 'row', marginBottom: 10,}}>
              {_display_card()}
              <View style={{flex:9,justifyContent:'center',}}>
                <Text style={{fontWeight: '600', fontSize: 14,marginLeft:15,}}>xxxx {this.props.cardInfo.last4}</Text>
              </View>

              <View style={{flex:1,}}>
                <Image source={require('../Image/arrow-right-green.png')} style={{
                    width: 0.03 * height,
                    height: 0.03 * height,
                    marginLeft:5,
                  }}/>
              </View>
            </View>


          </View>
        </TouchableOpacity>
      </View>
    ); else return(
      <View style={this.props.cardStyle}>
        <TouchableOpacity>
          <View style={styles.content}>
            <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>支付方式</Text>
            <View style={{flexDirection: 'row', marginBottom: 10,}}>
              <View style={{flex:9,justifyContent:'center',}}>
                <Text style={{fontWeight: '600', fontSize: 14,marginLeft:5,}}>请选择支付方式</Text>
              </View>
              <View style={{flex:1,}}>

              </View>

              <View style={{flex:1,}}>
                <Image source={require('../Image/arrow-right-green.png')} style={{
                    width: 0.03 * height,
                    height: 0.03 * height,
                    marginLeft:10,
                  }}/>
              </View>
            </View>


          </View>

        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 24,
    marginRight: 24,
  }
});
