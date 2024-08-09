import Proptypes from "prop-types";

function Nav({ items, menuClick }) {
  Nav.propTypes = {
    items: Proptypes.array,
    menuClick: Proptypes.func,
  };

  return (
    <nav>
      <ul>
        {items.map((item) => {
          if (item.children) {
            return (
              <>
                <NavItem
                  key={item.key}
                  item={item}
                  menuClick={() => {
                    menuClick(item);
                  }}
                />
                <Nav
                  items={item.children}
                  key={item.key}
                  menuClick={menuClick}
                />
              </>
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
      <button disabled={item.disabled} onClick={menuClick}>
        {item.label}
      </button>
    </li>
  );
}

export default Nav;
