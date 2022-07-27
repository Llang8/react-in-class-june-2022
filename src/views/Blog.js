import {useContext} from 'react'
import PostList from '../components/PostList'
import { DataContext } from '../contexts/DataProvider'

export default function Blog() {
    return (
        <>
            <h1>Blog</h1>
            <PostList />
        </>
    )
}