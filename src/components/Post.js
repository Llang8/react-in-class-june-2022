import { Link } from 'react-router-dom'

export default function Post(props) {

    function buildHeader() {
        let resHeader;

        console.log(props.post)

        if (!props.hideLink) {
            resHeader = (
                <Link to={"/blog/" + props.post.id}>
                    {props.post.id}: { props.post.body }
                </Link>
            )
        } else {
            resHeader = (
                <>{props.post.id}: { props.post.body }</>
            )
        }

        return resHeader
    }

    return (
        <div className="card card-item">
            <h2>
                { buildHeader() }
            </h2>
            <p>{ props.post.date_created }</p>
        </div>
    )
}