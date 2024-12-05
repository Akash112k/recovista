const LoadingCard = () => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-muted rounded w-5/6 mb-4"></div>
      <div className="h-6 bg-muted rounded w-1/4"></div>
    </div>
  );
};

export default LoadingCard;