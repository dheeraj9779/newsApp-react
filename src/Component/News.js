import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
   const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  useEffect(() => {
    const updateNews = async() => {
      props.setProgress(10)
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      let data = await fetch(url)
      props.setProgress(50)
      let parsedData = await data.json()
      props.setProgress(70)
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      props.setProgress(100)
    }
    updateNews()
  },[props,page])


  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url)
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

  
    return (
      <>
        <div className='container'>
        
        {
            articles.length !== 0 && <h1 className="text-center" style={{margin: '50px 0'}}>Top {capitalizeFirstLetter(props.category)} Headlines!!</h1>
          }
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          style={{ overflow: 'hidden !important'}}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>

            <div className='row my-4'>
              {articles.map((elem)=> {
                return <div className='col-md-4' key={elem.url}>
                  <NewsItem title={elem.title ? elem.title : ''} description={elem.description ? elem.description : ''} 
                    imageUrl={elem.urlToImage} url={elem.url} author={elem.author} date={elem.publishedAt}
                    source={elem.source.name}/>
                </div>
              })}
            </div>
          </InfiniteScroll>
          {
            articles.length === 0 && <div className="container d-flex justify-content-center m-5"><h2>No Data Available</h2></div>
          }
          
        </div>
      </>
    )
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

 News.defaultProps = {
  country: 'in',
  category: 'general',
  pageSize: 8,
  totalResults: 0
} 



export default News
