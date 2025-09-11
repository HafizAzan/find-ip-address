import React, { memo, use, useState } from "react";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseUrl =
      "http://127.0.0.1:5001/sahili-project/us-central1/getUserLocation"; // Apne backend ka URL yahan daalein

    // const url = isLogin ? `${baseUrl}/login` : `${baseUrl}/signup`;
    const url = baseUrl;

    const payload = isLogin
      ? { email, password }
      : { email, password, username };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Error: " + (errorData.message || "Something went wrong!"));
        return;
      }

      const data = await res.json();
      alert(`Success: ${isLogin ? "Logged in" : "Signed up"}!`);

      // Aap yahan token save kar sakte ho localStorage me ya redux me dispatch kar sakte ho
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" className="toggle-btn" onClick={toggleMode}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default memo(AuthForm);
