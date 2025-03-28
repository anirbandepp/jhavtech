
const SuccessUI = ({ message = 'This is done successfully' }) => {
    return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
    )
}

export default SuccessUI