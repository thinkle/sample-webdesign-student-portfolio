/**
 * This file has simple code for creating basic web design portfolios.
 * 
 * There are two main functions:
 * 1. We allow fetching of skill descriptors from github where 
 * the teacher will update them.
 * 
 * 2. We allow code formatting for pretty code examples without lots
 * of busywork escaping code samples so they display in HTML.
 */

function loadDescriptors() {
  let nodes = document.querySelectorAll(".descriptor");
  nodes.forEach((node) => {
    let url = node.getAttribute("data-ref");
    console.log('Fetching descriptors for node',node,url)
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
  console.log(path);
  let response = await fetch(`${PORTFOLIO_BASE}/${path}`);
  if (response.status == 200) {
    let text = await response.text();
    node.innerHTML = text;
  } else {
    node.innerHTML = `
    <div class="warning">
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

/**
 * Any <code><script></script></code> combo will be taken as a
 * code example that we want to display using syntax highlighting.
 */
function displayCode() {
  let fakeScriptTags = document.querySelectorAll("code script");
  fakeScriptTags.forEach((node) => {
    let text = node.innerText;
    // Ignore leading or trailing backtick (for escaping)
    text = text.replace(/^\s*\`/,'')
    text = text.replace(/\`\s*$/,'')
    // Fix entities (&, <, >)
    text = text.replace(/[&]/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    node.outerHTML = text;
  });
  hljs.highlightAll();
}
