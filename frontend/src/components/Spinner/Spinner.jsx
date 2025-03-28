const Spinner = () => {

    const style = {
        position: "absolute",
        right: "-40px",
        top: "50%",
    };

    return (
        <div className="spinner-border ms-1" role="status" style={style}>
            <span className="sr-only"></span>
        </div>
    )
}

export default Spinner;