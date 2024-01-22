import * as PIXI from "pixi.js";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { TimelineEvent } from "Novel";
import { config } from "./config";

// 滤镜
const dropShadowFilter = new DropShadowFilter({
  blur: 2,
  distance: 3,
  alpha: 0.5,
});

const createMainAxis = ({ x, y, h, w, filters }) => {
  const timeline = new PIXI.Graphics();
  timeline.clear();
  timeline.beginFill(0xffffff);
  timeline.drawRect(x, y, w, h);
  timeline.endFill();

  // 添加阴影滤镜给主轴
  timeline.filters = [...filters];

  return timeline;
};

const setCircleStyle = ({ graphics, style, x, y, radius }) => {
  graphics.clear();
  graphics.lineStyle(style.lineWidth, style.lineColor);
  graphics.beginFill(style.fillColor);
  graphics.drawCircle(x, y, radius);
  graphics.endFill();
  graphics.scale.set(style.scale);
};

const setTextStyle = ({ text, style, x, y }) => {
  text.x = x;
  text.y = y;
  text.style.fill = style.fillColor;
  text.style.fontSize = style.fontSize;
};

const updateStyles = (
  circle: { graphics: any; style: any; x: any; y: any; radius: any },
  word: { text: any; style: any; x: any; y: any }
) => {
  const {
    graphics,
    style: circleStyle,
    x: circleX,
    y: circleY,
    radius,
  } = circle;
  const { text, style: wordStyle, x: wordX, y: wordY } = word;
  setCircleStyle({
    graphics,
    style: circleStyle,
    x: circleX,
    y: circleY,
    radius,
  });
  setTextStyle({
    text,
    style: wordStyle,
    x: circleX,
    y: circleY,
  });
};

export const createTimeline = (
  app: PIXI.Application,
  events: TimelineEvent[]
): PIXI.Container => {
  const timelineContainer = new PIXI.Container();
  const timelineHeight = app.screen.height * config.timelineHeightFactor; // 时间线高度为画布高度的 80%
  const timelineWidth = config.timelineWidth; // 时间线宽度
  const timelineX = app.screen.width / 2; // 时间线水平居中
  const padding = app.screen.height * config.paddingFactor; // 上下的间隔

  // 创建时间线的主轴
  const timeline = createMainAxis({
    x: timelineX,
    y: 0,
    h: timelineHeight,
    w: timelineWidth,
    filters: [dropShadowFilter],
  });
  // 将时间线添加到舞台
  timelineContainer.addChild(timeline);

  // 遍历时间线事件并创建标记
  events.forEach((event, index) => {
    // 初始化点击状态
    let isClicked = false;

    const eventY = (timelineHeight / events.length) * index + padding;
    const eventRadius = 20;

    // 绘制时间线上的事件
    const eventGraphics = new PIXI.Graphics();
    const circleX = timelineX + timelineWidth / 2; // 圆的中心X坐标
    const circleY = eventY; // 圆的中心Y坐标

    eventGraphics.position.set(circleX, circleY);
    // 设置图形的pivot点为圆心
    eventGraphics.pivot.set(eventRadius, eventRadius);
    eventGraphics.filters = [dropShadowFilter];
    setCircleStyle({
      graphics: eventGraphics,
      style: config.normalStyle,
      x: eventRadius,
      y: 0,
      radius: eventRadius,
    });

    // 如果提供了图标，将它添加到圆圈中心
    if (event.icon) {
      const iconSprite = new PIXI.Sprite(event.icon);
      iconSprite.x = timelineX;
      iconSprite.y = eventY;
      iconSprite.anchor.set(0.5);
      timelineContainer.addChild(iconSprite);
    }

    // 添加事件文本
    const eventText = new PIXI.Text(`${event.title} - ${event.date}`, {
      fill: event.color,
      fontSize: 14,
    });

    eventText.position.set(timelineX + 30, eventY);
    eventText.anchor.set(0);

    setTextStyle({
      text: eventText,
      style: config.normalStyle,
      x: timelineX + 30,
      y: eventY,
    });

    // 将事件添加到舞台
    timelineContainer.addChild(eventGraphics);
    timelineContainer.addChild(eventText);

    // 添加交互性
    eventGraphics.interactive = true;
    eventGraphics.cursor = "pointer";

    // 添加事件监听器

    const applyNormalOrClickedStyle = () => {
      if (isClicked) {
        updateStyles(
          {
            graphics: eventGraphics,
            style: config.clickStyle,
            x: eventRadius,
            y: 0,
            radius: eventRadius,
          },
          {
            text: eventText,
            style: config.clickStyle,
            x: timelineX + 30,
            y: eventY,
          }
        );
      } else {
        updateStyles(
          {
            graphics: eventGraphics,
            style: config.normalStyle,
            x: eventRadius,
            y: 0,
            radius: eventRadius,
          },
          {
            text: eventText,
            style: config.normalStyle,
            x: timelineX + 30,
            y: eventY,
          }
        );
      }
    };

    eventGraphics.on("pointerover", () => {
      if (!isClicked)
        updateStyles(
          {
            graphics: eventGraphics,
            style: config.hoverStyle,
            x: eventRadius,
            y: 0,
            radius: eventRadius,
          },
          {
            text: eventText,
            style: config.hoverStyle,
            x: timelineX + 30,
            y: eventY,
          }
        );
    });

    eventGraphics.on("pointerout", () => {
      applyNormalOrClickedStyle();
    });

    eventGraphics.on("click", () => {
      updateStyles(
        {
          graphics: eventGraphics,
          style: config.clickStyle,
          x: eventRadius,
          y: 0,
          radius: eventRadius,
        },
        {
          text: eventText,
          style: config.clickStyle,
          x: timelineX + 30,
          y: eventY,
        }
      );
    });
  });

  return timelineContainer;
};
