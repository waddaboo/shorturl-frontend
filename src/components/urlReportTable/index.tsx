import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Popconfirm, Table, TablePaginationConfig, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { deleteShortUrl, getUrlReport, redirectUrl } from 'src/apis/url';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { baseUrl } from 'src/utils/request.util';

export type ShortenUrlType = {
  id: string;
  shortUrl: string;
  targetUrl: string;
  title: string;
  clicks: number;
  Geolocation: any[];
  createdAt: Date;
  updatedAt: Date;
};

type UrlGeolocationType = {
  id: string;
  ip: string;
  latitude?: string;
  longtitude?: string;
};

function UrlReportTable() {
  const [loading, setLoading] = useState(false);

  const initialPaginationState = {
    current: 1,
    pageSize: 10,
  };
  const [paginationState, setPaginationState] = useState(initialPaginationState);

  const [urlReportDataSource, setUrlReportDataSource] = useState([]);
  const [urlReportTotal, setUrlReportTotal] = useState(0);

  const getUrlReportTable = async (paramsQuery?: any) => {
    setLoading(true);

    let current = 1;
    let pageSize = 10;

    if (paramsQuery?.pagination) {
      current = paramsQuery.pagination.current;
      pageSize = paramsQuery.pagination.pageSize;
    }

    const qs = `currentPage=${current}&pageSize=${pageSize}`;
    const response = await getUrlReport(qs);

    setUrlReportDataSource(response?.data || []);
    setUrlReportTotal(response?.total || 0);

    setLoading(false);
  };

  const tablePagination = {
    total: urlReportTotal,
    showSizeChanger: true,
    showTotal: (total: number, range: any) => `${range[0]}-${range[1]} of ${total} items`,
    current: paginationState.current,
    pageSize: paginationState.pageSize,
  };

  const initialCallbackState = {
    cb: getUrlReportTable,
  };
  const [callbackState] = React.useState(initialCallbackState);

  const onTableChange = async (pagination: TablePaginationConfig) => {
    await callbackState.cb({
      pagination,
    });

    setPaginationState({
      current: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
    });
  };

  const [messageApi, contextHolder] = message.useMessage();

  const onShortUrlClick = async (url: string) => {
    setLoading(true);
    const response = `${baseUrl}/url/redirect/${url}`;

    navigator.clipboard.writeText(response);

    await callbackState.cb({
      pagination: {
        current: paginationState.current,
        pageSize: paginationState.pageSize,
      },
    });

    setLoading(false);

    messageApi.open({
      type: 'success',
      content: 'URL coppied to clipboard.',
    });
  };

  const onDeleteClick = async (id: string) => {
    setLoading(true);

    await deleteShortUrl(id);

    await callbackState.cb({
      pagination: {
        current: paginationState.current,
        pageSize: paginationState.pageSize,
      },
    });

    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      callbackState.cb();
    }

    return () => {
      ignore = true;
    };
  }, [callbackState]);

  const columns: ColumnsType<ShortenUrlType> = [
    {
      title: 'Short URL',
      dataIndex: 'shortUrl',
      key: 'shortUrl',
      render: (record) => (
        <Button type="link" onClick={async () => onShortUrlClick(record)}>
          {record}
        </Button>
      ),
    },
    {
      title: 'Target URL',
      dataIndex: 'targetUrl',
      key: 'targetUrl',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      align: 'right',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (record) => {
        const date = new Date(record).toLocaleDateString('en-GB');
        return date;
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (record) => {
        const date = new Date(record).toLocaleDateString('en-GB');
        return date;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (record, data) => (
        <span>
          <Popconfirm
            title="Are you sure to delete record?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={async () => onDeleteClick(data.id)}
          >
            <Button type="link" icon={<DeleteOutlined style={{ color: 'red' }} />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const expandedTableColumns: ColumnsType<UrlGeolocationType> = [
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
  ];

  const expandedTable = (record: any) => {
    const data = record?.Geolocation || [];

    return (
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: '#fafafa',
            },
          },
        }}
      >
        <Table rowKey="id" columns={expandedTableColumns} dataSource={data} pagination={false} />
      </ConfigProvider>
    );
  };

  return (
    <>
      {contextHolder}
      <Table
        rowKey="id"
        columns={columns}
        expandable={{
          rowExpandable: (record) => record.Geolocation.length > 0,
          expandedRowRender: (record) => expandedTable(record),
        }}
        loading={loading}
        pagination={tablePagination}
        onChange={onTableChange}
        dataSource={[...urlReportDataSource]}
      />
    </>
  );
}

export default UrlReportTable;
