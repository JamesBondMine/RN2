
'use strict';
import React, { Component } from 'react';

import  {
    AppRegistry,
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
    View,
    Image,
    Dimensions
} from 'react-native';


// 屏幕宽度
var screenWidth = Dimensions.get('window').width;

var imageData = [
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=882642063,4115591772&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1081553651,2562369762&fm=11&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2021991128,2296584601&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082175366,4120772079&fm=11&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=882642063,4115591772&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1081553651,2562369762&fm=11&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2021991128,2296584601&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3082175366,4120772079&fm=11&gp=0.jpg'
];

export default class RN2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedImageIndex: 0,
            isNeedRun: true,
            dataSource: dataSource.cloneWithPages(imageData)
        };


        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });



        this._contentOffsetX = 0;
        this._index = 0;// 当前正在显示的图片
        this._max = imageData.length;// 图片总数
    }



    render(){

        // 图片列表
        let imagesNew = imageData.map((value,i) => {
            return (
                <TouchableWithoutFeedback onPress={
                    ()=>this._showLog(i)
                }>
                    <View style={{width:screenWidth,height:130}}>
                        <Image source={{uri:imageData[i]}} style={{marginLeft:0,width:screenWidth,height:130}}>
                        </Image>
                    </View>
                </TouchableWithoutFeedback>);
        });

        // 小圆点指示器
        let circles = imageData.map((value,i) => {
            return (<View key={i} style={ (i == this.state.selectedImageIndex) ? styles.circleSelected : styles.circle}/>);
        });

        // 小圆点位置居中显示
        let imageLength = imageData.length;
        let circleLength = 6 * imageLength + 5 * 2 * imageLength;
        let center = (screenWidth - circleLength) / 2;

        return (
            <View style={styles.container}>

                <ScrollView horizontal={true}

                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            onTouchStart={()=>
                                this._onTouchStart()
                            }
                            onTouchMove={()=>
                                console.log('onTouchMove')
                            }
                            onTouchEnd={()=>
                                this._onTouchEnd()
                            }
                             onScroll={()=>
                                 this._onScroll()
                             }



                            ref={(scrollView) => { this._scrollView = scrollView;}}>

                    <Animated.View style={{flexDirection:'row'}}>{imagesNew}</Animated.View>
                </ScrollView>


                <View style={{flexDirection:'row',position:'absolute',top:115,left:center}}>{circles}</View>
            </View>
        );
    }





    _onTouchStart(){
        console.log('开始点击')
        // 当手指按到scrollview时停止定时任务
        clearInterval(this._timer);
    }

    _onTouchEnd(){
        // 先滑动到指定index位置，再开启定时任务
        console.log('停止点击')
        this._scrollView.scrollTo({x:0 * screenWidth},true);
        // 重置小圆点指示器
        this._refreshFocusIndicator();
        this._runFocusImage();
    }

    _onScroll(event){
        console.log('滚动到X页：',this._scrollView.contentOffset)

        console.log('滚动到X页：',this._index)
        console.log('滚动到X位置：',this._contentOffsetX)


        // this._contentOffsetX = this._scrollView.contentOffset.x;
         //this._index = Math.round(this._contentOffsetX / screenWidth);
    }


    // 开启定时器
    startTimer() {

        // 拿到scrollView
        var scrollView = this.refs.scrollView;
        // 添加定时器
        this.timer = this.setInterval(function() {

            var tempPage;
            if (this.state.currentPage+1 >=7) {
                tempPage = 0;
            } else {
                tempPage = this.state.currentPage+1;
            }
            // 更新状态机
            this.setState( {
                currentPage: tempPage
            });

            // 改变scrollView的偏移量
            let offSet = tempPage * width;
            scrollView.scrollTo({x: offSet, y: 0, animated: true});

        }, this.props.duration);
    }


    _runFocusImage(){//2000表示2000毫秒
        if(this._max <= 1){ // 只有一个则不启动定时任务
            console.log('不启动定时任务！')
            return;
        }

        this._timer = setInterval(function () {
            this._index = this._index+1;
            console.log('启动定时任务！',this._index)
            if(this._index >= this._max){
                this._index = 0;
            }

                this._scrollView.scrollTo({x:this._index * screenWidth,y: 0},false);

            // 重置小圆点指示器
            this._refreshFocusIndicator();
        }.bind(this), 2000);
    }

    _stopFocusImage(){
        console.log('终止定时任务！')
        clearInterval(this._timer);
    }

    _refreshFocusIndicator(){
        this.setState({selectedImageIndex:this._index});
    }

    _showToast(i) {
        //显示的内容
        var message = '点击: ' + i;
        console.log(message);
    }

    _showLog(i) {
        //显示的内容
        var message = '点击了第: ' + i + '页';
        console.log(message);
    }
    // 组件装载完成
    componentDidMount(){
        this._runFocusImage();
    }

    // 组件即将卸载
    componentWillUnmount(){
        clearInterval(this._timer);
    }

    // 组件接收到新属性
    componentWillReceiveProps(nextProps) {
    }
}

const styles = {
    container: {
        flex:1,
        flexDirection:'row',
    },
    circleContainer: {
        position:'absolute',
        left:0,
        top:120,
    },
    circle: {
        width:6,
        height:6,
        borderRadius:6,
        backgroundColor:'#f4797e',
        marginHorizontal:5,
    },
    circleSelected: {
        width:6,
        height:6,
        borderRadius:6,
        backgroundColor:'#ffffff',
        marginHorizontal:5,
    }
};

// RN2.defaultProps = {
//     isNeedRun : true,
// };

// FocusImage.propTypes = {
//     isNeedRun   : PropTypes.bool,
//     onItemClick : PropTypes.func,
// };

// module.exports = Banner;

AppRegistry.registerComponent('RN2', () => RN2);