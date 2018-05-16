//
//  CmOrder.m
//  chanmao
//
//  Created by Khalil on 2018/5/16.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CmOrder.h"

#define PARTNER_ID @"2088031360615403"
#define SELLER_ID @"api@rotating.ca"

@implementation CmOrder

+ (CmOrder *)getDataFromDictionary:(NSDictionary *)data{
  if (data){
    CmOrder *order = [[CmOrder alloc] init];
    return order;
  }
  return nil;
}

- (NSString *)getOrderStr{
  NSString *orderStr = @"";
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"partner=\"%@\"&", PARTNER_ID]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"seller_id=\"%@\"&", SELLER_ID]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"out_trade_no=\"%@\"&", @""]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"body=\"%@\"&", @""]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"total_fee=\"%@\"&", self.totalFee]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"return_url=\"%@\"&", @""]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"currency=\"%@\"&", @"CAD"]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"forex_biz=\"%@\"&", @"FP"]];
  [orderStr stringByAppendingString:[NSString stringWithFormat:@"notify_url=\"%@\"&", @""]];
  [orderStr stringByAppendingString:@"service=\"mobile.securitypay.pay\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"30m\"&show_url=\"m.alipay.com\"&product_code=\"NEW_WAP_OVERSEAS_SELLER\""];
  
  return orderStr;
}
@end
