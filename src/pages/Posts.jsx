import React, { useEffect, useRef, useState } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm.jsx"
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/myModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import PostService from "../components/API/PostService";
import Loader from "../components/UI/loader/Loader";
import { getPageCount } from "../utils/pages"
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const sortedAndSerchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const lastElevent = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    });

    useObserver(lastElevent, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts();
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(P => P.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page)
    }



    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter} />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={'Количество элементов на странице'}
                option={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показать все' },
                ]}
            />
            {postError &&
                <h1>Произошла ошибка! {postError.message}</h1>
            }
            < PostList remove={removePost} posts={sortedAndSerchedPosts} title='Список постов' />
            <div ref={lastElevent}></div>
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages} />

        </div >
    );
}

export default Posts;
