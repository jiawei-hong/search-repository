import React from "react";
import Topic from "../Topic";

function TopicList({ topics }) {
  return (
    <React.Fragment>
      {
        topics && (
          <div className="mt-2 flex flex-wrap">
            {
              topics.map((topic, i) => (
                <Topic text={topic} key={i} />
              ))
            }
          </div>
        )
      }
    </React.Fragment>
  )
}

export default TopicList;