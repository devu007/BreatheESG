import React from "react";
import { Input, Table } from "antd";
import {
  SearchOutlined,
  ClockCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import "../styles/tracker.scss";

const { Search } = Input;

const columns = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Completion %",
    dataIndex: "completion",
    key: "completion",
  },
  {
    title: "Business Unit",
    dataIndex: "businessUnit",
    key: "businessUnit",
  },
];

const data = [
  {
    key: "1",
    month: "January",
    status: "Pending",
    completion: "80%",
    businessUnit: "Unit 1",
  },
  {
    key: "2",
    month: "February",
    status: "Completed",
    completion: "100%",
    businessUnit: "Unit 2",
  },
];

const Tracker: React.FC = () => {
  return (
    <div className="tracker-container">
      <div className="left-container">
        <div className="box-container">
          <div className="tracker-box">
            <ClockCircleOutlined className="tracker-icon" />
            <h3>Pending Tracker</h3>
            <p className="tracker-data">45/60</p>
          </div>
          <div className="tracker-box">
            <FileSearchOutlined className="tracker-icon" />
            <h3>Pending Reviews</h3>
            <p className="tracker-data">3</p>
          </div>
        </div>
        <div className="search-container">
          <Search
            placeholder="Search..."
            enterButton={<SearchOutlined />}
            className="search-box"
          />
        </div>
      </div>
      <div className="table-container" style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default Tracker;
