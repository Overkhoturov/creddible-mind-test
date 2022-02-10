import { useEffect, useState } from 'react';
import {AssetCollection} from 'contentful'

import contentFullClient from '../../lib/contentfulService'

const News = () => {
  const [pageData, setPageData] = useState<AssetCollection>()

  useEffect(() => {
    contentFullClient.getContentType('newsConfig')
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  }, [])

  return (
    <div>

    </div>
  );
}

export default News;
