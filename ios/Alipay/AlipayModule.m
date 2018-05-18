//
//  AlipayModule.m
//  chanmao
//
//  Created by Khalil on 2018/5/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AlipayModule.h"
#import <AlipaySDK/AlipaySDK.h>
#import "Order.h"
#import "CmOrder.h"

@implementation AlipayModule

RCT_EXPORT_METHOD(pay:(NSString *)orderInfo
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){

  NSLog(@"orderInfo %@", orderInfo);
  NSString *appScheme = @"chanmao-alipay";
  [[AlipaySDK defaultService] payOrder:orderInfo fromScheme:appScheme callback:^(NSDictionary *resultDic) {
    NSLog(@"ggg %@", resultDic);
    resolve(resultDic);
  }];
}

RCT_EXPORT_MODULE(Alipay);

@end
