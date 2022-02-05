import { useEffect, useState } from "react";

function Alert(props) {
    const [color, setColor] = useState('blue');

    useEffect(() => {
        switch (props.variant) {
            case 'warn':
                setColor('orange');
                break;
            case 'error':
                setColor('red');
                break;
            default:
                setColor('blue');
                break;
        }
    }, [props.variant]);

    return (
        <div className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4`}>
            <div className="font-bold">{props.variant.toUpperCase()}:</div>
            <div>{props.text}</div>
        </div >
    )
}

export default Alert;