# test
some tests
想用这个文件夹来整理一些，遇到的一些题目~

# test01

题目都很长，我归纳一下题目要点~

## JS题——规定数额内，尽可能买到最多的东西且每种只能买一个

（第一感觉有点背包问题的味道emmm...但是比背包问题简单，嘻嘻！）

### 我的思路：

在总额范围内，图量不图贵重

    ①先将物品的价格升序

    ②逐一将价格相加，每相加一次都要判断是否超额，若没有则继续加物品，若有则丢出最近加入的一件物品


demo如下：


```javascript
function bag(money,arr){
    let count = 0;
    arr.sort((a,b)=>(a-b));
    for(let i = 0; i < arr.length; i++){
        count += arr[i];
        if(count > money){
            return ( count - arr[i] )
        }
    }
}
console.log(bag(180,[50,42,9,15,105,63,14,30]))
```


## 实现页面——要求

   （1）输入需要的格子数，自动添加进页面；

   （2）移入每个格子都能发生背景色变红事件；

   （3）移出每个格子都能发生无背景色事件；
   
   （4）点击每个格子都能将背景色变为蓝色；

   （5）点击让格子变色后，鼠标在格子内移动不能变色，直到再一次点击格子时，将背景色变为红色，状态恢复；

   （6）效果均由js实现，格子背景色可由css实现。



### 我的思路：

（1）题目好长...让我静静...咳咳，我忽然觉得我可能也没有读懂题目hhh

（2）储备基本知识点：

     ①新建节点：document.createElement()
     
     ②添加节点：DOM.appendChild()
     
     ③事件：DOM0（onclick,onmousemove,onmouseout）
     
           DOM2(addEventListener('click',fn)
           
                ,addEventListener('mousemove',fn)
                
                ,addEventListener('mouseout',fn))
                
     ④获取：document.getElementsByTagName
     
           /document.getElementById
           
           /document.querySelector()......
           
     ⑤设置DOM属性：DOM.style.attributes = values（我用了最简单的行间样式-.-）
     
 (3)流程：
 
     ①获得输入的值，并保存
     
     ②数量决定循环创建DOM节点并添加进文档的次数
     
     ③获取所有的新建节点div，为每一个都加上事件
     
     ④完善，因为鼠标点击后一定会在div内发生移动，即立刻触发mousemove事件
     
     解决方法：定义一个flag=T，用鼠标点击事件控制它的状态。
   
              鼠标点击将状态置为F，鼠标移入事件不在T状态下，不触发变色事件。
              
（4）demo

```html
<style>
    div { 
        border: 1px solid black;
        width:200px;
        height: 200px;
        margin: 10px;
    }
</style>

<body>
    输入所需要的格子数：
    <input name="numIn" id="numIn"/>
    <input name="submit" type="button" id="submit" value="提交"/>
    <section id="blockIn">
    </section>
</body>

<script>
    window.onload=function(){
        let nums = 0;
        document.querySelector("#submit").addEventListener('click',function(){
            document.querySelector("#blockIn").innerHTML = ''
            nums = document.querySelector("#numIn").value;
            blcokcss(nums)
            move()
        })
        function blcokcss(nums){
            let doms;
            for(let i = 0; i < nums; i++){
                let div = document.createElement('div')
                document.querySelector("#blockIn").appendChild(div)
            }
        }
        function move(){
            let flag = true
            let divs = document.getElementsByTagName('div');
            for(let i = 0; i < divs.length; i++){
                divs[i].onclick = function(){
                    if(flag){
                        divs[i].style.backgroundColor = 'blue';
                        flag =false;
                    }else{
                        divs[i].style.backgroundColor = 'red';
                        flag =true;
                    }
                }
                divs[i].onmousemove = function(){
                    if(flag){
                        divs[i].style.backgroundColor = 'red';
                    }
                }
                divs[i].onmouseout = function(){
                    if(flag){
                    divs[i].style.backgroundColor = 'white';
                    }
                }
            }
        }

    }
</script>
```

# test02
## 输出结果
```javascript
let a = (function(x){
    delete x
    return x
})(10)
console.log(a);
```
### 我的思路
Before:

我在做这道题的时候，认为delete删掉了参数的值，返回一个没有值的x，x为undefined

可是当我去程序运行的时候发现，发现...

最后的输出是：10


After:

我做了一个调试
```javascript
let a = (function(x){
    let flag = delete x
    console.log(flag)   //false
    console.log(x)      //10
    return x
})(10)
```
很清晰地可以看到，delete对x的操作并没有完成（delete对完成的操作会返回true）

来让我们去看一下[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)：

    delete 操作符用于删除对象的某个属性；如果没有指向这个属性的引用，那它最终会被释放。
    
    语法：delete expression（expression 的计算结果应该是某个属性的引用）

    什么情况下不能删除？
    
    ①你试图删除的属性不存在，不作为，但也会返回true
    
    ②对象的原型链上有一个同名属性，则只删除自身的同名属性，再访问依旧能访问到该属性（为原型链上继承的属性）
    
    ③任何使用 var 声明的属性不能从全局作用域或函数的作用域中删除
    
    ④任何用let或const声明的属性不能够从它被声明的作用域中删除。
    
    ⑤不可设置的(Non-configurable)属性不能被移除。这意味着像Math, Array, Object内置对象的属性以及使用Object.defineProperty()方法设置为不可设置的属性不能被删除

    MDN上写的非常详细，结合例子很通俗易懂。
```javascript
    var b = 10;
    result = delete b
    console.log(result)   //false
    //var声明的全局变量，不能删除
    
    txt = 'fimo is beautiful'
    result = delete txt
    console.log(result)   //true
    //txt未由var声明，是全局属性，可以删除
    
    function c(){
        var d = 10;
        result = delete d
        console.log(result)   //false
    }
    c()
    //对局部变量不起作用
    
    let d = {
        f:function(){}
    }
    result = delete d.f
    console.log(result)    //true
    //全局内函数无法delete，但是对象内函数可以delete
    
```
针对本题：

delete针对对象的属性操作，非局部变量。
