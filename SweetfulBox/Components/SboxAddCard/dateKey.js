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
      years: [2018,2019,2020,2021,2022,2023,2024,2025]
    }
    this._onPressMonth = this._onPressMonth.bind(this);
    this._onPressYear = this._onPressYear.bind(this);
  }
  _onPressMonth(input){

    if(input<10){
      var month = "0" + input.toString();
    }else{
      var month = input.toString();
    }
    date.month = month;
    this.props.inputFunc(date)
  }
  _onPressYear(input){
    var year =  input.toString();
    date.year = year;
    this.props.inputFunc(date)
  }
  _renderMonthKeys(){
    var allKeys=[];
    for(var i = 0; i < 12; i++){
            const value = i+1;
            if(i<9){
                allKeys.push(
                    <TouchableHighlight key={i}
                                        style={styles.monthKeyStyle}
                                        underlayColor='#ff768b'
                                        onPress={()=>{this._onPressMonth(value)}}>
                      <Text style={[styles.DateKeyFont,{color:this.state.fontColor}]} allowFontScaling={false}>0{i+1}</Text>
                    </TouchableHighlight>
                );
           }else{
             allKeys.push(
                 <TouchableOpacity key={i} style={styles.monthKeyStyle} onPress={()=>{this._onPressMonth(value)}}>
                   <Text style={styles.DateKeyFont} allowFontScaling={false}>{i+1}</Text>
                 </TouchableOpacity>
               );
           }
         }

    return allKeys;
  }
  _renderYearKeys(){
    var allKeys=[];
    this.state.years.map((year,i)=>{
            const value = year;
            allKeys.push(
                <TouchableOpacity key={i} style={styles.yearKeyStyle} onPress={()=>{this._onPressYear(value)}}>
                  <Text style={styles.DateKeyFont} allowFontScaling={false}>{year}</Text>
                </TouchableOpacity>
            );
         })
    return allKeys;
  }
  render(){
      return(
        <View style={{flex:1,flexDirection:'row'}}>
               <View style={styles.modalMonthContainer}>

                   <View style={{height:40,paddingLeft:30,justifyContent:'center'}}><Text style={{color:'#ff768b'}} allowFontScaling={false}>MONTH</Text></View>
                   <View style={styles.modalMonthContent}>
                     {this._renderMonthKeys()}
                   </View>
               </View>
               <View style={styles.modalYearContainer}>
                       <View style={{height:40,paddingLeft:40,justifyContent:'center'}}><Text style={{color:'#ff768b'}} allowFontScaling={false}>YEAR</Text></View>
                       <View style={styles.modalYearContent}>
                         {this._renderYearKeys()}
                       </View>
               </View>

       </View>
      )
  }


}



const styles = StyleSheet.create({
  modalMonthContainer:{
    flex:0.5,
  },
  modalYearContainer:{
    flex:0.5,
    paddingLeft:10,
    paddingRight:20,

  },
  modalMonthContent:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    marginBottom:20,
    paddingLeft:10,

  },
  modalYearContent:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    paddingLeft:20,
    marginBottom:20,
    borderLeftWidth:1,
    borderColor:'#d9d9d9',
  },

  monthKeyStyle:{

    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:45,


  },
  yearKeyStyle:{

    alignItems:'center',
    justifyContent:'center',

    width:75,
    height:45,

  },
  DateKeyFont:{
    fontSize:20,
  },
});
