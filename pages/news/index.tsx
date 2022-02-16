import { useEffect, useState } from 'react';
import {Container, Box, Typography, OutlinedInput, Button} from '@mui/material'
import {Entry} from 'contentful'
import SearchIcon from '@mui/icons-material/Search'

import Header from '../../components/Header'
import Card from '../../components/Card'
import contentFullClient from '../../lib/contentfulService'
import algoliaClient from '../../lib/algoliaService'

const index = algoliaClient.initIndex('news')

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
  const [news, setNews] = useState([])
  const [searchValue, setSearchValue] = useState<string>('')

  const getDefaultNews = async () => {
    try {
      const {hits} = await index.search('')
      setNews(hits);
    } catch(err) {
      console.log(err)
    }
  }

  const getEntries = async () => {
    try {
      const entries = await contentFullClient.getEntries({ content_type: 'newsConfig' });
      const [item] = entries.items
      const {fields} = item as Entry<Fields>;
      const {searchLabel, menuLabel, logo} = fields
      setSearchLabel(searchLabel);
      setMenuLabel(menuLabel);
      setLogoId(logo.sys.id);
    } catch (err) {
      console.log(err)
    }
    await getDefaultNews()
  }

  useEffect(() => {
    getEntries();
  }, [])

  const getAsset = async () => {
    try {
      const asset = await contentFullClient.getAsset(logoId);
      setLogoUrl(`https:${asset.fields.file.url}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAsset()
  }, [logoId])

  const searchNews = async () => {
    if(!searchValue) {
      await getDefaultNews()
      return;
    }
    try {
      const {hits} = await index.search('', {
        filters: `topics.title:"${searchValue}"`
      })
      setNews(hits)
    } catch(err) {
      console.log(err)
    }
  }

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
        <Box sx={{
          display: 'flex',
          width: '100%',
          justifyContent:'space-between'
        }}>
          {news.slice(0, 3).map( newsItem => (
            <Card
              isShort
              key={newsItem.objectID}
              id={newsItem.objectID}
              image={newsItem.imageUrl}
              title={newsItem.topics[0].title}
              name={newsItem.name}
              description={newsItem.description}
              date={newsItem.publicationDate}
              organization={newsItem.organization[0].fields.name}
            />
          ))}
        </Box>
      </Container>
      <hr />
      <Container>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          border: '1px solid #9e9e9e',
          width: '25%',
          padding: '20px',
          height: '120px'
        }}>
            <Box>
              {searchLabel}
            </Box>
            <Box sx={{
              display: 'flex',
              maxHeight: '35px',
              marginTop: '20px'
            }}>
              <OutlinedInput
                sx={{
                  borderRadius: '5px 0 0 5px',
                  boxSizing: 'border-box'
                }}
                placeholder='Search'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                />
              <Button sx={{
                color:'white',
                bgcolor: '#1976d2',
                borderRadius: '0 5px 5px 0',
                '&:hover': {
                  bgcolor: '#1976d2',
                }
              }}
                onClick={searchNews}
              >
                <SearchIcon />
              </Button>
            </Box>
        </Box>
        <Box sx={{
          width: '70%',
        }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              paddingBottom: '9px',
              borderBottom: '1px solid #9e9e9e',
              marginBottom: '20px'
            }}
          >
            {news.length} Resources Found
          </Typography> 
          {news.map((newsItem) => (
            <Card
              key={newsItem.objectID}
              id={newsItem.objectID}
              image={newsItem.imageUrl}
              title={newsItem.topics[0].title}
              name={newsItem.name}
              description={newsItem.description}
              date={newsItem.publicationDate}
              organization={newsItem.organization[0].fields.name}
            />
          ))}
        </Box>
      </Box>
      </Container>
    </>
  );
}

export default News;
