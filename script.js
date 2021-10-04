console.log("Script loaded");
function loadDescriptors() {
  console.log("load descriptors");
  let nodes = document.querySelectorAll(".descriptor");
  nodes.forEach((node) => {
    let url = node.getAttribute("data-ref");
    if (!url) {
      console.log("WARNING: No data-ref for element", node);
    } else {
      fetchDataForNode(node, url);
    }
  });
}

const PORTFOLIO_BASE = "https://thinkle-iacs.github.io/web-design-portfolio/";
const PORTFOLIO_SOURCE =
  "https://github.com/thinkle-iacs/web-design-portfolio/tree/master";
/**
 * Fetch data from web-design-portfolio github for node with URL stub.
 * This allows us to update descriptors dynamically for student portfolios.
 *
 * Path is a path on our web-design-portfolio file tree in github.
 * Node is an HTML node whose content will be replaced with the content
 * from github.
 * **/
async function fetchDataForNode(node, path) {
  console.log(url);
  let response = await fetch(`${PORTFOLIO_BASE}/${path}`);
  if (response.status == 200) {
    let text = await response.text();
    node.innerHTML = text;
  } else {
    node.innerHTML = `
    <div style="padding: 5px;
              background-color:red;
              color:white;
              
    ">
      Oops, <a href="${PORTFOLIO_SOURCE}/${path}">${path}</a> does not exist. Check list of skills at the
    <a href="${PORTFOLIO_BASE}">portfolio tree</a> or browser the 
      <a href="${PORTFOLIO_SOURCE}">source</a> 
      to see what you meant to provide instead
    </div>`;
    console.log(
      `You provided a data reference ${path} which does not exist. Check ${SOURCE_URL} source code to see what you meant to provide instead.`
    );
  }
}

function displayCode() {
  console.log("display code?");
  let fakeScriptTags = document.querySelectorAll("code script");
  fakeScriptTags.forEach((node) => {
    let text = node.innerText;
    text = text.replace(/[&]/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    node.outerHTML = text;
  });
  hljs.highlightAll();
}
