import { Paper, CardContent, CardMedia, Typography, Box } from '@mui/material'
import './ImageRightTextLeft.css'
import Image from 'next/image'

import CustomText from '@/components/CustomText/CustomText'
import { NameSpace } from '@/lib/translations'

interface ImageRightTextLeftProps {
  tName: NameSpace
  tKey: string
  filePath: string
}

export const ImageRightTextLeft: React.FC<ImageRightTextLeftProps> = async ({
  tName,
  tKey,
  filePath
}) => {
  return (
    <Paper className='paper' elevation={3}>
      <CustomText tName={tName} tKey={tKey} textType='paper-text-left' />
      <Image src={filePath} alt='Picture about me' width={700} height={700} />
    </Paper>
  )
}

interface ResponsivePaperProps {
  text: string
  image: string
}

export const ResponsivePaper: React.FC<ResponsivePaperProps> = ({
  text,
  image
}) => {
  return (
    <Paper
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 2,
        borderRadius: 3,
        boxShadow: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'center'
        }}
      >
        {/* Text Section */}
        <CardContent>
          <Typography variant='h6'>{text}</Typography>
        </CardContent>

        {/* Image Section */}
        <CardMedia
          component='img'
          image={image}
          alt='Paper Image'
          sx={{ objectFit: 'cover', borderRadius: 2, maxWidth: '100%' }}
        />
      </Box>
    </Paper>
  )
}
