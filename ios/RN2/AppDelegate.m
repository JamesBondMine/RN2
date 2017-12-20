/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "HomeViewController.h"



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  self.window = [[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  HomeViewController * view = [[HomeViewController alloc]init];
  // 初始化Nav
  _nav = [[UINavigationController alloc] initWithRootViewController:view];
  [_nav.navigationBar setBackgroundImage:[UIImage imageNamed:@"navHeader"] forBarMetrics:UIBarMetricsDefault];
  // 将Nav设置为根视图
  self.window.rootViewController = _nav;
  [self.window makeKeyAndVisible];
  
  return YES;
}

@end
