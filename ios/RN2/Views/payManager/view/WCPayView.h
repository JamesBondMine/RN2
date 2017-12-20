//
//  WCPayView.h
//  TruckDriver
//
//  Created by 钞王 on 2017/11/27.
//  Copyright © 2017年 apple. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface JSProxy : NSObject
@property (weak, nonatomic) id executor;
@end


@protocol WCPayViewDelegate <NSObject>

-(void)clickButtonClickAction:(int)tag;

@end

@interface WCPayView : UIView

//滑动
@property (nonatomic, strong) UIScrollView *scroller;

@property (nonatomic, weak) id<WCPayViewDelegate>delegate;

-(void)updateViewWith:(NSString *)title money:(NSString *)money titleA:(NSArray *)titleA imageA:(NSArray *)imageA;

@end
