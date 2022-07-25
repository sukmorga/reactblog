import React from 'react'
import PostItem from './PostItem'

const PostList = ({ posts, title, remove }) => {

    if (!posts.length) {
        return (
            <h1 stule={{ textAlign: 'center' }}>
                Посты не найдены!
            </h1 >
        )
    }

    return (
        <div className="App">
            <h1>{title}</h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
            )}
        </div>
    )
}

export default PostList
