import { getBase64 } from '@/utils/file';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import Upload, { RcFile, UploadFile } from 'antd/es/upload';
import { Fragment, useState } from 'react';

interface ICustomUploadProps {
  fileList?: any;
  onChange?: any;
}

const CustomUpload: React.FC<ICustomUploadProps> = (props) => {
  const { fileList, onChange } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file: UploadFile) => {
    const imgBase64 = await getBase64(file.originFileObj as RcFile);
    setPreviewImage(imgBase64);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  return (
    <Fragment>
      <Upload
        maxCount={1}
        listType="picture-card"
        onPreview={handlePreview}
        fileList={fileList}
        onChange={onChange}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Fragment>
  );
};

export default CustomUpload;
