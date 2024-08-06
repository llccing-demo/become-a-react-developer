import { useState } from "react";
import PropTypes from "prop-types";

const welcome = {
  greeting: "Hi",
  title: "React",
};

const getTitle = (title) => {
  return title;
};

const List = ({ list }) => {
  return list.map((item) => {
    return (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  });
};
const Search = ({ search, onSearch, onChange }) => {
  Search.propTypes = {
    search: PropTypes.string,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
  };

  const [searchTerm, setSearchTerm] = useState(search || "");

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

  const [searchTerm, setSearchTerm] = useState("");
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
      <Search onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

export default App;
