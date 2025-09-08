import { Locale } from '@/i18n.config'
import { NameSpace } from '@/lib/translations'
import {
  ImageRightTextLeft,
  ResponsivePaper
} from '@/components/Sections/ImageRightTextLeft/ImageRightTextLeft'
import CustomText from '@/components/CustomText/CustomText'
import { getImageByName } from '@/lib/images'

const NAMESPACE: NameSpace = 'about'

export default async function About({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const filePath = await getImageByName('about_section_1_image.jpg')
  console.log('filePath', filePath)
  //const image = await import(`@${filePath}`)
  //console.log('image', image)

  return (
    <section className='page'>
      <div className='container'>
        <CustomText textType='3xl' tName={NAMESPACE} tKey={'title'} />
        {filePath && (
          <ImageRightTextLeft
            tName={NAMESPACE}
            tKey={'section_1'}
            filePath={filePath}
          />
        )}
        {filePath && (
          <ResponsivePaper
            text='This is a responsive paper component.'
            image={filePath}
          />
        )}
      </div>
    </section>
  )
}
