//
//  ReactView.m
//  RN2
//
//  Created by hipiao on 2017/10/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "ReactView.h"


@implementation ReactView

- (instancetype)initWithFrame:(CGRect)frame WithUrl:(NSString *)urlStr
{
  
  //http://ozsp8z7w0.bkt.clouddn.com/index.JSios.js
  
  
  NSURL * jsCodeL111ocation;
  
  jsCodeL111ocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"]; //  本地
  
  jsCodeL111ocation = [NSURL URLWithString:@"http://192.168.2.13:8081/index.ios.bunfsfsfdle?ffsf=ios&dev=fsfs"];  // URL
  
  
  if (self = [super initWithFrame:frame]) {
    NSURL * jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"%@%@.bundle?platform=ios&dev=true",JSIP,urlStr]];
    NSURL * url = [NSURL URLWithString:@"http://ozsp8z7w0.bkt.clouddn.com/index.JSios.js"];
    self.backgroundColor = [UIColor whiteColor];
    // 这里的moduleName一定要和下面的index.ios.js里面的注册一样
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                         moduleName:@"RN2"
                                                  initialProperties:nil
                                                      launchOptions:nil];
    [rootView setFrame:self.bounds];
    [self addSubview:rootView];
  }
  return self;
}

-(void)setViewStyle:(UIView *)view with:(CGSize)w{
  UIBezierPath * maskPath = [UIBezierPath bezierPathWithRoundedRect:CGRectMake(0, 0, w.width, w.height)
                                   byRoundingCorners:(UIRectCornerTopLeft|UIRectCornerTopRight|UIRectCornerBottomLeft|UIRectCornerBottomRight)
                                         cornerRadii:CGSizeMake(4, 4)];
  CAShapeLayer * maskLayer = [CAShapeLayer layer];
  maskLayer.frame  = CGRectMake(0, 0, w.width, w.height);
  maskLayer.path   = maskPath.CGPath;
  view.layer.mask  = maskLayer;
  [view.layer setMasksToBounds:YES];
}
- (instancetype)initWithFrame:(CGRect)frame WithFilePath:(NSString *)filePath
{
  if (self = [super initWithFrame:frame]) {
    NSURL * jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:filePath fallbackResource:nil];
    // 这里的moduleName一定要和下面的index.ios.js里面的注册一样
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                         moduleName:@"RN2"
                                                  initialProperties:nil
                                                      launchOptions:nil];
    rootView.frame = self.bounds;
    [self addSubview:rootView];
  }
  return self;
}



