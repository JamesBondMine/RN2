//
//  BaseViewController.h
//  FilmDarling
//
//  Created by hipiao on 2017/11/16.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

//左右导航按钮回调
typedef void(^PassAction)(UIButton *button);

//刷新按钮回调
typedef void(^RefreshAction)();

//传值回调
typedef void(^PassStr)(NSString *);

@interface BaseViewController : UIViewController


@end
