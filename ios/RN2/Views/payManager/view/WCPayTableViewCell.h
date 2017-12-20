//
//  WCPayTableViewCell.h
//  TruckDriver
//
//  Created by 钞王 on 2017/11/27.
//  Copyright © 2017年 apple. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol WCPayTableViewCellDelegate <NSObject>

-(void)cellClickAction:(int)tag;

@end

@interface WCPayTableViewCell : UITableViewCell

-(void)updateCellWith:(NSString *)image title:(NSString *)title;

@property (nonatomic, weak) id<WCPayTableViewCellDelegate>delegate;

@end
