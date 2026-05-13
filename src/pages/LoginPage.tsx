import { useState } from "react";
import { loginUser } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const user = await loginUser({ email, password });

      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful.");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Login failed.");
      }
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-3xl font-medium text-stone-900">Log in</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-300"
      >
        <label className="block">
          <span className="mb-1 block text-sm text-stone-600">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-stone-300 px-3 py-3 text-sm outline-none focus:border-[#02101f]"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-stone-600">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-xl border border-stone-300 px-3 py-3 text-sm outline-none focus:border-[#02101f]"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#02101f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#162036]"
        >
          Log in
        </button>

        {message && <p className="text-sm text-stone-600">{message}</p>}
      </form>
    </section>
  );
}

export default LoginPage;