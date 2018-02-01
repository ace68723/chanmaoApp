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

  scrollTo(position) {
    // this.scrollView.scrollTo(position)
    this.refs.CardView._component.scrollTo(position)
  }
  render() {
    if (Platform.OS === 'ios') {
      return (
        <Animated.ScrollView
            scrollEventThrottle={16}
            ref={'CardView'}
            onScroll={this.props.onScroll}
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
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}>
          {this.props.children}
        </Animated.ScrollView>
      );
    } else {
      return(
        <ViewPagerAndroid
            scrollEventThrottle={16}
            ref={'CardView'}
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
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}>
          {this.props.children}
        </ViewPagerAndroid>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollPage: {
    width: width,
    padding: 20,
  },
});
