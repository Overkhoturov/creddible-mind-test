
import {Card as MCard, CardMedia, Typography, Box} from '@mui/material';
import Link from 'next/link'
import momnet from 'moment'
import moment from 'moment';
import { borderRadius } from '@mui/system';

interface CardProps {
  image: string,
  title:string,
  name:string,
  description:string,
  organization: string,
  date: string,
  id: string,
  isShort?: boolean
}

const formatDate = (str:string) => moment(str, 'YYYY-MM-DD').format("MMM DD, YYYY")

const Card = ({image, title, name, description, organization, date, id, isShort}: CardProps) => {
  return (
    <MCard sx={{
      display: 'flex',
      paddingBottom: '30px',
      boxShadow: 'none',
      borderRadius: 0,
      flexDirection: isShort ? 'column' : 'row'
    }}>
      <Link href={`news/${id}`} passHref>
        <CardMedia
          component="img"
          image={image}
          sx={{
            cursor: 'pointer',
            maxWidth: '300px',
            marginRight: '30px',
          }}
          alt="news image"
        />
      </Link>
      <Box sx={{
        maxWidth: isShort ? '300px' : 'initial',
      }}>
        <Typography sx={{color: '#1976d2', marginTop: isShort ? '20px' : ''}} gutterBottom variant="body2" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {!isShort && <Typography gutterBottom variant="body2" component="div">
          {description}
        </Typography>
        }
        
        <Typography gutterBottom variant="body2" component="span">
          {formatDate(date)}
        </Typography>
        <Typography sx={{color: '#1976d2', marginLeft: '50px'}} gutterBottom variant="body2" component="span">
          {organization}
        </Typography>
      </Box>
    </MCard>
  )
}

export default Card