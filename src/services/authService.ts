// function authService

export default function authService() {
  const login = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@gmail.com",
          password: "test",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {};

  const logout = async () => {};

  const checkAuth = async () => {};

  return {
    login,
    register,
    logout,
    checkAuth,
  };
}
