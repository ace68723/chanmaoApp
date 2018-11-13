import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform
} from 'react-native';
import {cme_updateLanguage,
        cme_getLanguage,
        cme_getSelectedAddress,
        cme_updateRegion,
        cme_getRegion} from '../../Modules/Database';
import Header from '../../../CmEat/Components/General/Header';
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
    {
        lid: 2,
        title: 'Français',
        value: 'french'
    }
]
let regions = [
    {
        rgid: 1,
        title: 'Toronto',
        value: '1'
    },
    {
        rgid: 2,
        title: 'Montreal',
        value: '2'
    },
]
export default class SelectRegionAndLanguage extends Component {
    constructor(props){
      super(props);
      this.state = {
        chosenLanguage: cme_getLanguage().length > 0 ? cme_getLanguage() : 'chinese_simple',
        chosenRegion: cme_getRegion().length > 0 ? cme_getRegion() : regions[0].value,
        regionIndicatorLeft: cme_getRegion() === '2' ? new Animated.Value(width/2) : new Animated.Value(0)
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
                    toValue: this.state.chosenRegion === '1' ? 0 : width/2,
                    duration: 200
                }
            ).start();


        })

    }
    _confirm() {
      cme_updateLanguage(this.state.chosenLanguage);
      cme_updateRegion(this.state.chosenRegion);
      if (this.props.firstSelection) {
        this.props.navigator.resetTo({
    			screen: 'cmHome',
    			animated: true,
    			animationType: 'fade',
    			navigatorStyle: {navBarHidden: true},
    		});
      } else {
        let data;
        if (this.props.goToSbox) {
          data = {goToSweetfulBox: true};
        }
        else if (this.props.goToCmWash){
          data={goToCmWash:true};
        }
        else {
          data = {goToCmEat: true};
        }
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
                flex:0.9,
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
                                fontFamily: this.state.chosenRegion === region.value ? 'NotoSansCJKsc-Bold' : 'NotoSansCJKsc-Regular',
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
                            fontFamily:this.state.chosenLanguage == lang.value ? 'NotoSansCJKsc-Bold' : 'NotoSansCJKsc-Regular',
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
    renderRegionAndLanguage(){
        return(
            <View style={{flex:0.6,  width: width}}>
                <View style={{flex:0.2, flexDirection:'row'}}>
                   {this.renderRegionButton()}
                </View>
                <View style={{flex:0.7, justifyContent:'center', alignItems:'center', paddingVertical:20}}>
                    <Animated.View style={{
                        position:'absolute',
                        height:50,
                        width:width/2,
                        borderTopWidth:4,
                        borderTopColor:'#ea7b21',
                        top:5,
                        left: this.state.regionIndicatorLeft
                    }}>
                    </Animated.View>
                    {this.renderLanguageButton()}
                </View>
                <View style={{flex:0.1,alignItems:'center'}}>
                    <TouchableOpacity onPress={this._confirm}>
                        <Image style ={{width:220, height:220*0.198}} source={require('./image/languages_confirm.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
      let title = "选择语言和地区";
      switch(this.state.chosenLanguage) {
        case 'chinese_simple':
          title = "选择语言和地区";
          break;
        case 'english':
          title = "Languages and Regions";
          break;
        case 'french':
          title = "Langues et Régions";
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
