import React, { Key, ReactNode, useState } from 'react';
import './App.css';
import { Button, Layout, Menu, MenuProps, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ShortenUrlForm from './components/shortenUrlForm';
import UrlReportTable from './components/urlReportTable';

const { Header, Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type,
  }) as MenuItem;

const items: MenuItem[] = [getItem('URL Shorten', 'sub1')];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: '32px', margin: '16px', borderRadius: '6px' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ShortenUrlForm />
          <UrlReportTable />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          URL Shorten ©{new Date().getFullYear()} Created by{' '}
          <a href="https://github.com/waddaboo">Han Wen</a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
