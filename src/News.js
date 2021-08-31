import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class news extends Component {
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page_no: 0
        }
    }

    async updateNews() {
        this.props.progress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page_no+1}&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);
        this.props.progress(30);
        const parsedData = await data.json();
        this.props.progress(70);
        const articles = [...this.state.articles, ...parsedData.articles]
        this.setState({
            articles,
            totalResults: parsedData.totalResults,
            loading: false,
            page_no: this.state.page_no + 1
        })
        this.props.progress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.updateNews();
    }



    render() {
        const items = <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
        >
            <div className="container my-3">
                <div className="row">{this.state.articles.map(item => (
                    <div className="col-md-4 my-3" key={item.url}>
                        <NewsItem
                            title={item.title ? item.title.slice(0, 45) : ""}
                            author={item.author ? item.author : "Unknown"}
                            publishedAt={item.publishedAt}
                            source={item.source}
                            desc={item.description ? item.description.slice(0, 88) : ""}
                            key={item.url} imageUrl={item.urlToImage ? item.urlToImage :
                                "data:image/jpeg;base64,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"}
                            newsUrl={item.url}
                        />
                    </div>
                ))}
                </div>
            </div>
        </InfiniteScroll>
        return (
            <>
                <h1 className="text-center">News App - Top HeadLines</h1>
                {items}


            </>
        )
    }
}
