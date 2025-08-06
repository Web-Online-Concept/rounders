import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

export default function PolitiqueConfidentialite() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.legal.privacy.meta.title}</title>
        <meta name="description" content={t.legal.privacy.meta.description} />
      </Head>

      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">{t.legal.privacy.title}</h1>
          
          <section className="legal-section">
            <h2>{t.legal.privacy.sections.introduction.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.privacy.sections.introduction.content1 }} />
            <p>{t.legal.privacy.sections.introduction.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.controller.title}</h2>
            <p>{t.legal.privacy.sections.controller.content}</p>
            <div className="legal-info">
              <p dangerouslySetInnerHTML={{ __html: t.legal.privacy.sections.controller.company }} />
              <p>{t.legal.privacy.sections.controller.siret}</p>
              <p>{t.legal.privacy.sections.controller.address}</p>
              <p>{t.legal.privacy.sections.controller.email}</p>
            </div>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.dataCollected.title}</h2>
            <p>{t.legal.privacy.sections.dataCollected.content}</p>
            
            <h3>{t.legal.privacy.sections.dataCollected.provided.title}</h3>
            <ul>
              {t.legal.privacy.sections.dataCollected.provided.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>{t.legal.privacy.sections.dataCollected.automatic.title}</h3>
            <ul>
              {t.legal.privacy.sections.dataCollected.automatic.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>{t.legal.privacy.sections.dataCollected.third.title}</h3>
            <ul>
              {t.legal.privacy.sections.dataCollected.third.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.purposes.title}</h2>
            <p>{t.legal.privacy.sections.purposes.content}</p>
            <ul>
              {t.legal.privacy.sections.purposes.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.legal.title}</h2>
            <p>{t.legal.privacy.sections.legal.content}</p>
            <ul>
              {t.legal.privacy.sections.legal.list.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.retention.title}</h2>
            <p>{t.legal.privacy.sections.retention.content}</p>
            <ul>
              {t.legal.privacy.sections.retention.list.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            <p>{t.legal.privacy.sections.retention.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.sharing.title}</h2>
            <p>{t.legal.privacy.sections.sharing.content}</p>
            <ul>
              {t.legal.privacy.sections.sharing.list.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t.legal.privacy.sections.sharing.content2 }} />
          </section>
<section className="legal-section">
            <h2>{t.legal.privacy.sections.transfers.title}</h2>
            <p>{t.legal.privacy.sections.transfers.content}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.security.title}</h2>
            <p>{t.legal.privacy.sections.security.content}</p>
            <ul>
              {t.legal.privacy.sections.security.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t.legal.privacy.sections.security.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.rights.title}</h2>
            <p>{t.legal.privacy.sections.rights.content}</p>
            <ul>
              {t.legal.privacy.sections.rights.list.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            <p>{t.legal.privacy.sections.rights.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.cookies.title}</h2>
            <p>{t.legal.privacy.sections.cookies.content}</p>
            <ul>
              {t.legal.privacy.sections.cookies.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t.legal.privacy.sections.cookies.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.minors.title}</h2>
            <p>{t.legal.privacy.sections.minors.content}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.changes.title}</h2>
            <p>{t.legal.privacy.sections.changes.content}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.privacy.sections.contact.title}</h2>
            <p>{t.legal.privacy.sections.contact.content}</p>
            <div className="legal-info">
              <p>{t.legal.privacy.sections.contact.email}</p>
              <p>{t.legal.privacy.sections.contact.mail}</p>
            </div>
            <p dangerouslySetInnerHTML={{ __html: t.legal.privacy.sections.contact.cnil }} />
          </section>

          <div className="legal-footer">
            <p>{t.legal.privacy.footer.updated}</p>
          </div>
        </div>
      </main>
    </>
  );
}		  