#import "cmApplePay.h"


#import <React/RCTEventDispatcher.h>
#import <AddressBook/AddressBook.h>                         //用户联系信息相关

@implementation cmApplePay
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(cmApplePay);

- (void)paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *)controller didAuthorizePayment:(PKPayment *)payment completion:(void (^)(PKPaymentAuthorizationStatus))completion {
  self.completion = completion;
  NSLog(@"pppppppppppppp: %@", payment.description);
  [[STPAPIClient sharedClient] createTokenWithPayment:payment completion:^(STPToken *token, NSError *error) {
    if (token == nil || error != nil) {
      // Present error to user...
      [self ErrorAlert:error.localizedDescription];
      self.rejecter( [NSString stringWithFormat: @"%ld", (long)error.code], error.localizedDescription, error);
      return;
    }
    
    NSString *tokenId = [token valueForKey:@"_tokenId"];
    self.resolver(tokenId);
    
  }];
}

- (void)paymentAuthorizationViewControllerDidFinish:(nonnull PKPaymentAuthorizationViewController *)controller {
  [self.rootViewController dismissViewControllerAnimated:YES completion:^{
    if(self.paymentSuceeded){
      // Show a receipt page...
      NSLog(@"Payment Success.");
    }
    self.callback(@[[NSNull null]]);
  }];
}



