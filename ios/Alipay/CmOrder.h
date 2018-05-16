//
//  CmOrder.h
//  chanmao
//
//  Created by Khalil on 2018/5/16.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CmOrder : NSObject

//该笔订单的资金总额，单位为RMB(Yuan)。取值范围为[0.01，100000000.00]，精确到小数点后两位。
//payment amount in foreign currency ,not null
@property (nonatomic, copy) NSString *totalFee;

//商户网站商品对应的唯一订单号。
//merchant order no,the unique transaction ID specified in merchant system ,not null
@property (nonatomic, copy) NSString *outTradeNO;

/*********************************商品相关commodity-related*********************************/

@property (nonatomic, copy) NSString *subject;

//对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。
//product description ,nullable
@property (nonatomic, copy) NSString *body;


- (NSString *)getOrderStr;
@end
