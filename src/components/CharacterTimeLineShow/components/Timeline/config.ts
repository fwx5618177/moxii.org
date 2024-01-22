// 配置对象
export const config = {
  timelineHeightFactor: 1, // 时间线高度为画布高度的占比
  timelineWidth: 5, // 时间线宽度
  paddingFactor: 0.1,
  eventRadius: 20,
  normalStyle: {
    scale: 1.0,
    fontSize: 14,
    lineWidth: 2,
    lineColor: 0x444444, // 深灰色边框颜色，与黑色背景形成微妙的对比
    fillColor: 0x666666, // 淡灰色填充颜色，提供足够的对比度
  },
  hoverStyle: {
    fillColor: 0xa9a9a9, // 悬停时的填充颜色，较亮的灰色，提高悬停反馈
    scale: 1.2,
    fontSize: 18,
    lineWidth: 3, // 悬停时的边框宽度
    lineColor: 0xff4500, // 亮橙色边框，提高可视性和吸引力
  },
  clickStyle: {
    fillColor: 0x87ceeb, // 点击时的填充颜色，例如浅蓝色
    scale: 1.1, // 点击时的缩放
    fontSize: 16, // 点击时的字体大小
    lineWidth: 3, // 点击时的边框宽度
    lineColor: 0x1e90ff, // 点击时的边框颜色，例如深蓝色
  },
};
