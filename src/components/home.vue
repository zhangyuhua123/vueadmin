<template>
    <div class="home" style="background:#f4f4f4">
        <div class="nav">
            <div class='layout'>
                <div class="left">
                    <img src="../assets/images/login.png" alt="" class='log'>
                    <span>企业管理员中心</span>
                </div>
                <div class="ce">
                    <!-- <a href="">企业账号</a> -->
                    <router-link to='/home' class="router-link-active">企业帐户管理</router-link>
                    <!-- <a href="">员工账号管理</a> -->
                    <!-- :to="{name:'articles',params:{aid:item.id}}"  -->
                    <router-link :to="{name:'step1',params:{aid:obj.InCharge}}">员工帐户管理</router-link>
                </div>
                <div class="right">
                    <!-- <a href="">退出</a> -->
                    <router-link to='/login'>退出</router-link>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="form-horizontal layout " style="margin-top:30px;">
                <fieldset id="basicInformation" style="position:relative">
                    <div id="legend" style="margin-left: 10px;">
                        <span class="basicinformation">企业基本信息</span>
                        <div style="display:inline-block" class="modification">
                            <span class="btn btn-default" @click="changepassword"> 修改密码</span>
                            <span class="btn btn-default" @click="showziliao(obj)"> 修改资料</span>
                        </div>
                        <hr>
                    </div>
                    <table id="tab" style="width: 100%">
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;客户名称:</th>
                            <Td>{{obj.CompanyName}}</Td>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户账号:</th>
                            <Td>{{obj.CroKeyNumber}}@vipabc.corporate.com</Td>
                        </tr>
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;企业全称:</th>
                            <Td>{{obj.CompanyFullName}}</Td>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户编号:</th>
                            <Td>{{obj.CroKeyNumber}} </Td>

                        </tr>
                        <tr>
                            <th>企业联系人:</th>
                            <Td>{{obj.ContactCName}}</Td>
                            <th>tutorabc顾问:</th>
                            <Td> {{obj.CompanyContact}}

                            </Td>
                        </tr>
                        <tr>
                            <th>联系人电话:</th>
                            <Td>{{obj.ContactMobile}}</Td>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;顾问电话:</th>
                            <Td>{{obj.CompanyContactTel}}
                                <input type="hidden" v-model="obj.contactSn" ref="contactSn">
                            </Td>
                        </tr>
                    </table>
                </fieldset>

                <fieldset class="contractinformation" style="margin-top:30px;background:#fff;position:relative" v-for="(item,index) in arr" :key="index">
                    <div id="legend" style="margin-left: 10px;">
                        <span class="basicinformation">企业合约信息 {{++index}}</span>
                        <hr>
                    </div>
                    <div class="progressbar">
                        <el-progress type="circle" :percentage="ssiu(item)
                                "></el-progress>
                        <div class='lessment'>
                            <span style="font-size:39px;display:inline-block;width:100%;">{{item.UnusedAccount}}<i>堂</i></span>
                           <br>
                            <span>剩余</span>
                        </div>
                        <table style="width: 100%" class="circleth">
                            <tr>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;合约总堂数:</th>
                                <Td>{{item.TotalClass}}</Td>
                            </tr>
                            <tr>
                                <th>已经开通学员数:</th>
                                <Td>{{item.AccountAmount}}</Td>
                            </tr>
                        </table>
                        <span></span>
                    </div>
                    <table id="tab" style="width: 50% ;margin-left:38%">
                        <tr style="position:relative">
                            <th>主合约编号:
                            </th>
                            <Td>{{item.MainContractSn}}
                                 <span class='icont' @click='showcolum'>
                                    <div class='detail' v-if='isdetail'>
                                        <p>课程类型:</p>
                                        <span>{{item.ClassCategory}}</span>
                                    </div>
                                </span></Td>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建时间：</th>
                            <Td> {{item.InputDate}}</Td>
                        </tr>
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;合约类型:</th>
                            <Td>公司合约</Td>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;起始时间:</th>
                            <Td>{{item.ContractBegin}}</Td>
                        </tr>
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;合约状态：</th>
                            <Td>已开通</Td>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结束时间:</th>
                            <Td>{{item.ContractEnd}}</Td>
                        </tr>
                        <tr>
                            <th>&nbsp;&nbsp;&nbsp;付款类型:</th>
                            <Td>全额</Td>
                        </tr>
                        <tr>
                            <th>合约总金额:</th>
                            <Td>{{item.TotalAmount}}元</Td>
                            <th>实际付款金额:</th>
                            <Td>{{item.TotalAmount}}元</Td>
                        </tr>
                    </table>
                </fieldset>
            </div>
        </div>
        <div class="for5 layer-anim layui-layer" v-show='ispassword'>
            <div class="el-message-box__header">
                <div class="el-message-box__title">修改密码</div>
                <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="showclose">
                    <i class="el-message-box__close el-icon-close"></i>
                </button>
            </div>
            <div class="el-message-box__content">
                <p>
                    <span>原密码:</span>
                    <input type="password" v-model='oldpassword' style="width:200px;height:20px;" @blur="test">
                    <div class="el-form__error1" v-show='pleasewhitepassword'>密码不能为空</div>
                    <div class="el-form__error1" v-show='pleasewhitepassword1'>原密码输入有误</div>
                </p>
                <p>
                    <span>新密码:</span>
                    <input type="password" v-model='newpassword' style="width:200px;height:20px;" @blur="test2">
                    <div class="el-form__error2" v-show='pleasewhitenewpassword'>密码不能为空</div>
                    <div class="el-form__error2" v-show='pleasewhitenewpassword1'>新旧密码不能一致</div>
                </p>
                <p>
                    <span>确认密码:</span>
                    <input type="password" v-model='confirmpassword' style="width:200px;height:20px;" @blur="test3">
                    <div class="el-form__error3" v-show='pleasewhiteconfirmpassword'>密码不能为空</div>
                    <div class="el-form__error3" v-show='pleasewhiteconfirmpassword1'>两次输入密码不一致</div>
                </p>
            </div>
            <div style="width:410px;height:1px;margin:0px auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></div>
            <div class='warin_text2'>
                <p> 注意事项:</p>
                <p>• 密码仅能使用6-14位数字或英文，字母区分大小写，避免使用空格与特殊符号(例如：~ @ ^等)。</p>
                <p>• 请避免使用生日、身份证字号或是易于被猜中的连续数字。</p>
                <p>• 请牢记您变更的密码。</p>

            </div>

            <div class="el-message-box__btns">
                <input type="button" class="el-button" value="取消" @click="cancel">
                <input type="button" value="确定" class="el-button el-button--default el-button--primary " @click='confirmpasswordnation' :disabled='disabled1'>
            </div>
        </div>
        <div class="modal-backdrop" v-show='ariahidden'></div>

        <div class="layui-layer layui-layer-page layer-anim" v-show='isziliao' id="layui-layer1" type="page" times="1" showtime="0" contype="string" style="z-index: 19891015; width: 390px; height: 200px; ">
            <div class="layui-layer-title" style="cursor: move;">修改资料</div>
            <div id="LAY_layuipro" class="layui-layer-content" style="height: 105px;">
                <div id="changepassword">
                    <p>
                        <span> 企业联系人:</span>
                        <input type="text" v-model="companyContacts">
                    </p>
                    <p>
                        <span> 企业联系人电话:</span>
                        <input type="text" v-model="companyTel">
                    </p>
                </div>
            </div>
            <span class="layui-layer-setwin">
                <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;" @click="showclose"></a>
            </span>
            <div class="layui-layer-btn layui-layer-btn-">
                <a class="layui-layer-btn0" @click="cancel">取消</a>
                <a class="layui-layer-btn1" @click='confirm7'>修改</a>
            </div>
        </div>
        <loading v-if="loadingState"></loading>
    </div>