// resize the original image and return a new UIImage object
+ (UIImage *) resizeImage:(UIImage *)image size:(CGSize)newSize {
  UIGraphicsBeginImageContext(newSize);
  [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
  UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return newImage;
}
- (void)drawRect:(CGRect)rect {

  //[self setReactMotherd];
  
}
-(void)setReactMotherd{
  //矩形贝塞尔曲线
  UIBezierPath * bezierPath_rect = [UIBezierPath bezierPathWithRect:CGRectMake(30, 50, 100, 100)];
  [bezierPath_rect moveToPoint:CGPointMake(60, 60)];
  [bezierPath_rect addLineToPoint:CGPointMake(80, 80)];
  [bezierPath_rect addLineToPoint:CGPointMake(60, 90)];
  bezierPath_rect.lineCapStyle = kCGLineCapButt;  //端点类型
  bezierPath_rect.lineJoinStyle = kCGLineJoinMiter;  //线条连接类型
  bezierPath_rect.miterLimit = 1;
  CGFloat dash[] = {20,1};
  [bezierPath_rect setLineDash:dash count:2 phase:0];
  bezierPath_rect.lineWidth = 10;
  
  
  //圆形 椭圆贝塞尔曲线
  UIBezierPath *bezierPath_oval = [UIBezierPath bezierPathWithOvalInRect:CGRectMake(200, 50, 150, 100)];
  bezierPath_oval.lineWidth = 10;
  
  
  //还有圆角的贝塞尔曲线
  UIBezierPath *bezierPath_RoundedRect = [UIBezierPath bezierPathWithRoundedRect:CGRectMake(30, 200, 100, 100) cornerRadius:20];
  bezierPath_RoundedRect.lineWidth = 10;
  
  
  //绘制可选择圆角方位的贝塞尔曲线
  UIBezierPath * bezierPath_RoundedCornerRect = [UIBezierPath bezierPathWithRoundedRect:CGRectMake(200, 200, 100, 100) byRoundingCorners:UIRectCornerTopLeft | UIRectCornerBottomRight cornerRadii:CGSizeMake(20, 20)];
  bezierPath_RoundedCornerRect.lineWidth = 10;
  
  
  //绘制圆弧曲线
  UIBezierPath * bezierPath_ArcCenter = [UIBezierPath bezierPathWithArcCenter:CGPointMake(300, 400) radius:50 startAngle:M_PI / 2 * 3 endAngle:M_PI / 3 clockwise:YES];
  bezierPath_ArcCenter.lineWidth = 10;
  
  
  //添加二次 三次贝塞尔曲线
  UIBezierPath *bezierPath = [UIBezierPath bezierPath];
  bezierPath.lineWidth = 2;
  [bezierPath moveToPoint:CGPointMake(10, 20)];
  [bezierPath addLineToPoint:CGPointMake(10, 530)];
  [bezierPath addQuadCurveToPoint:CGPointMake(100, 310) controlPoint:CGPointMake(80, 650)];
  [bezierPath addCurveToPoint:CGPointMake(200, 600) controlPoint1:CGPointMake(130, 600) controlPoint2:CGPointMake(170, 400)];
  [bezierPath addArcWithCenter:CGPointMake(300, 480) radius:70 startAngle:0 endAngle:M_PI * 2 clockwise:YES];
  [bezierPath moveToPoint:CGPointMake(370, 480)];
  [bezierPath addLineToPoint:CGPointMake(60, 480)];
  
  
  //根据CGPathRef绘制贝塞尔曲线
  CGMutablePathRef path = CGPathCreateMutable();
  CGPathMoveToPoint(path, NULL, 10, 640);
  CGPathAddCurveToPoint(path, NULL, 100, 700, 250, 550, 350, 650);
  UIBezierPath *bezierPath_CGPath = [UIBezierPath bezierPathWithCGPath:path];
  bezierPath_CGPath.lineWidth = 4;
  
  
  //选择填充颜色
  [[UIColor blackColor] set];
  [bezierPath_rect fill];
  [bezierPath_oval fill];
  [bezierPath_RoundedRect fill];
  [bezierPath_RoundedCornerRect fill];
  
  
  //选择线条颜色
  [[UIColor greenColor] set];
  [bezierPath_rect stroke];
  [bezierPath_oval stroke];
  [bezierPath_RoundedRect stroke];
  [bezierPath_RoundedCornerRect stroke];
  [bezierPath_ArcCenter stroke];
  [bezierPath stroke];
  [bezierPath_CGPath stroke];
  
  
  //小球
  CALayer * aniLayer = [CALayer layer];
  aniLayer.backgroundColor = [UIColor redColor].CGColor;
  aniLayer.position = CGPointMake(60, 480);
  aniLayer.bounds = CGRectMake(0, 0, 24,24);
  aniLayer.cornerRadius = 12;
  [self.layer addSublayer:aniLayer];
  //
  CAKeyframeAnimation * keyFrameAni = [CAKeyframeAnimation animationWithKeyPath:@"position"];
  keyFrameAni.repeatCount = 1;//次数
  keyFrameAni.path = bezierPath.CGPath;
  keyFrameAni.duration = 8;//时间
  keyFrameAni.beginTime = CACurrentMediaTime() + 1;
  [aniLayer addAnimation:keyFrameAni forKey:@"keyFrameAnimation"];
}
@end
