import React, { useState } from "react";
import { Button, Menu, Dropdown, Layout, Badge } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  AuditOutlined,
  TeamOutlined,
  BarChartOutlined,
  AimOutlined,
  LogoutOutlined,
  BellOutlined,
  FormOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import logo from "../images/BreatheESG.png";
import DataEntry from "./DataEntry";
import Tracker from "./Tracker";
import YearDropdown from "./YearDropDown";
import "../styles/dashboard.scss";

const { Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("tracker");
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const renderPage = () => {
    if (currentPage === "tracker") {
      return <Tracker />;
    } else {
      return <DataEntry />;
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Country 1</Menu.Item>
      <Menu.Item key="2">Country 2</Menu.Item>
      <Menu.Item key="3">Country 3</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-container">
          <img
            src={logo}
            alt="Breathe ESG Logo"
            className={collapsed ? "sidebar-logo collapsed" : "sidebar-logo"}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            Entity Manager
          </Menu.Item>
          <Menu.Item key="3" icon={<DatabaseOutlined />}>
            Data Manager
          </Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}>
            Reporting
          </Menu.Item>
          <Menu.Item key="5" icon={<AuditOutlined />}>
            Materiality
          </Menu.Item>
          <Menu.Item key="6" icon={<TeamOutlined />}>
            Suppliers
          </Menu.Item>
          <Menu.Item key="7" icon={<BarChartOutlined />}>
            Analytics
          </Menu.Item>
          <Menu.Item key="8" icon={<AimOutlined />}>
            Targets
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
        <Button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            width: "100%",
            textAlign: "center",
            position: "absolute",
            bottom: "20px",
          }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
          <nav className="navbar">
            <div className="navbar-left">
              <img src={logo} alt="Breathe ESG Logo" className="navbar-logo" />
              {user && <span className="user-name">View Name</span>}
              <Dropdown overlay={menu}>
                <Button className="country-dropdown">North America</Button>
              </Dropdown>
            </div>
            <div className="navbar-right">
              <Badge dot>
                <BellOutlined
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
              </Badge>
              {user && (
                <img
                  src={user.photoURL || ""}
                  alt="Profile"
                  className="profile-photo"
                />
              )}
            </div>
          </nav>
          <div className="navigation-container">
            <div className="navigation-buttons">
              <Button
                onClick={() => setCurrentPage("tracker")}
                icon={<ControlOutlined />}
              >
                Tracker
              </Button>
              <Button
                onClick={() => setCurrentPage("dataEntry")}
                icon={<FormOutlined />}
              >
                Data Entry
              </Button>
            </div>
            <div className="navigation-right">
              <YearDropdown />
              {currentPage === "dataEntry" && (
                <Button type="primary" className="submit-proposal-button">
                  Submit your Proposal
                </Button>
              )}
            </div>
          </div>
          <div className="content">{renderPage()}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
