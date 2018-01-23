/* @flow */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Content from './Content';
export default class Service extends Component {
  constructor() {
    super();
    this.state = {
      sectionList: [
        {
          sectionType: 1,
          sectionParam: {
            image: require('./Images/消息.png'),
            name: '联系客服',
            description: '(Mon-Fri 9:30a.m.-6:30p.m.)',
          },
          naviType: 2,
          naviParam: '',
        }, {
          sectionType: 2,
          sectionParam: {
            title: '自助服务',
            optionList: [
              {
                title: '订单类',
                image: require('./Images/问题-订单类.png'),
                suboptionList: [
                  {
                    name: '下单流程',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '修改订单',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '查询订单',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '取消订单',
                    naviType: 2,
                    naviParam: '',
                  },
                ],
              }, {
                title: '配送类',
                image: require('./Images/问题-配送类.png'),
                suboptionList: [
                  {
                    name: '配送时间',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '配送方式',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '配送范围',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '配送费用',
                    naviType: 2,
                    naviParam: '',
                  }
                ],
              }, {
                title: '售后类',
                image: require('./Images/问题-售后类.png'),
                suboptionList: [
                  {
                    name: '发票收据',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '退换货品',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '包裹遗失',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '申请退款',
                    naviType: 2,
                    naviParam: '',
                  },{
                    name: '货品缺失和损坏',
                    naviType: 2,
                    naviParam: '',
                  },
                ],
              },
            ],
          },
        }, {
          sectionType: 1,
          sectionParam: {
            image: require('./Images/客服.png'),
            name: '联系客服',
            description: '(Mon-Fri 9:30a.m.-6:30p.m.)',
          },
          naviType: 2,
          naviParam: '',
        },
      ],
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor:'#ffffff', }}>
        <Content sectionList={this.state.sectionList}/>
      </View>
    );
  }
}
