#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
#import <Stripe/Stripe.h>
#import <PassKit/PassKit.h>                                 //用户绑定的银行卡信息
#import <PassKit/PKPaymentAuthorizationViewController.h>    //Apple pay的展示控件
#import <React/RCTUtils.h>
#import <React/RCTEventEmitter.h>

@interface cmApplePay : NSObject <RCTBridgeModule, PKPaymentAuthorizationViewControllerDelegate>
@property (nonatomic, strong) PKPaymentAuthorizationViewController *viewController;
@property (nonatomic, strong) UIViewController *rootViewController;
@property (nonatomic, strong) PKContact *contact;
@property (nonatomic, strong) PKPaymentRequest *payRequest;
@property (nonatomic, strong) RCTEventEmitter *eventEmitter;
@property (nonatomic, copy) void (^completion)(PKPaymentAuthorizationStatus);
@property (nonatomic) Boolean paymentSuceeded;
@property (nonatomic, strong) RCTPromiseResolveBlock resolver;
@property (nonatomic, strong) RCTPromiseRejectBlock rejecter;
@property (nonatomic, strong) RCTResponseSenderBlock callback;
//private methods

-(void)ErrorAlert:(NSString *)errorMessage;
-(NSString *)paymentValidation:(NSArray *)supportedNetworks;
-(void)paymentAuthorizationViewController:(PKPaymentAuthorizationViewController *)controller
                      didAuthorizePayment:(PKPayment *)payment
                               completion:(void (^)(PKPaymentAuthorizationStatus status))completion;
-(void)paymentAuthorizationViewControllerDidFinish:(PKPaymentAuthorizationViewController *)controller;
-(NSString *)paymentValidation;
@end
