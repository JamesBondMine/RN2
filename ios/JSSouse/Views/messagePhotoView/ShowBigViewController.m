//


#import "ShowBigViewController.h"
#define IOS7LATER  [[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0
@interface ShowBigViewController ()

@end

@implementation ShowBigViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    //设置导航栏的rightButton
 
    rightbtn = [UIButton buttonWithType:UIButtonTypeCustom];
    rightbtn.frame=CGRectMake(0, 0, 22, 22);
    [rightbtn setImage:[UIImage imageNamed:@"OK.png"] forState:UIControlStateNormal];
    [rightbtn addTarget:self action:@selector(OK:)forControlEvents:UIControlEventTouchUpInside];
    
    self.navigationItem.rightBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:rightbtn];
    
     //设置导航栏的leftButton
    UIButton *leftbtn = [UIButton buttonWithType:UIButtonTypeCustom];
    leftbtn.frame=CGRectMake(0, 0, 11, 20);
    
    [leftbtn setImage:[UIImage imageNamed:@"fanhui.png"] forState:UIControlStateNormal];
    [leftbtn addTarget:self action:@selector(dismiss)forControlEvents:UIControlEventTouchUpInside];
    self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithCustomView:leftbtn];
    if([[[UIDevice currentDevice]systemVersion] doubleValue]>=7.0){
    self.navigationController.navigationBar.barTintColor = [UIColor blackColor];
        [[UINavigationBar appearance]setTintColor:[UIColor whiteColor]];
    }else{
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    }
    [self layOut];
    
}

-(void)layOut{
    self.view.backgroundColor = [UIColor blackColor];
            //arrayOK里存放选中的图片
   
    //CGFloat YHeight=([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0)?(64.0f):(44.0f);
    
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 70000
    if (IOS7LATER)
    {
          _scrollerview = [[UIScrollView alloc]initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height - 50)];
         _btnOK = [[UIButton alloc]initWithFrame:CGRectMake(244,  _scrollerview.frame.size.height + 9, 61, 32)];
    }
#endif
    
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0)
    {
    }
    else
    {
        _scrollerview = [[UIScrollView alloc]initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height- 100)];
         _btnOK = [[UIButton alloc]initWithFrame:CGRectMake(244,  _scrollerview.frame.size.height + 11, 61, 32)];
    }
    
    
    //显示选中的图片的大图
  
    _scrollerview.backgroundColor = [UIColor whiteColor];
    _scrollerview.delegate = self;
    NSLog(@"self.arrayOK.count is %d",self.arrayOK.count);
 
    for (int i=0; i<[self.arrayOK count]; i++) {
       ALAsset *asset=self.arrayOK[i];
        
        UIImageView *imgview=[[UIImageView alloc] initWithFrame:CGRectMake(i*_scrollerview.frame.size.width, 0, _scrollerview.frame.size.width, _scrollerview.frame.size.height)];
                   imgview.contentMode=UIViewContentModeScaleAspectFill;
                    imgview.clipsToBounds=YES;
        UIImage *tempImg=[UIImage imageWithCGImage:asset.defaultRepresentation.fullScreenImage];
        [imgview setImage:tempImg];
        [_scrollerview addSubview:imgview];
    }
    
    _scrollerview.contentSize = CGSizeMake((self.arrayOK.count) * (self.view.frame.size.width),0);
    [self.view addSubview:_scrollerview];
    
    
    //点击按钮，回到主发布页面
   
    [_btnOK setBackgroundImage:[UIImage imageNamed:@"complete.png"] forState:UIControlStateNormal];
 
    [_btnOK setTitle:[NSString stringWithFormat:@"完成(%d)",self.arrayOK.count] forState:UIControlStateNormal];
    _btnOK .titleLabel.font = [UIFont systemFontOfSize:10];
    [_btnOK addTarget:self action:@selector(complete:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:_btnOK];
    
    
}
-(void)complete:(UIButton *)sender{
    NSLog(@"完成了,跳到主发布页面");
    [self dismissViewControllerAnimated:YES completion:Nil];
}

-(void)OK:(UIButton *)sender{
    NSLog(@"点击了按钮，就取消选中这个图片");
    
}

-(void)dismiss{

    [self.navigationController popViewControllerAnimated:YES];
    if([[[UIDevice currentDevice]systemVersion] doubleValue]>=7.0){
        UIColor *red = [UIColor colorWithRed:255/255.0 green:48/255 blue:48/255 alpha:0.7];
        self.navigationController.navigationBar.barTintColor = red;
    }else{
        UIColor *red = [UIColor colorWithRed:255/255.0 green:48/255 blue:48/255 alpha:0.7];
        self.navigationController.navigationBar.TintColor = red;
    }

}
- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
