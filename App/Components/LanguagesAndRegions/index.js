import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
  ImageBackground,
  FlatList,
} from 'react-native';
import RegionPicker from './Picker/RegionPicker';
import JPushModule from 'jpush-react-native';
import {cme_updateLanguage,
        cme_getLanguage,
        cme_getSelectedAddress,
        cme_updateRegion,
        cme_getRegion} from '../../Modules/Database';
import Header from '../../../CmEat/Components/General/Header';
import AuthAction from '../../Actions/AuthAction';
let langPadding = Platform.OS == 'ios' ? 10:0;
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
const sizeScale = width / 375;
let isDaytime = true;
let languages = [
    {
        lid: 0,
        title: '简体中文',
        value: 'chinese_simple'
    },
    {
        lid: 1,
        title: 'English',
        value: 'english'
    },
    // {
    //     lid: 2,
    //     title: 'Français',
    //     value: 'french'
    // }
]
let regions = [
    {
        rgid: 1,
        title: 'Toronto',
        value: '1'
    },
    {
        rgid: 2,
        title: 'Hamilton',
        value: '3'
    },
    {
        rgid:3,
        title: 'Edmonton',
        value:'4'
    }
]
export default class SelectRegionAndLanguage extends Component {
    constructor(props){
      super(props);
      this.state = {
        chosenLanguage: cme_getLanguage().length > 0 ? cme_getLanguage() : 'chinese_simple',
        chosenRegion: cme_getRegion().length > 0 ? cme_getRegion() : regions[0].value,
        regionIndicatorLeft: cme_getRegion() === '3' ? new Animated.Value(width/2) : new Animated.Value(0),
        regionListOpen:false,
      }
      this._renderItem=this._renderItem.bind(this);
      this.chooseRegion = this.chooseRegion.bind(this);
      this._confirm = this._confirm.bind(this);
      this._goBack = this._goBack.bind(this);
      this.renderImageBackground=this.renderImageBackground.bind(this);
      this._onPressRegion=this._onPressRegion.bind(this);
      this._getRegion=this._getRegion.bind(this);
    }
    componentDidMount() {
      // let result = cme_getRegion();
    }
    _getRegion()
    {
      for (let i=0;i<regions.length;i++)
      {
        if (regions[i].value==this.state.chosenRegion) return regions[i].title;
      }
    }
    chooseRegion(region){
        this.setState({
            chosenRegion: region,
            regionListOpen:false,
        })
    }
    async _confirm() {
     //  JPushModule.cleanTags(map => {
     //   if (map.errorCode === 0) {
     //     console.log('clean tags succeed')
     //   } else {
     //     console.log('clean tags failed, error code: ' + map.errorCode)
     //   }
     // })
      cme_updateLanguage(this.state.chosenLanguage);
      cme_updateRegion(this.state.chosenRegion);
      let tagselected;
      if (this.state.chosenRegion=='1') {
          tagselected = ['toronto'];
       //  JPushModule.setTags(tagselected, map => {
       //   if (map.errorCode === 0) {
       //     console.log('Add tags succeed, tags: ' + map.tags)
       //           this.props.navigator.pop();
       //   } else {
       //     console.log('Add tags failed, error code: ' + map.errorCode)
       //   }
       // })
      }
      else if (this.state.chosenRegion=='3') {
          tagselected = ['hamilton'];

      }
      JPushModule.setTags(tagselected, map => {
         if (map.errorCode === 0) {
           console.log('Add tags succeed, tags: ' + map.tags)
                 // this.props.navigator.pop();
         } else {
           console.log('Add tags failed, error code: ' + map.errorCode)
         }
         // this.props.navigator.pop();
      })
      if (this.props.firstSelection) {
        // this.props.navigator.resetTo({
    		// 	screen: 'cmHome',
    		// 	animated: true,
    		// 	animationType: 'fade',
    		// 	navigatorStyle: {navBarHidden: true},
    		// });
        const res = await AuthAction.isAuthed();
        if(res.ev_error !== 0) {
          this.props.navigator.push({
            screen: 'CmLogin',
            // animationType: 'slide-up',
            animated: true,
            navigatorStyle: {navBarHidden: true},
            passProps: {handleBackToHome: () => {
                          this.props.navigator.pop({
                            animated: true,
                            animationType: 'slide-horizontal',
                          });
                        },
                        handleLoginSuccessful: () => {
                          this.props.navigator.resetTo({
                            screen: 'cmHome',
                            animated: true,
                            animationType: 'fade',
                            navigatorStyle: {navBarHidden: true},
                          });
                        },
            },
          });
        } else if (res.ev_error === 0 && res.ev_missing_phone && res.ev_missing_phone === 1) {
          this.props.navigator.push({
            screen: 'CmBindPhone',
            // animationType: 'slide-up',
            animated: true,
            navigatorStyle: {navBarHidden: true},
            passProps: {handleBackToHome: () => {
                          this.props.navigator.pop({
                            animated: true,
                            animationType: 'slide-horizontal',
                          });
                        },
                        handleBindSuccessful: () => {
                          this.props.navigator.resetTo({
                            screen: 'cmHome',
                            animated: true,
                            animationType: 'fade',
                            navigatorStyle: {navBarHidden: true},
                          });
                        },
            },
          });
        } else {
          this.props.navigator.resetTo({
      			screen: 'cmHome',
      			animated: true,
      			animationType: 'fade',
      			navigatorStyle: {navBarHidden: true},
      		});
        }
      } else {
        let data;
        if (this.props.goToSbox) {
          data = {goToSweetfulBox: true};
        }
        else if (this.props.goToCmWash){
          data = {goToCmWash:true};
        }
        // else {
        //   data = {goToCmEat: true}; //自动跳转有问题
        // }
        this.props.navigator.resetTo({
    			screen: 'cmHome',
    			animated: true,
    			animationType: 'fade',
    			navigatorStyle: {navBarHidden: true},
    			passProps:data
    		});
      }
    }
    _goBack() {
      // this.props.navigator.dismissModal({
  		// 	animationType: 'slide-down'
  		// });
      this.props.navigator.pop();
    }
    renderBody(){
        return(
            <View style={{
                flex:1,
                alignItems:'center'}}>
                {this.renderImage()}
                {this.renderRegionAndLanguage()}
            </View>
        )
    }
    renderImage(){
        return(
            <View style={{flex:0.4, justifyContent:'center', marginVertical:10}}>
                <Image style={{height:height*0.25*sizeScale, width: height*0.25*1.4*sizeScale}} source={require('./image/languages_miao.png')}/>
            </View>
        )
    }
    renderRegionButton(){
        return regions.map((region, index)=>{
            return(
                <TouchableOpacity
                    key={index}
                    onPress={()=>this.chooseRegion(region.value)}
                    style={{flex:0.5,alignItems:'center'}}>
                    <Text style={{fontSize:24,
                                fontFamily: this.state.chosenRegion === region.value ? 'NotoSans-Regular' : 'NotoSans-Regular',
                                color: this.state.chosenRegion === region.value ? '#ea7b21' : 'grey'}}
                        allowFontScaling={false}>{region.title}</Text>
                </TouchableOpacity>
            )
        })
    }
    renderLanguageButton(){

        return languages.map((lang, index)=>{
            return(
                <TouchableOpacity
                    key={index}
                    onPress={()=>this.setState({chosenLanguage: lang.value})}
                    style={[styles.languageButtonStyle,{paddingVertical: langPadding}]}>
                    <View style={styles.languageOption}>
                        <View style={[styles.selectedLanguage,{backgroundColor: this.state.chosenLanguage == lang.value ? '#ea7b21': 'transparent'}]} >
                        </View>
                    </View>
                    <View style={{width:120, alignItems:'center'}}>
                    <Text style={{
                            fontFamily:this.state.chosenLanguage == lang.value ? 'NotoSans-Regular' : 'NotoSans-Regular',
                            fontSize:20,
                            color:'grey'
                        }}
                            allowFontScaling={false}>
                        {lang.title}
                    </Text>
                    </View>
                </TouchableOpacity>
            );
        })
    }
    renderImageBackground(){
        let imgSource;
      if (this.state.chosenRegion==regions[0].value) {
        imgSource = require('./image/Toronto.png')
      }
      else {
        imgSource = require('./image/Hamilton.png')
      }
      return (
        <ImageBackground style={{width, height:parseFloat(width*0.77)}}
          source={imgSource} >
          <View style={{flex:0.7, justifyContent:'center', alignItems:'center', paddingVertical:20,}}>
          </View>
          <View style={{flex:0.1,alignItems:'center'}}>
              <TouchableOpacity onPress={this._confirm}>
                  <Image style ={{width:220, height:220*0.198}} source={require('./image/languages_confirm.png')} />
              </TouchableOpacity>
          </View>
        </ImageBackground>
      )
    }
    renderRegionAndLanguage(){
        return(
            <View style={{flex:0.8,  width: width,}}>
                <View style={{flex:0.1, flexDirection:'row',}}>
                   {this.renderRegionButton()}
                   <Animated.View style={{
                       position:'absolute',
                       height:0,
                       width:width/2,
                       borderTopWidth:4,
                       borderTopColor:'#ea7b21',
                       bottom:0,
                       left: this.state.regionIndicatorLeft,
                       backgroundColor:'blue',
                   }}>
                   </Animated.View>
                </View>
                    <View style={{flex:0.9,backgroundColor:'#e6e6e6',justifyContent:'flex-end'}}>
                    {this.renderImageBackground()}
                    </View>
            </View>

        )
    }
    _renderItem({item})
    {
      if (item.value!=this.state.chosenRegion){
      return (
        <TouchableOpacity onPress={()=>this.chooseRegion(item.value)}>
          <View style={{width:0.5*width,height:40,justifyContent:'center'}}>
            <Text style={{fontFamily: 'NotoSans-Black',marginLeft:15,fontSize: 18, color:'grey', fontWeight: '700'}}>
              {item.title}
            </Text>
          </View>

        </TouchableOpacity>
      )
      }
      else {
        return(
          <TouchableOpacity onPress={()=>this.chooseRegion(item.value)}>
            <View style={{width:0.5*width,height:40,backgroundColor:'orange',justifyContent:'center'}}>
              <Text style={{fontFamily: 'NotoSans-Black',marginLeft:15,fontSize: 18, color:'grey', fontWeight: '700'}}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )
      }
    }
    _onPressRegion()
    {
      this.setState({regionListOpen:(!this.state.regionListOpen)})
    }
    render() {
      let title = "选择地区";
      switch(this.state.chosenLanguage) {
        case 'chinese_simple':
          title = "选择地区";
          break;
        case 'english':
          title = "Languages and Regions";
          break;
        case 'french':
          title = "Langues et Régions";
          break;
      };
      // <Header title={title}
      //         goBack={this.props.firstSelection ? null : this._goBack}/>
      // {this.renderBody()}
      return (
        <View style={styles.container}>
          <View style={{height:0.06*height,width:width,marginTop:0.05*height,alignItems:'center'}}>
            <Text style={{fontFamily: 'NotoSans-Black',fontSize: 18, color:'black', fontWeight: '800'}}>
              地区和语言
            </Text>
            <View style={{marginTop:10,borderTopWidth:1,borderTopColor:'grey',width:width,height:0,}}>
            </View>
          </View>
          <View style={{marginTop:0.03*height,height:0.65*height,width:width,}}>
            <View style={{width:width,height:0.04*height,flexDirection:'row'}}>
              <RegionPicker getRegion={this._getRegion} pressButton={this._onPressRegion} buttonStyle={{marginLeft:20}} />
              <View style={{marginLeft:30,width:0.33*width,backgroundColor:'white',
              alignItems:'center',
              flexDirection:'row',}}>
                <Text style={{marginLeft:15,fontFamily: 'NotoSans-Black',fontSize: 18, color:'black', fontWeight: '600'}} >简体中文</Text>
                <Image style={{height:10, width: 20,right:5,top:10 ,position:'absolute'}} source={require('./image/login_language_btn_open.png')} />
              </View>
            </View>

            <View style={{marginTop:0.05*height,height:0.55*height,width:width,}}>
              <Image style={{height:height*0.55, width: width}} source={require('./image/login_language_bg_img.png')}/>
            </View>
            {this.state.regionListOpen && <View style={{position:'absolute',
            top:0.04*height,left:20,width:0.5*width,height:0.3*height,backgroundColor:'white'}}>
                <FlatList
                    scrollEventThrottle={1}
                    style={{flex:1}}
                    data={regions}
                    renderItem={this._renderItem}
                    getItemLayout={(data, index) => (
                       {length: 100, offset: 100 * index, index}
                    )}
                />
              </View>
            }
          </View>
          <TouchableOpacity onPress={this._confirm}>
            <View style={{width:width,height:0.1*height,alignItems:'center',justifyContent:'center',marginTop:0.03*height}}>
              <Image style={{height:height*0.078, width: width*0.7}} source={require('./image/login_language_btn_default.png')}/>
            </View>

          </TouchableOpacity>
        </View>
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor:'#e6e6e6',
    },
    languageButtonStyle: {
        // flex:0.2,
        width:200,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:30,

    },
    languageOption: {
        borderWidth:2,
        borderColor:'#ea7b21',
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
