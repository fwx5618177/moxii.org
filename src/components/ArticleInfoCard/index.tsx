import React from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import {
  ClockCircleOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Meta } = Card;
const { Text } = Typography;

const ArticleInfoCard = ({ articleCount, lastPublished, authorCount }) => {
  return (
    <Card
      title="Article Summary"
      style={{
        width: "100%",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: 10,
      }}
      actions={[
        <Text type="secondary">
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          最后操作: {moment(lastPublished).format("YYYY-MM-DD HH:mm:ss")}
        </Text>,
      ]}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="文章发布"
            value={articleCount}
            prefix={<FileTextOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="最后更新"
            value={moment(lastPublished).format("YYYY-MM-DD HH:mm:ss")}
            prefix={<ClockCircleOutlined />}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="作者"
            value={authorCount}
            prefix={<UserOutlined />}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ArticleInfoCard;
