//


#import <UIKit/UIKit.h>
#import "ZYQAssetPickerController.h"
#import "MessagePhotoView.h"
@interface ShowBigViewController : UIViewController<UIScrollViewDelegate,UINavigationControllerDelegate>
{
    UINavigationBar *mynavigationBar;
     UIImageView    *_imagvtitle;
   
    UIButton        *rightbtn;
    UIScrollView    *_scrollerview;
    UIButton        *_btnOK;
   
    
}



@property(nonatomic,strong) NSMutableArray *arrayOK;     //选中的图片数组


@end
