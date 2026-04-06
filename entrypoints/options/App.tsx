const pageShareTemplate = String.raw`読んでる
\${url}`;
const quoteShareTemplate = String.raw`

> \${text}
\${url}`;

export default function App() {
  return (
    <main className="layout">
      <section className="hero">
        <p className="eyebrow">Post on X</p>
        <h1>Share what you are reading without leaving the page.</h1>
        <p className="lede">
          Use the toolbar icon or the context menu to send the current page URL or a selected quote
          to the X compose screen. The extension stops before posting so you stay in control.
        </p>
      </section>

      <section className="panel">
        <h2>Available actions</h2>
        <ul className="list">
          <li>
            <strong>Share page on X</strong> opens X with the current page URL.
          </li>
          <li>
            <strong>Quote selected text on X</strong> opens X with the selected text and page URL.
          </li>
          <li>Clicking the toolbar icon shares the current page without showing a popup.</li>
          <li>Open this settings page from the browser's extension options entry.</li>
        </ul>
      </section>

      <section className="panel split">
        <div>
          <h2>Templates</h2>
          <p>
            The first release uses fixed templates. Long selected text is truncated before it is
            sent to X.
          </p>
        </div>

        <div className="template-grid">
          <article className="template-card">
            <h3>Page share</h3>
            <pre>
              <code>{pageShareTemplate}</code>
            </pre>
          </article>
          <article className="template-card">
            <h3>Quote share</h3>
            <pre>
              <code>{quoteShareTemplate}</code>
            </pre>
          </article>
        </div>
      </section>

      <section className="panel">
        <h2>Planned extension points</h2>
        <p>
          The options page now uses React, but it stays intentionally lightweight and keeps room for
          future template settings and share targets.
        </p>
      </section>
    </main>
  );
}
