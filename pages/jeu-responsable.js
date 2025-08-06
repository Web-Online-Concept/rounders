import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

export default function JeuResponsable() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.legal.responsible.meta.title}</title>
        <meta name="description" content={t.legal.responsible.meta.description} />
      </Head>

      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">{t.legal.responsible.title}</h1>
          
          <div className="warning-banner" style={{
            background: '#dc2626',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{margin: '0 0 10px 0', fontSize: '24px'}}>
              ⚠️ {t.legal.responsible.warning.title}
            </h2>
            <p style={{margin: 0, fontSize: '18px'}}>
              {t.legal.responsible.warning.subtitle}
            </p>
          </div>

          <section className="legal-section">
            <h2>{t.legal.responsible.sections.commitment.title}</h2>
            <p>{t.legal.responsible.sections.commitment.content1}</p>
            <p dangerouslySetInnerHTML={{ __html: t.legal.responsible.sections.commitment.content2 }} />
          </section>

          <section className="legal-section">
            <h2>{t.legal.responsible.sections.signs.title}</h2>
            <p>{t.legal.responsible.sections.signs.content}</p>
            <ul>
              {t.legal.responsible.sections.signs.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.responsible.sections.tips.title}</h2>
            <ul>
              {t.legal.responsible.sections.tips.list.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.responsible.sections.tools.title}</h2>
            <p>{t.legal.responsible.sections.tools.content}</p>
            <ul>
              {t.legal.responsible.sections.tools.list.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t.legal.responsible.sections.tools.content2 }} />
          </section>

          <section className="legal-section">
            <h2>{t.legal.responsible.sections.help.title}</h2>
            <p>{t.legal.responsible.sections.help.content}</p>

            <h3>🇫🇷 {t.legal.responsible.sections.help.countries.france.name}</h3>
            <ul>
              {t.legal.responsible.sections.help.countries.france.resources.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            <h3>🇧🇪 {t.legal.responsible.sections.help.countries.belgium.name}</h3>
            <ul>
              {t.legal.responsible.sections.help.countries.belgium.resources.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            <h3>🇨🇭 {t.legal.responsible.sections.help.countries.switzerland.name}</h3>
            <ul>
              {t.legal.responsible.sections.help.countries.switzerland.resources.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            <h3>🇨🇦 {t.legal.responsible.sections.help.countries.canada.name}</h3>
            <ul>
              {t.legal.responsible.sections.help.countries.canada.resources.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            <h3>🇬🇧 {t.legal.responsible.sections.help.countries.uk.name}</h3>
            <ul>
              {t.legal.responsible.sections.help.countries.uk.resources.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            <h3>🌍 {t.legal.responsible.sections.help.countries.international.name}</h3>
            <ul>
              {t.legal.responsible.sections.help.countries.international.resources.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </section>
<section className="legal-section">
            <h2>{t.legal.responsible.sections.minors.title}</h2>
            <p>
              <strong style={{color: '#dc2626', fontSize: '18px'}}>
                {t.legal.responsible.sections.minors.warning}
              </strong>
            </p>
            <p>{t.legal.responsible.sections.minors.content}</p>
            <ul>
              {t.legal.responsible.sections.minors.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.responsible.sections.position.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.responsible.sections.position.content1 }} />
            <p>{t.legal.responsible.sections.position.content2}</p>
            <ol>
              {t.legal.responsible.sections.position.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </section>

          <section className="legal-section">
            <h2>{t.legal.responsible.sections.contact.title}</h2>
            <p>{t.legal.responsible.sections.contact.content}</p>
            <p dangerouslySetInnerHTML={{ __html: t.legal.responsible.sections.contact.email }} />
            <p dangerouslySetInnerHTML={{ __html: t.legal.responsible.sections.contact.reminder }} />
          </section>

          <div className="legal-footer">
            <p>{t.legal.responsible.footer.updated}</p>
          </div>
        </div>
      </main>
    </>
  );
}		  