import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [typeInput, settypeInput] = useState("");
  const [optionalScope, setoptionalScope] = useState("");
  const [description, setdescription] = useState("");
  const [body, setbody] = useState("");
  const [result, setResult] = useState();

  const typeOptions = [
    { value: "0", label: "<type>" },
    { value: "fix", label: "fix" },
    { value: "feat", label: "feat" },
    { value: "BREAKING CHANGE", label: "BREAKING CHANGE" },
    { value: "build", label: "build" },
    { value: "chore", label: "chore" },
    { value: "ci", label: "ci" },
    { value: "docs", label: "docs" },
    { value: "style", label: "style" },
    { value: "refactor", label: "refactor" },
    { value: "perf", label: "perf" },
    { value: "test", label: "test" },
  ];

  async function onSubmit(event) {
    event.preventDefault();
    console.log("event", event);
    setLoading(true);
    const response = await fetch("/api/openaiGenerate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: { typeInput, optionalScope, description, body },
      }),
    });
    const data = await response.json();
    console.log("data", data);
    setResult(data.result);

    setLoading(false);
  }

  console.log("typeInput", typeInput);
  return (
    <div>
      <Head>
        <title>AI Commit</title>
      </Head>

      <main className={styles.main}>
        <header>
          <h4>
            Conventional Commits with <span className="span-ai">AI</span>
          </h4>
        </header>

        <pre className="code-container">
          <code>
            `` &lt;type&gt;[optional scope]: &lt;description&gt; [optional body]
            [optional footer(s)]``
          </code>
        </pre>

        <form onSubmit={onSubmit}>
          <select>
            {typeOptions.map((typeOption) => (
              <option value={typeOption.value} key={typeOption.value}>
                {typeOption.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="optionalScope"
            placeholder="[optional scope]"
            value={optionalScope}
            onChange={(e) => setoptionalScope(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="<description>"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />

          <input
            type="text"
            name="body"
            placeholder="[optional body]"
            value={body}
            onChange={(e) => setbody(e.target.value)}
          />

          <input
            // disabled={typeInput === "" || loading}
            type="submit"
            value={loading ? "Loading..." : "Give me"}
          />
        </form>
        <div className={styles.result}>{result}</div>
        <div className="text-container">
          <p>This work is only for studying with an OpenAI API key.</p>
          <p>
            This project is based on version 1.0.0 of the{" "}
            <a href="">Conventional Commits </a>
            specification.
          </p>
          <p>
            Keep in mind that various projects and teams may adopt different
            conventions on formatting and incorporating ticket IDs into commit
            messages, so it is important to verify with your team or project
            manager that you are adhering to the appropriate conventions for
            your particular project.
          </p>
        </div>
      </main>
    </div>
  );
}