</template>
<style >
@import "../assets/css/home.css";
.spinner {
    margin: 100px auto;
    width: 60px;
    height: 60px;
    position: absolute;
    /* display: none; */
    top: 35%;
    left: 45%;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 555;
    background-color: #666;
    opacity: 0.8
}

.lessment {
    width:50%;
    text-align: center;
    left: 50%;
    position: absolute;
    top: 50%;
    margin-top: -79px;
    margin-left: -40px;
}

.lessment i {
    font-style: normal;
    color: #ff4949;
    font-size: 14px;
}

.lessment span:nth-child(1) {
    font-size: 48px;
    color: #ff4949;
    font-family: 300;
}

.lessment span:nth-child(2) {
    font-size: 20px;
    color: #696969;
}

.icont {
    width: 20px;
    height: 20px;
    background: url(../assets/images/copy2.png);
    display: inline-block;
    position: relative;
}

.el-progress--circle .el-progress__text {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
}

.detail {
    width: 190px;
    height: 122px;
    background: url(../assets/images/bcg.png);
    z-index: 1000;
    position: absolute;
    top: -120px;
    left: -30px;
}

#changepassword input {
    outline: none;
    border: 1px solid #eee;
    background: none;
    width: 220px;
    height: 30px;
    margin-top: 20px;
}

