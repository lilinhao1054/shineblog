import CustomUpload from '@/components/CustomUpload';
import { getSetting, saveSetting } from '@/services/SettingController';
import { Button, Form, Input, Switch, UploadFile, message } from 'antd';
import { RcFile } from 'antd/es/upload';

import React, { useEffect } from 'react';

interface FormValue {
  blogName: string;
  authorName: string;
  authorAvatar: UploadFile[];
  introduction: string;
  showGitHub: boolean;
  gitHubUrl: string;
  showCSDN: boolean;
  CSDNUrl: string;
  showGitee: boolean;
  giteeUrl: string;
  showZhiHu: boolean;
  zhiHuUrl: string;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Setting: React.FC = () => {
  const [form] = Form.useForm<FormValue>();
  const showGitHub = Form.useWatch('showGitHub', form);
  const showCSDN = Form.useWatch('showCSDN', form);
  const showGitee = Form.useWatch('showGitee', form);
  const showZhiHu = Form.useWatch('showZhiHu', form);

  useEffect(() => {
    getSetting().then(({ data }) =>
      form.setFieldsValue({
        ...data,

        authorAvatar: [
          {
            url: `${process.env.FILE_SERVER}${data.authorAvatar}`,
          },
        ],
      }),
    );
  }, []);

  const onFinish = (values: FormValue) => {
    const setting = {
      ...values,
      authorAvatar: values.authorAvatar[0].originFileObj as RcFile,
    };

    saveSetting(setting).then(() => message.success('保存成功'));
  };

  return (
    <div className="p-5 bg-white">
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="博客名称" name="blogName" initialValue={'Shine Blog'}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="作者名"
          name="authorName"
          rules={[{ required: true, message: '请输入作者名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作者头像"
          name="authorAvatar"
          valuePropName="fileList"
          rules={[{ required: true, message: '请上传作者头像' }]}
          getValueFromEvent={normFile}
        >
          <CustomUpload />
        </Form.Item>

        <Form.Item label="介绍语" name="introduction">
          <Input />
        </Form.Item>

        <Form.Item
          label="开启GitHub访问"
          name="showGitHub"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="GitHub主页访问地址"
          name="gitHubUrl"
          hidden={!showGitHub}
        >
          <Input placeholder="请输入GitHub访问主页URL" />
        </Form.Item>

        <Form.Item label="开启CSDN访问" name="showCSDN" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="CSDN主页访问地址" name="CSDNUrl" hidden={!showCSDN}>
          <Input placeholder="请输入CSDN访问主页URL" />
        </Form.Item>

        <Form.Item
          label="开启Gitee访问"
          name="showGitee"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Gitee主页访问地址"
          name="giteeUrl"
          hidden={!showGitee}
        >
          <Input placeholder="请输入Gitee访问主页URL" />
        </Form.Item>

        <Form.Item
          label="开启知乎访问"
          name="showZhiHu"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label="知乎主页访问地址" name="zhiHuUrl" hidden={!showZhiHu}>
          <Input placeholder="请输入知乎访问主页URL" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;
