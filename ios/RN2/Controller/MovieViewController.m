//
//  MovieViewController.m
//  RN2
//
//  Created by hipiao on 2017/10/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "MovieViewController.h"

@interface MovieViewController ()

@end

@implementation MovieViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
//  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 64, JWidth, JHeight - 64) WithUrl:@"http://172.23.144.98:8081/index.yingbaoios.bundle?platform=ios&dev=true"];
//  [self.view addSubview:reactView];
  
  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, JWidth, JHeight - 64) WithUrl:@"JSCustom/index.yingbaoios"];
  [self.view addSubview:reactView];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doPushNotification:) name:@"loginVC" object:nil];
}
- (void)doPushNotification:(NSNotification *)notification{
  NSLog(@"首页成功收到===>通知   \n————名称：%@\n————信息：%@",notification.name,notification.object);

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
