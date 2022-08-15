<template>
  <div class="h-center container">
    <!--    <img class="background-image" src="@/assets/images/bg.jpg" />-->
    <div class="login-box">
      <div class="header">
        <div class="title">
          <!--          <img src="@/assets/images/logo.png" />-->
        </div>
        <div class="sub-title">后台管理系统</div>
      </div>
      <el-form
        ref="formRef"
        :model="formModel"
        :rules="formRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input v-model="formModel.username" class="login-form-input">
            <template #prefix>
              <svg-icon icon="gtzicon-wode1" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" class="login-form-input">
            <template #prefix>
              <svg-icon icon="gtzicon-mima" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <div class="flex-center w-100">
            <el-input
              v-model="formModel.verificationCode"
              class="login-form-input"
            >
              <template #prefix>
                <svg-icon icon="gtzicon-yuechimima" />
              </template>
            </el-input>
            <verification-code-box
              ref="codeBoxRef"
              :content-height="32"
              :content-width="120"
              :tip-height="10"
              class="login-form-code-box"
              @change="verificationCode = $event"
            />
          </div>
        </el-form-item>
      </el-form>
      <el-button class="login-button" @click="onLoginButtonClick">
        <span>登录</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import VerificationCodeBox from "components/common/feedback/PjVerificationCodeBox.vue";
import SvgIcon from "@/components/common/basic/PjSvgIcon.vue";
import { StringUtils } from "pangju-utils";
import { Toast } from "@/utils/Toast";
import { useRouter } from "vue-router";

const router = useRouter();

const codeBoxRef = ref();
const verificationCode = ref(null);

const formRef = ref();
const formModel = reactive({
  username: "",
  password: "",
  verificationCode: "",
});
const formRules = {
  username: [
    {
      required: true,
      message: "用户名不可为空",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不可为空",
    },
  ],
  verificationCode: [
    {
      required: true,
      message: "验证码不可为空",
    },
    {
      validator: (rule, value, callback) => {
        if (StringUtils.getLength(value) > 4) {
          callback(new Error("验证码长度超出限制"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
    {
      validator: (rule, value, callback) => {
        if (!StringUtils.equalsIgnoreCase(value, verificationCode.value)) {
          callback(new Error("验证码错误"));
          codeBoxRef.value.changeCode();
        } else {
          callback();
        }
      },
      trigger: "submit",
    },
  ],
};

onMounted(() => {
  /*  if (process.env.NODE_ENV === "development") {
    formModel.username = "admin";
    formModel.password = "123456";
  }*/
});

const onLoginButtonClick = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (
        // eslint-disable-next-line no-constant-condition
        /*await SecurityApi.login(formModel.username, formModel.password)*/ true
      ) {
        await router.push("/home");
      } else {
        Toast.warning("用户名或密码不正确");
      }
    }
  });
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .background-image {
    object-fit: cover;
  }

  .login-box {
    width: 480px;
    height: 644px;
    background: #ffffff;
    border-radius: 4px;
    position: absolute;
    top: 190px;
    right: 210px;

    .header {
      margin-top: 50px;

      .title {
        margin-bottom: 10px;
      }

      .sub-title {
        font-size: 18px;
        // font-family: PingFang SC-正规体, PingFang SC;
        font-weight: normal;
        color: #000000;
        line-height: 22px;
      }
    }

    .login-form {
      margin-top: 64px;
      margin-bottom: 120px;
      padding-left: 48px;
      padding-right: 48px;

      .login-form-input {
        height: 48px;
      }

      .login-form-code-box {
        margin-left: 14px;
      }
    }

    .login-button {
      width: 383px;
      height: 66px;
      background: #3a8ecd;
      border-radius: 33px;

      span {
        font-size: 28px;
        font-family: PingFangSC-Regular, serif;
        font-weight: normal;
        color: #ffffff;
        line-height: 34px;
      }
    }
  }
}
</style>
