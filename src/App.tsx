import React from "react";
import { Card, Col, Divider, Layout, Menu, Row } from "antd";
import Analytics from "./components/Analytics";
import "./App.css";
import MainTable from "./components/MainTable";
import Sider from "antd/es/layout/Sider";
import { IoHomeSharp } from "react-icons/io5";
import { GrOrganization } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="container">
      <Header
        style={{
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <GiHamburgerMenu style={{ marginRight: "15px", fontSize: "30px" }} />

          <div className="heading">ML Engineer Salaries </div>
        </div>
      </Header>
      <Layout>
        <Sider style={{ backgroundColor: "white" }}>
          <Menu
            items={[
              {
                label: "Home",
                key: "home",
                icon: <IoHomeSharp />,
              },
              {
                label: "About us",
                key: "about_us",
                icon: <GrOrganization />,
              },
            ]}
          />
        </Sider>

        <Content
          style={{
            padding: "20px",
          }}
        >
          <Card style={{ width: "80%", marginLeft: "100px" }}>
            <Row gutter={10} style={{ marginTop: 10 }}>
              <Col span={24}>
                <div style={{ fontSize: "30px", marginLeft: "47%" }}>Graph</div>
                <Analytics />
              </Col>
            </Row>
          </Card>
          <Divider />

          <Card style={{ width: "80%", marginLeft: "100px" }}>
            <Row gutter={10} style={{ marginTop: 10 }}>
              <Col span={24}>
                <div style={{ fontSize: "30px", marginLeft: "42%" }}>
                  Jobs Table
                </div>
                <MainTable />
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
