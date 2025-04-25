import { Locale } from '@/i18n.config'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/_options'

import AuthButton from '@/components/auth-button'
import CustomText from '@/components/CustomText/CustomText'
import { getTranslation, NameSpace } from '@/lib/translations'
import { MainSection } from '@/components/Sections/MainSection/MainSection'

const NAMESPACE: NameSpace = 'home'

export default async function Home({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const translation = await getTranslation(null, lang)
  const translations = translation[lang][NAMESPACE]
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <section className='page'>
      <div className='container'>
        <MainSection />
      </div>
    </section>
  )
}
