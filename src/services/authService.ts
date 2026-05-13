const API_BASE = "https://v2.api.noroff.dev";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  venueManager?: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Register response:", result);

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Registration failed");
  }

  return result.data;
}

export async function loginUser(data: LoginData) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Login response:", result);

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Login failed");
  }

  return result.data;
}