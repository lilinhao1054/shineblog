import { FolderOpenOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import styles from './index.less';

const ListItem = List.Item;

interface ICategoryCardListItemProps {
  name: string;
  onClick: () => void;
}

const CategoryCardListItem: React.FC<ICategoryCardListItemProps> = (props) => {
  const { name, onClick } = props;
  return (
    <ListItem className={styles['list-item']} onClick={onClick}>
      <Space>
        <FolderOpenOutlined />
        {name}
      </Space>
    </ListItem>
  );
};

export default CategoryCardListItem;
