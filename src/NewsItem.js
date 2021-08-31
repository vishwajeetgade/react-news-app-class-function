import React, { Component } from 'react'

class NewsItem extends Component {
    render() {
        const { title, desc, imageUrl, newsUrl, author, source, publishedAt } = this.props
        return (
            <div className="card">
                <div style={{display:"flex", justifyContent:"flex-end", position:"absolute", right:"0"}}>
                    <span className="badge rounded-pill bg-danger">{source.name}</span>
                </div>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{desc}...</p>
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary" >Go somewhere</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
