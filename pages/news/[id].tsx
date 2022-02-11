import { useEffect, useState } from 'react'
import {Container} from '@mui/material'
import { useRouter } from 'next/router'

import Card from '../../components/Card'
import algoliaClient from '../../lib/algoliaService'

const index = algoliaClient.initIndex('news')

const Post = ({}) => {
  const router = useRouter()
  const [newItem, setNewItem] = useState(null)
  const { id } = router.query

  useEffect(() => {
    index.search('')
    .then(({hits}) => {
      hits.some((hit) => {
        if (hit.objectID === id) {
          setNewItem(hit)
          return true
        }
        return false
      })
    })
    .catch((err) => console.log(err));
  }, [id])

  return (
    <Container>
      {newItem && <Card
          key={newItem.objectID}
          id={newItem.objectID}
          image={newItem.imageUrl}
          title={newItem.topics[0].title}
          name={newItem.name}
          description={newItem.description}
          date={newItem.publicationDate}
          organization={newItem.organization[0].fields.name}
          disableLink
        />
      }
      
    </Container>
  )
}

export default Post