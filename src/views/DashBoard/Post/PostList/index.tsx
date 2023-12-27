import { Button, Card, Table } from "antd";
import styles from "./index.module.scss";
import { columns, detailColumns } from "./conf";
import { useLocalPostList } from "@/services/Local/hooks";
import { find } from "lodash";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import "moment/locale/zh-cn";

const Post = () => {
  moment.locale("zh-cn");
  const { data, isLoading } = useLocalPostList();
  const [detailData, setDetailData] = useState([]);

  const findDetailData = (slug: string) => {
    const detailData = find(data, (item) => item.slug === slug);
    setDetailData([detailData]);
  };

  const ops: ColumnsType<any> = [
    ...columns,
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 200,
      render: () => {
        return (
          <div>
            <Button type="primary" size="small" onClick={() => {}}>
              编辑
            </Button>
            <Button
              style={{
                marginLeft: 5,
              }}
              type="primary"
              size="small"
              danger
              onClick={() => {}}
            >
              归档
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles["post-list-box"]}>
      <Card
        style={{
          backgroundColor: "transparent",
        }}
        title={<div className={styles["card-title"]}>本地文章列表</div>}
        loading={isLoading}
      >
        <Table
          loading={isLoading}
          rowKey={(record) => record?.slug}
          size="large"
          columns={ops}
          dataSource={data}
          scroll={{
            y: 800,
          }}
          expandable={{
            expandedRowRender: () => (
              <Table
                columns={detailColumns}
                dataSource={detailData}
                pagination={false}
                rowKey={(record) => record?.slug + record?.id}
              />
            ),
            onExpand: (_, record) => {
              findDetailData(record?.slug);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Post;
