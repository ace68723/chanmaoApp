'use strict'
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

const {height, width} = Dimensions.get('window');
let date = {
    month:"MM",
    year:"YYYY"
}
export default class DateKey extends Component {
  constructor(props){
    super(props)
    this.state={
      expMonth:"",
      expYear:"",
    }
    this._onPressMonth = this._onPressMonth.bind(this);
    this._onPressYear = this._onPressYear.bind(this);
    this._renderMonthKeysRow = this._renderMonthKeysRow.bind(this);
    this._renderYearKeysRow = this._renderYearKeysRow.bind(this);
  }
  _onPressMonth(input){
    var month = input.toString();
    date.month = month;
    this.props.inputFunc(date)
  }
  _onPressYear(input){
    var year =  input.toString();
    date.year = year;
    this.props.inputFunc(date)
  }
  _renderMonthKeysRow() {
    var keysList = ["01","02","03","04","05","06","07","08","09","10","11","12",];
    var allKeys=[];
    for(var i = 1; i < 5; i++){
            const values = keysList.splice(0, 3);
            allKeys.push(
              <View style={{flex: 0.2,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginLeft: 10,
                            marginRight: 10}}>
                  <TouchableHighlight style={{alignItems:'center',
                                              justifyContent:'center',
                                              padding: 10}}
                                      underlayColor='#ff768b'
                                      onPress={()=>{this._onPressMonth(values[0])}}>
                    <Text style={[styles.DateKeyFont,{color:this.state.fontColor}]} allowFontScaling={false}>{values[0]}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={{alignItems:'center',
                                              justifyContent:'center',
                                              padding: 10}}
                                      underlayColor='#ff768b'
                                      onPress={()=>{this._onPressMonth(values[1])}}>
                    <Text style={[styles.DateKeyFont,{color:this.state.fontColor}]} allowFontScaling={false}>{values[1]}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={{alignItems:'center',
                                              justifyContent:'center',
                                              padding: 10}}
                                      underlayColor='#ff768b'
                                      onPress={()=>{this._onPressMonth(values[2])}}>
                    <Text style={[styles.DateKeyFont,{color:this.state.fontColor}]} allowFontScaling={false}>{values[2]}</Text>
                  </TouchableHighlight>
              </View>
            );
         }

    return allKeys;
  }
  _renderYearKeysRow() {
    let cur_year = (new Date()).getFullYear();
    let keysList = [];
    for (i = 0; i < 8; i++) {
        keysList.push((cur_year + i).toString());
    }
    var allKeys=[];
    for(var i = 0; i < 4; i++){
        const values = keysList.splice(0, 2);
        allKeys.push(
          <View style={{flex: 0.2,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginLeft: 10,
                        marginRight: 10}}>
              <TouchableHighlight style={{alignItems:'center',
                                          justifyContent:'center',
                                          padding: 10,
                                          paddingLeft: 5,
                                          paddingRight: 5}}
                                  underlayColor='#ff768b'
                                  onPress={()=>{this._onPressYear(values[0])}}>
                <Text style={[styles.DateKeyFont,{color:this.state.fontColor}]} allowFontScaling={false}>{values[0]}</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{alignItems:'center',
                                          justifyContent:'center',
                                          padding: 10,
                                          paddingLeft: 5,
                                          paddingRight: 5}}
                                  underlayColor='#ff768b'
                                  onPress={()=>{this._onPressYear(values[1])}}>
                <Text style={[styles.DateKeyFont,{color:this.state.fontColor}]} allowFontScaling={false}>{values[1]}</Text>
              </TouchableHighlight>
          </View>
        );
     }
     return allKeys;
  }

  render(){
      return(
        <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex: 0.5, marginBottom:20}}>
                <View style={{marginTop: 10,marginBottom: 5,justifyContent:'center'}}>
                    <Text style={{color:'#ff768b', textAlign: 'center'}}
                          allowFontScaling={false}>
                      MONTH
                    </Text>
                </View>
                <View style={{flex:1,
                              borderRightWidth:1,
                              borderColor:'#d9d9d9',}}>
                      {this._renderMonthKeysRow()}
                </View>
            </View>
            <View style={{flex: 0.5, marginBottom:20}}>
                <View style={{marginTop: 10,marginBottom: 5,justifyContent:'center'}}>
                    <Text style={{color:'#ff768b', textAlign: 'center'}}
                          allowFontScaling={false}>
                      YEAR
                    </Text>
                </View>
                {this._renderYearKeysRow()}
            </View>

       </View>
      )
  }


}



const styles = StyleSheet.create({
  DateKeyFont:{
    fontSize:20,
  },
});
