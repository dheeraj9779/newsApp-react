import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8,
    totalResults: 0
  } 

  PropTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(){
    super();
      this.state = {
          articles: [],
          page: 1,
          totalResults: 0
      }
  }
  
   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  async componentDidMount(){
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    this.props.setProgress(50)
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults})
    this.props.setProgress(100)
  }


  fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({page: this.state.page + 1})
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles:this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults
    })
  }

  render() {
    return (
      <>
        <div className='container'>
        <h1 className="text-center" style={{margin: '35px 0'}}>Top {this.capitalizeFirstLetter(this.props.category)} Headlines!!</h1>
        
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          style={{ overflow: 'hidden !important'}}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>

            <div className='row my-4'>
              {this.state.articles.map((elem)=> {
                return <div className='col-md-4' key={elem.url}>
                  <NewsItem title={elem.title ? elem.title : ''} description={elem.description ? elem.description : ''} 
                    imageUrl={elem.urlToImage} url={elem.url} author={elem.author} date={elem.publishedAt}
                    source={elem.source.name}/>
                </div>
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    )
  }
}

export default News
