//
//  UploadPhotosViewController.m
//  RN2
//
//  Created by hipiao on 2017/10/31.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "UploadPhotosViewController.h"
#import "MessagePhotoView.h"

#import <AFNetworking.h>
#import "NSString+SHA1.h"
#import "GTMBase64.h"
#include <CommonCrypto/CommonCrypto.h>
#import <Qiniu/QiniuSDK.h>
#define QiNiuAK  @"TdzmO_LJvBGzCJp3-cTFNlNwLNoSNnYJHH9EWcnZ"
#define QiNiuSK  @"zs0KkyF9fpAhrhj3gb0Uz5XS49ztsZz8BAepisJE"

@interface UploadPhotosViewController ()
<MessagePhotoViewDelegate,UITableViewDelegate,UITableViewDataSource>

@property (nonatomic,strong) UITableView  * customTable;
@property (nonatomic,strong) MessagePhotoView * photoView;
@property (nonatomic,assign) int expires;
@end

@implementation UploadPhotosViewController



- (void)viewDidLoad {
    [super viewDidLoad];
  self.title = @"活动详情";
  self.view.backgroundColor = [UIColor whiteColor];
  
  [self sharePhotoview];
  
  [self createSubviews];
  
  
  [self UploadPhotosMotherd];
  
  [self download];
  
}
-(void)UploadPhotosMotherd{

  NSString * token = [self makeToken:QiNiuAK secretKey:QiNiuSK];
  QNUploadManager *upManager = [[QNUploadManager alloc] init];
  QNUploadOption *uploadOption = [[QNUploadOption alloc] initWithMime:nil progressHandler:^(NSString *key, float percent) {
    NSLog(@"上传进度 %.2f", percent);
  }
                                                               params:nil
                                                             checkCrc:NO
                                                   cancellationSignal:nil];
  [upManager putFile:@"" key:@"image" token:token complete:^(QNResponseInfo *info, NSString *key, NSDictionary *resp) {
    
    NSLog(@"info = %@\n", info);
    NSLog(@"key = %@\n",key);
    NSLog(@"resp = %@\n", resp);
    // 发送通知用户获取图片使用
    NSNotification * notice = [NSNotification notificationWithName:@"downLoad" object:nil userInfo:resp];
    [[NSNotificationCenter defaultCenter] postNotification:notice];
  }
              option:uploadOption];

  
  

//  NSDictionary * dic = @{@"hhh":@"aaa",@"test":@"memei"};
//  NSString * json = [self convertToJsonData:dic];
//  NSData * data =[json dataUsingEncoding:NSUTF8StringEncoding];//转为JSON格式，便于下载
//  NSLog(@"token = %@ \n",token);
//  NSLog(@"data = %@  \n",data);
//  [upManager putData:data key:@"aaa" token:token
//            complete: ^(QNResponseInfo *info, NSString *key, NSDictionary *resp) {
//              NSLog(@"info = %@\n", info);
//              NSLog(@"key = %@\n",key);
//              NSLog(@"resp = %@\n", resp);
//            } option:nil];

}
//上传
-(void)uploadPhotosWithImage:(UIImage *)image  withUrl:(NSString *)url{
  
  AFHTTPSessionManager * manager = [AFHTTPSessionManager manager];
  manager.responseSerializer = [AFHTTPResponseSerializer serializer];
  [manager.requestSerializer willChangeValueForKey:@"timeoutInterval"];
  manager.requestSerializer.timeoutInterval = 10.f;
  [manager.requestSerializer didChangeValueForKey:@"timeoutInterval"];
  
  [manager POST:@"http://upload.qiniu.com/"  parameters:@{} constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
    if(image)
    {
      NSData * imageData = UIImageJPEGRepresentation(image,0.5);
      [formData appendPartWithFileData:imageData name:@"myfiles" fileName:[NSString stringWithFormat:@"%f",[[NSDate date] timeIntervalSince1970]] mimeType:@"image/png"];
    }else{
      NSLog(@"照片为空");
    }
  } progress:^(NSProgress * _Nonnull uploadProgress) {
    
  } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject){

    
  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
    NSLog(@"上传失败 %@", error);

  }];
  
}

