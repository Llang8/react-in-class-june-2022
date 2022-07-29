import { createContext, useState, useEffect, useContext } from "react"
import { getFirestore, getDoc, getDocs, collection, doc, addDoc, Timestamp, orderBy, query, collectionGroup } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    const db = getFirestore()

    useEffect(() => {
        const getPosts = async() => {
            const collectionRef = collectionGroup(db, "posts")
            /* const collectionSnap = await getDocs(collectionRef) */
            const q = query(collectionRef, orderBy('dateCreated', 'desc'))
            const collectionSnap = await getDocs(q)

            let postsArr = []

            collectionSnap.forEach((docSnap) => {
                postsArr.push({
                    ...docSnap.data(),
                    id: docSnap.id,
                    // Get reference to document, get reference to posts subcollection, then get reference to the user document
                    // Then get the user document's ID
                    uid: docSnap.ref.parent.parent.id 
                })
            })

            console.log(postsArr)

            setPosts(postsArr)
        }
        getPosts()
    }, [])

    const getSinglePost = async (uid, id) => {
        const docRef = doc(db, "users", uid, "posts", id)
        const docSnap = await getDoc(docRef)

        /* const collectionRef = collection(db, "users", uid, "posts", id, "comments")
        const collectionSnap = await getDocs(collectionRef)

        let comments = []

        collectionSnap.forEach((docSnap) => {
            comments.push(docSnap.data())
        }) */


        return {
            ...docSnap.data(),
            id: docSnap.id,
            uid: uid
            /* comments: comments */
        }
    }

    const addPost = async(title, body) => {
        if (!user.loggedIn) {
            throw new Error("You can't add a post if you're not logged in.")
        }

        const newPost = {
            title: title,
            body: body,
            uid: user.id,
            dateCreated: Timestamp.now()
        }

        const docRef = await addDoc(collection(db, "users", user.id, "posts"), newPost)

        newPost.id = docRef.id

        setPosts([newPost, ...posts])

        console.log(docRef)
        console.log("New post added", docRef.id)
    }

    const values = {
        posts,
        getSinglePost,
        addPost
    }

    return (
        <DataContext.Provider value={values}>
            { props.children }
        </DataContext.Provider>
    )
}