//
//  BaseViewController.m
//  FilmDarling
//
//  Created by hipiao on 2017/11/16.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "BaseViewController.h"

@interface BaseViewController ()


@property (nonatomic, assign) CGFloat barHight;

@property (nonatomic, assign) CGRect navigationBarFrame;

@property (nonatomic, assign) CGRect backgroundViewFrame;

@end

@implementation BaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
  self.view.backgroundColor = [UIColor whiteColor];
  UIButton * btnBack = [UIButton buttonWithType:UIButtonTypeCustom];
  [btnBack addTarget:self action:@selector(back) forControlEvents:UIControlEventTouchUpInside];
  [btnBack setImage:[UIImage imageNamed:@"oeb"] forState:UIControlStateNormal];
  
  btnBack.frame = CGRectMake(0, 10, 40, 25);
  UIBarButtonItem * bar = [[UIBarButtonItem alloc]initWithCustomView:btnBack];
  self.navigationItem.leftBarButtonItem = bar;
  
}
-(void)back{
  
  [self.navigationController popViewControllerAnimated:YES];
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
