import { useState } from "react";
import { registerUser } from "../services/authService";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await registerUser({
        name,
        email,
        password,
        venueManager,
      });

      setMessage("Registration successful. You can now log in.");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Registration failed.");
      }
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-3xl font-medium text-stone-900">
        Create account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-300"
      >
        <label className="block">
          <span className="mb-1 block text-sm text-stone-600">Name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-xl border border-stone-300 px-3 py-3 text-sm outline-none focus:border-[#02101f]"
          />
        </label>

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
            minLength={8}
            className="w-full rounded-xl border border-stone-300 px-3 py-3 text-sm outline-none focus:border-[#02101f]"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={venueManager}
            onChange={(event) => setVenueManager(event.target.checked)}
          />
          Register as venue manager
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#02101f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#162036]"
        >
          Register
        </button>

        {message && <p className="text-sm text-stone-600">{message}</p>}
      </form>
    </section>
  );
}

export default RegisterPage;