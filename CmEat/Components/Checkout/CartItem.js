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
    return (
          
        <View style={styles.container}>
            <Text style={styles.title}>
              {props.title}:
            </Text>
            <Text style={styles.value}>
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
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems:'center',
    height:50,
    paddingLeft:10,
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
    width:11,
  },
  title:{
    marginLeft:10,
    fontSize:15,
    color:'#808080',
    fontFamily:'FZZhunYuan-M02S',
  },
  value:{
    marginLeft:5,
    fontSize:15,
    color:'#ff8b00',
    fontFamily:'FZZhunYuan-M02S',
  },
})
