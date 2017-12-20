//

#import <UIKit/UIKit.h>
#import "ZYQAssetPickerController.h"
#import "ShowBigViewController.h"

#define kZBMessageShareMenuPageControlHeight 30


@protocol MessagePhotoViewDelegate <NSObject>


@optional

-(void)addPicker:(ZYQAssetPickerController *)picker;          //UIImagePickerController
-(void)addUIImagePicker:(UIImagePickerController *)picker;

@end

@interface MessagePhotoView : UIView<UIActionSheetDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate,UIScrollViewDelegate,ZYQAssetPickerControllerDelegate>{
    //下拉菜单
    UIActionSheet *myActionSheet;
    
    //图片2进制路径
    NSString* filePath;
}
@property(nonatomic,strong) UIScrollView *scrollview;

/**
 *  第三方功能Models
 */
@property (nonatomic, strong) NSMutableArray *photoMenuItems;

@property(nonatomic,strong) NSMutableArray *itemArray;

@property (nonatomic, assign) id <MessagePhotoViewDelegate> delegate;

-(void)reloadDataWithImage:(UIImage *)image;

-(void)removePhotosDelegeteMotherd;

@end
