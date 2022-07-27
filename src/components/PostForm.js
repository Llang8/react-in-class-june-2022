
export default function PostForm() {

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        console.log(data.title, data.body)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="" />
            </div>
            <div className="form-group">
                <label htmlFor="body">Body</label>
                <input type="text" name="body" id="" />
            </div>
            <button type="submit">Add Post</button>
        </form>
    )
}