//
//  WCPayManager.h
//  TruckDriver
//
//  Created by 钞王 on 2017/11/25.
//  Copyright © 2017年 apple. All rights reserved.
//

typedef enum : NSUInteger {
    WCPayViewTypeChoose,
    WCPayViewTypeInputPSW,
} WCPayViewType;

#import <Foundation/Foundation.h>
#import "WCPayView.h"

@interface WCPayManager : NSObject

+ (WCPayManager *)sharePayManager;

-(void)disMiss;

-(void)showPayViewWith:(NSString *)money payImage:(NSArray *)array titleArray:(NSArray *)titleArray delegate:(id)delegate;

-(void)scrollTo:(WCPayViewType)type animation:(BOOL)animation;

@end