.el-form__error1 {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 27%;
    left: 128px;
}

.el-form__error2 {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 50%;
    left: 128px;
}

.el-form__error3 {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 79%;
    left: 128px;
}

#tab th {
    width: 150px;
}
</style>
<script>
import { getCookie } from '../assets/js/cookie';

export default {
    data() {
        return {
            pleasewhiteconfirmpassword: 0,
            pleasewhiteconfirmpassword1: 0,
            pleasewhitepassword: 0,
            pleasewhitepassword1: 0,
            pleasewhitenewpassword: 0,
            pleasewhitenewpassword1: 0,
            loadingState: 0,
            oldpassword: '',
            newpassword: '',
            ariahidden: 0,
            obj: {},
            arr: [],
            isziliao: 0,
            ispassword: 0,
            isdetail: 0,
            confirmpassword: '',
            companyContacts: '',
            companyTel: '',
            InCharge: ''

        }
    },
    beforeCreate() {
        var login = getCookie('loginedUser');
        if (!login) {
            this.$router.push({ path: '/login' })
        }

    },

    created() {
        // var p = this.$route.params.password

        this.loadingState = 1;
        console.log(getCookie('loginedUser'));
        var url = 'http://corpmember.tutorabc.com.cn/Home/Index?Sign=' + getCookie('loginedUser');
        this.$http.get(url).then((res) => {
            this.loadingState = 0;
            console.log(res);
            var result = JSON.parse(res.bodyText);
            this.obj = result.CorpBasicModel;
            // console.log(this.obj.InCharge);
            var InCharge = this.obj.InCharge;
            //  console.log(' this.obj.InCharge:'+ this.obj.InCharge);
            // this.contactSn=this.obj.contactSn;
            this.arr = result.Productdetails;
            console.log(result.CorpBasicModel);
        }).catch((res) => {
            console.log(res.status);
        })
    },
    computed: {
        disabled1: function() {
            //console.log(this.checked)
            if (this.confirmpassword != this.newpassword) {
                return 'disabled';
            } else {
                return false;
            }
        },
    },

    methods: {
        ssiu(item) {
            // console.log((item.TotalClass-item.UsedAccount));
            console.log(item.UnusedAccount);
            console.log(item.TotalClass);
            console.log(((item.UnusedAccount) / item.TotalClass));
            //UnusedAccount
            var per = ((item.UnusedAccount) / item.TotalClass);
            var per1 = parseInt(per);

            // `this` points to the vm instance
            if (!(item.AccountAmount || item.TotalClass)) {

            } else {
                return per * 100;

            }

        },
        showcolum() {
            // alert(1);
            this.isdetail = !this.isdetail;

        },

        showclose() {
            this.ispassword = 0;
            this.isziliao = 0;
            this.ariahidden = 0;
        },
        cancel() {
            this.ispassword = 0;
            this.isziliao = 0;
            this.ariahidden = 0;
        },

        confirm() {
            this.isshowstudentmessage = 0;
            this.isaddnewstudents = 0;
            this.iscontraction = 0;
            // this.ispassword = 0;
            this.isziliao = 0;
            this.ariahidden = 0;
            // if (this.newpassword != this.confirmpassword) {
            //     alert('两次输入密码有误')
            // }
        },
        confirmpasswordnation() {

            var url = 'http://corpmember.tutorabc.com.cn/home/ResetPassword?Sign=' + getCookie('loginedUser');
            this.$http.get(url, {
                params: {
                    "oldPwd": this.oldpassword,
                    "newPwd": this.newpassword,
                }
            }).then((res) => {

                var res1 = JSON.parse(res.bodyText);

                this.ispassword = 0;
                this.ariahidden = 0;
                this.pleasewhitepassword1 = this.newpassword;
                alert((JSON.parse(res1).success ? "修改成功" : "修改失败"+(JSON.parse(res1).message=='Error_OldPassword'?",原密码输入有误":"")));

            }).catch((res) => {
                console.log(res.status);
            })

        },
        showziliao(obj) {

            this.isziliao = 1;
            this.ariahidden = 1;
            // this.companyContacts='';
            // this.companyTel='';
            var url = 'http://corpmember.tutorabc.com.cn/Home/Index?Sign=' + getCookie('loginedUser');

            this.companyContacts = obj.ContactCName;
            this.companyTel = obj.ContactMobile;

            console.log(obj.ContactCName);
        },
        confirm7() {
            this.loadingState = 1;
            console.log(getCookie('loginedUser'));
            var url = 'http://corpmember.tutorabc.com.cn/Home/Index?Sign=' + getCookie('loginedUser');
            this.$http.get(url).then((res) => {
                this.loadingState = 0;
                console.log(res);
                var result = JSON.parse(res.bodyText);
                this.obj = result.CorpBasicModel;
                // console.log(this.obj.InCharge);
                var InCharge = this.obj.InCharge;
                //  console.log(' this.obj.InCharge:'+ this.obj.InCharge);
                // this.contactSn=this.obj.contactSn;
                this.arr = result.Productdetails;
                console.log(result.CorpBasicModel);
            }).catch((res) => {
                console.log(res.status);
            });
            console.log(this.obj.ContactSn);
            var url = 'http://corpmember.tutorabc.com.cn/home/EditBasicInformation?Sign=' + getCookie('loginedUser');
            this.$http.get(url, {
                params: {
                    'contactSn': this.obj.ContactSn,
                    'companyContacts': this.companyContacts,
                    'companyTel': this.companyTel

                }
            }).then((res) => {
                console.log(res);
                alert(res.body.Msg);
                this.ariahidden = 0;

            }).catch((res) => {
                console.log(res.status);
            })
            this.isziliao = 0;
        },

        changepassword() {
            this.confirmpassword = '';
            this.ispassword = 1;
            this.ariahidden = 1;
            this.oldpassword = '';
            this.newpassword = ''
        },
        test() {
            if (this.oldpassword == '') {
                this.pleasewhitepassword = 1;
                this.pleasewhitepassword1 = 0;
            }  else {
                this.pleasewhitepassword = 0;
                this.pleasewhitepassword1 = 0;
            }
        },
        test2() {
            if (this.newpassword == '') {
                this.pleasewhitenewpassword = 1;
                this.pleasewhitenewpassword1 = 0;
            } else if (this.oldpassword == this.newpassword) {
                this.pleasewhitenewpassword = 0;
                this.pleasewhitenewpassword1 = 1;
            } else {
                this.pleasewhitenewpassword = 0;
                this.pleasewhitenewpassword1 = 0;
            }
        },
        test3() {
            if (this.newpassword != this.confirmpassword) {
                this.pleasewhiteconfirmpassword = 0;
                this.pleasewhiteconfirmpassword1 = 1;
            } else if (this.confirmpassword == '') {
                this.pleasewhiteconfirmpassword = 1;
                this.pleasewhiteconfirmpassword1 = 0;
            } else {
                this.pleasewhiteconfirmpassword = 0;
                this.pleasewhiteconfirmpassword1 = 0;
            }
        }

    }
}
</script>
