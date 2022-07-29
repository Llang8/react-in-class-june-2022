import { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function PostForm() {
    const { addPost } = useContext(DataContext)

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        addPost(data.title, data.body)
        event.target.reset()
    }

    return (
        <form onSubmit={handleSubmit} className="my-3">
            {/* <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="" />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <input type="text" name="body" id="" />
                </div>
                <button type="submit">Add Post</button>
            </form> */}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" name="title" />
            </div>
            <div className="form-group">
                <label htmlFor="body">Body</label>
                <input type="text" className="form-control" name="body" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}