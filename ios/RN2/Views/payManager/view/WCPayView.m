//
//  WCPayView.m
//  TruckDriver
//
//  Created by 钞王 on 2017/11/27.
//  Copyright © 2017年 apple. All rights reserved.
//

#import "WCPayView.h"
#import "WCPayTableViewCell.h"
//#import "WCButtonPSWView.h"

@interface WCPayView ()<UITableViewDelegate,UITableViewDataSource,WCPayTableViewCellDelegate>
//头部视图

@property (nonatomic, strong) UIButton *cancleButton;

@property (nonatomic, strong) UILabel *titleLable;

@property (nonatomic, strong) UIView *lineView;

//选择支付方式界面

@property (nonatomic, strong) UIView *view1BG;

@property (nonatomic, strong) UILabel *payTitle;

@property (nonatomic, strong) UILabel *payMoney;

@property (nonatomic, strong) UITableView *payStyletab;

@property (nonatomic, strong) NSArray *titleA;

@property (nonatomic, strong) NSArray *imageA;

//输入密码界面

@property (nonatomic, strong) UIView *view2BG;

@property (nonatomic, strong) UIButton * buttonView;

@property (nonatomic, strong) UIButton *forgetPSWButton;

@end

@implementation WCPayView

-(id)initWithFrame:(CGRect)frame
{
  
  self = [super initWithFrame:frame];
  self.payStyletab = [[UITableView alloc] initWithFrame:CGRectMake(0, self.frame.size.height - 400, JWidth, 400 -64) style:UITableViewStylePlain];
  self.payStyletab.delegate = self;
  self.payStyletab.dataSource = self;
 
  [self.scroller addSubview:self.payStyletab];
  [self layoutSubviewsMotherd];
  
 
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onScreenTouch:) name:@"notiScreenTouch" object:nil];
  

    return self;
}
- (void)onScreenTouch:(NSNotification *)notification
{
  UIEvent * event = [notification.userInfo objectForKey:@"data"];
 
 
  CGPoint pt = [[[[event allTouches] allObjects] objectAtIndex:0] locationInView:self];
  NSLog(@"pt.x=%f, pt.y=%f", pt.x, pt.y);
  
  
  
  NSSet *allTouches = [event allTouches];    //返回与当前接收者有关的所有的触摸对象
  UITouch *touch = [allTouches anyObject];   //视图中的所有对象
  CGPoint point = [touch locationInView:[touch view]]; //返回触摸点在视图中的当前坐标
  int x = point.x;
  int y = point.y;
   NSLog(@"_______________:%@",[[touch view] class]);
  NSLog(@"_______________:%@",[[touch view].subviews class]);
}
#pragma mark - initSubView

-(UIScrollView *)scroller
{
    if (_scroller == nil) {
        _scroller = [[UIScrollView alloc] initWithFrame:CGRectZero];
        _scroller.scrollEnabled = NO;
        _scroller.contentSize = CGSizeMake(JWidth * 2, 768);
        _scroller.pagingEnabled = YES;
        [self addSubview:_scroller];
    }
    return _scroller;
}

-(UIView *)view1BG
{
    if (_view1BG == nil) {
        _view1BG = [[UIView alloc] init];

        [self.scroller addSubview:_view1BG];
    }
    return _view1BG;
}

-(UIButton *)cancleButton
{
    if (_cancleButton == nil) {
        _cancleButton = [[UIButton alloc] init];
        [_cancleButton setImage:[UIImage imageNamed:@"风景"] forState:UIControlStateNormal];
        [_cancleButton addTarget:self action:@selector(payViewClickAction:) forControlEvents:UIControlEventTouchUpInside];
        [_cancleButton setTag:100];
        [self addSubview:_cancleButton];
    }
    return _cancleButton;
}


#pragma mark - layoutSubView

-(void)layoutSubviewsMotherd
{

  [self.cancleButton mas_makeConstraints:^(MASConstraintMaker *make) {
    make.left.equalTo(self.mas_left).offset(20);
    make.top.equalTo(self.mas_top).offset(20);
    make.size.sizeOffset(CGSizeMake(54, 54));
  }];
  
  [self.scroller mas_makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(self.cancleButton.mas_bottom);
    make.left.equalTo(self.mas_left);
    make.right.equalTo(self.mas_right);
    make.bottom.equalTo(self.mas_bottom);
  }];
//  [self.view1BG mas_makeConstraints:^(MASConstraintMaker *make) {
//    make.left.equalTo(self.scroller.mas_left);
//    make.top.equalTo(self.scroller.mas_top);
//    make.bottom.equalTo(self.scroller.mas_bottom);
//    make.width.equalTo(self.scroller.mas_width);
//  }];
}

#pragma mark - tableviewDelegate

-(NSInteger )tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
  NSLog(@"___________!!_______:%@",self.imageA);
    return self.imageA.count;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
  
  NSLog(@"___________***_______:%@",self.imageA);
    WCPayTableViewCell * cell = [tableView dequeueReusableCellWithIdentifier:@"WCPayTableViewCell"];
    if (cell == nil) {
        cell = [[WCPayTableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"WCPayTableViewCell"];
//        cell.delegate = self;
    }
    cell.tag = ((int)indexPath.row + 2) * 100;
  
  [cell updateCellWith:self.imageA[indexPath.row] title:self.titleA[indexPath.row]];
  
  
  UIButton * canctton = [[UIButton alloc] initWithFrame:CGRectMake(120, 20, 65, 45)];
  [canctton setImage:[UIImage imageNamed:@"风景"] forState:UIControlStateNormal];
  [canctton addTarget:self action:@selector(payViewClickAction) forControlEvents:UIControlEventTouchUpInside];
  [canctton setTag:100];
  [cell.contentView addSubview:canctton];
  
    return cell;
}
-(void)payViewClickAction{
  
  NSLog(@"王钞的cell按钮点击");
  
}
-(CGFloat )tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 96;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
 
  NSLog(@"___________***_______");
}

-(void)updateViewWith:(NSString *)title money:(NSString *)money titleA:(NSArray *)titleA imageA:(NSArray *)imageA;
{

    _imageA = [NSArray arrayWithArray:imageA];
    _titleA = [NSArray arrayWithArray:titleA];


    [self.payStyletab reloadData];
}
-(void)payViewClickAction:(UIButton *)sender;
{
    if (self.delegate && [self.delegate respondsToSelector:@selector(clickButtonClickAction:)]) {
        [self.delegate clickButtonClickAction:(int)sender.tag];
    }
}

-(void)cellClickAction:(int)tag{
  
  
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
