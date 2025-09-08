import { Locale } from '@/i18n.config'
import { NameSpace } from '@/lib/translations'
import { MainSection } from '@/components/Sections/MainSection/MainSection'

const NAMESPACE: NameSpace = 'home'

export default async function Home({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  return (
    <section className='page'>
      <div className='container'>
        <MainSection />
      </div>
    </section>
  )
}
