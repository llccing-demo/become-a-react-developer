import Proptypes from "prop-types";
import "./Header.css";

function Nav({ items, menuClick, isSubMenu }) {
  Nav.propTypes = {
    items: Proptypes.array,
    menuClick: Proptypes.func,
    isSubMenu: Proptypes.bool,
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

function NavItem({ item, menuClick }) {
  NavItem.propTypes = {
    item: Proptypes.object,
    menuClick: Proptypes.func,
  };
  return (
    <li key={item.key}>
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
