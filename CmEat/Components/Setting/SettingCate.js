import {default as React,Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

export default (props) => {
 // props.order.created = moment(props.order.created).format("MMM Do YYYY");
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.container}>
            <View style={[styles.col,{  flex:0.2,}]}>
                  <Image source={props.icon} style={styles.icon} />
            </View>
          <View style={[styles.col,{  flex:0.6,}]}>
            <Text style={styles.title}
                  allowFontScaling={false}>
                {props.title}
            </Text>
          </View>
          <View style={[styles.col,{  flex:0.2,}]}>
                <Image source={require('./Image/down-arrow.png')} style={styles.icon} />
          </View>

        </View>
      </TouchableOpacity>
    )
}
//右侧箭头
// <View style={[styles.col,styles.arrow]}>
//     <Text style={styles.arrowText}>
//       >
//     </Text>
// </View>


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: '#fff',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
        height:60,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        borderRadius:8,
        // borderBottomColor:'#ddd',
        // borderBottomWidth:1,
    },
    col: {
      flex: 1,
      // marginLeft:5,
      justifyContent: "center",
    },
    icon:{
      justifyContent: 'center',
      alignSelf: 'center',
      height:25,
      width:25,
    },
    title:{
      fontSize:16,
      textAlign: "left",
      color:'#666666',
      fontWeight:'600',
      fontFamily:'NotoSans-Regular',
    },
    arrow:{
      flex:0.3,
      marginRight:20,
      // backgroundColor:"red"
    },
    arrowText:{
      fontSize:30,
      color:"#ff8b00",
      textAlign:"right",
      fontFamily:'NotoSans-Regular',
    }
});
