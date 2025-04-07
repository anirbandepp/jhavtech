const ErrorUI = ({ message = 'Something went wrong' }) => {
    return (
        <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> {message}
        </div>
    )
}

export default ErrorUI;