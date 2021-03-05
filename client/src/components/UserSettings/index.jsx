import { Input } from 'antd';
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';

import './style.scss';

function UserSettings(props) {
  return (
    <div className="UserSettings">
      {props.self && (
        <div className="Row">
          <Input
            className="edit"
            placeholder="enter email"
            value="test@test.com"
            suffix={<EditOutlined />}
          />
          <Input.Password
            className="edit"
            value="123test"
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone style={{color: 'white'}} /> : <EyeInvisibleOutlined style={{color: 'white'}} />
            }
          />
        </div>
      )}
    </div>
  );
}

export default UserSettings;
