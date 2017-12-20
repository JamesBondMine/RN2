/**
 * Created by sww on 2016/10/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ListView,
    Image

} from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'

const {width,height}=Dimensions.get('window')


export default class RN2 extends Component{
    _page=0
    _dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor(props) {
        super(props);

        this.state = {
            dataSource:this._dataSource.cloneWithRows([
                'https://img.alicdn.com/tps/TB1OvT9NVXXXXXdaFXXXXXXXXXX-520-280.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=956735877,215936670&fm=11&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3510992391,970315798&fm=200&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=227953490,3054069314&fm=27&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=960958117,1709091495&fm=27&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2875524332,436336741&fm=11&gp=0.jpg',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1615575634,4119176251&fm=11&gp=0.jpg'
            ])
        };
    }

    componentDidMount() {
        let timer = setTimeout(()=>{
            clearTimeout(timer)
            // this.refs.scrollView.beginRefresh()
            //this.refs.listView.beginRefresh()
        },500) //自动调用刷新 新增方法
    }



    render(){

        return this._renderListView() // ListView Demo
    }


    /**
     * ListViewDemo
     * @returns {XML}
     * @private
     */
    _renderListView(){
        return(
            <SwRefreshListView
                dataSource={this.state.dataSource}
                ref="listView"
                renderRow={this._renderRowCustom.bind(this)}

                onRefresh={this._onListRefersh.bind(this)}
                onLoadMore={this._onLoadMore.bind(this)}
                //isShowLoadMore={false}//上拉加载
                renderFooter={()=>{
                    return
                    (<View style={{backgroundColor:'blue',height:130,width:w}}>
                        <Text>我是footer</Text>
                    </View>)
                }}
            />
        )
    }
    _renderRowCustom(rowData) {
        return(
            <View style={{backgroundColor: 'white', width: width}}>

                        <Image source={{uri: rowData}}
                               style={{marginBottom:10,marginLeft: 10, width: width - 20, height: 140,backgroundColor: 'blue',top: 10}}>
                        </Image>


                        <View style={{marginBottom:10,backgroundColor: 'red', top: 10, height:1,width:width}}>
                        </View>
            </View>
        )

    }

    /**
     * 模拟刷新
     * @param end
     * @private
     */
    _onRefresh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            alert('刷新成功')

            end()//刷新成功后需要调用end结束刷新

        },1500)

    }

    /**
     * 模拟刷新
     * @param end
     * @private
     */
    _onListRefersh(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this._page=0
            let data = []
            for (let i = 0;i<10;i++){
                data.push('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=956735877,215936670&fm=11&gp=0.jpg')
            }
            this.setState({
                dataSource:this._dataSource.cloneWithRows(data)
            })

            this.refs.listView.resetStatus() //重置上拉加载的状态

            end()//刷新成功后需要调用end结束刷新
            // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
        },1500)
    }

    /**
     * 模拟加载更多
     * @param end
     * @private
     */
    _onLoadMore(end){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            this._page++
            let data = []
            for (let i = 0;i<(this._page+1)*10;i++){
                data.push('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1615575634,4119176251&fm=11&gp=0.jpg')
            }
            this.setState({
                dataSource:this._dataSource.cloneWithRows(data)
            })
            //end(this._page > 2)//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕
            this.refs.listView.endLoadMore(this._page > 2)
        },2000)
    }

}
const styles=StyleSheet.create({
    container:{

    },
    content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
        backgroundColor:'purple',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    }

})
AppRegistry.registerComponent('RN2', () => RN2);
