interface User {
  username: string;
  password: string;
}

const generateToken = (username: string): string => {
  return `fake-jwt-token-for-${username}`;
};

// login

//username: emily
//password: emilypass

export const login = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch users", data);
      return null;
    }

    const user = data.users.find(
      (user: User) => user.username === username && user.password === password
    );

    if (!user) {
      console.error("Invalid username or password");
      return null;
    }

    const token = generateToken(username);

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    document.cookie = `token=${token}; path=/; expires=${expirationDate.toUTCString()}; secure; samesite=strict`;

    console.log("Login successful", { token });
    return token;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");

  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";

  window.location.href = "/login";
};
