//
//  LoginViewController.m
//  RN2
//
//  Created by hipiao on 2017/10/26.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LoginViewController.h"
#import "ReactView.h"

#import "MovieViewController.h"
#import "CinemaViewController.h"

@interface LoginViewController ()

@end

@implementation LoginViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  self.navigationItem.title = @"Login";
  self.view.backgroundColor = [UIColor whiteColor];
  
//  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 64, JWidth, JHeight - 64) WithUrl:@"http://172.23.144.98:8081/index.loginios.bundle?platform=ios&dev=true"];
//  [self.view addSubview:reactView];
  
  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, JWidth, JHeight - SafeTHeight) WithUrl:@"index.loginios"];
  [self.view addSubview:reactView];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doPushNotification:) name:@"loginVC" object:nil];
}
- (void)doPushNotification:(NSNotification *)notification{
  
  if ([notification.object hasSuffix:@"OK"]) {
    [SVProgressHUD showWithStatus:@"登录中"];
    [self performSelector:@selector(loginSuccessMotherd) withObject:nil afterDelay:2];
    NSArray * loginArray = [notification.object componentsSeparatedByString:@"T0T"];
    NSLog(@"登录   \n————用户名：%@\n————密码：%@",loginArray[1],loginArray[2]);
  }
}
-(void)loginSuccessMotherd{
  
  [SVProgressHUD showSuccessWithStatus:@"登录成功"];
  [self performSelector:@selector(loginStatesDissmiss) withObject:nil afterDelay:1];

}
-(void)loginStatesDissmiss{

  [SVProgressHUD dismiss];
  
  MovieViewController * movie = [[MovieViewController alloc]init];
  movie.title = @"首页";
  movie.tabBarItem.image=[UIImage imageNamed:@"首页"];
  movie.tabBarItem.badgeValue=@"123";
  CinemaViewController * cinema = [[CinemaViewController alloc]init];
  cinema.tabBarItem.image=[UIImage imageNamed:@"照片"];
  cinema.tabBarItem.badgeValue=@"321";
  cinema.title = @"照片反馈";

  UITabBarController * tab = [[UITabBarController alloc]init];
  tab.viewControllers = @[movie,cinema];
  [self.navigationController pushViewController:tab animated:YES];
  
  //[self presentViewController:tab animated:YES completion:nil];

  
//  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 64, JWidth, JHeight - 64) WithUrl:@"http://172.23.144.98:8081/Tabbar/tabar.bundle?platform=ios&dev=true"];
//  [self.view addSubview:reactView];
  
  


}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
