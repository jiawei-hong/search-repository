import { useMemo } from "react";

function Alert({ variant, text }) {
    const getColor = useMemo(() => {
        let color = 'blue';

        if (variant === "warn") {
            color = "orange";
        } else if (variant === "error") {
            color = "red";
        }

        return `bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4`;
    }, [variant]);

    return (
        <div className={getColor}>
            <div className="font-bold">{variant.toUpperCase()}:</div>
            <div>{text}</div>
        </div>
    )
}

export default Alert;