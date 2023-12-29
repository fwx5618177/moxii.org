import { Button, Card, Table } from "antd";
import styles from "./index.module.scss";
import { columns, detailColumns } from "./conf";
import { useLocalPostList } from "@/services/Local/hooks";
import { find } from "lodash";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import "moment/locale/zh-cn";
import EditPost from "@/components/EditPost";

const Post = () => {
  moment.locale("zh-cn");
  const { data, isLoading } = useLocalPostList();
  const [detailData, setDetailData] = useState([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [modalRecord, setModalRecord] = useState(null);

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
      render: (_, record) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setVisible(true);
                setModalRecord(record);
              }}
            >
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
      {!visible && (
        <Card
          style={{
            backgroundColor: "transparent",
          }}
          title={
            <div className={styles["card-title"]}>
              本地文章列表(total: {data?.length})
            </div>
          }
        >
          <Table
            loading={isLoading}
            rowKey={(record) => record?.slug}
            columns={ops}
            dataSource={data}
            scroll={{
              y: 600,
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
      )}

      {visible && <EditPost setVisible={setVisible} data={modalRecord} />}
    </div>
  );
};

export default Post;
