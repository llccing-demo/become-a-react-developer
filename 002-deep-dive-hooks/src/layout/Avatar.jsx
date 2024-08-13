import { useState } from "react";
import Proptypes from "prop-types";

const url = "https://www.educative.io/udata/nMerWv29jyX/Man.png";
function Avatar({ username }) {
  Avatar.propTypes = {
    username: Proptypes.string,
  };
  const [error, setError] = useState(false);

  const handleImgError = () => {
    setError(true);
  };

  return (
    <>
      {error ? (
        <div>No img of {username}</div>
      ) : (
        <img src={url} onError={handleImgError} alt={username} />
      )}
    </>
  );
}

export default Avatar;
