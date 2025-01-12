import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <h3>Error!</h3>
      <Link to="/">Go to homepage!</Link>
    </div>
  );
};

export default ErrorPage;
