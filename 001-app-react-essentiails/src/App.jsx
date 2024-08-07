import { useEffect, useState, useReducer, useCallback } from "react";
import PropTypes from "prop-types";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const welcome = {
  greeting: "Hi",
  title: "React",
};

const getTitle = (title) => {
  return title;
};

const List = ({ list, onRemoveItem }) => {
  List.propTypes = {
    list: PropTypes.array,
    onRemoveItem: PropTypes.func,
  };

  if (!list) {
    return null;
  }
  return list.map((item) => (
    <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
  ));
};

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter((story) => action.payload !== story.objectID),
      };
    default:
      throw new Error();
  }
};

const Item = ({
  url,
  title,
  author,
  num_comments,
  points,
  objectID,
  onRemoveItem,
}) => {
  Item.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    num_comments: PropTypes.number,
    points: PropTypes.number,
    objectID: PropTypes.number,
    onRemoveItem: PropTypes.func,
  };

  return (
    <div>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
      <span>
        <button
          onClick={() => {
            onRemoveItem(objectID);
          }}
        >
          Remove
        </button>
      </span>
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
    </>
  );
};

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => {
  SearchForm.propTypes = {
    searchTerm: PropTypes.string,
    onSearchInput: PropTypes.func,
    onSearchSubmit: PropTypes.func,
  };

  return (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={onSearchInput}
      />
      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = useCallback(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (object_id) => {
    console.log("object_id", object_id);
    dispatchStories({
      type: "REMOVE_STORY",
      payload: object_id,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (
    <div>
      <h1>
        {welcome.greeting}, {getTitle(welcome.title)}
      </h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
}

export default App;
