/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  Platform,
  ScrollView,
  StyleSheet,
  ViewPagerAndroid,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const xOffset = new Animated.Value(0);

export default class CardView extends Component {
  constructor(props) {
    super(props)
    this.scrollTo = this.scrollTo.bind(this);
  }
  componentDidMount() {
    setTimeout( () => {
      this.autoplay();
    }, 6000);
  }
  onScrollBegin = e => {
    this.internals.isScrolling = true
  }
  scrollTo(position) {
    // this.scrollView.scrollTo(position)
    this.refs.CardView._component.scrollTo(position)
  }
  onScrollEnd = e => {
    // update scroll state
    this.internals.isScrolling = false
    // this.autoplay()
    // this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
    //   this.autoplay()
    //   this.loopJump()
    //
    //   // if `onMomentumScrollEnd` registered will be called here
    //   this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e, this.fullState(), this)
    // })
  }
  autoplay() {
    // if(this.internals.isScrolling) return;
    // const scrollPosition = (this.index + 1() * width;
    // this.refs.scrollView && this.refs.CardView._component.scrollTo({x: scrollPosition, y: 0, animated: true})
    // this.refs.CardView._component.scrollTo({ width, 0, animated })
  }
  render() {
    if (Platform.OS === 'ios') {
      return (
        <Animated.ScrollView
            scrollEventThrottle={16}
            ref={'CardView'}
            onScroll={this.props.onScroll}
            horizontal
            onScrollBeginDrag={this.onScrollBegin}
            onMomentumScrollEnd={this.onScrollEnd}
            style={{
              // position: 'absolute',
              // top: 20,
              // left: 20,
              // right: 20,
              // width: null,
              // height: 200-30,
            }}
            onMomentumScrollEnd={(e) => {
              const offset = e.nativeEvent.contentOffset;
              if(offset) {
                const page = Math.round(offset.x / width);
                if(this.page != page) {
                  this.page = page;
                  // this.props.onPageChange(this.page);
                }
              }
            }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
          {this.props.children}
        </Animated.ScrollView>
      );
    } else {
      return(
        <ViewPagerAndroid
            scrollEventThrottle={16}
            ref={(ref) => this.scrollView = ref._component}
            horizontal
            onMomentumScrollEnd={(e) => {
              const offset = e.nativeEvent.contentOffset;
              if(offset) {
                const page = Math.round(offset.x / width);
                if(this.page != page) {
                  this.page = page;
                  this.props.onPageChange(this.page);
                }
              }
            }}
            pagingEnabled
            showsHorizontalScrollIndicator={false}>
          {this.props.children}
        </ViewPagerAndroid>
      )
    }
  }
}
