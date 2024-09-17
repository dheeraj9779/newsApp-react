import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, url, author, date, source} = props
    return (
      <div>
        <div className="card m-3">
        <div style={{display:"flex", justifyContent:"end", position: "absolute",right:'-1px', top: "-10px"}}>
          <span className="badge rounded-pill bg-danger" > {source} </span>
        </div>
          <img className="card-img-top" src={imageUrl} alt="" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={url} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
