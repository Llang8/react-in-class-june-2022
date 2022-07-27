import { createContext, useState, useEffect } from "react"

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // fetch('http://127.0.0.1:5000/api/posts')
        fetch('https://fakebook-june-2022.herokuapp.com/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
    }, [])

    const getSinglePost = async (id) => {
        const res = await fetch(`https://fakebook-june-2022.herokuapp.com/api/post/${id}`)
        const data = await res.json()
        return data
    }

    const values = {
        posts,
        getSinglePost
    }

    return (
        <DataContext.Provider value={values}>
            { props.children }
        </DataContext.Provider>
    )
}