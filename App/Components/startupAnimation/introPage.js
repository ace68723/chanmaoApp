import React, {Component} from 'react';
import {
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    Text,
    Animated,
    StyleSheet,
    Alert
} from 'react-native';
const {width,height} = Dimensions.get('window');
const sizeScale = parseInt(width / 375);
const heightScale = parseInt(height / 667);
const picSize = parseInt(310* sizeScale);
let iconMargin;
if(height == 812){
    iconMargin = 50;
    headerHeight = 75;
  }else{
    iconMargin = 0;
    headerHeight = 0;
}
const Slogans = [
    {
        page:0,
        name:'馋猫订餐',
        phrases: [
            '在线点餐，线上支付',
            '让美食来敲门'
        ],
        top: 100,
        right: null,
        left:20,
        bottom: null,
        align:'flex-start'
    },
    {
        page:1,
        name:'甜满箱',
        phrases: [
            '线上零食电商',
            '各国小吃零嘴应有尽有'
        ],
        top: 280,
        right: 20,
        left:null,
        bottom: null,
        align:'flex-end'
    },
    {
        page:2,
        name:'馋猫生活',
        phrases: [
            '馋猫生活全方位为您服务',
            '洗衣功能现已开通',
            '更多服务敬请期待'
        ],
        top: height/2,
        right: null,
        left: 20,
        bottom: null,
        align:'flex-start'
    }
]
import { cme_getLanguage, cme_getRegion,cme_getHomeIntroCount } from '../../Modules/Database';
export default class IntroPage extends Component {
    constructor(props){
        super(props);
        this.state={
            modalVisible:true,
            currentPage:0,
            FoodIntroOpacity: new Animated.Value(1),
            ECommerceIntroOpacity: new Animated.Value(0),
            LifeIntroOpacity: new Animated.Value(0),

            IntroOpacity: new Animated.Value(0),
            
        }
        language = cme_getLanguage();
    }
    componentDidMount(){
        Animated.timing(
            this.state.IntroOpacity,
            {
                toValue:0.7,
                duration:100,
                delay:700
            }
        ).start();
       
    }
    
    _renderFoodIntro(){
        let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/chanmaoUnpressed.png') : require('./image/houseEnglish/chanmaoUnpressed.png');
        return(
        
            <View style={{
                backgroundColor:'transparent',
                position:'absolute',
                bottom: 200*heightScale + headerHeight,
                marginTop:iconMargin,
                right:-40* sizeScale}}>
                    <Animated.Image style={{
                        height: picSize,
                        width: picSize,
                        opacity: this.state.FoodIntroOpacity
                        }}
                        
                        source={unpressedIcon} />
            </View>
              
                
      
        )
    }
    _renderECommerceIntro(){
        let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/eCommerceUnpressed.png') : require('./image/houseEnglish/eCommerceUnpressed.png');
        return(
            <View style={{
                position:'absolute',
                backgroundColor:'transparent',
                bottom: 50*sizeScale,
                marginBottom:iconMargin,
                left:-90 * sizeScale}}>
                    <Animated.Image style={{
                        height: picSize,
                        width: picSize,
                        opacity: this.state.ECommerceIntroOpacity
                        }}
                        source={unpressedIcon} />
            </View>
        )
    }
    _renderLifeIntro(){
        let unpressedIcon = language === 'chinese_simple' ? require('./image/houseChinese/lifeUnpressed.png') : require('./image/houseEnglish/lifeUnpressed.png');
        return(
            <View style={{
                backgroundColor:'transparent',
                position:'absolute',
                bottom:-40*sizeScale,
                marginBottom:iconMargin,
                right:-120 * sizeScale}}>
                <Animated.Image style={{
                            height: 310* sizeScale,
                            width: 310* sizeScale,
                            opacity: this.state.LifeIntroOpacity
                        }}
                        
                        source={unpressedIcon} />
              </View>
        )
    }
    _introManager(page){
        switch(page){
            case 1:
                Animated.parallel(
                    [
                        Animated.timing(
                            this.state.FoodIntroOpacity,
                            {
                                toValue:0,
                                duration:200
                            }
                        ),
                        Animated.timing(
                            this.state.ECommerceIntroOpacity,
                            {
                                toValue:1,
                                duration:200
                            }
                        ),
                ]).start();
                break;
                
            case 2:
                Animated.parallel(
                    [
                        Animated.timing(
                            this.state.ECommerceIntroOpacity,
                            {
                                toValue:0,
                                duration:200
                            }
                        ),
                        Animated.timing(
                            this.state.LifeIntroOpacity,
                            {
                                toValue:1,
                                duration:200
                            }
                        ),
                ]).start();
                break;
            default:
                this.props.dismissIntro();
                break;
        }
    }
    _turnPage(callback){
        this.setState({currentPage:this.state.currentPage+1},callback)
    }
    _renderSlogan(){
        const fontOpacity = this.state.IntroOpacity.interpolate(
            {
              inputRange:  [0, 0.7],
              outputRange: [0, 1],
            }
          )
        let sloganObj = Slogans.find((obj)=>{
            return obj.page == this.state.currentPage;
        })
        return(
            <Animated.View style={{
                    position:'absolute', 
                    top: sloganObj.top, 
                    left: sloganObj.left, 
                    right: sloganObj.right, 
                    bottom: sloganObj.bottom, 
                    alignItems:sloganObj.align,
                    opacity:fontOpacity}}>
                {sloganObj.phrases.map((phrase,index)=>{
                    return(
                        <Text key={index} style={{fontSize:20, color:'white', fontFamily:'NotoSans-Black'}}>{phrase}</Text>
                    )
                })}
            </Animated.View>
        )
    }
    _renderPageIndicator(){
        const indicatorOpacity = this.state.IntroOpacity.interpolate(
            {
              inputRange:  [0, 0.7],
              outputRange: [0, 1],
            }
          )
        return(
            <Animated.View style={[styles.indicatorView,{opacity:indicatorOpacity}]}>
                <View  style={[styles.indicatorStyle,{backgroundColor:this.state.currentPage === 0 ? 'white':'grey'}]}></View>
                <View  style={[styles.indicatorStyle,{backgroundColor:this.state.currentPage === 1 ? 'white':'grey'}]}></View>
                <View  style={[styles.indicatorStyle,{backgroundColor:this.state.currentPage === 2 ? 'white':'grey'}]}></View>
            </Animated.View>
        )
    }
    render(){
        
        return(     
            <TouchableWithoutFeedback  onPress={()=> {
                        this._turnPage(()=>this._introManager(this.state.currentPage))
                    }}
                >
                <View>
                    <Animated.View style={{width:width, height:height,backgroundColor:'black',opacity:this.state.IntroOpacity}}>
                        {this._renderFoodIntro()}
                        {this._renderECommerceIntro()}
                        {this._renderLifeIntro()}
                    </Animated.View> 
                        {this.state.currentPage < 3 && this._renderSlogan()}
                        { this._renderPageIndicator()}
                </View>
            </TouchableWithoutFeedback>       
           
        )
    }


}
const styles = StyleSheet.create({
    indicatorStyle: {
        width:10,
        height:10,
        borderRadius:5, 
        marginHorizontal:5
    },
    indicatorView:{
        position:'absolute',
        bottom:10,
        alignSelf:'center',
        alignItems:'center',
        width:60,
        height:20,
        backgroundColor:'transparent', 
        flexDirection:'row',
    }
  });