//
//  FirstViewController.m
//  RN2
//
//  Created by hipiao on 2017/10/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "FirstViewController.h"

#import <SDImageCache.h>
#import <UIImageView+WebCache.h>

@interface FirstViewController ()<UIDocumentInteractionControllerDelegate>

@end

@implementation FirstViewController


  
- (void)viewDidLoad {
    [super viewDidLoad];
  
  self.navigationItem.title = @"详情";
  self.view.backgroundColor = [UIColor whiteColor];
  
  UIImageView * image = [[UIImageView alloc]initWithFrame:CGRectMake(0, 64, JWidth, JHeight - 64)];
  [image sd_setImageWithURL:[NSURL URLWithString:self.imageUrl] placeholderImage:nil completed:^(UIImage * loadImage,NSError * error,SDImageCacheType type,NSURL * imageUrl){
    image.frame = CGRectMake(0, 64, JWidth, JWidth * loadImage.size.height / loadImage.size.width);
  }];
  [self.view addSubview:image];
  [self ming];
}
-(void)createSubviews{
  
  NSString * str = [[NSBundle mainBundle] pathForResource:@"情比山高排期核实" ofType:@"xls"];
  UIDocumentInteractionController * document = [UIDocumentInteractionController interactionControllerWithURL:[NSURL fileURLWithPath:str]];
  document.delegate = self;
  NSLog(@"%d",[document presentPreviewAnimated:YES]);
  
}

- (UIViewController *)documentInteractionControllerViewControllerForPreview:(UIDocumentInteractionController *)controller
{
  return self;
}
- (UIView *)documentInteractionControllerViewForPreview:(UIDocumentInteractionController*)controller
{
  return self.view;
}
- (CGRect)documentInteractionControllerRectForPreview:(UIDocumentInteractionController*)controller
{
  return self.view.frame;
}
- (NSArray *)readCSVData{
  NSMutableArray *_InfoArray;
  if (_InfoArray) {
    return NULL;
  }
  _InfoArray = [[NSMutableArray alloc]init];
  
  NSString *filepath=[[NSBundle mainBundle] pathForResource:@"员工表" ofType:@"csv"];
  FILE *fp=fopen([filepath UTF8String], "r");
  if (fp) {
    char buf[BUFSIZ];
    fgets(buf, BUFSIZ, fp);
    while (!feof(fp)) {
      char buf[BUFSIZ];
      fgets(buf, BUFSIZ, fp);
      
      // 处理文本信息 转化 成 数组文件
      NSString * s = [[NSString alloc]initWithUTF8String:(const char *)buf];
      NSString * ss = [s stringByReplacingOccurrencesOfString:@"\r" withString:@""];
      ss = [ss stringByReplacingOccurrencesOfString:@"\n" withString:@""];
      NSArray * a = [ss componentsSeparatedByString:@","];
      [_InfoArray addObject:a];
    }
  }
  NSLog(@"%@",_InfoArray);
  return _InfoArray;
}

-(void)ming{
  
  NSString * path = [[NSBundle mainBundle] pathForResource:@"情比山高排期核实" ofType:@"xls"];
  NSString * contents = [[NSString alloc] initWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
  NSArray * contentsArray = [contents componentsSeparatedByCharactersInSet:[NSCharacterSet newlineCharacterSet]];
  NSString *docs = [NSHomeDirectory() stringByAppendingPathComponent:@"Documents/情比山高排期核实.plist"] ;
  NSMutableArray *arr = [[NSMutableArray alloc] init];
  
  NSInteger idx;
  for (idx = 0; idx < contentsArray.count; idx++) {
    NSString * currentContent = [contentsArray objectAtIndex:idx];
    NSArray * timeDataArr = [currentContent componentsSeparatedByCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@";"]];
    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    [dic setObject:[timeDataArr objectAtIndex:0] forKey:@"name"];
    [dic setObject:[timeDataArr objectAtIndex:1] forKey:@"number"];
    [dic setObject:[timeDataArr objectAtIndex:2] forKey:@"CONTENT"];
    [arr addObject:dic];
  }
  [arr writeToFile:docs atomically:YES];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
