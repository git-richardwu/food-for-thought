import React from 'react'

const PostURL = ({link}) => {
    if (link.length != 0){
        return (
            <div className="postLinkContainer">
                Link:
                <a className="postLink" href={link} target="_blank">{link}</a>
            </div>
        )
    }else{
        return (
            <div/>
        )
    }

}

export default PostURL
