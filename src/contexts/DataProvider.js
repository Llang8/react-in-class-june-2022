import { createContext, useState, useEffect } from "react"
import { getFirestore, getDoc, getDocs, collection, doc } from '@firebase/firestore'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [posts, setPosts] = useState([])
    const db = getFirestore()

    useEffect(() => {
        const getPosts = async() => {
            /* const docRef = doc(db, "posts", "5Gd1m39DEukV7nJkTy6a")
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log("It exists, here's the data", docSnap.data())
            } else {
                console.log("The document did not exist")
            }

            console.log(docSnap) */
            const collectionRef = collection(db, "posts")
            const collectionSnap = await getDocs(collectionRef)

            let postsArr = []

            collectionSnap.forEach((docSnap) => {
                postsArr.push({
                    ...docSnap.data(),
                    id: docSnap.id
                })
            })

            console.log(postsArr)

            setPosts(postsArr)
        }
        getPosts()
    }, [])

    const getSinglePost = async (id) => {
        const docRef = doc(db, "posts", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                ...docSnap.data(),
                id: docSnap.id
            }
        } else {
            console.log("The document did not exist")
        }
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