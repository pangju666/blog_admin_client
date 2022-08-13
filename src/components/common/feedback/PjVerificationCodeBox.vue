<template>
  <div class="code-box" @click="changeCode">
    <canvas id="s-canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
    <div :style="{ lineHeight: `${tipLineHeight}px` }" class="tip">
      {{ tip }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
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
});

const emits = defineEmits(["change"]);

const identifyCode = ref("");

watch(identifyCode, () => {
  drawPic();
});

onMounted(() => {
  drawPic();
  makeCode(props.codeStr, props.codeLength);
});

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const randomColor = (min, max) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
};
const drawPic = () => {
  let canvas = document.getElementById("s-canvas");
  let ctx = canvas.getContext("2d");
  ctx.textBaseline = "bottom";
  ctx.fillStyle = randomColor(
    props.minBackgroundColor,
    props.maxBackgroundColor
  );
  ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);
  for (let i = 0; i < identifyCode.value.length; i++) {
    drawText(ctx, identifyCode.value[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
};
const drawText = (ctx, txt, i) => {
  ctx.fillStyle = randomColor(50, 160);
  ctx.font = randomNum(props.minFontSize, props.maxFontSize) + "px SimHei"; //随机生成字体大小
  let x = (i + 1) * (props.canvasWidth / (identifyCode.value.length + 1));
  let y = randomNum(props.maxFontSize, props.canvasHeight - 5);
  const deg = randomNum(-30, 30);

  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0);
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
};
const drawLine = (ctx) => {
  for (let i = 0; i < props.codeLength; i++) {
    ctx.strokeStyle = randomColor(100, 200);
    ctx.beginPath();
    ctx.moveTo(
      randomNum(0, props.canvasWidth),
      randomNum(0, props.canvasHeight)
    );
    ctx.lineTo(
      randomNum(0, props.canvasWidth),
      randomNum(0, props.canvasHeight)
    );
    ctx.stroke();
  }
};
const drawDot = (ctx) => {
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(
      randomNum(0, props.canvasWidth),
      randomNum(0, props.canvasHeight),
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
};
const changeCode = () => {
  identifyCode.value = "";
  makeCode(props.codeStr, props.codeLength);
};
const makeCode = (e, n) => {
  for (let i = 0; i < n; i++) {
    identifyCode.value += e[randomNum(0, e.length)];
  }
  emits("change", identifyCode.value);
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
