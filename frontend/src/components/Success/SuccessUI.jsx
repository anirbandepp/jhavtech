const SuccessUI = ({ message = 'This is done successfully' }) => {
    return (
        <div className="alert alert-success" role="alert">
            <strong>Success!</strong> {message}
        </div>
    )
}

export default SuccessUI;