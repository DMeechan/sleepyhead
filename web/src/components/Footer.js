import React from "react";

const style = {
  display: "flex",
  "box-sizing": "border-box",
  "max-width": "100%",
  "-webkit-box-align": "center",
  "align-items": "center",
  "min-width": "0px",
  "min-height": "0px",
  "flex-direction": "column",
  "-webkit-box-pack": "end",
  // justify-content: "flex-end",
  outline: "none",
  margin: "12px",
  padding: "0px"
};

export default () => {
  return (
    <div className="ui container">
      <footer style={style}>
        <span>
          Made with ❤ by the Sleepyhead hackathon team&nbsp;&nbsp;·&nbsp;&nbsp;
          <a
            target="_blank"
            href="https://github.com/DMeechan/Sleepyhead"
            style={{
              color: "#f2711c"
            }}
          >
            <b>GitHub</b>
          </a>
        </span>
      </footer>
    </div>
  );
};
