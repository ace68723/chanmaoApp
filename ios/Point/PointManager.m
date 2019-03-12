//
//  PointManager.m
//  chanmao
//
//  Created by Khalil on 2019-03-12.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "PointManager.h"

@implementation PointManager

+ (id)sharedInstance {
 static PointManager *sharedInstance = nil;
 static dispatch_once_t onceToken;
 dispatch_once(&onceToken, ^{
    sharedInstance = [[self alloc] init];
 });
 return sharedInstance;
}

- (id)init {
 if (self = [super init]) {}
 return self;
}

- (void)showReceivedNotification: (NSDictionary *)data{
  NSLog(@"%@", data);
  [RKDropdownAlert title:@"this is a title" message:@"this is a one line message"];
  [RKDropdownAlert show];
}

- (BOOL)dropdownAlertWasTapped:(RKDropdownAlert*)alert {
  return true;
}

- (BOOL)dropdownAlertWasDismissed {
  return true;
}

@end
