const LoadingCard = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
      <div className="h-6 bg-primary/5 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-primary/5 rounded-lg w-1/2 mb-2"></div>
      <div className="h-4 bg-primary/5 rounded-lg w-5/6 mb-4"></div>
      <div className="h-6 bg-primary/5 rounded-lg w-1/4"></div>
    </div>
  );
};

export default LoadingCard;