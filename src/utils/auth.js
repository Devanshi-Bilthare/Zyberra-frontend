
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return !!(token && user);
};

export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // return user?.role === "admin";
  return true
};

