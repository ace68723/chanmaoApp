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


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  //for stripe configure pk_live_XQlHKvkQ8N9yPEHlslQvaS7U   pk_test_MsgqDWzRTfpOKl5mBwX0J0u2
  [[STPPaymentConfiguration sharedConfiguration] setPublishableKey:@"pk_live_XQlHKvkQ8N9yPEHlslQvaS7U"];
  return YES;
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
