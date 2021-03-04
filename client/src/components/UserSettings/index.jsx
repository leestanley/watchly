import { Input } from 'antd';
import { EditOutline } from '@ant-design/icons';

import './style.scss';

function UserSettings(props) {
  return (
    <div className="UserSettings">
      {props.self && (
        <div className="Row">
          <Input className="edit" placeholder="enter email" value="test@ucsd.edu" />
          <Input className="edit" placeholder="enter password" />
        </div>
      )}
    </div>
  );
}

export default UserSettings;
