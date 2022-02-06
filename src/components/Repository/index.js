import React from "react"

function Repository({ children, isInList = false }) {
    return (
        <div className={`py-5 ${isInList ? 'first:border-t border-b border-gray-200' : ''}`}>
            {children}
        </div>
    )
}

Repository.Name = ({ children }) => {
    return (
        <h3 className="mb-1 text-2xl">
            {children}
        </h3>
    )
}

Repository.Description = ({ children }) => {
    return (
        <div className="py-3 text-gray-500">
            {children}
        </div>
    )
}

Repository.Information = ({ children, layoutIsVertical = false }) => {
    return (
        <div className={layoutIsVertical ? "text-sm" : "flex items-center text-sm"}>
            {children}
        </div>
    )
}


export default Repository;