import { useMemo } from "react";
import "./index.css";

function Alert({ variant = "INFO", text }) {
    const getMessageClassName = useMemo(() => {

        switch (variant) {
            case "warn":
                return "alert-warn";
            case "error":
                return "alert-error";
            default:
                return "alert-info";
        }
    }, [variant]);

    return (
        <div className={`alert ${getMessageClassName}`}>
            <div className="font-bold">{variant.toUpperCase()}:</div>
            <div>{text}</div>
        </div>
    )
}

export default Alert;