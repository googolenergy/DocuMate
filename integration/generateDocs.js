const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "documateDB";
const HTML_PATH = path.join(__dirname, "docs.html");

async function generateDocs() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  const [functions, parameters, examples, developers, tags, function_tags, libraries] = await Promise.all([
    db.collection("functions").find().toArray(),
    db.collection("parameters").find().toArray(),
    db.collection("examples").find().toArray(),
    db.collection("developers").find().toArray(),
    db.collection("tags").find().toArray(),
    db.collection("function_tags").find().toArray(),
    db.collection("libraries").find().toArray()
  ]);

  const paramMap = {};
  parameters.forEach(p => {
    if (!paramMap[p.function_id]) paramMap[p.function_id] = [];
    paramMap[p.function_id].push(p);
  });

  const exampleMap = {};
  examples.forEach(e => {
    if (!exampleMap[e.function_id]) exampleMap[e.function_id] = [];
    exampleMap[e.function_id].push(e);
  });

  const developerMap = developers.reduce((acc, dev) => {
    acc[dev.id] = dev.name;
    return acc;
  }, {});

  const tagMap = tags.reduce((acc, tag) => {
    acc[tag.id] = tag.name;
    return acc;
  }, {});

  const functionTagsMap = {};
  function_tags.forEach(ft => {
    if (!functionTagsMap[ft.function_id]) functionTagsMap[ft.function_id] = [];
    functionTagsMap[ft.function_id].push(tagMap[ft.tag_id]);
  });

  const libMap = libraries.reduce((acc, lib) => {
    acc[lib.id] = lib.name;
    return acc;
  }, {});

  const groupedFunctions = {};
  functions.forEach(func => {
    if (!groupedFunctions[func.library_id]) groupedFunctions[func.library_id] = [];
    groupedFunctions[func.library_id].push(func);
  });

  let sidebarHTML = `<div id="sidebar"><h2>Libraries</h2><ul>`;
  libraries.forEach(lib => {
    sidebarHTML += `<li><strong>${lib.name}</strong><ul>`;
    (groupedFunctions[lib.id] || []).forEach(fn => {
      sidebarHTML += `<li><a href="#${fn.name}" class="func-link">${fn.name}</a></li>`;
    });
    sidebarHTML += `</ul></li>`;
  });
  sidebarHTML += `</ul></div>`;

  let mainContentHTML = `<div id="main-docs">`;
  functions.forEach(fn => {
    const params = paramMap[fn.id] || [];
    const exs = exampleMap[fn.id] || [];
    const tags = functionTagsMap[fn.id] || [];
    const devName = developerMap[fn.created_by] || "Unknown";

    mainContentHTML += `<div id="${fn.name}" class="doc-card">
      <h2>${fn.name}</h2>
      <p><strong>Library:</strong> ${libMap[fn.library_id]}</p>
      <p><strong>Description:</strong> ${fn.description}</p>
      <p><strong>Return Type:</strong> <span class="codeSnipp">${fn.return_type}</span></p>
      <p><strong>Created By:</strong> ${devName}</p>
      <p><strong>Created At:</strong> ${fn.created_at}</p>
      <p><strong>Tags:</strong> ${tags.map(t => `<span class="codeSnipp">${t}</span>`).join(', ')}</p>

      <h3>Parameters</h3><ul>`;
    params.forEach(p => {
      mainContentHTML += `<li><span class="codeSnipp">${p.name}</span> : <span class="codeSnipp">${p.type}</span> - ${p.description}</li>`;
    });
    mainContentHTML += `</ul><h3>Examples</h3>`;
    exs.forEach(ex => {
      mainContentHTML += `<pre class="codeSnipp">${ex.code}</pre>`;
    });

    mainContentHTML += `</div><hr />`;
  });
  mainContentHTML += `</div>`;

  const finalHTML = `<div id="doc-layout">${sidebarHTML}${mainContentHTML}</div>`;

  const rawHtml = fs.readFileSync(HTML_PATH, "utf8");
  const $ = cheerio.load(rawHtml);
  $('#content').html(finalHTML);
  fs.writeFileSync(HTML_PATH, $.html());

  console.log("Documentation generated successfully.");
  await client.close();
}

generateDocs().catch(err => {
  console.error("Error:", err);
});
