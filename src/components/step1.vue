<template>
  <div>
    <div class='alert layer-anim layui-layer' v-if='isaddnewstudents'>
      <div class="for2">
        <div class="el-message-box__header">
          <div class="el-message-box__title">新增学员</div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="showclose">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <p>
            <span>手机号:</span>
            <input type="text" v-model='tel' style="width:200px;height:35px;" @blur="test1">
            <div class="el-form__error" v-show='pleasewhitetel'>手机号不能为空</div>
            <div class="el-form__error" v-show='pleasewhitetell'>请输入正确的手机号</div>
            <!-- <div class="el-form__error" v-show='pleasewhiteaccount1'>账户为手机号或者邮箱</div> -->
          </p>
          <p>
            <span>邮箱:</span>
            <input type="email" v-model='account' style="width:200px;height:35px;" @blur="test">
            <div class="el-form__error1" v-show='pleasewhiteaccount'>邮箱不能为空</div>
            <div class="el-form__error1" v-show='pleasewhiteaccount1'>邮箱输入有误</div>
          </p>
          <p>
            <span>中文姓名:</span>
            <input type="text" v-model='chinesename' style="width:200px;height:35px;" @blur="test3">
            <div class="el-form__error4" v-show='pleasewhitename1'>姓名只能为中文姓名</div>
            <div class="el-form__error4" v-show='pleasewhitename'>姓名不能为空</div>
          </p>
          <p>
            <span>性别:</span>
            <input type="radio" style='height:13px;padding:0;border:0;' @click="RadioChanged(1)" name='ss'>男
            <input type="radio" style='height:13px;padding:0;border:0;' @click="RadioChanged(2)" name='ss'>女
          </p>
          <div style="width:410px;height:1px;margin:0px auto;padding:0px;background-color:#D5D5D5;overflow:hidden;"></div>
          <div>
            <input type="checkbox" name="" id="" v-model='checked'>新建合约</div>
        </div>

      </div>
      <div class="for3" v-show="show">
        <div class="el-message-box__content">
          <p>
            <span>主合约:</span>
            <el-select v-model="value" placeholder="请选择合约" @change="changeContract()" value-key="productName">
              <el-option v-for="item in options" :key="item.contractSn" :label="`${item.contractSn}   ${item.productName}`" :value="item">
              </el-option>

            </el-select>
            <!-- <div class="description">类型:1对1  剩余堂数:30堂 </div>  -->
            <div v-if="value.productSn!=0">
              <div class="description">类型：{{this.value.contractDescription}}</div>
              <div class="description">剩余：{{this.value.totalsessions}}</div>
            </div>
          </p>

          <p>
            <span>冲堂课数:</span>
            <input id="min" name="" type="button" value="-" style="width:62px;" @click='minchuang' class="el-input__inner" />
            <input id="text_box" name="goodnum" type="text" style="width:66px;" v-model="number" class="el-input__inner" @blur='test7' />
            <input id="add" name="" type="button" value="+" style="width:62px;" @click='add2chuang' class="el-input__inner" />
          </p>
          <p class="block">
            <span class="demonstration">合约开始</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </p>
          <p class="block">
            <span class="demonstration">合约结束</span>
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
            </el-date-picker>
          </p>
        </div>
      </div>
      <div class="el-message-box__btns">
        <input type="button" class="el-button" value="取消" @click="cancel">
        <input type="button" value="确定" class="el-button el-button--default el-button--primary " @click="confirm" :disabled='disabled1'>
      </div>
    </div>
    <div class='employer'>
      <div class="nav">
        <div class='layout'>
          <div class="left">
            <img src="../assets/images/login.png" alt="" class='log'>
            <span>企业管理员中心</span>
          </div>
          <div class="ce">
            <router-link to='/home' active-class="active">企业帐户管理</router-link>
            <router-link to='/step1' active-class="active">员工帐户管理</router-link>
          </div>
          <div class="right">
            <router-link to='/login'>退出</router-link>
          </div>
        </div>
      </div>
      <div class="banner">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="中文姓名">
            <el-input v-model="formInline.user" @blur="test8"></el-input>
            <div class="error6" v-show="pleasewhitename1">姓名只能为中文字符</div>
          </el-form-item>
          <el-form-item label="手机号" style="margin-left:35px;">
            <el-input v-model="formInline.mobllie" @blur="testmoblie"></el-input>
            <div class="error6" v-show='pleasewhitetell'>请输入手机号</div>
          </el-form-item>
          <el-form-item>
            <button type="primary" @click="onSubmit(1)" style="margin-left:25px;" class='btn2'>查询</button>
          </el-form-item>
          <el-form-item>
            <button type="primary" @click="add1" class="btn1">新增学员</button>
          </el-form-item>
        </el-form>
      </div>

      <!--table表格  -->
      <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="中文姓名" width="150">
          <template scope="scope">
            <button type="button" class="el-button " @click='showstudentmessage(scope.row)'>
              <!---->
              <!---->
              <span> {{ scope.row.Cname }}</span>
            </button>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="Phone" label="手机号" width="130">
        </el-table-column>
        <el-table-column prop="Email" label="邮箱" width="250">
        </el-table-column>
        <el-table-column prop="ContractSn" label="合约编号" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="MainContractSn" label="主合约编号" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="ProductName" label="产品名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="ContractTotalClass" label="总堂数" show-overflow-tooltip width="80">
        </el-table-column>
        <el-table-column prop="ContractUsedClass" label="已使用" show-overflow-tooltip width="80">
        </el-table-column>
        <el-table-column prop="ContractRemainClass" label="剩余" show-overflow-tooltip width="80">
        </el-table-column>
        <el-table-column prop="ContractService_Start" label="合约开始" show-overflow-tooltip width="180">
        </el-table-column>
        <el-table-column prop="ContractService_End" label="合约结束" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column label="修改合约" width="120">
          <template scope="scope">
            <button size="small" @click="handleEdit(scope.$index, scope.row)" class='smallbtn' v-show='!scope.row.MainContractSn'>创建合约</button>
            <button size="small" @click="handleEdit1(scope.$index, scope.row)" class='smallbtn' v-show='scope.row.MainContractSn'>修改合约</button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination layout="prev, pager, next" @current-change='handleCurrentChange' :current-page='currentPage' :page-size='10' :total="totalCount">
        </el-pagination>
      </div>

      <!--学员信息  -->
      <div class="for1 layer-anim layui-layer" v-if='isshowstudentmessage'>
        <div class="el-message-box__header">
          <div class="el-message-box__title">学员信息</div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="showclose">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <p>
            <span>手机号:</span>
            <input type="text" v-model='tel' style="width:200px;height:20px;" @blur="test1" disabled>

            <!-- <div class="el-form__error" v-show='pleasewhiteaccount1'>账户为手机号或者邮箱</div> -->
          </p>
          <p>
            <span>邮箱:</span>
            <input type="email" v-model='account' style="width:200px;height:20px;" @blur="test" disabled>

          </p>
          <p>
            <span>中文姓名:</span>
            <input type="text" v-model='chinesename' style="width:200px;height:20px;" @blur="test9">
            <div class="el-form__error4" v-show='pleasewhitename1'>姓名必须为中文</div>
          </p>
          <p>
            <span>性别:</span>
            <input type="radio" value='男' name='ss' @click="RadioChanged('男')" v-model='sex' checked>男
            <input type="radio" value='女' name='ss' @click="RadioChanged('女')" v-model='sex' checked>女</p>
        </div>

        <div class="el-message-box__btns">
          <input type="button" class="el-button" value="取消" @click="cancel">
          <input type="button" value="确定" class="el-button el-button--default el-button--primary " @click='confirm3'>
        </div>
      </div>

      <!--修改合约  -->
      <div class="for4 layer-anim layui-layer" v-show="iscontraction">
        <div class="el-message-box__header">
          <div class="el-message-box__title">修改合约</div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="showclose">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <p>
            <span style="display:inline-block; width:330px">主合约:{{productname}}</span>

            <div class="description">{{contractDescription}} </div>
          </p>
          <p>
            <span>剩余课数:</span>
            <input id="min" name="" type="button" value="-" style="width:62px;" @click='min' class="el-input__inner" />
            <input id="text_box" name="goodnum" type="text" style="width:66px;" v-model="totalsessions" class="el-input__inner" @blur='test7' />
            <input id="add" name="" type="button" value="+" style="width:62px;" @click='add2' class="el-input__inner" />
          </p>
          <p class="block">
            <span class="demonstration">合约开始</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </p>
          <p class="block">
            <span class="demonstration">合约结束</span>
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
            </el-date-picker>
          </p>

        </div>
        <div class="el-message-box__btns">
          <input type="button" class="el-button" value="取消" @click="cancel">
          <input type="button" value="确定" class="el-button el-button--default el-button--primary " @click="confirm6()">
        </div>
      </div>

      <!--创建合约  -->
      <div class="for6 layer-anim layui-layer" v-show="ischuangjianheyue">
        <div class="el-message-box__header">
          <div class="el-message-box__title">创建合约</div>
          <button type="button" aria-label="Close" class="el-message-box__headerbtn" @click="showclose">
            <i class="el-message-box__close el-icon-close"></i>
          </button>
        </div>
        <div class="el-message-box__content">
          <p>
            <span>主合约:</span>
            <el-select v-model="value" placeholder="请选择合约" @change="changeContract()" value-key="productName">
              <el-option v-for="item in options" :key="item.contractSn" :label="`${item.contractSn}   ${item.productName}`" :value="item">
              </el-option>

            </el-select>
            <!-- <div class="description">类型:1对1  剩余堂数:30堂 </div>  -->
            <div v-if="value.productSn!=0">
              <div class="description">类型：{{this.value.contractDescription}}</div>
              <div class="description">剩余：{{this.value.totalsessions}}</div>
            </div>
          </p>

          <p>
            <span>冲堂课数:</span>
            <input id="min" name="" type="button" value="-" style="width:62px;" @click='minchuang' class="el-input__inner" />
            <input id="text_box" name="goodnum" type="text" style="width:66px;" v-model="number" class="el-input__inner" @blur='test7' />
            <input id="add" name="" type="button" value="+" style="width:62px;" @click='add2chuang' class="el-input__inner" />
          </p>
          <p class="block">
            <span class="demonstration">合约开始</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </p>
          <p class="block">
            <span class="demonstration">合约结束</span>
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
            </el-date-picker>
          </p>
        </div>
        <div class="el-message-box__btns">
          <input type="button" class="el-button" value="取消" @click="cancel">
          <input type="button" value="确定" class="el-button el-button--default el-button--primary " @click="confirm7()">
        </div>
      </div>
      <div class="modal-backdrop" v-show='ariahidden'></div>
    </div>
    <loading v-if="loadingState"></loading>
  </div>
