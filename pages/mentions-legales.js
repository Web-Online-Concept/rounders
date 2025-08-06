import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

export default function MentionsLegales() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.legal.notices.meta.title}</title>
        <meta name="description" content={t.legal.notices.meta.description} />
      </Head>

      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">{t.legal.notices.title}</h1>
          
          <section className="legal-section">
            <h2>{t.legal.notices.sections.editor.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.editor.content }} />
            <div className="legal-info">
              <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.editor.company }} />
              <p>{t.legal.notices.sections.editor.siret}</p>
              <p>{t.legal.notices.sections.editor.address}</p>
              <p>{t.legal.notices.sections.editor.email}</p>
              <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.editor.website }} />
            </div>
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.hosting.title}</h2>
            <p>{t.legal.notices.sections.hosting.content}</p>
            <div className="legal-info">
              <p><strong>Vercel Inc.</strong></p>
              <p>340 S Lemon Ave #4133</p>
              <p>Walnut, CA 91789, {t.legal.notices.sections.hosting.usa}</p>
              <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.hosting.vercelWeb }} />
            </div>
            <p>{t.legal.notices.sections.hosting.dataStorage}</p>
            <div className="legal-info">
              <p><strong>Neon Tech</strong></p>
              <p>{t.legal.notices.sections.hosting.neonService}</p>
              <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.hosting.neonWeb }} />
            </div>
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.nature.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.nature.content1 }} />
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.nature.content2 }} />
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.affiliate.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.affiliate.content }} />
            <ul>
              {t.legal.notices.sections.affiliate.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{t.legal.notices.sections.affiliate.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.intellectual.title}</h2>
            <p>{t.legal.notices.sections.intellectual.content1}</p>
            <p>{t.legal.notices.sections.intellectual.content2}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.liability.title}</h2>
            <p>{t.legal.notices.sections.liability.content}</p>
            <ul>
              {t.legal.notices.sections.liability.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.responsible.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.responsible.content1 }} />
            <p>{t.legal.notices.sections.responsible.content2}</p>
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.responsible.content3 }} />
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.data.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.data.content }} />
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.law.title}</h2>
            <p>{t.legal.notices.sections.law.content}</p>
          </section>

          <section className="legal-section">
            <h2>{t.legal.notices.sections.contact.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.legal.notices.sections.contact.content }} />
          </section>

          <div className="legal-footer">
            <p>{t.legal.notices.footer.updated}</p>
          </div>
        </div>
      </main>
    </>
  );
}