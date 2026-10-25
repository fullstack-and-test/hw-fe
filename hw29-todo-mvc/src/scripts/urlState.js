"use strict";

const UrlState = ({ location, history }) => {
  const get = (name) => new URL(location.href).searchParams.get(name);

  const set = (values) => {
    const url = new URL(location.href);
    Object.entries(values).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );
    history.replaceState(null, "", url);
  };

  const remove = (...names) => {
    const url = new URL(location.href);
    names.forEach((name) => url.searchParams.delete(name));
    history.replaceState(null, "", url);
  };

  return { get, set, remove };
};

export default UrlState;
