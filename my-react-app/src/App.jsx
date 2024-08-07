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

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
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

const InputWithLabel = ({ id, label, value, type = "text", onInputChange }) => {
  InputWithLabel.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onInputChange: PropTypes.func,
  };

  const [searchTerm, setSearchTerm] = useState("");
  // use this method to update the searchTerm when the search prop changes.
  useEffect(() => {
    if (!value) {
      return;
    }
    setSearchTerm(value);
  }, [value]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onInputChange && onInputChange(event);
  };

  return (
    // this called react fragment,
    // it's a way to group multiple elements without adding extra nodes to the DOM.
    <>
      <label htmlFor={id}>{label}:</label>
      <input value={searchTerm} onChange={handleChange} id={id} type={type} />

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>
        {welcome.greeting}, {getTitle(welcome.title)}
      </h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

export default App;