</template>

<style scoped>
@import "../assets/css/step1.css";
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 55;
  background-color: #666;
  opacity: 0.8
}

.error6 {

  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 12px;
  position: absolute;
  top: 89%;
  left: 26px;
}

.el-form-item__error4 {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 92%;
  left: 45px;
}

.el-form__error {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 18%;
  left: 128px;
}

.el-form__error1 {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 41%;
  left: 128px;
}

.el-form__error4 {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 62%;
  left: 128px;
}

.btn2 {
  background-color: #F74C4C;
  border-color: #F74C4C;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #c4c4c4;
  color: #fff;
  margin: 0;

  padding: 10px 15px;
  border-radius: 4px
}

.smallbtn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  padding: 10px 9px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  background-color: #F74C4C;
  color: #fff;
}
</style>

<script>
import { getCookie } from '../assets/js/cookie';
export default {
  data() {
    return {
      currentPage:1,
      loadingState: 1,
      pageNumber: 1,
      totalCount: 50,
      isCreateContraction: 0,
      ischuangjianheyue: 0,
      ismodifeContraction: 1,
      leixing: '',
      gptu: '',
      contactshow: 0,
      picked: '',
      boy: 1,
      tel: '',
      pleasewhitename: 0,
      pleasewhitename1: 0,
      chinesename: '',
      account: '',
      pleasewhiteaccount: 0,
      pleasewhiteaccount1: 0,
      pleasewhitetel: 0,
      pleasewhitetell: 0,
      ariahidden: 0,
      number: 1,
      contractDescription: '',
      iscontraction: 0,
      isaddnewstudents: 0,
      checked: false,
      isshowstudentmessage: 0,
      addstudent: 0,
      client_sn: 0,
      totalsessions: 10,
      oldtotalsessions: 0,
      sex: 1,
      productname: '',
      updateContractItem: {},
      formInline: {
        user: '',
        mobllie: ''
      },
      tableData3: [

      ],
      multipleSelection: [],
      num1: 0,

      options: [{
        "contractSn": "",
        "contractDescription": "0",
        "productSn": 0,
        "productName": "--请选择--",
        "availablesessions": 0,
        "servicestartdate": "",
        "servicefinishdate": "",
        "totalsessions": 0
      }],

      value: { "productSn": 0 },
      value2: '',
      value1: '',
      value3: ''

    }

  },

  computed: {
    show() {
      if (this.checked) {
        return true;
      } else {
        return false;
      }
    },
    disabled1: function() {
      console.log(this.checked)
      if (this.name === '' || this.account === '' || this.chinesename === '' || (this.pleasewhiteaccount1 == 1 || this.pleasewhitetell == 1 || this.pleasewhitename1 == 1)) {
        return 'disabled';
      } else {
        return false;
      }
    },


    pickerOptions0() {
      let t = new Date(this.value2);
      let tt = t.getTime();
      console.log(this.value.servicestartdate);
      var that = this;

      return {
        disabledDate(time) {
          if (tt < that.value.servicefinishdate) {
            return time.getTime() < that.value.servicestartdate || time.getTime() > tt - 8.64e7;
          } else {
            return time.getTime() < that.value.servicestartdate || time.getTime() > that.value.servicefinishdate;
          }

        },
      }


    },
    pickerOptions1() {
      let t = new Date(this.value1);
      let tt = t.getTime();
      var that = this;

      return {
        disabledDate(time) {
          if (tt > that.value.servicestartdate) {
            return time.getTime() < tt + 8.64e7 || time.getTime() > that.value.servicefinishdate;
          } else {
            return time.getTime() < that.value.servicestartdate - 8.64e7 || time.getTime() > that.value.servicefinishdate;
          }

        },
      }

    },
  },
  beforeCreate() {
    var login = getCookie('loginedUser');
    if (!login) {
      this.$router.push({ path: '/home' })
    }
  },
  created() {
    //debugger;
    var url = 'http://corpmember.tutorabc.com.cn/Home/Index?Sign=' + getCookie('loginedUser');
    this.loadingState = 1;
    this.$http.get(url).then((res) => {
      var result = JSON.parse(res.bodyText);
      this.obj = result.CorpBasicModel;
      // console.log(this.obj.InCharge);
      var InCharge = this.obj.InCharge;
      //  console.log(' this.obj.InCharge:'+ this.obj.InCharge);
      // this.contactSn=this.obj.contactSn;
      this.arr = result.Productdetails;
      console.log(result.CorpBasicModel);
      this.loadingState = 0;
    }).catch((res) => {
      console.log(res.status);
    });
    this.onSubmit(this.currentPage);
  },
  methods: {
    getContractById(id) {
      return this.options.find((item) => { return item.contractSn == id });
    },
    RadioChanged(val) {
      this.sex = val;
    },
    //所有的test是正则匹配
    test() {
      // alert(1);
      if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(this.account)) {
        this.pleasewhiteaccount = 0;
        this.pleasewhiteaccount1 = 0;
      } else if (this.account == '') {
        this.pleasewhiteaccount = 1;
        this.pleasewhiteaccount1 = 0;
      } else {
        this.pleasewhiteaccount1 = 1;
        this.pleasewhiteaccount = 0;
      }
    },
    test1() {
      var reg = /^[1][3578][0-9]{9}$/;
      if (reg.test(this.tel)) {
        this.pleasewhitetel = 0;
        this.pleasewhitetell = 0;

      } else if (this.tel == '') {
        this.pleasewhitetel = 1;
        this.pleasewhitetell = 0;
      } else {
        this.pleasewhitetel = 0;
        this.pleasewhitetell = 1;
      }
    },
    test3() {
      if (this.chinesename == '') {
        this.pleasewhitename = 1;
        this.pleasewhitename1 = 0;
      } else if (/^[\u4e00-\u9fa5]+$/.test(this.chinesename)) {
        this.pleasewhitename = 0;
        this.pleasewhitename1 = 0;
      } else {
        this.pleasewhitename = 0;
        this.pleasewhitename1 = 1;
      }
    },

    test5() {
      //  alert(1);
      if (this.formInline.user == '') {

        this.pleasewhitename1 = 0;
      } else if (/^[\u4e00-\u9fa5]+$/.test(this.formInline.user)) {

        this.pleasewhitename1 = 0;
      } else {
        this.pleasewhitename1 = 1;
      }
    },
    test7() {
      if (this.number < 1) {
        this.number = 1;
      }
    },
    test8() {
      if (this.formInline.user == '') {

        this.pleasewhitename1 = 0;
      } else if (/^[\u4e00-\u9fa5]+$/.test(this.formInline.user)) {
        this.pleasewhitename = 0;
        this.pleasewhitename1 = 0;
      } else {

        this.pleasewhitename1 = 1;
      }
    },
    test9() {
      if (this.chinesename == '') {

        this.pleasewhitename1 = 0;
      } else if (/^[\u4e00-\u9fa5]+$/.test(this.chinesename)) {

        this.pleasewhitename1 = 0;
      } else {
        this.pleasewhitename1 = 1;
      }
    },
    testmoblie() {
      var reg = /^[0-9]*$/;
      if (reg.test(this.formInline.mobllie)) {
        this.pleasewhitetell = 0;

      } else if (this.formInline.mobllie == '') {
        this.pleasewhitetell = 0;
      } else {

        this.pleasewhitetell = 1;
      }
    },

    changeContract() {
      console.log(this.value);
      console.log(this.options);
    },

    //查询按钮
    onSubmit(currentPage) {
     // console.log(parseInt(result[i].ContractService_Start.toString().replace("/Date(", "").replace(")/", "")));
      console.log(this.sex);
      console.log("currentPage" + currentPage);
      if ((this.pleasewhitename1 == 1 || this.pleasewhitetell == 1)) {
        alert('请输入有效手机号码或中文姓名');
        return;
      }

      var url = 'http://corpmember.tutorabc.com.cn/Manage/SearchInfo?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          'cname': this.formInline.user,
          'phone': this.formInline.mobllie,
          'currentPage': currentPage,

        }
      }).then((res) => {
        var res1 = JSON.parse(res.bodyText)
        var result = res1.lstCorpClientInfo;
        //this.tableData3 = result;
        //debugger
        //时间格式的转化
        this.tableData3 = [];
        for (var i = 0; i < result.length; i++) {
          // console.log("i:" + result[i]);
          if (result[i].ContractService_Start) {

            result[i].ContractService_Start = moment(new Date(parseInt(result[i].ContractService_Start.toString().replace("/Date(", "").replace(")/", "")))).format('YYYY/MM/DD');
            //console.log(result[i].ContractService_Start);
          }
          if (result[i].ContractService_Start) {
         // debugger;
            result[i].ContractService_End = moment(new Date(parseInt(result[i].ContractService_End.toString().replace("/Date(", "").replace(")/", "")))).format('YYYY/MM/DD');
          }
          result[i].sex = (result[i].sex == 1 ? "男" : "女");

          this.tableData3.push(result[i]);
        }
        console.log(this.tableData3);
        this.pageNumber = res1.TotalCount / res1.totalPages; //每页展示个数
        this.totalCount = res1.TotalCount;
      }).catch((res) => {
        console.log(res.status);
      })


    },
     
    // console.log('submit!');

    //创建合约
    handleEdit(index, row) {
      console.log(index, row);

      this.iscontraction = 1;
      this.ariahidden = 1;
      this.ischuangjianheyue = 1
      this.iscontraction = 0;
      this.value1 = '';
      this.value2 = '';
      this.number = 0;
      this.$route.params.aid = 0;
      this.value = { "productSn": 0 };
      console.log("handleEdit");
      var url = 'http://corpmember.tutorabc.com.cn/Manage/GetMainContractInfo?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          //'Sign':this.tel,//string
          'isAll': false////string

        }
      }).then((res) => {
        console.log(res);
        var res1 = JSON.parse(res.bodyText);
        this.options = [{
          "contractSn": "",
          "contractDescription": "0",
          "productSn": 0,
          "productName": "--请选择--",
          "availablesessions": 0,
          "servicestartdate": "",
          "servicefinishdate": "",
          "totalsessions": 0
        }];
        this.options = this.options.concat(res1);
        this.updateContractItem = row;
        //this.onSubmit(1);
      })
    },
    // 修改合约
    handleEdit1(index, row) {
      console.log(row);
      //call api
      var url = 'http://corpmember.tutorabc.com.cn/Manage/GetMainContractInfo?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          //'Sign':this.tel,//string
          'isAll': false////string

        }
      }).then((res) => {
        var contractList = JSON.parse(res.bodyText);
        if (contractList) {
          contractList.forEach(function(element) {
            if (element.contractSn == row.MainContractSn) {
              this.contractDescription = element.contractDescription;
            }
          }, this);
        }
        this.iscontraction = 1;
        this.ariahidden = 1;
        this.productname = row.ProductName;
        this.updateContractItem = row;
        this.value1 = row.ContractService_Start;
        this.value2 = row.ContractService_End;
        this.totalsessions = row.ContractTotalClass;
        this.oldtotalsessions = row.ContractTotalClass;

      }).catch((res) => {
        // console.log(res.status);
      })

      //console.log('MainContractSn:'+this.MainContractSn);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage=val;
      this.onSubmit(val);
      // console.log(`当前页: ${val}`);
    },
    showclose() {
      this.isshowstudentmessage = 0;
      this.isaddnewstudents = 0;
      this.iscontraction = 0;
      this.ariahidden = 0;
      this.ischuangjianheyue = 0;
      // this.isaddnewstudent=0
    },
    showstudentmessage(item) {
      console.log(item);
      // alert(1);
      this.isshowstudentmessage = 1;
      this.ariahidden = 1;

      this.tel = item.Phone;
      this.account = item.Email;
      this.chinesename = item.Cname;
      this.client_sn = item.ClientSn;
      this.sex = item.sex;
      this.ClientSn = item.ClientSn

    },
    cancel() {
      this.isshowstudentmessage = 0;
      this.isaddnewstudents = 0;
      this.iscontraction = 0;
      this.ariahidden = 0;
      this.ischuangjianheyue = 0;
    },

    //修改合约的确定按钮
    confirm6() {
      //console.log(this.$route.params.aid);
      this.iscontraction = 0;
      this.ariahidden = 0;
      this.iscontraction = 0;
      this.ariahidden = 0;
      console.log(this.updateContractItem.classes);
      //debugger
      var url = 'http://corpmember.tutorabc.com.cn/Manage/modifyContract?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          "Client_Sn": this.updateContractItem.ClientSn,
          "childContractSn": this.updateContractItem.ContractSn,
          "mainContractSn": this.updateContractItem.MainContractSn,
          "classes": this.totalsessions - this.oldtotalsessions,
          "contractSdate": this.value1.toLocaleString(),
          "contractEdate": this.value2.toLocaleString(),
        }
      }).then((res) => {

        console.log(res);
        var res1 = JSON.parse(res.bodyText);

        if (res1.Success == true) {
          alert('成功');
        } else {
          alert(res1.Message);
        }
        this.onSubmit(this.currentPage);
        console.log(this.tableData3);
      }).catch((res) => {
        console.log(res.status);
      });
    },
    // 创建合约按钮
    confirm7() {
      //console.log(this.$route.params.aid);
      this.iscontraction = 0; //所有弹框都隐藏
      this.ariahidden = 0;
      this.ischuangjianheyue = 0;

      var url = 'http://corpmember.tutorabc.com.cn/Manage/CreateNewContract?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          'Client_Sn': this.updateContractItem.ClientSn,
          'MainContractSn': this.value.contractSn,//string MainContractSn[productSn]
          'classes': this.number,//int
          'contractSdate': this.value1.toLocaleString(),//string
          'contractEdate': this.value2.toLocaleString(),//string
          'incharge': this.$route.params.aid,//int
          'productSn': this.value.productSn //string
        }
      }).then((res) => {
        // console.log(res);
        var res1 = JSON.parse(res.bodyText)
        var result = res1.lstCorpClientInfo;
        // console.log(result);
        this.tableData3 = result;
        console.log(this.tableData3);
        if (res1.Success == true) {
          alert('成功');
          this.onSubmit(this.currentPage);
        } else {
          alert(res1.Message);
        }
        this.tel = '';
        this.account = '';
        this.chinesename = '';

      }).catch((res) => {
        console.log(res.status);
      })
    },
    //  
    confirm() {
      // console.log(this.sex);
      console.log(this.value1);
      //console.log(this.value1.toLocaleString());
      if (this.checked && (this.value.contractSn == undefined || this.value.contractSn == '')) {
        alert('请选择主合约');
        return;
      }
      if (this.checked && (this.value1 == '' || this.value2 == '')) {
        alert('请选择合约开始和结束时间');
        return;
      }
      var tt = JSON.stringify(this.value);
      console.log(this.value.productSn)
      console.log(this.sex);
      this.isaddnewstudents = 0;
      this.ariahidden = 0;
      // var url = 'http://192.168.87.82:9091/Manage/Register?Sign=' + getCookie('loginedUser');
      var url = 'http://corpmember.tutorabc.com.cn/Manage/Register?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          'mobile': this.tel,//string
          'email': this.account,////string
          'cname': this.chinesename,//string
          'gender': this.sex, //string 男：‘1’，女：‘2’
          'isCreateContract': this.checked,//bool
          'MainContractSn': this.value.contractSn,//string MainContractSn[productSn]
          'inChargeClasses': this.number,//int
          'ContractSdate': this.value1 ? this.value1.toLocaleString() : '',//string
          'ContractEdate': this.value2 ? this.value2.toLocaleString() : '',//string
          'incharge': this.$route.params.aid,//int
          'ProductSn': this.value.productSn //string
        }
      }).then((res) => {

        // console.log(res);
        var res1 = JSON.parse(res.bodyText)
        var result = res1.lstCorpClientInfo;
        // console.log(result);
        this.tableData3 = result;
        console.log(this.tableData3);
        if (res1.Success == true) {
          alert(res1.Message == '' ? "成功" : res1.Message);
          this.onSubmit(this.currentPage);

        } else {
          alert(res1.Message);
        }

      }).catch((res) => {
        console.log(res.status);
      })
    },
    //修改学员信息确定按钮
    confirm3() {
      if (this.pleasewhitename1 == 1) {
        alert('姓名输入有误');
        return;
      }
      this.isshowstudentmessage = 0;
      this.ariahidden = 0;
      console.log(this.sex);
      //debugger;
      var url = 'http://corpmember.tutorabc.com.cn/Manage/ModifyClientInfo?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          "Cname": this.chinesename,
          "Sex": (this.sex == "男" ? 1 : 2),
          "Client_Sn": this.client_sn,
        }
      }).then((res) => {
        console.log(res);
        var res1 = JSON.parse(res.bodyText)
        console.log("res1.IsSuccess:" + res1.IsSuccess);
        if (res1.IsSuccess == true) {
          alert((res1.Msg == '' ? "修改成功" : res1.Msg));
        } else {
          alert(res1.Message);
        }
        this.onSubmit(this.currentPage);

      }).catch((res) => {
        console.log(res.status);
      })
    },
    handleChange(value) {
      console.log(value);
    },
    add1() {
      //debugger;
      this.isaddnewstudents = 1;
      // 阻止默认事件
      // event.preventDefault();
      this.ariahidden = 1;
      this.tel = '';
      this.account = '';
      this.chinesename = '';
      this.boy = '';
      this.checked = false;
      this.number = 1;
      this.value1 = '';
      this.value2 = '';
      this.$route.params.aid = 0;
      this.value = { "productSn": 0 };
      //call api
      //debugger;
      var url = 'http://corpmember.tutorabc.com.cn/Manage/GetMainContractInfo?Sign=' + getCookie('loginedUser');
      this.$http.get(url, {
        params: {
          'isAll': false////string
        }
      }).then((res) => {
        console.log(res);
        var res1 = JSON.parse(res.bodyText);
        this.onSubmit(this.currentPage);
        this.options = [{
          "contractSn": "",
          "contractDescription": "0",
          "productSn": 0,
          "productName": "--请选择--",
          "availablesessions": 0,
          "servicestartdate": "",
          "servicefinishdate": "",
          "totalsessions": 0
        }];
        this.options = this.options.concat(res1);
        consoe.log(this.options.servicestartdate);
      }).catch((res) => {
        // console.log(res.status);
      })
    },
    min() {
      this.totalsessions--;
      if (this.totalsessions < 0) {
        this.totalsessions = 1;
      }
    },
    add2() {
      this.totalsessions++;
    },
    minchuang() {
      this.number--;
      if (this.number < 0) {
        this.number = 1;

      }
    },
    add2chuang() {
      this.number++;
    }
  }
}
</script>