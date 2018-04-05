/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    content: {
        // position:'absolute',
        // bottom:0,
        backgroundColor:'white',
        // width:width,
        paddingLeft:15,
        // paddingRight:120,
    },

    info: {
        marginTop:10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight:120,
    },
    tips: {
        fontWeight: 'bold',
    },
    verticalSpace: {
        flex: 1,
    },
    submit: {
        flexDirection: 'row',
    },
    submitButton: {
        flex: 1,
        height: height * (150 / 2209),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff5050',
    },
    submitText: {
        fontSize: 16,
        color: 'white',
    },
});

export default class Content extends Component {
    render() {
        let unitNumber
        if(this.props.unitNumber){
          unitNumber = this.props.unitNumber + ' - ';
        }
        return (
            <View style={styles.content}>
                <View style={{flexDirection: 'row',
                              alignItems: 'center',
                              paddingRight:120,}}>
                    <Image style={{width:20,height:20}} source={require('./img/name.png')}/>
                    <Text style={{marginLeft:15}}
                          allowFontScaling={false}>
                      {this.props.name}
                    </Text>
                </View>
                <View style={styles.info}>
                    <Image  style={{width:20,height:20}} source={require('./img/phoneNum.png')}/>
                    <Text style={{marginLeft:15}}
                          allowFontScaling={false}>
                      {this.props.phoneNumber}
                    </Text>
                </View>
                <View style={styles.info}>
                    <Image  style={{width:20,height:20}} source={require('./img/unitNum.png')}/>
                    <Text style={{marginLeft:15}}
                          allowFontScaling={false}>
                      {unitNumber}{this.props.addr}
                    </Text>
                </View>
            </View>
        );
    }
}
// <TouchableOpacity >
//   <View style={{
//                 marginTop:5,
//                 height:30,
//                 alignItems:'center',
//                 justifyContent:'center',
//                 backgroundColor:'#ff7685',
//                 position:'absolute',
//                 padding:18,
//                 paddingLeft:40,
//                 paddingRight:40,
//                 right:10,
//               }}>
//     <Text style={{color:'white',fontFamily:'FZZhunYuan-M02S'}}>
//       确认地址
//     </Text>
//   </View>
// </TouchableOpacity>
