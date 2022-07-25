import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({ filter, setFilter }) => {
    return (
        <div>
            <MyInput value={filter.query} type='text' onChange={e => setFilter({ ...filter, query: e.target.value })} />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                option={[
                    { value: 'title', name: 'По названию' },
                    { value: 'title', name: 'По описанию' }
                ]}
                defaultValue="Сортировка по"
            />
        </div>
    )
}

export default PostFilter
