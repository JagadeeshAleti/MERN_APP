export const Config = {
  local: {
    backend: "http://localhost:5001/api",
  },
  dev: {
    backend: "http://localhost:5001/api",
  },
  prod: {},
};

export const getConfig = () => {
  const env = process.env.REACT_APP_BUILD_ENV || "local";
  return Config[env];
};

//REACT_APP_BUILD_ENV="dev" yarn start
