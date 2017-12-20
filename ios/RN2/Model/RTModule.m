//
//  RTModule.m
//  RN2
//
//  Created by hipiao on 2017/10/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RTModule.h"

@implementation RTModule

RCT_EXPORT_MODULE(RTModule)
//RN跳转原生界面
RCT_EXPORT_METHOD(RNOpenOneVC:(NSString *)msg){

  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    
    if([msg hasPrefix:@"Third"] || [msg isEqualToString:@"OK"]){
      [[NSNotificationCenter defaultCenter]postNotificationName:@"SecondViewController" object:msg];
    }else if([msg hasPrefix:@"yingbao"]){
      [[NSNotificationCenter defaultCenter]postNotificationName:@"yingbaoVC" object:msg];
    }else if([msg hasPrefix:@"login"]){
      [[NSNotificationCenter defaultCenter]postNotificationName:@"loginVC" object:msg];
    }else if([msg hasPrefix:@"photos"]){
      [[NSNotificationCenter defaultCenter]postNotificationName:@"photos" object:msg];
    }else if([msg hasPrefix:@"back"]){
      [[NSNotificationCenter defaultCenter]postNotificationName:@"SecondViewController" object:msg];
    }else{
      [[NSNotificationCenter defaultCenter]postNotificationName:@"RNOpenOneVC" object:msg];
    }
  });
}

@end

