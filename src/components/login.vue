<template>
<div class="login">

  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" >
    <h3 class="title">tutorabc企业管理员中心</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" @blur="test"></el-input>
      <div class="el-form-item__error" v-show='pleasewhiteaccount'>输入账户不能为空</div>
        <div class="el-form-item__error" v-show='pleasewhiteaccount1'>账户为手机号码或者邮箱</div>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"  @focus="done"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      
    <button type="button" class="el-button" style="width: 100%;" @click='handleSubmit'>登&nbsp;录</button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
      <div class="err" v-show='failure'>{{msg}}</div>
     <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <span class="forget"><a href="">忘记密码</a></span> -->
      <loading v-if="loadingState"></loading>
  </el-form>
    
  </div>
</template>
<script> 
  import { getCookie, setCookie } from '../assets/js/cookie';

  export default {
    data() {
  
      return {
        pleasewhiteaccount:0,
         pleasewhiteaccount1:0,
        loadingState:0,
        failure:0,
        msg:'',
        emailerror:false,
        logining: false,
       ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            // { required: true, message: '请输入账号', trigger: 'blur' },
            // //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
   
    methods:{
       done() {
      this.failure = 0;
    },
    test(){
     // alert(1);
      if(/^1\d{10}$|^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.ruleForm2.account)){
         this.pleasewhiteaccount=0;
         this.pleasewhiteaccount1=0;
      }else if(this.ruleForm2.account==''){
        this.pleasewhiteaccount=1;
         this.pleasewhiteaccount1=0;
      }else{
         this.pleasewhiteaccount1=1;
          this.pleasewhiteaccount=0;
      }
    },
     
      handleSubmit(){
        console.log(this.ruleForm2.account);
        	if(!this.ruleForm2.account|| !this.ruleForm2.checkPass){
					alert("用户名或密码为空");
					return;
				}
        var that = this;
        // var url='http://192.168.87.82:9091/login/CheckLogin';
        var url='http://corpmember.tutorabc.com.cn/login/CheckLogin';
        
      
       // var _this = this;
       this.loadingState=1
        this.$http.get(url,
        {  
               params: {
                 "account":this.ruleForm2.account,
                 "password":this.ruleForm2.checkPass,
                
          }
        }).then((res)=>{
         var res1 = JSON.parse(res.bodyText);
          // console.log('ActiveCode: ', this.ruleForm.num)
         // console.log(res1); 
          console.log(res1.Code);  
            this.loadingState=0;
          	setCookie("loginedUser", res1.Code, 7);
          if(res1.Success==true){
             this.$router.push({
              name: 'home',
              params: { 'password': this.ruleForm2.checkPass}
            });
              
          }else{
            this.msg=res1.Message;
            that.failure=1;
            
            //alert(res1.Message);
          }
        })
      }
    }

  
      
    
  }
                                                                                                                                                                                                
</script>

<style scoped>
  .login{
    width: 100%;
    height: 100%;
    background: url(../assets/images/ym.png);
    background-size: cover;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position: absolute;
    left:70%;
    top:200px;
    width: 320px;
    height: 380px;
    padding: 35px 35px 15px 35px;
    background:#4a4a4a;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;}
    .title {
      margin: 0px auto 40px auto;
      text-align: left;
      color: #fff;
      font:24px/33px '微软雅黑';
    }
    .remember {
      margin: 0px 0px 35px 0px;
      color:#fff;
    }
    .login .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color:#4a4a4a;
    border-color: #fff;}
    .login .el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 25px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.login .el-button{
  border-radius: 25px;
  margin-top:20px;
  background-color:#f74c4c;
  outline-style: none;
  color:#fff;
  border-color: #4a4a4a;
  height: 40px;
}
.login .el-button:hover{
background-color:#f74c4c;
opacity: 0.8;
color: #fff;
border-color: #4a4a4a

}
.login .forget{
  display: none;
   font-size: 14px;
   text-decoration: underline;
   color:#fff;
   margin-left: 180px;
   }
.login .forget a{
  color: #fff;
}
.err{
    color: #ff4949;
    font-size: 14px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 48%;
    left: 35%;
}

</style>
