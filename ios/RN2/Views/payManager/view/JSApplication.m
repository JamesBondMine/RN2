//
//  JSApplication.m
//  RN2
//
//  Created by hipiao on 2017/11/30.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "JSApplication.h"

NSString *const notiScreenTouch = @"notiScreenTouch";

@implementation JSApplication


- (void)sendEvent:(UIEvent *)event
{
  if (event.type == UIEventTypeTouches) {
    if ([[event.allTouches anyObject] phase] == UITouchPhaseBegan) {
      [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:notiScreenTouch object:nil userInfo:[NSDictionary dictionaryWithObject:event forKey:@"data"]]];
    }
  }
  [super sendEvent:event];
}

@end
