const dirTree = require("directory-tree");

let items = []
const tree = dirTree('./assets', { extensions: /\.(jpg|gif|png)$/  }, (item, PATH, stats) => {
  item.shortName = item.name.replace(/\.[^/.]+$/, "")
  items.push(item)
});

// Generate a asset list
console.log(JSON.stringify(items))