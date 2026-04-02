
import './styles.css';
import { Carousel } from './components/Carousel';

const slides = [
  {
    id: 'northstar',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    title: 'Northstar reduced onboarding time by 68%',
    description: 'A component driven design system allowed the product org to ship twice as fast while improving accessibility scores.',
  },
  {
    id: 'atlas',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    title: 'Atlas scaled to 11 regions with confidence',
    description: 'Global edge rollouts with blue-green deployments kept uptime at 99.99% for millions of customers worldwide.',
  },
  {
    id: 'polaris',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    title: 'Polaris automated growth analytics',
    description: 'Automated reporting unlocked real-time dashboards and trimmed weekly stakeholder syncs by four hours.',
  },
];

export default function App() {
  return (
    <main className="app-shell">
      <Carousel slides={slides} />
    </main>
  );
}
