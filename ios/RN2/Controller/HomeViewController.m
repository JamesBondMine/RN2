//
//  HomeViewController.m
//  RN2
//
//  Created by hipiao on 2017/10/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "HomeViewController.h"
#import "FirstViewController.h"
#import "SecondViewController.h"
#import "ReactView.h"
#import "RTModule.h"
#import "AppDelegate.h"


#import "ThirdViewController.h"


#import "WCPayManager.h"

@interface HomeViewController ()<WCPayViewDelegate>

@property (nonatomic , strong) CAShapeLayer * myShapeLayer;
@property (nonatomic , strong) UIView * redView;
@end

@implementation HomeViewController


-(void)clickButtonClickAction:(int)tag{
  
  NSLog(@"______________:%i",tag);
}
- (void)viewDidLoad {
    [super viewDidLoad];

  self.navigationItem.title = @"首页";
  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, JWidth, JHeight - 64) WithUrl:@"index.JSios"];
  [self.view addSubview:reactView];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doPushNotification:) name:@"RNOpenOneVC" object:nil];
  
}

- (void)doPushNotification:(NSNotification *)notification{
  NSLog(@"首页成功收到===>通知   \n————名称：%@\n————信息：%@",notification.name,notification.object);
  
  if ([notification.object isEqual:@"Second"]) {
    SecondViewController * one = [[SecondViewController alloc]init];
    [self.navigationController pushViewController:one animated:YES];
  }else{
    ThirdViewController * one = [[ThirdViewController alloc]init];
    [self.navigationController pushViewController:one animated:YES];
  }
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
