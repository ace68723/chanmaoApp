/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>

#import "RCCManager.h"

#import <React/RCTLinkingManager.h>
#import <CodePush/CodePush.h>
#import <AlipaySDK/AlipaySDK.h>

//for stripe
#import <Stripe/Stripe.h>


#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import "Intercom/Intercom.h"

#import "PointManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {

    JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];

    entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;

    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];

  }else if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {

    //可以添加自定义categories
    [JPUSHService registerForRemoteNotificationTypes:(UNAuthorizationOptionBadge |
                                                      UNAuthorizationOptionSound |
                                                      UNAuthorizationOptionAlert)
                                          categories:nil];
  }else {

    //categories 必须为nil
    [JPUSHService registerForRemoteNotificationTypes:(UNAuthorizationOptionBadge |
                                                      UNAuthorizationOptionSound |
                                                      UNAuthorizationOptionAlert)
                                          categories:nil];
  }

  [JPUSHService setupWithOption:launchOptions appKey:appKey
                        channel:nil apsForProduction:isProduction];


  NSURL *jsCodeLocation;
#ifdef DEBUG

    #ifdef DEBUG
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    #else
        jsCodeLocation = [CodePush bundleURL];
    #endif
#else
  jsCodeLocation = [CodePush bundleURL];
#endif

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  //for stripe configure pk_live_XQlHKvkQ8N9yPEHlslQvaS7U   pk_test_MsgqDWzRTfpOKl5mBwX0J0u2
  [[STPPaymentConfiguration sharedConfiguration] setAppleMerchantIdentifier:@"merchant.ca.chanmao.applypay"];
  [[STPPaymentConfiguration sharedConfiguration] setPublishableKey:@"pk_live_XQlHKvkQ8N9yPEHlslQvaS7U"];

  [Intercom setApiKey:@"ios_sdk-47e71241e84c55312de723dbc2be9d6872d09ea9" forAppId:@"hz77kaf5"];

  return YES;
}

- (void)application:(UIApplication *)application
      didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
       [JPUSHService registerDeviceToken:deviceToken];
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {

  // Required

  NSDictionary * userInfo = notification.request.content.userInfo;

  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {

    [JPUSHService handleRemoteNotification:userInfo];

    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];

  }

  completionHandler(UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以选择设置

}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {

  // Required

  NSDictionary * userInfo = response.notification.request.content.userInfo;

  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {

    [JPUSHService handleRemoteNotification:userInfo];

    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];

  }

  completionHandler();  // 系统要求执行这个方法

}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {

  //Optional

  NSLog(@"did Fail To Register For Remote Notifications With Error: %@", error);

}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  

}
- (void)applicationWillEnterForeground:(UIApplication *)application {
  [application setApplicationIconBadgeNumber:0];
  //  [application cancelAllLocalNotifications];
}





- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

@end
