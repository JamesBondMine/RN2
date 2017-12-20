//
//  SecondViewController.m
//  RN2
//
//  Created by hipiao on 2017/10/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SecondViewController.h"
#import "ThirdViewController.h"
#import "AppDelegate.h"
#import "ReactView.h"


@interface SecondViewController ()

@end

@implementation SecondViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  self.navigationItem.title = @"第二页";
  [SVProgressHUD showWithStatus:@"加载中"];
  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, JWidth, JHeight - 64) WithUrl:@"JSCustom/index.ios2"];
  [self.view addSubview:reactView];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doPushNotification:) name:@"SecondViewController" object:nil];
}
- (void)doPushNotification:(NSNotification *)notification{
  NSLog(@"第二页成功收到===>通知   \n————名称：%@\n————信息：%@",notification.name,notification.object);
  
  if ([notification.object hasPrefix:@"OK"]) {
    [SVProgressHUD dismiss];
  }else if ([notification.object hasPrefix:@"ThirdRefresh"]) {
    self.navigationController.navigationBarHidden = YES;
    ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, JWidth, JHeight) WithUrl:@"Tabbar/tabar"];
    [self.view addSubview:reactView];
  }else if ([notification.object hasPrefix:@"ThirdBanner"]) {
    ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, JWidth, JHeight - 64) WithUrl:@"JSCustom/HomePage"];
    [self.view addSubview:reactView];
  }else if ([notification.object hasPrefix:@"ThirdMainScreen"]) {
    ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, JWidth, JHeight - 64) WithUrl:@"JSCustom/MainScreen"];
    [self.view addSubview:reactView];
  }else if ([notification.object hasPrefix:@"back"]) {
    [self.navigationController popViewControllerAnimated:YES];
  }else{
    ThirdViewController * one = [[ThirdViewController alloc]init];
    [self.navigationController pushViewController:one animated:YES];
  }
}

-(void)viewDidDisappear:(BOOL)animated{
  
  [SVProgressHUD dismiss];

}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
