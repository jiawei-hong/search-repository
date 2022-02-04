function Alert(props) {
    return (
        <div className={`bg-${props.color}-100 border-l-4 border-${props.color}-500 text-${props.color}-700 p-4`}>
            <div className="font-bold">Info:</div>
            <div>{props.text}</div>
        </div >
    )
}

export default Alert;