RCT_EXPORT_METHOD(createPayment:(NSDictionary *)data
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  self.resolver = resolve;
  self.rejecter = reject;
  NSString* validation= [self paymentValidation];
  if(validation != nil){
    [self ErrorAlert:validation];
    return;
  }
  
  NSString *merchantIdentifier = @"merchant.ca.chanmao.applypay";
  PKPaymentRequest *paymentRequest = [Stripe paymentRequestWithMerchantIdentifier:merchantIdentifier country:@"CA" currency:@"CAD"];
  
  NSDecimalNumber *subtotal =[NSDecimalNumber decimalNumberWithString:data[@"subtotal"]];
  NSDecimalNumber *shipping =[NSDecimalNumber decimalNumberWithString:data[@"shipping"]];
  NSDecimalNumber *tax = [NSDecimalNumber decimalNumberWithString:data[@"tax"]];
  NSDecimalNumber *tips = [NSDecimalNumber decimalNumberWithString:data[@"tips"]];
//  NSDecimalNumber *totalAmount = [NSDecimalNumber zero];
//  totalAmount = [totalAmount decimalNumberByAdding:subtotal];
//  totalAmount = [totalAmount decimalNumberByAdding:shipping];
//  totalAmount = [totalAmount decimalNumberByAdding:tax];
//   totalAmount = [totalAmount decimalNumberByAdding:tips];
   NSDecimalNumber *totalAmount = [NSDecimalNumber decimalNumberWithString:data[@"total"]];
  NSDecimalNumber *discountAmount = [NSDecimalNumber decimalNumberWithString:data[@"discount"]];
 
   NSArray *summaryItems = @[
                             [PKPaymentSummaryItem summaryItemWithLabel:@"SUBTOTAL" amount:subtotal],
                             [PKPaymentSummaryItem summaryItemWithLabel:@"SHIPPING" amount:shipping],
                             [PKPaymentSummaryItem summaryItemWithLabel:@"TAX" amount:tax],
                             [PKPaymentSummaryItem summaryItemWithLabel:@"SERVICE FEE" amount:tips]
                          ];
  if([discountAmount compare:[NSNumber numberWithFloat:0]] != NSOrderedSame){
    discountAmount = [NSDecimalNumber decimalNumberWithMantissa:[discountAmount doubleValue] exponent:-2 isNegative:YES];
    summaryItems = [summaryItems arrayByAddingObject:[PKPaymentSummaryItem summaryItemWithLabel:@"DISCOUNT" amount:discountAmount]];
  }
  summaryItems = [summaryItems arrayByAddingObject:[PKPaymentSummaryItem summaryItemWithLabel:@"CHANMAO" amount:totalAmount]];
  paymentRequest.paymentSummaryItems = summaryItems;
  if ([Stripe canSubmitPaymentRequest:paymentRequest]) {
    // Setup payment authorization view controll
    self.viewController = [[PKPaymentAuthorizationViewController alloc] initWithPaymentRequest:paymentRequest];
    self.viewController.delegate = self;
    
    dispatch_async(dispatch_get_main_queue(), ^{
      self.rootViewController = RCTPresentedViewController();
      if(self.viewController != nil){
        [self.rootViewController presentViewController:self.viewController animated:YES completion:nil];
      }else{
        NSLog(@"View Controller is not ready.");
      }
      
    });
    
  }else {
    // There is a problem with your Apple Pay configuration
    NSLog(@"Configuration Error.");
  }
  
}
RCT_EXPORT_METHOD(reCreatePayment:(NSDictionary *)data
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  self.resolver = resolve;
  self.rejecter = reject;
  NSString* validation= [self paymentValidation];
  if(validation != nil){
    [self ErrorAlert:validation];
    return;
  }
  
  NSString *merchantIdentifier = @"merchant.ca.chanmao.applypay";
  PKPaymentRequest *paymentRequest = [Stripe paymentRequestWithMerchantIdentifier:merchantIdentifier country:@"CA" currency:@"CAD"];
  
  NSDecimalNumber *tips = [NSDecimalNumber decimalNumberWithString:data[@"tips"]];
  NSDecimalNumber *totalAmount = [NSDecimalNumber decimalNumberWithString:data[@"total"]];
  
  NSDecimalNumber *subtotal = [totalAmount decimalNumberBySubtracting:tips];
  paymentRequest.paymentSummaryItems = @[
                                         [PKPaymentSummaryItem summaryItemWithLabel:@"SUBTOTAL" amount:subtotal],
                                         [PKPaymentSummaryItem summaryItemWithLabel:@"TIPS" amount:tips],
                                         [PKPaymentSummaryItem summaryItemWithLabel:@"CHANMAO" amount:totalAmount]
                                         ];
  
  if ([Stripe canSubmitPaymentRequest:paymentRequest]) {
    // Setup payment authorization view controller
    self.viewController = [[PKPaymentAuthorizationViewController alloc] initWithPaymentRequest:paymentRequest];
    self.viewController.delegate = self;
    
    dispatch_async(dispatch_get_main_queue(), ^{
      self.rootViewController = RCTPresentedViewController();
      if(self.viewController != nil){
        [self.rootViewController presentViewController:self.viewController animated:YES completion:nil];
      }else{
        NSLog(@"View Controller is not ready.");
      }
      
    });
    
  }else {
    // There is a problem with your Apple Pay configuration
    NSLog(@"Configuration Error.");
  }
  
}
RCT_EXPORT_METHOD(cancelcallback:(RCTResponseSenderBlock)callback){
   self.callback = callback;
}
RCT_EXPORT_METHOD(complete: (NSString *)paymentStatus
                  callback: (RCTResponseSenderBlock)callback)
{
 
  if ([paymentStatus isEqualToString: @"success"]) {
    self.paymentSuceeded = true;
    self.completion(PKPaymentAuthorizationStatusSuccess);
    
  } else {
     self.paymentSuceeded = false;
    self.completion(PKPaymentAuthorizationStatusFailure);
  }
  
  callback(@[[NSNull null]]);
}
-(void)ErrorAlert:(NSString *)errorMessage{
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"Oops!"
                                                                 message:errorMessage
                                                          preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
                                                        handler:^(UIAlertAction * action) {
    self.callback(@[[NSNull null]]);
  }];
  
  [alert addAction:defaultAction];
  dispatch_async(dispatch_get_main_queue(), ^{
    self.rootViewController = RCTPresentedViewController();
    [self.rootViewController presentViewController:alert animated:YES completion:nil];
    
  });
}
-(NSString *)paymentValidation{
  
  if (![PKPaymentAuthorizationViewController class]) {
    //PKPaymentAuthorizationViewController需iOS8.0以上支持
    return @"操作系统不支持ApplePay，请升级至9.0以上版本，且iPhone6以上设备才支持";
    //return false;
  }
  //检查当前设备是否可以支付
  if (![PKPaymentAuthorizationViewController canMakePayments]) {
    //支付需iOS9.0以上支持
    return @"设备不支持ApplePay，请升级至9.0以上版本，且iPhone6以上设备才支持";
    //return false;
  }
  NSArray *supportedNetworks = @[PKPaymentNetworkAmex, PKPaymentNetworkMasterCard,PKPaymentNetworkVisa,PKPaymentNetworkChinaUnionPay];
  if (![PKPaymentAuthorizationViewController canMakePaymentsUsingNetworks:supportedNetworks]) {
    return @"没有绑定支付卡";
    // return false;
  }
  return nil;
}




@end
