//
//  PushTransition.m
//  RN2
//
//  Created by hipiao on 2017/11/29.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "PushTransition.h"
#import "HomeViewController.h"
#import "SecondViewController.h"


@implementation PushTransition

- (NSTimeInterval)transitionDuration:(id<UIViewControllerContextTransitioning>)transitionContext {
  return 0.3;
}


- (void)animateTransition:(id<UIViewControllerContextTransitioning>)transitionContext {
  HomeViewController *fromViewController = (HomeViewController*)[transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
  SecondViewController *toViewController = (SecondViewController*)[transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
  UIView *containerView = [transitionContext containerView];
  NSTimeInterval duration = [self transitionDuration:transitionContext];
  
//  //获得cell中的图片的快照
//  UITableViewCell *cell = (UITableViewCell*)[fromViewController.table cellForRowAtIndexPath:[fromViewController.table indexPathForSelectedRow]];
//  UIView *cellImageSnapshot = [cell.imageView snapshotViewAfterScreenUpdates:NO];
//  cellImageSnapshot.frame = [containerView convertRect:cell.imageView.frame fromView:cell.imageView.superview];
//  cell.imageView.hidden = YES;
//
//  //设置初始view的状态
//  toViewController.view.frame = [transitionContext finalFrameForViewController:toViewController];
//  toViewController.view.alpha = 0;
//  toViewController.imageHead.hidden = YES;
//
//  [containerView addSubview:toViewController.view];
//  [containerView addSubview:cellImageSnapshot];
  
  [UIView animateWithDuration:duration animations:^{
//    toViewController.view.alpha = 1.0;
//    CGRect frame = [containerView convertRect:toViewController.imageHead.frame fromView:toViewController.view];
//    cellImageSnapshot.frame = frame;
  }completion:^(BOOL finished) {
//    toViewController.imageHead.hidden = NO;
//    cell.imageView.hidden = NO;
//    [cellImageSnapshot removeFromSuperview];
    
    [transitionContext completeTransition:!transitionContext.transitionWasCancelled];
  }];
}

@end
