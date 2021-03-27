import React from 'react'

const PostURL = ({link}) => {
    return (
        <div className="postLinkContainer">
            Link:
            <a className="postLink" href={link} target="_blank">{link}</a>
        </div>
    )
}

export default PostURL