- (NSString *)urlSafeBase64Encode:(NSData *)text {
  
  NSString * base64 = [[NSString alloc] initWithData:[GTMBase64 encodeData:text] encoding:NSUTF8StringEncoding];
  base64 = [base64 stringByReplacingOccurrencesOfString:@"+" withString:@"-"];
  base64 = [base64 stringByReplacingOccurrencesOfString:@"/" withString:@"_"];
  return base64;
}

- (NSString *)makeToken:(NSString *)accessKey secretKey:(NSString *)secretKey
{
  const char  * secretKeyStr = [secretKey UTF8String];
  NSString * policy = [self marshal];
  NSData *policyData = [policy dataUsingEncoding:NSUTF8StringEncoding];
  NSString *encodedPolicy = [GTMBase64 stringByWebSafeEncodingData:policyData padded:TRUE];
  const char *encodedPolicyStr = [encodedPolicy cStringUsingEncoding:NSUTF8StringEncoding];
  char digestStr[CC_SHA1_DIGEST_LENGTH];
  bzero(digestStr, 0);
  CCHmac(kCCHmacAlgSHA1, secretKeyStr, strlen(secretKeyStr), encodedPolicyStr, strlen(encodedPolicyStr), digestStr);
  NSString *encodedDigest = [GTMBase64 stringByWebSafeEncodingBytes:digestStr length:CC_SHA1_DIGEST_LENGTH padded:TRUE];
  NSString *token = [NSString stringWithFormat:@"%@:%@:%@",  accessKey, encodedDigest, encodedPolicy];
  return token;//得到了token
}

- (NSString *)marshal
{
  time_t deadline;
  time(&deadline);//返回当前系统时间
  //@property (nonatomic , assign) int expires; 怎么定义随你...
  deadline += (self.expires > 0) ? self.expires : 3600; // +3600秒,即默认token保存1小时.
  NSNumber * deadlineNumber = [NSNumber numberWithLongLong:deadline];
  NSMutableDictionary *dic = [NSMutableDictionary dictionary];
  //users是我开辟的公共空间名（即bucket），aaa是文件的key，
  //按七牛“上传策略”的描述：    <bucket>:<key>，表示只允许用户上传指定key的文件。在这种格式下文件默认允许“修改”，若已存在同名资源则会被覆盖。如果只希望上传指定key的文件，并且不允许修改，那么可以将下面的 insertOnly 属性值设为 1。
  //所以如果参数只传users的话，下次上传key还是aaa的文件会提示存在同名文件，不能上传。
  //传users:aaa的话，可以覆盖更新，但实测延迟较长，我上传同名新文件上去，下载下来的还是老文件。
  [dic setObject:@"users:aaa" forKey:@"scope"];//根据
  [dic setObject:deadlineNumber forKey:@"deadline"];
  NSString * json = [self convertToJsonData:dic];
  return json;
}
// 字典转json字符串方法

-(NSString *)convertToJsonData:(NSDictionary *)dict
{
  NSError *error;
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict options:NSJSONWritingPrettyPrinted error:&error];
  NSString *jsonString;
  if (!jsonData) {
    NSLog(@"%@",error);
  }else{
    jsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
  }
  NSMutableString *mutStr = [NSMutableString stringWithString:jsonString];
  NSRange range = {0,jsonString.length};
  //去掉字符串中的空格
  [mutStr replaceOccurrencesOfString:@" " withString:@"" options:NSLiteralSearch range:range];
  NSRange range2 = {0,mutStr.length};
  //去掉字符串中的换行符
  [mutStr replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:range2];
  return mutStr;
  
}

