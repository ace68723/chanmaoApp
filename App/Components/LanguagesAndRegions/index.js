import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import {cme_updateLanguage,
        cme_getLanguage,
        cme_getSelectedAddress,
        cme_updateRegion,
        cme_getRegion} from '../../Modules/Database';
import Header from '../../../CmEat/Components/General/Header';

const {width,height} = Dimensions.get('window');
// let marginTop,headerHeight;
// if(height == 812){
//   //min 34
//   //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
//   marginTop = 34;
//   headerHeight = 88
// }else{
//   marginTop = 20;
//   headerHeight = 64
// }
// const sizeScale = width / 375;
let isDaytime = true;

export default class SelectRegionAndLanguage extends Component {
    constructor(props){
      super(props);
      this.state = {
        chosenLanguage: cme_getLanguage().length > 0 ? cme_getLanguage() : 'chinese_simple',
        chosenRegion: cme_getRegion().length > 0 ? cme_getRegion() : 'toronto',
        regionIndicatorLeft: cme_getRegion() === 'montreal' ? new Animated.Value(width/2) : new Animated.Value(0)
      }
      this.chooseRegion = this.chooseRegion.bind(this);
      this._confirm = this._confirm.bind(this);
      this._goBack = this._goBack.bind(this);
    }
    componentDidMount() {
      // let result = cme_getRegion();
    }
    chooseRegion(region){
        this.setState({
            chosenRegion: region,
        },()=>{

            Animated.timing(
                this.state.regionIndicatorLeft,
                {
                    toValue: this.state.chosenRegion === 'toronto' ? 0 : width/2,
                    duration: 200
                }
            ).start();


        })

    }
    submitSetting(){

        //cme_updateLanguage(this.state.chosenLanguage);
    }
    _confirm() {
      cme_updateLanguage(this.state.chosenLanguage);
      cme_updateRegion(this.state.chosenRegion);
      this.props.navigator.resetTo({
  			screen: 'cmHome',
  			animated: true,
  			animationType: 'fade',
  			navigatorStyle: {navBarHidden: true},
  			passProps:{goToCmEat: true}
  		});
    }
    _goBack() {
      // this.props.navigator.dismissModal({
  		// 	animationType: 'slide-down'
  		// });
      this.props.navigator.pop();
    }
    renderHeader(){
        return(
            <View style={{
                flex:0.1,
                width:width,
                alignItems:'center',
                justifyContent:'center',
                borderBottomColor:'grey',
                borderBottomWidth:1
            }}>
                <View style={{marginTop:marginTop}}>
                    <Text style={{fontSize:18}}>语言</Text>
                </View>
            </View>
        )
    }
    renderBody(){
        return(
            <View style={{
                flex:0.9,
                alignItems:'center'}}>
                {this.renderImage()}
                {this.renderRegionAndLanguage()}
            </View>
        )
    }
    renderImage(){
        return(
            <View style={{flex:0.4, justifyContent:'center', marginTop:20}}>
                <Image style={{height:300*0.716, width: 300}} source={require('./image/语言选择-素材-猫.png')}/>
            </View>
        )
    }
    renderRegionAndLanguage(){
        return(
            <View style={{flex:0.6,  width: width}}>
                <View style={{flex:0.2, flexDirection:'row'}}>
                    <TouchableOpacity
                        onPress={()=>this.chooseRegion('toronto')}
                        style={{flex:0.5,alignItems:'center',marginTop:30}}>
                        <Text style={{fontSize:24,
                                      fontFamily: 'NotoSansCJKsc-Regular'}}
                              allowFontScaling={false}>Toronto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.chooseRegion('montreal')}
                        style={{flex:0.5,alignItems:'center',marginTop:30}}>
                        <Text style={{fontSize:24,
                                      fontFamily: 'NotoSansCJKsc-Regular'}}
                              allowFontScaling={false}>Montreal</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flex:0.6, justifyContent:'center', alignItems:'center'}}>
                    <Animated.View style={{
                        position:'absolute',
                        height:50,
                        width:width/2,
                        borderTopWidth:4,
                        borderTopColor:'orange',
                        top:5,
                        left: this.state.regionIndicatorLeft
                    }}>
                    </Animated.View>
                    <TouchableOpacity
                        onPress={()=>this.setState({chosenLanguage:'chinese_simple'})}
                        style={styles.languageButtonStyle}>
                        <View style={styles.languageOption}>
                            <View style={[styles.selectedLanguage,{backgroundColor: this.state.chosenLanguage == 'chinese_simple'? 'orange': 'transparent'}]} >
                            </View>
                        </View>
                        <View style={{width:120, alignItems:'center'}}>
                          <Text style={{fontFamily:'NotoSansCJKsc-Regular',fontSize:20}}
                                allowFontScaling={false}>
                              中文简体
                          </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.setState({chosenLanguage:'english'})}
                        style={styles.languageButtonStyle}>
                        <View style={styles.languageOption}>
                            <View style={[styles.selectedLanguage, {backgroundColor: this.state.chosenLanguage == 'english'? 'orange': 'transparent'}]} >
                            </View>
                        </View>
                        <View style={{width:120, alignItems:'center'}}>
                          <Text style={{fontFamily:'NotoSansCJKsc-Regular',fontSize:22}}
                                allowFontScaling={false}>
                              English
                          </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.setState({chosenLanguage:'french'})}
                        style={styles.languageButtonStyle}>
                        <View style={styles.languageOption}>
                        <View style={[styles.selectedLanguage,{backgroundColor: this.state.chosenLanguage == 'french'? 'orange': 'transparent'}]} >
                            </View></View>
                        <View style={{width:120, alignItems:'center'}}>
                          <Text style={{fontFamily:'NotoSansCJKsc-Regular',fontSize:22}}
                                allowFontScaling={false}>
                              Français
                          </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.2,alignItems:'center'}}>
                    <TouchableOpacity onPress={this._confirm}>
                        <Image style ={{width:220, height:220*0.198}} source={require('./image/语言选择-素材-按钮.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
      let title = "选择语言";
      switch(this.state.chosenLanguage) {
        case 'chinese_simple':
          title = "选择语言";
          break;
        case 'english':
          title = "Languages";
          break;
        case 'french':
          title = "les langues";
          break;
      };
      return (
        <View style={styles.container}>
            <Header title={title}
                    goBack={this.props.firstSelection ? null : this._goBack}/>
            {this.renderBody()}
        </View>
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    languageButtonStyle: {
        // flex:0.2,
        width:200,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:30,
        marginVertical: 10
    },
    languageOption: {
        borderWidth:2,
        borderColor:'orange',
        borderRadius: 10,
        width:20,
        height:20,
        justifyContent:'center'
    },
    selectedLanguage: {
        width:12,
        height:12,
        borderRadius: 6,
        alignSelf:'center',
    },

  });
