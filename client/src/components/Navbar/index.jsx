import { Link } from 'react-router-dom';

import './style.scss';

import {
  DatabaseOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';

// const icons = [
//     {
//         link: "/list",
//         image: ListIcon,
//         selected: ListSelectedIcon
//     },
//     {
//         link: "/",
//         image: HomeIcon,
//         selected: HomeSelectedIcon
//     },
//     {
//         link: "/search",
//         image: SearchIcon,
//         selected: SearchSelectedIcon
//     }
// ];

// function Navbar(props) {
//     let currentIcons = [];
//     icons.forEach((i, idx) => currentIcons.push(props.selected === idx ? i.selected : i.image));

//     return (
//         <div class="bar">
//             <ul id="nav">
//                 {icons.map((i, index) => (
//                     <li>
//                         <Link to={i.link}>
//                             <img src={currentIcons[index]} alt="icon" />
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

function Navbar(props) {
  return (
    <div className="navbar-container">
      <div className="row">
        <Link to="/list">
          <DatabaseOutlined className="nav-icons" />
        </Link>
        <Link to="/">
          <HomeOutlined className="nav-icons" />
        </Link>
        <Link to="/search">
          <UserOutlined className="nav-icons" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
