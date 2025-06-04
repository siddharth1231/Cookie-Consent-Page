import CookieConsent from '../components/cookieconsent';

export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>AudioPod Task</h1>
      <p>Cookie Consent Banner</p>
      <CookieConsent />
    </div>
  );
}
