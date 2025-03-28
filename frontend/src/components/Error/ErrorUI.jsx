
const ErrorUI = ({ message = 'Something went wrong' }) => {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
    )
}

export default ErrorUI;