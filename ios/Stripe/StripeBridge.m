//
//  StripeBridge.m
//  chanmao
//
//  Created by yicheng huang on 2017-08-29.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "StripeBridge.h"
#import <Stripe/Stripe.h>
@implementation StripeBridge
  RCT_EXPORT_MODULE();

//  RCT_REMAP_METHOD(pay:(NSString *)name location:(NSString *)location)
//  {
//
//  }
//RCT_EXPORT_METHOD(checkEmail: (NSString *)email
//                  resolver:(RCTPromiseResolveBlock)resolve
//                  rejecter:(RCTPromiseRejectBlock)reject)
//{
//  /* ... */
//}

RCT_EXPORT_METHOD(pay:(NSString *)cardNumber
                  expMonth:(NSInteger *)expMonth
                  expYear:(NSInteger *)expYear
                  cvc:(NSString *)cvc
                  postal:(NSString *)postal
                  name:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
  {
    STPCardParams *cardParams = [[STPCardParams alloc] init];
    cardParams.number = cardNumber;
    cardParams.expMonth = (NSUInteger)expMonth;
    cardParams.expYear =(NSUInteger)expYear;
    cardParams.cvc = cvc;
    cardParams.name = name;
    cardParams.address.postalCode = postal;
    [[STPAPIClient sharedClient] createTokenWithCard:cardParams completion:^(STPToken *token, NSError *error) {
      if (token == nil || error != nil) {
        // Present error to user...
//        printf("%s\n", [error.localizedDescription UTF8String]);
        reject(@"no_token", @"There were no token",error);
      } else {
        NSString *tokenId = [token valueForKey:@"_tokenId"];
        resolve(tokenId);
      }

    }];

  }


@end
