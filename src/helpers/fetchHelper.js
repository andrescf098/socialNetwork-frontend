export const fetchHelper = async (url, method, body = {}, token = "") => {
  let options = {
    method: method,
  };
  if (method == "GET" && token) {
    options = {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  } else if (body && !token) {
    options = {
      ...options,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await fetch(url, options);
  } else if (body && token && method != "DELETE") {
    options = {
      ...options,
      body: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  } else if (method == "DELETE") {
    options = {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  } else {
    return await fetch(url, options);
  }
};
