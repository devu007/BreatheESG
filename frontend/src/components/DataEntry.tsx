import React from "react";
import { Table, Checkbox, Button } from "antd";
import "../styles/dataEntry.scss";

const DataEntry: React.FC = () => {
  const columns = [
    {
      title: " ",
      dataIndex: "checkbox",
      key: "checkbox",
      render: () => <Checkbox />,
      className: "checkbox-column",
    },
    {
      title: "ASESSMENT TITLE",
      dataIndex: "assessmentTitle",
      key: "assessmentTitle",
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "NO. OF SUPPLIERS",
      dataIndex: "numSuppliers",
      key: "numSuppliers",
    },
    {
      title: "SCORE",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "RISK CLASSIFICATION",
      dataIndex: "riskClassification",
      key: "riskClassification",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "RESULT",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      className: "actions-column",
      render: () => (
        <div className="actions-column">
          <Button type="link">Edit</Button>
          <Button type="link">Delete</Button>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      assessmentTitle: "Assessment 1",
      type: "Type A",
      numSuppliers: 10,
      score: 85,
      riskClassification: "Low",
      status: "Pending",
      result: "Pass",
    },
  ];

  return (
    <div className="data-table-container">
      <div className="table-header">Data Entry Table</div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className="ant-table"
        />
      </div>
    </div>
  );
};

export default DataEntry;
