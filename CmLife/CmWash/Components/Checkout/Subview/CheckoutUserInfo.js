import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Common from '../../../Constants/Common'
const {height, width} = Dimensions.get('window');
export default class CheckoutUserInfo extends Component{
  constructor(props) {
    super(props);
    // console.log(this.props);
  }

  render() {
    if (this.props.userInfo) return (
      <View style={this.props.cardStyle}>
        <TouchableOpacity>
          <View style={styles.content}>
            <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>地址</Text>
            <View style={{flexDirection: 'row', marginBottom: 10,}}>
              <View style={{flex:1,}}>
                <Image source={require('../Image/name-01.png')} style={{
                    width: 0.03 * height,
                    height: 0.03 * height,
                  }}/>
              </View>
              <View style={{flex:9,justifyContent:'center',}}>
              <Text style={{fontWeight: '600', fontSize: 14,marginLeft:5,}}>{this.props.userInfo.name}</Text>
              </View>
              <View style={{flex:1,}}>
                <Image source={require('../Image/arrow-right-green.png')} style={{
                    width: 0.03 * height,
                    height: 0.03 * height,
                    marginLeft:10,
                  }}/>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 8,}}>

              <View style={{flex:1,}}>
                <Image source={require('../Image/phone-01.png')} style={{
                    width: 0.03 * height,
                    height: 0.03 * height,
                  }}/>
              </View>
              <View style={{flex:9,justifyContent:'center',}}>
              <Text style={{fontWeight: '600', fontSize: 14,marginLeft:5,}}>{this.props.userInfo.phone}</Text>
              </View>
              <View style={{flex:1,}}>

              </View>

            </View>
            <View style={{flexDirection: 'row', marginBottom: 8,}}>

              <View style={{flex:1,}}>
                <Image source={require('../Image/address-01.png')} style={{
                    width: 0.03 * height,
                    height: 0.03 * height,
                  }}/>
              </View>
              <View style={{flex:9,justifyContent:'center',}}>
              <Text style={{fontWeight: '600', fontSize: 14,marginLeft:5,}}>{this.props.userInfo.addr}</Text>
              </View>
              <View style={{flex:1,}}>

              </View>

            </View>
          </View>

        </TouchableOpacity>
      </View>
    );
    return (
      <View style={this.props.cardStyle}>
        <TouchableOpacity>
          <View style={styles.content}>
            <Text style={{fontWeight: '800', color: Common.MAIN_COLOR, marginBottom: 10, fontSize: 14,}}>地址</Text>
            <View style={{flexDirection: 'row', marginBottom: 10,}}>
              <View style={{flex:9,justifyContent:'center',}}>
                <Text style={{fontWeight: '600', fontSize: 14,marginLeft:5,}}>填写地址</Text>
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
