

#import "MessagePhotoView.h"
#import "ZYQAssetPickerController.h"
// 每行有4个
#define kZBMessageShareMenuPerRowItemCount 4
#define kZBMessageShareMenuPerColum 2

#define kZBShareMenuItemIconSize 60
#define KZBShareMenuItemHeight 80

#define MaxItemCount 10

#define ItemWidth 94

#define ItemHeight 94


@interface MessagePhotoView (){
    UILabel *lblNum;
}


/**
 *  这是背景滚动视图
 */
@property (nonatomic,strong) UIScrollView  * photoScrollView;
@property (nonatomic,  weak) UIScrollView  * shareMenuScrollView;
@property (nonatomic,  weak) UIPageControl * shareMenuPageControl;
@property (nonatomic,  weak) UIButton * btnviewphoto;

@end

@implementation MessagePhotoView

@synthesize photoMenuItems;

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setup];
    }
    return self;
}

- (void)photoItemButtonClicked:(UIButton *)sender {
    if ([self.delegate respondsToSelector:@selector(didSelecteShareMenuItem:atIndex:)]) {
        NSInteger index = sender.tag;
        if (index < self.photoMenuItems.count) {
        }
    }
}

- (void)setup{
    self.photoScrollView = [[UIScrollView alloc]initWithFrame:CGRectMake(0, 0, Screenwidth, 100)];
    [self addSubview:_photoScrollView];
    
    photoMenuItems = [[NSMutableArray alloc]init];
    _itemArray = [[NSMutableArray alloc]init];
    

    lblNum = [[UILabel alloc]initWithFrame:CGRectMake(10, 110, 230, 30)];
    [self addSubview:lblNum];
    
    [self initlizerScrollView:self.photoMenuItems];
}

-(void)reloadDataWithImage:(UIImage *)image{
    [self.photoMenuItems addObject:image];
    [self initlizerScrollView:self.photoMenuItems];
}

-(void)initlizerScrollView:(NSArray *)imgList{
    [self.photoScrollView.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
    
    for(int i = 0;i < imgList.count;i++){
        
        ALAsset * asset = imgList[i];
        UIImage * tempImg = [UIImage imageWithCGImage:asset.defaultRepresentation.fullScreenImage];
        
        UIImageView * p = [[UIImageView alloc]initWithFrame:CGRectMake(10+ i * (ItemWidth + 5 ), 20, ItemWidth, ItemHeight)];
        p.image = tempImg;
        [self.itemArray addObject:p];
        [self.photoScrollView addSubview:p];
        
    }
    if(imgList.count<MaxItemCount){
        UIButton *btnphoto=[UIButton buttonWithType:UIButtonTypeCustom];
        [btnphoto setFrame:CGRectMake(20 + (ItemWidth + 5) * imgList.count, 20, 84, 84)];//
        [btnphoto setImage:[UIImage imageNamed:@"添加"] forState:UIControlStateNormal];
        [btnphoto setImage:[UIImage imageNamed:@"添加"] forState:UIControlStateSelected];
        //给添加按钮加点击事件
        [btnphoto addTarget:self action:@selector(openMenu) forControlEvents:UIControlEventTouchUpInside];
        [self.photoScrollView addSubview:btnphoto];
    }
    NSInteger count = MIN(imgList.count +1, MaxItemCount);
    lblNum.text = [NSString stringWithFormat:@"已选%d张，共可选10张",self.photoMenuItems.count];
    lblNum.backgroundColor = [UIColor clearColor];
    [self.photoScrollView setContentSize:CGSizeMake(20 + (ItemWidth + 5)*count, 0)];
}
-(void)openMenu{
    [self localPhoto];
  
}

-(void)localPhoto{
    ZYQAssetPickerController * picker = [[ZYQAssetPickerController alloc]init];
    picker.maximumNumberOfSelection = 10;
    picker.assetsFilter = [ALAssetsFilter allPhotos];
    picker.showEmptyGroups = NO;
    picker.delegate = self;
    picker.selectionFilter = [NSPredicate predicateWithBlock:^BOOL(id evaluatedObject,NSDictionary *bindings){
        if ([[(ALAsset *)evaluatedObject valueForProperty:ALAssetPropertyType]isEqual:ALAssetTypeVideo]) {
            NSTimeInterval duration = [[(ALAsset *)evaluatedObject valueForProperty:ALAssetPropertyDuration]doubleValue];
            return duration >= 5;
        }else{
            return  YES;
        }
    }];
    [self.delegate addPicker:picker];
}
#pragma mark - ZYQAssetPickerController Delegate

-(void)assetPickerController:(ZYQAssetPickerController *)picker didFinishPickingAssets:(NSArray *)assets{
    
    [self.scrollview.subviews makeObjectsPerformSelector:@selector(removeFromSuperview)];
    ShowBigViewController * big = [[ShowBigViewController alloc]init];
    big.arrayOK = [NSMutableArray arrayWithArray:assets];
    self.photoMenuItems = [NSMutableArray arrayWithArray:assets];
    [self initlizerScrollView:self.photoMenuItems];
    [picker pushViewController:big animated:YES];
  
}
//选择某张照片之后
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info{
    
    //关闭相册界面
    [picker dismissViewControllerAnimated:YES completion:nil];
    NSString *type = [info objectForKey:UIImagePickerControllerMediaType];
    //当选择的类型是图片
    if([type isEqualToString:@"public.image"]){
        //先把图片转成NSData
        UIImage *image = [info objectForKey:@"UIImagePickerControllerOriginalImage"];
        [self reloadDataWithImage:image];
        
        NSData * datas;
        if(UIImagePNGRepresentation(image) == nil){
            datas = UIImageJPEGRepresentation(image, 1.0);
        }else{
            datas = UIImagePNGRepresentation(image);
        }
        
        NSString *DocumentsPath = [NSHomeDirectory() stringByAppendingPathComponent:@"Documents"];
        NSFileManager *fileManager = [NSFileManager defaultManager];
        [fileManager createDirectoryAtPath:DocumentsPath withIntermediateDirectories:YES attributes:nil error:nil];
        [fileManager createFileAtPath:[DocumentsPath stringByAppendingString:@"/image.png"] contents:datas attributes:nil];
        filePath = [[NSString alloc]initWithFormat:@"%@%@",DocumentsPath,@"/image.png"];
    }
}
-(void)imagePickerControllerDidCancel:(UIImagePickerController *)picker{
    NSLog(@"您取消了选择图片");
    [picker dismissViewControllerAnimated:YES completion:nil];
}
-(void)removePhotosDelegeteMotherd{
  
  
}
- (void)dealloc {
  
    self.photoScrollView.delegate = nil;
    self.shareMenuScrollView.delegate = nil;
    self.shareMenuScrollView = nil;
    self.shareMenuPageControl = nil;
}
#pragma mark - UIScrollView delegate
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView {
    //每页宽度
    CGFloat pageWidth = scrollView.frame.size.width;
    //根据当前的坐标与页宽计算当前页码
    NSInteger currentPage = floor((scrollView.contentOffset.x - pageWidth/2)/pageWidth)+1;
    [self.shareMenuPageControl setCurrentPage:currentPage];
}
@end
