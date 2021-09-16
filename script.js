console.log("Script loaded");
function loadDescriptors() {
  console.log("Loaded");
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

async function fetchDataForNode(node, url) {
  console.log(url);
  let response = await fetch(
    `https://thinkle-iacs.github.io/web-design-portfolio/${url}`
  );
  if (response.status == 200) {
    let text = await response.text();
    node.innerHTML = text;
  } else {
    SOURCE_URL =
      "https://github.com/thinkle-iacs/web-design-portfolio/tree/master";
    node.innerHTML = `
    <p style="padding: 5px;
              background-color:red;
              color:white;
              
    ">
      Oops, <a href="${SOURCE_URL}/${url}">${url}</a> does not exist. Check list of skills at the
      <a href="${SOURCE_URL}">portfolio source tree</a> 
      to see what you meant to provide instead
    </p>`;
    console.log(
      `You provided a data reference ${url} which does not exist. Check ${SOURCE_URL} source code to see what you meant to provide instead.`
    );
  }
}
