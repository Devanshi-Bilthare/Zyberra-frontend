export const base_url = 'http://localhost:4000/api/'

export const getAuthConfig = () => {
  const token = localStorage.getItem("token"); // or from Redux/sessionStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