-(void)download
{
  NSString * hString = [@"报表_专业版" stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  NSString * path = [NSString stringWithFormat:@"http://ozsp8z7w0.bkt.clouddn.com/JSVCFilm/Images/%@.jpg",hString];
  NSLog(@"path = %@",path);
  NSURLRequest *request =[NSURLRequest requestWithURL:[NSURL URLWithString:path] cachePolicy:1 timeoutInterval:15.0f];
  [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse * _Nullable response, NSData * _Nullable data, NSError * _Nullable connectionError) {
    NSLog(@"response = %@",response);
    
    //得到了JSON文件 解析就好了。
    if (data) {
      UIImage * ig = [UIImage  imageWithData:data];
      //id result = [NSJSONSerialization JSONObjectWithData:data options:0 error:NULL];
      NSLog(@"%@", ig);
    }
  }];
}

-(void)createSubviews{
  
  //http://78re52.com1.z0.glb.clouddn.com/JSVCFilm/Images/报表_专业版.jpg
  self.customTable = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStylePlain];
  self.customTable.delegate = self;
  self.customTable.dataSource = self;
  [self.view addSubview:self.customTable];
  
  UIView * headerView = [[UIView alloc]init];
  headerView.backgroundColor = [UIColor whiteColor];
  
  UILabel * lbCinema = [[UILabel alloc]initWithFrame:CGRectMake(10, 10, JWidth - 10 - 80, 30)];
  lbCinema.text = @"高青全球通电影城";
  lbCinema.font = [UIFont systemFontOfSize:18];
  [headerView addSubview:lbCinema];
  
  
  UIImageView * img = [[UIImageView alloc]initWithFrame:CGRectMake(0, 50, JWidth, 230)];
  img.image = [UIImage imageNamed:@"风景"];
  [headerView addSubview:img];
  
  UIView * lightView = [[UIView alloc]initWithFrame:CGRectMake(0, 280, JWidth, 15)];
  lightView.backgroundColor = [[UIColor lightGrayColor] colorWithAlphaComponent:0.2];
  [headerView addSubview:lightView];
  
  UIView * whiteView = [[UIView alloc]initWithFrame:CGRectMake(0, 315, JWidth, 85)];
  whiteView.backgroundColor = [UIColor whiteColor];
  [headerView addSubview:whiteView];
  UILabel * lbFilm = [[UILabel alloc]initWithFrame:CGRectMake(10, 5, JWidth - 10 - 80, 20)];
  lbFilm.text = @"《全球风暴》活动照片反馈";
  [whiteView addSubview:lbFilm];
  UILabel * lbTime = [[UILabel alloc]initWithFrame:CGRectMake(15, 30, JWidth - 10 - 80, 20)];
  lbTime.text = @"2017/10/23 - 2017/11/05";
  lbTime.textColor = [UIColor lightGrayColor];
  [whiteView addSubview:lbTime];
  
  UIView * lightView1 = [[UIView alloc]initWithFrame:CGRectMake(0, 70, JWidth, 15)];
  lightView1.backgroundColor = [[UIColor lightGrayColor]colorWithAlphaComponent:0.2];
  [whiteView addSubview:lightView1];
  
  
  headerView.frame = CGRectMake(0, 0, JWidth, 625);
  self.photoView.frame = CGRectMake(0, 400, JWidth, 150);
  [headerView addSubview:self.photoView];
  self.customTable.tableHeaderView = headerView;
}
-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
  
  return 0;
}
-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
  
  static NSString * cellId = @"customCell";
  UITableViewCell * cell = [tableView dequeueReusableCellWithIdentifier:cellId];
  if (!cell) {
    cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:cellId];
  }
  
  return cell;
}
- (void)sharePhotoview
{
  if (!self.photoView)
  {
    self.photoView = [[MessagePhotoView alloc]initWithFrame:CGRectMake(0, 350, JWidth, 150)];
    self.photoView.backgroundColor = [UIColor whiteColor];
    self.photoView.delegate = self;
  }
}
-(void)addPicker:(ZYQAssetPickerController *)picker{
  
   [self presentViewController:picker animated:YES completion:nil];
  
}         //UIImagePickerController
-(void)addUIImagePicker:(UIImagePickerController *)picker{
  
  
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
