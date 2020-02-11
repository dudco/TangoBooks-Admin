import React from "react";

const LoadingContext = React.createContext({ isLoading: false, setLoading: boolean => {} });

function LoadingProvider(props) {
  const [isLoading, setLoading] = React.useState(false);

  return <LoadingContext.Provider value={{ isLoading, setLoading }} {...props} />;
}

const useLoaidng = () => React.useContext(LoadingContext);

export { LoadingProvider, useLoaidng };
