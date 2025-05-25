export const base_url = 'https://zyberra-1.onrender.com/api/'

export const getAuthConfig = () => {
  const token = localStorage.getItem("token"); // or from Redux/sessionStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
