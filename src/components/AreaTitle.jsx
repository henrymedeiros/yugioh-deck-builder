import React from "react";

function AreaTitle({ id, title, areaCardCount, children }) {
    return (
        <div
            id={id}
            className="area-title flex items-center justify-between px-2.5"
        >
            <div>
                {title}{" "}
                {areaCardCount != null && <span>[{areaCardCount}]</span>}
            </div>
            <div>{children}</div>
        </div>
    );
}

AreaTitle.defaultProps = {
    areaCardCount: null,
};

export default AreaTitle;
