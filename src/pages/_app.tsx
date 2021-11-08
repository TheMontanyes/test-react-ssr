import type { AppProps } from 'next/app';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import { useMemo } from 'react';
import NProgress from 'nprogress';
import { Layout, Menu, Space } from 'antd';
import 'antd/dist/antd.css';
import '../styles/global.scss';
import { ROUTES } from '../routes';
import { AppProvider } from '../store/AppContext';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const { Header, Content } = Layout;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const routes = useMemo(() => Object.values(ROUTES), []);

  return (
    <AppProvider>
      <Head>
        {/* Import CSS for nprogress */}
        <link rel='stylesheet' type='text/css' href='/nprogress.css' />
      </Head>
      <Layout>
        <Space size='large' direction='vertical'>
          <Header>
            <Menu theme='dark' mode='horizontal'>
              {routes.map((route) => (
                <Menu.Item key={route.url} icon={<route.Icon />}>
                  <Link href={route.url}>{route.pageName}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Header>
          <Content className='content'>
            <Component {...pageProps} />
          </Content>
        </Space>
      </Layout>
    </AppProvider>
  );
};

export default MyApp;
