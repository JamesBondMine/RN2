//
//  NSString+SHA1.m
//  VCFilm
//
//  Created by hipiao on 2017/4/14.
//  Copyright © 2017年 Hipiao. All rights reserved.
//

#import "NSString+SHA1.h"

#import <CommonCrypto/CommonHMAC.h>
#import <CommonCrypto/CommonCrypto.h>
#import "Base64.h"

@implementation NSString (SHA1)

- (NSString *)hMAC_SHA1_withSecretKey:(NSString *)secretKey {
    NSData * textData = [self dataUsingEncoding:NSUTF8StringEncoding];
    NSData * keyData  = [secretKey dataUsingEncoding:NSUTF8StringEncoding];
    
    unsigned char hMAC[CC_SHA1_DIGEST_LENGTH];
    
    CCHmac(kCCHmacAlgSHA1, [keyData bytes], [keyData length], [textData bytes], [textData length], hMAC);
    
    NSData * hMacData = [NSData dataWithBytes:hMAC length:CC_SHA1_DIGEST_LENGTH];
    
    NSString * hMacBase64EncodedString = [hMacData base64EncodedStringWithOptions:(NSDataBase64EncodingOptions)0];
    
    return hMacBase64EncodedString;
}

@end
