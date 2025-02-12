const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-custom-red">404</h1>
        <p className="text-xl text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-4 px-4 py-2 bg-custom-red text-white rounded-md">Go Back Home</a>
      </div>
    );
  };
  
  export default NotFound;
  