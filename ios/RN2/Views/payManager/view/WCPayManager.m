//
//  WCPayManager.m
//  TruckDriver
//
//  Created by 钞王 on 2017/11/25.
//  Copyright © 2017年 apple. All rights reserved.
//

#import "WCPayManager.h"
#import "AppDelegate.h"
@interface WCPayManager ()

@property (nonatomic, strong) UIWindow *window;

@property (nonatomic, strong) WCPayView *payView;

@end

@implementation WCPayManager

+ (WCPayManager *)sharePayManager {
    static dispatch_once_t once;
    
    static WCPayManager *sharePayManager;
#if !defined(SV_APP_EXTENSIONS)
    dispatch_once(&once, ^{
        sharePayManager = [[self alloc] init];
        
    });
#else
    dispatch_once(&once, ^{
        sharePayManager = [[self alloc] init];
        
    });
#endif
    return sharePayManager;
}
-(void)showPayViewWith:(NSString *)money payImage:(NSArray *)array titleArray:(NSArray *)titleArray delegate:(id)delegate;
{
  

  AppDelegate * de = (AppDelegate *)[UIApplication sharedApplication].delegate;
  UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(disMiss)];
  [de.window addGestureRecognizer:tap];
  
  
  self.payView = [[WCPayView alloc] initWithFrame:CGRectMake(0, JHeight, JWidth, JHeight)];
  self.payView.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.67];
  self.payView.delegate = delegate;
  [_payView updateViewWith:@"请选择支付方式" money:money titleA:titleArray imageA:array];
   [de.window addSubview:self.payView];
   self.window = de.window;
  
  
  [UIView animateWithDuration:0.55 animations:^{
    self.payView.frame = CGRectMake(0, 0, JWidth, JHeight);
  }];
}
-(void)disMiss
{
  
  [UIView animateWithDuration:0.55 animations:^{
    self.payView.frame = CGRectMake(0, JHeight, JWidth, JHeight);
    
  } completion:^(BOOL finish){
    [self.payView removeFromSuperview];
    
  }];
  

}

//- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {
//
//
//}


@end
