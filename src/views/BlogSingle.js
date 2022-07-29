import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import { DataContext } from '../contexts/DataProvider'


export default function BlogSingle() {
    const { uid, id } = useParams()
    const [post, setPost] = useState({})
    const [postState, setPostState] = useState("LOADING")
    const { getSinglePost } = useContext(DataContext)

    useEffect(() => {
        const queryPost = async() => {
            setPost(await getSinglePost(uid, id))
            setPostState("LOADED")
        }
        queryPost()
    }, [id])

    return (
        <>
            {
                (postState === "LOADED") ?
                <Post post={post} hideLink={true} showComments={true} /> :
                <p>Loading</p>
            }
        </>
    )
}