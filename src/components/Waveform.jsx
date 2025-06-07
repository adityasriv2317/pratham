const WaveformLoader = () => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-6 my-4 bg-blue-500 rounded animate-ping"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    );
  };
  
  export default WaveformLoader;
  