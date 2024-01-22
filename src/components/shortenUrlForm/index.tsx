import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { shortenUrl } from 'src/apis/url';

function ShortenUrlForm() {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);

  const showModal = () => {
    setModalState(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setModalState(false);
  };

  const onFinish = async (formData: { targetUrl: string }) => {
    setLoading(true);
    await shortenUrl(formData);
    setLoading(false);
    form.resetFields();
    window.location.reload();
    setModalState(false);
  };

  return (
    <>
      <Button key="addNewShortUrl" type="primary" onClick={showModal} icon={<PlusCircleOutlined />}>
        New Short URL
      </Button>
      <Modal
        open={modalState}
        title="Create new short URL"
        onOk={form.submit}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit} loading={loading}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="targetUrl"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
              {
                type: 'url',
                message: 'This field must be a valid url.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ShortenUrlForm;
