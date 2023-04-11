import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps ={
    country: "in",
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

   capitalizeFirstLetter=(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    //console.log("this is constructor")
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}Adda`
  };



  async componentDidMount()
  {
    // console.log("ComponentDidMount");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a90a24e966ce4796927d94c7f0d3f1fa&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles,
    // totalResults: parsedData.totalResults,
    // loading: false})
    this.updateNews();
  }


  async updateNews(){
    //console.log("ComponentDidMount");
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    this.props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    //console.log(parsedData);
    this.setState({articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false})
    this.props.setProgress(100);

  }


//   handlePrevClick =async()=>{
//   // console.log("Previous")
//   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a90a24e966ce4796927d94c7f0d3f1fa&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
//   // this.setState({loading: true});  
//   // let data = await fetch(url);
//   //   let parsedData = await data.json();
//   //   console.log(parsedData)
//   //   this.setState({
//   //     page: this.state.page-1,
//   //     articles: parsedData.articles,
//   //     loading: false})
//   this.setState({page: this.state.page-1})
//   this.updateNews();
// }



// handleNextClick=async ()=>{
//  // console.log("Next")
//   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a90a24e966ce4796927d94c7f0d3f1fa&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
//   // this.setState({loading: true});
//   // let data = await fetch(url);
//   // let parsedData = await data.json();
//   // console.log(parsedData)
//   // this.setState({
//   //   page: this.state.page+1,
//   //   articles: parsedData.articles,
//   //   loading: false})
//   this.setState({page: this.state.page+1})
//   this.updateNews();
//   }


  fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({page: this.state.page+1});

    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    this.setState({articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults
  })
    
  };




 render() {
  //console.log("render");
    return (
      <>
       {this.state.loading && <Spinner/>} 
      <h2 className ="text-center" style = {{margin: "23px 10px"}}> 
      NewsAdda-{this.capitalizeFirstLetter(this.props.category)} Headlines
      </h2>
      
      {/* {!this.state.loading && */} 
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4><Spinner/></h4>} >
            <div className='container'>
        < div className = "row my-6">
        {this.state.articles.map((elements)=>{ 
        return <div className = "col-md-4" key = {elements.url}>
        <NewsItem title={elements.title} description= {elements.description?elements.description:" "} imageUrl = {elements.urlToImage} newsUrl = {elements.url} author={elements.author? elements.author:"Unknown source"} publishedAt={elements.publishedAt} source={elements.source.name} />
              </div>
            })}
          </div> 
          </div>
          </InfiniteScroll>  
                {/* <div className="conatiner d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn bt-sm btn-primary" onClick = {this.handlePrevClick}>
                &larr;Previous
                </button>
                <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-sm btn-primary" onClick = {this.handleNextClick}>
                Next &rarr;  
                </button>
                </div>  */}
      </>
    )
  }
}

export default News
