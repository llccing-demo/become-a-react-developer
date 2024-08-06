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

const App = () => {
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
  const handleChange = (event) => {
    console.log(event);
  };

  return (
    <div>
      <h1>
        {welcome.greeting}, {getTitle(welcome.title)}
      </h1>

      <label htmlFor="search">Search:</label>
      <input onChange={handleChange} id="search" type="text" />

      <hr />

      <List list={stories} />
      <List list={stories} />
    </div>
  );
};

export default App;
