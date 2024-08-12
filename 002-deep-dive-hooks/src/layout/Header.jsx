import Proptypes from "prop-types";
import "./Header.css";

function Nav({ items, menuClick, isSubMenu, selected }) {
  Nav.propTypes = {
    items: Proptypes.array,
    menuClick: Proptypes.func,
    isSubMenu: Proptypes.bool,
    selected: Proptypes.string,
  };

  return (
    <nav>
      <ul className={`gap-4 flex ${isSubMenu ? "flex-col" : ""}`}>
        {items.map((item) => {
          if (item.children) {
            return (
              <div className="flex flex-col group relative" key={item.key}>
                <NavItem
                  item={item}
                  active={selected === item.key}
                  menuClick={() => {
                    menuClick(item);
                  }}
                />
                <div
                  className={`absolute invisible group-hover:visible animate-[fadeIn_0.3s_east-in-out] 
                    bg-blue-400 text-white p-4 top-12`}
                >
                  <Nav
                    items={item.children}
                    menuClick={menuClick}
                    selected={selected}
                    isSubMenu={true}
                  />
                </div>
              </div>
            );
          } else {
            return (
              <NavItem
                key={item.key}
                item={item}
                active={selected === item.key}
                menuClick={() => {
                  menuClick(item);
                }}
              />
            );
          }
        })}
      </ul>
    </nav>
  );
}

function NavItem({ item, active, menuClick }) {
  NavItem.propTypes = {
    item: Proptypes.object,
    active: Proptypes.bool,
    menuClick: Proptypes.func,
  };
  // console.log('active', active)

  return (
    <li key={item.key} className={active ? "text-red-200" : ""}>
      {/* <a href={item.path} disabled={item.disabled}> */}
      {/* </a> */}
      <button
        className="px-5 py-3 bg-gray-400 rounded"
        disabled={item.disabled}
        onClick={menuClick}
      >
        {item.label}
      </button>
    </li>
  );
}

export default Nav;
