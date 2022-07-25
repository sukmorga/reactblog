import React, { useState } from 'react'
import MyButton from "./UI/button/MyButton.jsx"
import MyInput from "./UI/input/MyInput.jsx"

const PostForm = ({ create }) => {

    const [post, setPost] = useState({ title: '', body: '' })

    const addNewPost = (e) => {
        e.preventDefault()

        const newPost = {
            ...post, id: Date.now()
        }

        create(newPost)

        setPost({ title: '', body: '' })
    }

    return (
        <form>
            {/* управляемый компонент */}
            <MyInput value={post.title} type='text' placeholder="Название поста" onChange={e => setPost({ ...post, title: e.target.value })} />
            <MyInput value={post.body} type='text' placeholder="Описание поста" onChange={e => setPost({ ...post, body: e.target.value })} />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    )
}

export default PostForm
