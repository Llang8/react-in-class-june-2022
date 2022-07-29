import { Link } from 'react-router-dom'

export default function Post(props) {

    function buildHeader() {
        let resHeader;

        if (!props.hideLink) {
            resHeader = (
                <Link to={`/blog/${props.post.uid}/${props.post.id}`}>
                    { props.post.title }
                </Link>
            )
        } else {
            resHeader = (
                <>{ props.post.title }</>
            )
        }

        return resHeader
    }

    return (
        <div className="card card-item mb-2">
            <div className="card-body">
                <h2>
                    { buildHeader() }
                </h2>
                <p>{ props.post.body }</p>
                <p>Date Posted: { props.post.dateCreated.toDate().toLocaleDateString() }</p>
                {/* {
                    (props.showComments) ?
                    props.post.comments.map((comment) => (
                        <>
                            {comment.text}
                            {comment.userId}
                        </>
                    ))
                    :
                    <></>
                } */}
            </div>
        </div>
    )
}