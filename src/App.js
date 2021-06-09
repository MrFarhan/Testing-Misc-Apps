import './App.css';
import { useTranslation, Trans } from 'react-i18next';
import { useState, Suspense, useEffect } from 'react';
import Footer from './Footer'

function App() {
  const { t, i18n } = useTranslation();
  const [count, setCounter] = useState(0);

  const [lngs, setLngs] = useState({ en: { nativeName: 'English' } });

  useEffect(() => {
    i18n.services.backendConnector.backend.getLanguages((err, ret) => {
      if (err) return // TODO: handle err...
      console.log("err is ", err, "ret is ", ret)
      setLngs(ret);
    });
  }, [i18n.services.backendConnector.backend]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} type="submit" onClick={() => {
              i18n.changeLanguage(lng);
              setCounter(count + 1);
            }}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <i>{t('dummyKey')}</i>
        </p>
        <p>
          <Trans i18nKey="welcomeKey">
            Edit <code>src/App.js</code> and save to reload.
          </Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('dummyKey')}
        </a>
      </header>
      <Footer t={t} />
    </div>
  );
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
  return (
    <Suspense fallback="...is loading">
      <App />
    </Suspense>
  );
}