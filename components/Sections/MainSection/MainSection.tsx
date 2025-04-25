import './MainSection.css'
import Image from 'next/image'
import CustomText from '@/components/CustomText/CustomText'
import welcome_image from '@/data/images/welcome_image.jpg'

const NAMESPACE = 'home'

export const MainSection = () => {
  return (
    <div className='home-container'>
      <Image
        className='welcome-image'
        width={300}
        height={300}
        src={welcome_image}
        alt='Home image'
      />
      <CustomText
        tName={NAMESPACE}
        tKey={'welcome_message'}
        textType={'welcome-text'}
      />
    </div>
  )
}
