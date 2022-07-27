import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import { DataContext } from '../contexts/DataProvider'


export default function BlogSingle() {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const { getSinglePost } = useContext(DataContext)

    useEffect(() => {
        const queryPost = async() => {
            setPost(await getSinglePost(id))
        }
        queryPost()
    }, [id])

    return (
        <Post post={post} hideLink={true} />
    )
}