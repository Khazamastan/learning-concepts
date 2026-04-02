import './styles.css';
import { Popover } from './components/Popover';

export default function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <h1>Popover System</h1>
        <p>Production-ready popovers with focus trapping, escape handling, and four-way placement.</p>
      </header>

      <section className="grid">
        <article className="card">
          <h2>Inline help</h2>
          <p>
            Popovers are great for supplemental help. They should be triggered intentionally and dismissed with a single
            action.
          </p>
          <Popover triggerLabel="What counts as a strong password?" title="Password requirements" placement="right">
            <ul className="list">
              <li>At least 12 characters long</li>
              <li>Contains upper & lower case letters</li>
              <li>Includes a number and a symbol</li>
              <li>Unique to this account</li>
            </ul>
            <button type="button" className="cta">Generate password</button>
          </Popover>
        </article>

        <article className="card">
          <h2>Product quick view</h2>
          <p>Pair popovers with interactive content - inputs, forms, or calls to action ready for mobile and desktop.</p>
          <Popover
            triggerLabel="View size guide"
            title="Unisex hoodie sizing"
            description="Measurements are taken with the garment laid flat."
            placement="bottom"
          >
            <table className="size-table">
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  <th scope="col">Chest</th>
                  <th scope="col">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">S</th>
                  <td>34" - 36"</td>
                  <td>26"</td>
                </tr>
                <tr>
                  <th scope="row">M</th>
                  <td>38" - 40"</td>
                  <td>27"</td>
                </tr>
                <tr>
                  <th scope="row">L</th>
                  <td>42" - 44"</td>
                  <td>28"</td>
                </tr>
              </tbody>
            </table>
          </Popover>
        </article>

        <article className="card">
          <h2>Keyboard support</h2>
          <p>Use <kbd>Tab</kbd> to cycle within the popover and <kbd>Escape</kbd> to close it from anywhere.</p>
          <Popover
            triggerLabel="Keyboard reference"
            title="Global shortcuts"
            description="Available in the editor context."
            placement="left"
          >
            <dl className="shortcut-list">
              <div>
                <dt><kbd>Cmd</kbd> + <kbd>P</kbd></dt>
                <dd>Open command palette</dd>
              </div>
              <div>
                <dt><kbd>Cmd</kbd> + <kbd>/</kbd></dt>
                <dd>Toggle inline documentation</dd>
              </div>
              <div>
                <dt><kbd>Shift</kbd> + <kbd>Cmd</kbd> + <kbd>S</kbd></dt>
                <dd>Save and share snippet</dd>
              </div>
            </dl>
          </Popover>
        </article>
      </section>
    </main>
  );
}
