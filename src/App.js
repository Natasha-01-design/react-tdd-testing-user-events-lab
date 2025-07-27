import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    tech: false,
    design: false,
    art: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectedInterests = Object.keys(interests).filter(
    (key) => interests[key]
  );

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img
        src="https://via.placeholder.com/350"
        alt="My profile pic"
      />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <fieldset>
          <legend>Interests:</legend>
          <label>
            <input
              type="checkbox"
              name="tech"
              checked={interests.tech}
              onChange={handleCheckboxChange}
            />
            Tech
          </label>
          <label>
            <input
              type="checkbox"
              name="design"
              checked={interests.design}
              onChange={handleCheckboxChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              name="art"
              checked={interests.art}
              onChange={handleCheckboxChange}
            />
            Art
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>

     {submitted && (
  <div data-testid="confirmation-message">
    <h3>Thank you, {name}!</h3>
    <p>You signed up with {email}</p>
    {selectedInterests.length > 0 && (
      <p>Your interests: {selectedInterests.join(", ")}</p>
    )}
  </div>
)}
    </main>
  );
}

export default App;
