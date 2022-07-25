import React, { useMemo, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm.jsx"
import PostFilter from "./components/PostFilter";
import './styles/App.css'
import MyModal from "./components/UI/myModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Javascript', body: 'Yescription' },
        { id: 2, title: 'Aavascript', body: 'Bescription' },
        { id: 3, title: 'Vavascript', body: 'Jescription' },
        { id: 4, title: 'Ravascript', body: 'Description' },
        { id: 5, title: 'Navascript', body: 'Eescription' }
    ])

    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSerchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [sortedPosts, filter.query])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(P => P.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter} />.

            < PostList remove={removePost} posts={sortedAndSerchedPosts} title='Список постов' />
        </div >
    );
}

export default App;
