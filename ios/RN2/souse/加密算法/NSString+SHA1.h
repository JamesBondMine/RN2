//
//  NSString+SHA1.h
//  VCFilm
//
//  Created by hipiao on 2017/4/14.
//  Copyright © 2017年 Hipiao. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (SHA1)

- (NSString *)hMAC_SHA1_withSecretKey:(NSString *)secretKey;

@end
