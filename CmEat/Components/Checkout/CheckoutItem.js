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
                    style={{flexDirection: 'row', marginTop: 12}}>

                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{color:'#ababb0',
                                  fontSize:14,
                                  fontFamily:'NotoSansCJKsc-Regular'}}
                          allowFontScaling={false}>
                      {props.dish.tpgs[tpg_id].tps[tp_id].tp_name} × {props.dish.tpgs[tpg_id].tps[tp_id].quantity}
                    </Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
                  <Text style={{color:'#ababb0',
                                fontSize:16,
                                fontFamily:'NotoSansCJKsc-Regular',
                                textAlign: 'left'}}
                        allowFontScaling={false}>
                    ${props.dish.tpgs[tpg_id].tps[tp_id].tp_price}
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
                <View style={{marginRight: 10,
                              backgroundColor: '#9b9b9b',
                              width: 22,
                              height: 22,
                              marginTop: 2,
                              justifyContent: 'center'}}>
                  <Text style={{color: 'white',
                                fontSize: 12,
                                alignSelf: 'center'}}
                        allowFontScaling={false}>
                    {props.dish.qty}
                  </Text>
                </View>
                <View style={{flex: 1,}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.itemTitle}
                          allowFontScaling={false}>
                      {props.ds_name}
                    </Text>
                    <Text style={styles.quantity}
                          allowFontScaling={false}>
                      ${parseFloat(props.dish.price).toFixed(2)}
                    </Text>
                  </View>
                  {_toppingGroupList}
                </View>
                <TouchableOpacity style={{marginLeft: 20, marginTop: 2}} onPress={props.onPress}>
                  <Image source={require('./Image/icon_edit.png')}
                         style={{width: 22,
                                 height: 22}}>
                  </Image>
                </TouchableOpacity>
           </TouchableOpacity>

  		)
    }
    else {
      return (
        <View style={styles.container}>
            <View style={{marginRight: 10,
                          backgroundColor: '#9b9b9b',
                          width: 22,
                          height: 22,
                          justifyContent: 'center'}}>
              <Text style={{color: 'white',
                            fontSize: 12,
                            alignSelf: 'center'}}
                    allowFontScaling={false}>
                {props.dish.qty}
              </Text>
            </View>
            <Text style={styles.itemTitle}
                  allowFontScaling={false}>
              {props.ds_name}
            </Text>
            <Text style={styles.quantity}
                  allowFontScaling={false}>
              ${props.dish.price}
            </Text>
            <TouchableOpacity style={{marginLeft: 20}} onPress={props.onPress}>
              <Image source={require('./Image/icon_delete.png')}
                     style={{width: 22,
                             height: 22}}>
              </Image>
            </TouchableOpacity>
         </View>
      )
    }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // height:80,
    backgroundColor: '#fff',
    marginTop:20,
    marginLeft: 12,
    marginRight: 12,
    flexDirection:'row',
  },
  itemTitle:{
    flex: 1,
    color:'#4d4d4d',
    fontSize:16,
    fontFamily:'NotoSansCJKsc-Regular',
    alignSelf: 'center',
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
    fontFamily:'NotoSansCJKsc-Regular',
    width: 60,
    marginLeft: 10,
    justifyContent: 'center',
    textAlign: 'left',
    alignSelf: 'flex-start',
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
