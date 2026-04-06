const pageShareTemplate = String.raw`読んでる
\${url}`;
const quoteShareTemplate = String.raw`

> \${text}
\${url}`;

export function renderOptionsPage(rootElement: HTMLDivElement): void {
  rootElement.innerHTML = `
    <main class="layout">
      <section class="hero">
        <p class="eyebrow">Post on X</p>
        <h1>Share what you are reading without leaving the page.</h1>
        <p class="lede">
          Use the context menu to send the current page URL or a selected quote
          to the X compose screen. The extension stops before posting so you stay
          in control.
        </p>
      </section>

      <section class="panel">
        <h2>Available actions</h2>
        <ul class="list">
          <li><strong>Share page on X</strong> opens X with the current page URL.</li>
          <li>
            <strong>Quote selected text on X</strong> opens X with the selected
            text and page URL.
          </li>
          <li>
            Clicking the toolbar icon opens this settings page instead of showing
            a popup.
          </li>
        </ul>
      </section>

      <section class="panel split">
        <div>
          <h2>Templates</h2>
          <p>
            The first release uses fixed templates. Long selected text is
            truncated before it is sent to X.
          </p>
        </div>

        <div class="template-grid">
          <article class="template-card">
            <h3>Page share</h3>
            <pre><code data-template="page-share"></code></pre>
          </article>
          <article class="template-card">
            <h3>Quote share</h3>
            <pre><code data-template="quote-share"></code></pre>
          </article>
        </div>
      </section>

      <section class="panel">
        <h2>Planned extension points</h2>
        <p>
          The options page is intentionally lightweight for now, but it keeps
          room for future template settings and share targets.
        </p>
      </section>
    </main>
  `;

  const pageShareTemplateElement = rootElement.querySelector<HTMLElement>(
    '[data-template="page-share"]',
  );
  const quoteShareTemplateElement = rootElement.querySelector<HTMLElement>(
    '[data-template="quote-share"]',
  );

  if (pageShareTemplateElement == null || quoteShareTemplateElement == null) {
    throw new Error("Expected the template placeholders to exist.");
  }

  pageShareTemplateElement.textContent = pageShareTemplate;
  quoteShareTemplateElement.textContent = quoteShareTemplate;
}
