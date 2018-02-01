/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Login from './Login/Login';
import Tabs from './Tabs/Tabs';
import Checkout from './Restaurant/Checkout';
import MenuSearch from './Restaurant/MenuSearch';
import AddressList from './Address/AddressList';
import AdView from './General/AdView';
import AboutUs from './Setting/AboutUs';
import Menu from './Restaurant/Menu';
import buildStyleInterpolator from 'buildStyleInterpolator';
import LogoAnimationView from './Logo/LogoAnimationView';

import AuthAction from '../Actions/AuthAction';
import Auth from '../Modules/AuthModule/Auth';
import AuthStore from '../Stores/AuthStore';

export default class Router extends Component {
  constructor(){
    super()
    this.state={
      isAuthed:true,
      renderCover:false,
      renderTabs:true,
      renderLogin:false,
      renderLogo:false,
      shortLogo:false,
    }
    this._goToHome = this._goToHome.bind(this);
    this._renderLoginScene = this._renderLoginScene.bind(this);
    this._renderLogoScene = this._renderLogoScene.bind(this);
    this._handleLogoUnmount = this._handleLogoUnmount.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  _renderScene(route, navigator) {

      switch (route.id) {
          case 'Address':
            return <Address navigator={navigator}  />;
          break;
          case 'AddressList':
            return <AddressList navigator={navigator}  />;
          break;
          case 'Menu':
            route.restaurant.imgUrl = {uri:route.restaurant.mob_banner}
            return <Menu navigator={navigator}
                         py={route.py}
                         restaurant={route.restaurant}
                         reorderItems={route.reorderItems}
                         message={route.message}/>;
          break;
          case 'RestaurantTab':
            return <RestaurantTab navigator={navigator}/>;
          break;
          case 'MenuSearch':
            return <MenuSearch navigator={navigator} restaurant={route.restaurant}/>;
          break;
          case 'Confirm':
            return <Confirm navigator={navigator} restaurant={route.restaurant}/>;
          break;
          case 'Checkout':
            return <Checkout navigator={navigator} restaurant={route.restaurant}/>;
          break;
          case 'AddInfo':
            return <AddInfo navigator={navigator} placeId={route.placeId}/>;
          break
          case 'ArticleHome':
            return <ArticleHome navigator={navigator} />;
          break
          case 'BroadcastHome':
            return <BroadcastHome navigator={navigator} />;
          break
          case 'ActivityHome':
            return <ActivityHome navigator={navigator} />;
          case 'AuthorArticle':
            return <AuthorArticle navigator={navigator}
                                  author={route.author}
                                  category={route.category}
                                  title={route.title}/>;
          break
          case 'JoinUs':
            return <JoinUs navigator={navigator} category={route.category} />;
          break
          case 'WebView':
            return <WebView navigator={navigator} article={route.article} />;
          break
          case 'CommentList':
            return <CommentList navigator={navigator} pid={route.pid}/>;
          break
          case 'AboutUs':
            return <AboutUs navigator={navigator}/>;
          break
          case 'AdView':
            return <AdView  navigator={navigator} url={route.url}/>;
          default:
            return (
              <Tabs
                {...{
                  message:route.message,
                  navigator:navigator,
                  handleBackToHome:this.props.handleBackToHome
                }}
              />
            );

        }
      }

  _transition(route,routeStack){
      const NoBackSwipe ={
          ...Navigator.SceneConfigs.FloatFromBottom,
            gestures: {
              pop: {},
            },
      };
      const NoTransition1 = {
        opacity: {
          // value:1,
          // type:'constant',
          from: 0,
          to: 1,
          min: 0.3,
          max: 1,
          type: 'linear',
          extrapolate: false,
          round: 100,
        },
      };
      const NoTransition2 = {
        opacity: {
          // value:1,
          // type:'constant',
          from: 1,
          to: 0,
          min: 0.5,
          max: 1,
          type: 'linear',
          extrapolate: false,
          round: 100,
        },
      };
      const NoTransition3 = {
        opacity: {
          value:1,
          type:'constant',

        },
      };
      if(route.id =='Confirm' ||
         route.id == 'RestaurantTab' ||
         route.id == 'Checkout'||
         route.id == 'AddressList' ||
         route.id == 'AdView'
       ){
        return NoBackSwipe
      }else if(route.id == 'Menu'||
               route.id == 'MenuSearch' ){
        route.isPreViewStatic=true;
        return  {
             ...Navigator.SceneConfigs.FloatFromLeft,
             gestures: null,
             defaultTransitionVelocity: 2000,
             animationInterpolators: {
               into: buildStyleInterpolator(NoTransition3),
               out: buildStyleInterpolator(NoTransition3),
             },
         }
      }else{
        return Navigator.SceneConfigs.PushFromRight
      }
    }
  _renderTabs(){
    return (
        <Navigator
           initialRoute={{name: 'Home', index: 0}}
           renderScene={this._renderScene}
           configureScene={this._transition}
         />
      );
  }
  _goToHome(){
    this.setState({
      isAuthed:true,
      renderTabs:true,
    })
    setTimeout(()=> {
      this.setState({
        renderLogin:false,
      })
    }, 3500);
  }
  _handleLogoUnmount(){
    this.setState({
      renderLogo:false,
    })
  }
  _renderLoginScene(route, navigator) {
      switch (route.id) {
        case 'AdView':
          return <AdView  navigator={navigator} url={route.url}/>;
        default:
          return (
            <Login
              goToHome = {this._goToHome}
              navigator={navigator}
            />
          );
      }
  }
  _renderLogin(){
    return (
      <View style={{position:'absolute',top:0,left:0,bottom:0,right:0,}}>
        <Navigator
           initialRoute={{name: 'Home', index: 0}}
           renderScene={this._renderLoginScene}
           configureScene={this._transition}
         />
      </View>

      );
  }
  _renderLogoScene(route, navigator) {
      switch (route.id) {
        case 'AdView':
          return <AdView  navigator={navigator} url={route.url} unmount={this._handleLogoUnmount}/>;
        default:
          return (
          <LogoAnimationView unmount={this._handleLogoUnmount} shortLogo={this.state.shortLogo} navigator={navigator}/>
          );
      }
  }
  _renderLogo(){
    return (
      <View style={{position:'absolute',top:0,left:0,bottom:0,right:0,}}>
        <Navigator
           initialRoute={{name: 'Logo', index: 0}}
           renderScene={this._renderLogoScene}
           configureScene={this._transition}
         />
      </View>

      );
  }
  _renderCover(){
    return(
      <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'#ffffff',alignItems:'center',justifyContent:'center',}}>
        <Image source={require('./Image/Loading_dots_orange.gif')}  style={{width:45,height:15}}/>
      </View>
    )
  }

  // {this.state.renderLogo ? this._renderLogo(): null}
  render() {
    return (
      <View style={styles.container}>
        {this.state.renderTabs? this._renderTabs():null}
        {this.state.renderLogin? this._renderLogin():null}
        {this.state.renderCover ? this._renderCover(): null}
      </View>
    );
  }
}
  // <AddressList />
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
