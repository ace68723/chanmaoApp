/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import SboxSetting from './Components/SboxSetting/SboxSetting';
import SboxService from './Components/SboxSetting/SboxService/SboxService';
import SboxSearch from './Components/SboxSearch/SboxSearch';
import SboxCategory from './Components/SboxCategory/SboxCategory';
import SboxHome from './Components/SboxHome/SboxHome';
import SboxProductDetial from './Components/SboxProductDetial/SboxProductDetial';


import buildStyleInterpolator from 'buildStyleInterpolator';

export default class SboxRouter extends Component {
  _renderScene(route, navigator) {
      switch (route.id) {
          case 'SboxSetting':
            return <SboxSetting navigator={navigator}/>
          break
          case 'SboxService':
            return <SboxService navigator={navigator} />;
          break
          case 'SboxSearch':
            return <SboxSearch navigator={navigator}/>
          break
          case 'SboxProductDetial':
            return <SboxProductDetial navigator={navigator} pmid={route.pmid}/>
          break
          default:
            // return (
            //   <SboxCategory navigator={navigator}/>
            // );
            // return(
            //   <SboxSetting navigator={navigator}/>
            // )
            //
            return(
              <SboxHome navigator={navigator}/>
            )
            // return(
            //   <SboxProductDetial navigator={navigator}/>
            // )

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
       if(route.id == 'SboxProductDetial'){
        route.isPreViewStatic=true;
        return  {
             ...Navigator.SceneConfigs.FloatFromLeft,
             gestures: null,
             defaultTransitionVelocity: 100,
             animationInterpolators: {
               into: buildStyleInterpolator(NoTransition3),
               out: buildStyleInterpolator(NoTransition3),
             },
         }
      }else{
        return Navigator.SceneConfigs.PushFromRight
      }
    }

  render() {
    return (
      <Navigator
         initialRoute={{name: 'Home', index: 0}}
         renderScene={this._renderScene}
       />
    );
  }
}
