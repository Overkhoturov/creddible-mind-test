import { useEffect, useState } from 'react';
import {Container, Box, Typography} from '@mui/material'
import {Entry} from 'contentful'

import Header from '../../components/Header'
import contentFullClient from '../../lib/contentfulService'

interface Fields {
  logo: {
    sys: {
      id: string,
      linkType: string,
      type: string
    }
  },
  menuLabel: string,
  searchLabel: string,
  title: string
}

const News = () => {
  const [searchLabel, setSearchLabel] = useState<string>('')
  const [menuLabel, setMenuLabel] = useState<string>('')
  const [logoId, setLogoId] = useState<string>('')
  const [logoUrl, setLogoUrl] = useState<string>('')

  useEffect(() => {
    contentFullClient.getEntries({ content_type: 'newsConfig' })
      .then((result) => {
        const [item] = result.items
        const {fields} = item as Entry<Fields>;
        setSearchLabel(fields.searchLabel);
        setMenuLabel(fields.menuLabel);
        setLogoId(fields.logo.sys.id);
      })
      .catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    contentFullClient.getAsset(logoId)
      .then((result) => {
        setLogoUrl(`https:${result.fields.file.url}`)
      })
      .catch((err) => console.log(err));
  }, [logoId])


  return (
    <>
      <Header logoUrl={logoUrl} menuLabel={menuLabel} profileName="John Doe" />
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{
          padding: '60px 0'
        }}>
          <Typography sx={{
            fontSize: '40px',
            fontWeight: 'bold',
            color: 'gray'
          }}>
            CredibleMind in the News
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default News;
