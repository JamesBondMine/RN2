//
//  WCPayTableViewCell.m
//  TruckDriver
//
//  Created by 钞王 on 2017/11/27.
//  Copyright © 2017年 apple. All rights reserved.
//

#import "WCPayTableViewCell.h"

@interface WCPayTableViewCell ()

@property (nonatomic, strong) UIImageView *image;

@property (nonatomic, strong) UILabel *title;

@property (nonatomic, strong) UIImageView *rightImage;

@property (nonatomic, strong) UIView *lineView;


//@property (nonatomic, strong) UIButton *forgiveButton;

@end

@implementation WCPayTableViewCell

-(instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    
    
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    [self setSelectionStyle:UITableViewCellSelectionStyleNone];
    [self setUserInteractionEnabled:YES];
    
//    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(clickAction:)];
//    [self addGestureRecognizer:tap];
  
  
  CGRect sframe = CGRectMake(10, 180, 430, 200);
  
  //矩形贝塞尔曲线
  UIBezierPath * bezierPath_rect = [UIBezierPath bezierPathWithRect:CGRectMake(0, 0, 330, 200)];
  [bezierPath_rect moveToPoint:CGPointMake(330, 30)];
  [bezierPath_rect addLineToPoint:CGPointMake(330 + 14, 42)];
  [bezierPath_rect addLineToPoint:CGPointMake(330, 54)];
  bezierPath_rect.lineCapStyle = kCGLineCapSquare;  //端点类型
  bezierPath_rect.lineJoinStyle = kCGLineCapSquare;  //线条连接类型
  bezierPath_rect.miterLimit = 1;
  bezierPath_rect.lineWidth = 1;
  
  UIImageView * si = [[UIImageView alloc] initWithFrame:sframe];
  si.image = [[self maskImage:[UIImage imageNamed:@"风景"] toPath:bezierPath_rect] stretchableImageWithLeftCapWidth:121 topCapHeight:114];
  si.layer.masksToBounds = YES;
  si.layer.cornerRadius = 4;
  [self addSubview:si];
  
  si.frame = CGRectMake(JWidth - 150, 20, 140, 60);
  
    return self;
}

-(UIImage *)maskImage:(UIImage*)originImage toPath:(UIBezierPath*)path{
  UIGraphicsBeginImageContextWithOptions(originImage.size, NO, 0);
  [path addClip];
  [originImage drawAtPoint:CGPointZero];
  UIImage * img = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return img;
}


//-(void)clickAction:(UIButton *)button
//{
//    if (self.delegate && [self.delegate respondsToSelector:@selector(cellClickAction:)]) {
//        [self.delegate cellClickAction:(int)button.tag];
//    }
//}

#pragma mark - initSubView

//-(UIButton *)forgiveButton
//{
//    if (_forgiveButton == nil) {
//        _forgiveButton = [[UIButton alloc] init];
//        [_forgiveButton setBackgroundColor:[UIColor clearColor]];
//        [_forgiveButton addTarget:self action:@selector(clickAction:) forControlEvents:UIControlEventTouchUpInside];
//        [_forgiveButton setTag:self.tag];
//        [self addSubview:_forgiveButton];
//    }
//    return _forgiveButton;
//}

-(UIImageView *)image
{
    if (_image == nil) {
        _image = [[UIImageView alloc] init];
        [self addSubview:_image];
    }
    return _image;
}

-(UILabel *)title
{
    if (_title == nil) {
        _title = [[UILabel alloc] init];
        //[_title setFont:[UIFont fontWithName:defaultFontName size:nvFont4_7D(32)]];
        //[_title setTextColor:[UIColor myColorWithString:@"#5C5C5C"]];
        [self addSubview:_title];
    }
    return _title;
}

-(UIImageView *)rightImage
{
    if (_rightImage == nil) {
        _rightImage = [[UIImageView alloc] init];
        [_rightImage setImage:[UIImage imageNamed:@"icon-我的-右箭头"]];
        [self addSubview:_rightImage];
    }
    return _rightImage;
}

-(UIView *)lineView
{
    if (_lineView == nil) {
        _lineView = [[UIView alloc] init];
       // [_lineView setBackgroundColor:[UIColor myColorWithString:defaultLineColor]];
        [self addSubview:_lineView];
    }
    return _lineView;
}

-(void)layoutSubviews
{
    [self.image mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.mas_left).offset(10);
        make.centerY.equalTo(self.mas_centerY);
        make.size.sizeOffset(CGSizeMake(48, 48));
    }];
    
    [self.title mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.image.mas_right).offset(10);
        make.centerY.equalTo(self.image.mas_centerY);
    }];
    
    [self.rightImage mas_makeConstraints:^(MASConstraintMaker *make) {
        make.right.equalTo(self.mas_right).offset(-32);
        make.centerY.equalTo(self.mas_centerY);
        make.size.sizeOffset(CGSizeMake(32, 32));
    }];
    
    [self.lineView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.equalTo(self.image.mas_left);
        make.bottom.equalTo(self.mas_bottom);
        make.right.equalTo(self.mas_right);
        make.height.offset(1);
    }];
    
//    [self.forgiveButton mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.left.equalTo(self.mas_left);
//        make.right.equalTo(self.mas_right);
//        make.top.equalTo(self.mas_top);
//        make.bottom.equalTo(self.mas_bottom);
//    }];
}

-(void)updateCellWith:(NSString *)image title:(NSString *)title
{
    [self.image setImage:[UIImage imageNamed:image]];
    [self.title setText:title];
}

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event {

    
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
