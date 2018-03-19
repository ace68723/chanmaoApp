import {default as React,Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
export default (props) => {

    let _toppingGroupList = [];
    if (props.dish.tpgs) {
      for (let tpg_id in props.dish.tpgs) {
        for (let tp_id in props.dish.tpgs[tpg_id].tps) {
          if (props.dish.tpgs[tpg_id].tps[tp_id].quantity > 0) {
            _toppingGroupList.push(
              <View key={tp_id}
                    style={{flexDirection: 'row', marginTop: 5, marginLeft: 32}}>

                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{color:'#ababb0',
                                  fontSize:16,
                                  fontFamily:'FZZhunYuan-M02S'}}>
                      {props.dish.tpgs[tpg_id].tps[tp_id].tp_name}
                    </Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
                  <Text style={{color:'#ababb0',
                                fontSize:16,
                                fontFamily:'FZZhunYuan-M02S',
                                textAlign: 'left'}}>
                    ${props.dish.tpgs[tpg_id].tps[tp_id].tp_price} × {props.dish.tpgs[tpg_id].tps[tp_id].quantity}
                  </Text>
                </View>
              </View>
            )
          }
        }
      }
    }
    if (props.dish.tpgs) {
      return (
          <TouchableOpacity style={styles.container}
                            activeOpacity={0.4}
                            onPress={props.onPress}>
                <View style={{flex: 1, marginRight: 12}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1,justifyContent:'center',}}>
                        <Text style={styles.itemTitle}>
                          {props.ds_name}
                        </Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
                      <Text style={styles.quantity}>
                        ${props.dish.price.toFixed(2)} × {props.dish.qty}
                      </Text>
                    </View>
                  </View>
                  {_toppingGroupList}
                </View>
                <Image source={require('./Image/icon_edit.png')}
                       style={{width: 20, height: 20}}>
                </Image>
           </TouchableOpacity>

  		)
    }
    else {
      return (
        <View style={styles.container}>
              <View style={{flex: 1, marginRight: 12}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex:1,justifyContent:'center',}}>
                      <Text style={styles.itemTitle}>
                        {props.ds_name}
                      </Text>
                  </View>
                  <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
                    <Text style={styles.quantity}>
                      {props.dish.price} × {props.dish.qty}
                    </Text>
                  </View>
                </View>
                {_toppingGroupList}
              </View>
         </View>
      )
    }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // height:80,
    backgroundColor: '#fff',
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding:15,
    flexDirection:'row',

  },
  itemTitle:{
    color:'#4d4d4d',
    fontSize:16,
    fontFamily:'FZZhunYuan-M02S',
  },
  price:{
    marginTop:10,
    color:'#ff8b00',
    fontSize:15,
    fontWeight:'500',
  },
  quantity:{
    color:'#4d4d4d',
    fontSize:16,
    fontFamily:'FZZhunYuan-M02S',
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
