# Computational Geometry Engineer Technical Challenge

Solution to the Computational Geometry Engineer Challenge

## Table of Contents

- [General Info](#general-info)
- [Demo](#demo)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Installation](#installation)
- [Reference](#reference)
- [License](#license)

## General info

Given a set of vertices connected by edges, provided in a JSON data structure, write an algorithm that finds all of the interior faces (polygons) of such a data structure. The output schema should be a simple JSON format.

## Demo

[HA Engineering Challenge](https://ha-geometry-technical-challenge.netlify.app/)

## File Structure

```
project
│   README.md
|   index.html (Web Page)
│
└───scripts
│   │   frontEnd.js (Front End)
│   │   index.js (Algorithm #1 Solution)
│   │   tests.js (Algorithm #1 Tests)
│
└───images
└───styles
```

## Usage

```javascript

import ha-geometry-technical-challenge as gtc

//input
const inputJSON = {
  "vertices": [[0,0], [2,0], [2,2], [0,2]],
  "edges": [[0,1], [1,2], [0,2], [0,3], [2,3]]}

//output
const outputJSON = {
  {"name":"Face 1","vertices":[[2,0],[0,0],[2,2]],"edges":[[1,0],[0,2],[2,1]]},
  {"name":"Face 2","vertices":[[2,2],[0,0],[0,2]],"edges":[[2,0],[0,3],[3,2]]}
}

//returns output
gtc.textData(input)


```

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install file.

```
npm install ha-geometry-technical-challenge
```

## Reference

[DCEL Structure](https://en.wikipedia.org/wiki/Doubly_connected_edge_list#:~:text=The%20doubly%20connected%20edge%20list,plane%2C%20and%20polytopes%20in%203D.)

[Convex Hull Problem - Sample in Java](https://bitbucket.org/StableSort/play/src/master/src/com/stablesort/convexhull/ConvexHullGrahamScan.java)

## License

[MIT](https://choosealicense.com/licenses/mit/)
