//
//  ReactView.h
//  RN2
//
//  Created by hipiao on 2017/10/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ReactView : UIView

- (instancetype)initWithFrame:(CGRect)frame WithUrl:(NSString *)urlStr;

- (instancetype)initWithFrame:(CGRect)frame WithFilePath:(NSString *)filePath;
@end
