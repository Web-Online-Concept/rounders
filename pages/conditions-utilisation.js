import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

export default function ConditionsUtilisation() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.legal.terms.meta.title}</title>
        <meta name="description" content={t.legal.terms.meta.description} />
      </Head>

      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">{t.legal.terms.title}</h1>
          
          <section className="legal-section">
            <h2>{t.legal.terms.sections.acceptance.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.terms.sections.acceptance.content1 }} />
            <p>{t.legal.terms.sections.acceptance.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.service.title}</h2>
            <p>{t.legal.terms.sections.service.content}</p>
            <ul>
              {t.legal.terms.sections.service.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.voluntary.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.terms.sections.voluntary.content1 }} />
            <p>{t.legal.terms.sections.voluntary.content2}</p>
            <ul>
              {t.legal.terms.sections.voluntary.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t.legal.terms.sections.voluntary.content3}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.eligibility.title}</h2>
            <p>{t.legal.terms.sections.eligibility.content}</p>
            <ul>
              {t.legal.terms.sections.eligibility.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t.legal.terms.sections.eligibility.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.payment.title}</h2>
            <p>{t.legal.terms.sections.payment.content}</p>
            <ul>
              {t.legal.terms.sections.payment.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t.legal.terms.sections.payment.content2 }} />
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.obligations.title}</h2>
            <p>{t.legal.terms.sections.obligations.content}</p>
            <ul>
              {t.legal.terms.sections.obligations.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

<section className="legal-section">
            <h2>{t.legal.terms.sections.intellectual.title}</h2>
            <p>{t.legal.terms.sections.intellectual.content1}</p>
            <p>{t.legal.terms.sections.intellectual.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.liability.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.terms.sections.liability.content1 }} />
            <ul>
              {t.legal.terms.sections.liability.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t.legal.terms.sections.liability.warning }} />
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.indemnification.title}</h2>
            <p>{t.legal.terms.sections.indemnification.content}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.modification.title}</h2>
            <p>{t.legal.terms.sections.modification.content}</p>
            <ul>
              {t.legal.terms.sections.modification.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t.legal.terms.sections.modification.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.severability.title}</h2>
            <p>{t.legal.terms.sections.severability.content}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.law.title}</h2>
            <p>{t.legal.terms.sections.law.content}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.terms.sections.contact.title}</h2>
            <p>{t.legal.terms.sections.contact.content}</p>
            <p>
              {t.legal.terms.sections.contact.email}: <a href="mailto:web.online.concept@gmail.com">web.online.concept@gmail.com</a>
            </p>
          </section>

          <div className="legal-footer">
            <p>{t.legal.terms.footer.effective}</p>
            <p>{t.legal.terms.footer.updated}</p>
          </div>
        </div>
      </main>
    </>
  );
}		  