
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    PropTypes,
    Navigator,
    ScrollView,
    NativeModules,
    TextInput,
    ListView,
    Image
} from 'react-native';
import  React, {Component} from 'react';
import Dimensions from 'Dimensions'
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

String.prototype.trim = function(){
    return this.replace(/^[\s,，]+/, "").replace(/[\s,，]+$/, "");
}

export default class CustomView extends Component{
    constructor(props){
        super(props)

        this.state = {
            text:"1111",
            loadMore:false,
            brand:props.brand,
        }
    }

    _onPressButton(str){

        console.log('点击了子页面的button')
        console.log('点击了子页面的button',this.props.callback.text)


    }

    _memCombineStr(str,separator){
        if(str){
            str = str.trim();
            let strArr = str.split(separator)
            var targetArr = ''
            var index = 0
            for (var item of strArr){
                if (!(index == strArr.length - 1)){
                    targetArr += item + '、'
                }else{
                    targetArr += item
                }
                index ++
            }
            return targetArr
        }
    }



    render(){
        const {rowData,rowid,js} = this.props
        return(

            <View style={{width:width,height:200.5}}>

                <View style={{top:12,paddingLeft:15,paddingTop:5,paddingRight:15}}>
                    <Text style={{fontSize:14,color:'#ff4000'}}>{rowData}</Text>
                </View>

                <View style={{top:12,paddingLeft:15,paddingTop:5,paddingRight:15}}>
                    <Text style={{fontSize:14,color:'#ff4000'}}>{rowid}</Text>
                </View>

                <View style={{top:12,paddingLeft:15,paddingTop:5,paddingRight:15,paddingBottom:15}}>
                    <Text style={{fontSize:14,color:'#ff4000'}}>{js}</Text>
                </View>

            </View>

    )
    }

    _chageButton(has_follow){
        if (!this.props.isSubmit){
            return (
                <View style={{position:'absolute',top:12,right:15,paddingLeft:15,paddingTop:5,paddingRight:15,paddingBottom:5,borderRadius:2,borderColor:'#ff4000',borderWidth:1,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontSize:14,color:'#ff4000'}}>咨询</Text>
                </View>
            )
        }else  if (has_follow && has_follow === 1){
            return (
                <View style={{position:'absolute',top:12,right:15,width:70,borderColor:'#cccccc',borderWidth:0.5,borderRadius:3,alignSelf:'center',padding:8,flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontSize:12,color:'#999999'}}>取消关注</Text>
                </View>
            )
        }else{
            return (
                <View style={{position:'absolute',top:12,right:15,width:70,borderColor:'#cccccc',borderWidth:0.5,borderRadius:3,alignItems:'center',padding:8,flexDirection:'row',justifyContent:'center'}}>
                    <Image style={{width:13,height:13,marginRight:8}} source={require('./styles/assets/add.png')}/>
                    <Text style={{fontSize:12,color:'#666666'}}>关注</Text>
                </View>
            )
        }
    }
}
