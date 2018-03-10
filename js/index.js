/*
* @Author: Administrator
* @Date:   2017-06-28 17:18:24
* @Last Modified by:   Chengx
* @Last Modified time: 2017-07-05 09:04:13
*/

'use strict';
// 页面加载完成后才要执行js
window.onload=function(){
    function Game(screen,letter,letterKey,score,life){
    	this.screen=screen;//场景
    	this.width=screen.offsetWidth;
    	this.height=screen.offsetHeight;
        this.letterwidth=letter.offsetWidth;
        this.letterObj={};
        this.letterKey=letterKey;
        this.t=null;//时间函数
        this.scoreBox=score;
        this.lifeBox=life;

 
        this.life =10;
        this.score=0;
        this.guan=5;
        this.sudu=1;


    }
    Game.prototype={
    	createLetter:function(){//创建字母
           do{
             var letterCode=Math.floor(Math.random()*26+65);
             var letter=String.fromCharCode(letterCode);
              }while(this.letterObj[letter])

           var div=document.createElement("div");
           div.className="let";
           div.style.backgroundImage="url(img/A_Z/"+letter+".png)";

           do{
           	var left=Math.floor(Math.random()*(this.width-this.letterwidth));

           }while(this.checkLeft(left));

            var top=Math.floor(Math.random()*100);

             div.style.left=left+"px";
             div.style.top=top+"px";

            this.letterObj[letter]={
            	top:top,left,node:div
            }
           this.screen.appendChild(div);
    	},
    	move:function(){//字母下落
          var that = this;
          this.t=setInterval(function(){
            for(var i in that.letterObj){
                  var obj = that.letterObj[i];
                  obj.top+=that.sudu;
                  obj.node.style.top = obj.top+"px";
                  if (obj.top>that.height){
                    that.screen.removeChild(obj.node);
                    delete that.letterObj[i];
                    that.createLetter();

                    that.life--;
                    that.lifeBox.innerText=that.life;
                    
                    if (that.life <=0) {
                      that.pause();
                      box.style.display="block";
                      fenshu.innerText=that.score;
                
                    }
                  }
            }
          },50);
          
    	},
    	removeLetter:function(){//移除字母
        // console.log(this.letterKey.length);
        var that = this;
        for(var i=0;i<this.letterKey.length;i++){
          this.letterKey[i].addEventListener("touchend",function(){
            var letter = this.innerText;
            if (that.letterObj[letter]) {
              that.screen.removeChild(that.letterObj[letter].node);
              delete that.letterObj[letter];
              that.createLetter();

              that.score++;
              that.scoreBox.innerText=that.score;

              if (that.score>that.guan) {
                that.guan +=10;
                that.sudu++;
              }


            }
          },false);
        }
    	},
    	checkLeft:function(left){
    		for(var i in this.letterObj){
    			if(left>this.letterObj[i].left-this.letterwidth&&left<this.letterObj[i].left+this.letterwidth){
    				return true;
    			}
    		}
    		return false;
    	},
      pause:function(){
        clearInterval(this.t);

       },
      replay:function(){

        for (var i in this.letterObj){
          this.screen.removeChild(this.letterObj[i].node);
        }

        this.letterObj={};
        this.life =10;
        this.score=0;
        this.guan=5;
        this.sudu=1;
        this.lifeBox.innerText=this.life;
        this.scoreBox.innerText=this.score;
        console.log(this.scoreBox);
        box.style.display="none";

        for(var i=0;i<3;i++){
          this.createLetter();
        }
        this.move();
      }
    }
    var screen=document.querySelectorAll(".screen")[0];
    var letter=document.querySelectorAll(".let")[0];
    var LetterKey = document.querySelectorAll(".letter");
    var score =document.querySelector("#score");
    var life  =document.querySelector("#life");

  
  var obj=new Game(screen,letter,LetterKey,score,life );

  var fenshu=document.querySelector(".fenshu");
	var start=document.querySelector(".start");
  var box=document.querySelector("#box");
  var box2=document.querySelector(".box2");

  var btn=document.querySelector(".btn");
	var flag1=true;
  var flag2=true;
	start.onclick=function(){
    if (flag2){
      for(var i=0;i<5; i++){
        obj.createLetter();
      }
      obj.removeLetter();
      flag2=false;
    }
		if(flag1){//开始状态
  		this.className= "start pause";
      obj.move();
  		flag1=false;
      box2.style.display="none";
	}else{
  		this.className= "start";
      flag1=true;
      obj.pause();
      box2.style.display="block";
	   }
	}
  btn.onclick=function(){
      obj.replay();
  }
  var audio=document.querySelector("audio");
  var box3=document.querySelector(".box3");
  var flag3=true;
  box3.onclick=function(){
    if (flag3) {
      this.style.backgroundImage="url(img/yinyue.png)";
      audio.play();
      flag3=false;
      
    }else{
      this.style.backgroundImage="url(img/yinyueT.png)";
      flag3=true;
      audio.pause();
    }
  }
}
