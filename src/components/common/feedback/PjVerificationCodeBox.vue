<template>
  <div class="code-box" @click="changeCode">
    <canvas id="s-canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
    <div :style="{ lineHeight: `${tipLineHeight}px` }" class="tip">
      {{ tip }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PjVerificationCode",
  props: {
    codeStr: {
      type: String,
      default: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    codeLength: {
      type: Number,
      default: 4,
    },
    minFontSize: {
      type: Number,
      default: 25,
    },
    maxFontSize: {
      type: Number,
      default: 35,
    },
    minBackgroundColor: {
      type: Number,
      default: 200,
    },
    maxBackgroundColor: {
      type: Number,
      default: 220,
    },
    minDotColor: {
      type: Number,
      default: 60,
    },
    maxDotColor: {
      type: Number,
      default: 120,
    },
    canvasWidth: {
      type: Number,
      default: 100,
    },
    canvasHeight: {
      type: Number,
      default: 44,
    },
    tip: {
      type: String,
      default: "看不清？换一张",
    },
    tipLineHeight: {
      type: Number,
      default: 10,
    },
  },
  emits: ["change"],
  data() {
    return {
      identifyCode: "",
    };
  },
  watch: {
    identifyCode() {
      this.drawPic();
    },
  },
  mounted() {
    this.drawPic();
    this.makeCode(this.codeStr, this.codeLength);
  },
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    drawPic() {
      let canvas = document.getElementById("s-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = this.randomColor(
        this.minBackgroundColor,
        this.maxBackgroundColor
      );
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      this.drawLine(ctx);
      this.drawDot(ctx);
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
      ctx.font =
        this.randomNum(this.minFontSize, this.maxFontSize) + "px SimHei"; //随机生成字体大小
      let x = (i + 1) * (this.canvasWidth / (this.identifyCode.length + 1));
      let y = this.randomNum(this.maxFontSize, this.canvasHeight - 5);
      const deg = this.randomNum(-30, 30);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < this.codeLength; i++) {
        ctx.strokeStyle = this.randomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(
          this.randomNum(0, this.canvasWidth),
          this.randomNum(0, this.canvasHeight)
        );
        ctx.lineTo(
          this.randomNum(0, this.canvasWidth),
          this.randomNum(0, this.canvasHeight)
        );
        ctx.stroke();
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, this.canvasWidth),
          this.randomNum(0, this.canvasHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    },
    /* 切换验证码 */
    changeCode() {
      this.identifyCode = "";
      this.makeCode(this.codeStr, this.codeLength);
    },
    makeCode(e, n) {
      for (let i = 0; i < n; i++) {
        this.identifyCode += e[this.randomNum(0, e.length)];
      }
      this.$emit("change", this.identifyCode);
    },
  },
};
</script>

<style scoped>
.code-box {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.tip {
  font-size: 14px;
  color: #9e9e9e;
  margin-top: 5px;
}
</style>
