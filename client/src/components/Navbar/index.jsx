import './style.scss';
import ListIcon from '../../assets/list.svg';
import ListSelectedIcon from '../../assets/list-selected.svg';

import HomeIcon from '../../assets/home.svg';
import HomeSelectedIcon from '../../assets/home-selected.svg';

import SearchIcon from '../../assets/search.svg';
import SearchSelectedIcon from '../../assets/search-selected.svg';

const icons = [
    {
        link: "/list",
        image: ListIcon,
        selected: ListSelectedIcon
    },
    {
        link: "/",
        image: HomeIcon,
        selected: HomeSelectedIcon
    },
    {
        link: "/search",
        image: SearchIcon,
        selected: SearchSelectedIcon
    }
];

function Navbar(props) {
    let currentIcons = [];
    icons.forEach((i, idx) => currentIcons.push(props.selected == idx ? i.selected : i.image));

    return (
        <div class="bar">
            <ul id="nav">
                {icons.map((i, index) => (
                    <li>
                        <a href={i.link}>
                            <img src={currentIcons[index]} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Navbar;