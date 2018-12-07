/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

static NSString *appKey = @"98e5a98f01e05ac80c2f87f0";     //填写appkey
static NSString *channel = @"";    //填写channel   一般为nil
static BOOL isProduction = false;
@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
