import './styles.css';
import { Accordion } from './components/Accordion';

const singleItems = [
  {
    id: 'mission',
    heading: 'Mission and impact',
    content: (
      <p>
        Our mission is to build climate positive products that make sustainable living accessible. Every purchase funds
        reforestation and clean energy programs.
      </p>
    ),
  },
  {
    id: 'materials',
    heading: 'Materials and sourcing',
    content: (
      <p>
        We work with third-party auditors to verify our supply chain. Our packaging is fully recyclable and made from
        post-consumer waste.
      </p>
    ),
  },
  {
    id: 'support',
    heading: 'Support and warranty',
    content: (
      <p>
        Every product comes with a two year warranty and lifetime support. Contact our support team for concierge
        service on replacements or upgrades.
      </p>
    ),
  },
];

const multipleItems = [
  {
    id: 'plan',
    heading: 'Choose a billing plan',
    content: (
      <ul>
        <li>Starter: $29 per month with email support</li>
        <li>Growth: $79 per month with analytics and automations</li>
        <li>Enterprise: custom pricing with SLA and dedicated partner</li>
      </ul>
    ),
  },
  {
    id: 'addons',
    heading: 'Add-ons',
    content: (
      <ul>
        <li>Realtime alerts</li>
        <li>Advanced audit logs</li>
        <li>Global CDN edge acceleration</li>
      </ul>
    ),
  },
  {
    id: 'summary',
    heading: 'Order summary',
    content: (
      <table>
        <tbody>
          <tr>
            <th scope="row">Subtotal</th>
            <td>$108.00</td>
          </tr>
          <tr>
            <th scope="row">Taxes</th>
            <td>$9.72</td>
          </tr>
          <tr>
            <th scope="row">Total</th>
            <td>$117.72</td>
          </tr>
        </tbody>
      </table>
    ),
  },
];

export default function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Accessible accordion system</h1>
        <p>Supports single and multiple expansion, keyboard navigation, and custom callbacks.</p>
      </header>

      <section className="panel">
        <h2>Brand story</h2>
        <Accordion items={singleItems} defaultExpandedIds={[singleItems[0].id]} />
      </section>

      <section className="panel">
        <h2>Checkout settings</h2>
        <Accordion items={multipleItems} type="multiple" defaultExpandedIds={[multipleItems[0].id]} />
      </section>
    </main>
  );
}
