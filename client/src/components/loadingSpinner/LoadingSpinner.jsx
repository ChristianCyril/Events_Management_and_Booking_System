import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <img src="/loading.svg" />
      </div>
    </div>
  );
};

export default LoadingSpinner;