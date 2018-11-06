import {default as React,Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default (props) =>{
//   <Image source={props.icon}
// resizeMode={'contain'}
// style={styles.icon}/>
    const paymentImage = () => {
      switch (props.paymentChannel) {
        case 0:
          return (
            <Image source={require('../AddCard/Img/cash.png')}
                   style={{alignSelf: 'center',
                           height: 20,
                           width: 45,
                           marginLeft: 5}}/>
          )
          break;
        case 1:
          return (
            <Image source={require('../AddCard/Img/visa_debit_icon.png')}
                   style={{alignSelf: 'center',
                           height: 20,
                           width: 40,
                           marginLeft: 5}}/>
          )
          break;
        case 10:
          return (
            <Image source={require('../AddCard/Img/alipay_icon.png')}
                   style={{alignSelf: 'center',
                           height: 28,
                           width: 28,
                           marginLeft: 5}}/>
          )
          break;
        case 30:
          return(
            <Image source={require('../AddCard/Img/apple_pay_icon.png')}
                  style={{alignSelf: 'center',
                          height: 25,
                          width: 42,
                           marginLeft: 5}}/>
          )
          break;
        default:
          return (
            <Image source={require('../AddCard/Img/alipay_icon.png')}
                   style={{alignSelf: 'center',
                           height: 28,
                           width: 28,
                           marginLeft: 5}}/>
          )
          break;
      }
    };
    return (

        <View style={styles.container}>
            <Text style={{width: 75,
                          fontSize: 15,
                          color: '#666666',
                          fontFamily: 'NotoSansCJKsc-Black'}}
                  allowFontScaling={false}>
              {props.title}:
            </Text>
            {paymentImage()}
            <Text style={styles.value}
                  allowFontScaling={false}>
              {props.value}
            </Text>
            <Image source={props.rightIcon}
              resizeMode={'contain'}
              style={styles.rightIcon}/>
        </View>


		)

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems:'center',
    height:50,
    marginLeft:20,
  },
  row:{
    flex:1,
    flexDirection: 'row',
  },
  icon:{
    marginLeft:20,
    height:28,
    width:28,
  },
  rightIcon:{
    marginLeft:10,
    height:17,
    width:60,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  title:{
    marginLeft:10,
    fontSize:15,
    color:'#808080',
    fontFamily:'NotoSansCJKsc-Regular',
  },
  value:{
    flex: 1,
    marginLeft:5,
    fontSize:15,
    color:'#9b9b9b',
    fontFamily:'NotoSansCJKsc-Regular',
  },
})
