import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const welcome = {
  greeting: "Hi",
  title: "React",
};

const getTitle = (title) => {
  return title;
};

const List = ({ list }) => {
  return list.map((item) => <Item key={item.objectID} {...item} />);
};

const Item = ({ url, title, author, num_comments, points }) => {
  Item.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    num_comments: PropTypes.number,
    points: PropTypes.number,
  };

  return (
    <div>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </div>
  );
};

const Search = ({ search, onSearch, onChange }) => {
  Search.propTypes = {
    search: PropTypes.string,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
  };

  const [searchTerm, setSearchTerm] = useState("");
  // use this method to update the searchTerm when the search prop changes.
  useEffect(() => {
    if (!search) {
      return;
    }
    setSearchTerm(search);
  }, [search]);

  const handleChange = (event) => {
    console.log(event);
    setSearchTerm(event.target.value);
    onChange && onChange(event);
  };

  return (
    <>
      <label htmlFor="search">Search:</label>
      <input
        value={searchTerm}
        onChange={handleChange}
        id="search"
        type="text"
      />

      <button
        onClick={() => {
          onSearch(searchTerm);
        }}
      >
        search
      </button>
      <hr />
      <div>search for {searchTerm}</div>
    </>
  );
};

function App() {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("React");
  const handleSearch = (event) => {
    setSearchTerm(event);
  };

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>
        {welcome.greeting}, {getTitle(welcome.title)}
      </h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

export default App;
