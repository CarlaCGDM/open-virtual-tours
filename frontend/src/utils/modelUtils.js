
import { PlacedModelAPI } from '../apis/PlacedModelAPI.js'

// Placeholder model and panel Ids


// Extracts relevant data from a 3D Environment model object
export default function extractMarkerData(model) {

  const markerData = { floorMarkers: [], wallMarkers: 0, path: {} }

  // Count the wall markers
  markerData.floorMarkers = countFloorMarkers(model)
  console.log(markerData)

  // Count the floor markers
  //markerData.wallMarkers = countMarkers("WallMarker", model)

  // Extract the path
  //markerData.path = extractPath(model)

  return markerData
}

// Counts the number of wall or floor markers in a 3D model
function countFloorMarkers(model) {
  let markerList = []

  console.log("Counting markers of type: Floormarker")

  model.scene.children.forEach(child => {
    if (child.name.includes("FloorMarker")) {

      console.log("found a floormarker")

      const newPlacedModel = {
        baseModel: "",
        position: [child.position.x,child.position.y,child.position.z],
        rotation: [child.rotation.x,child.rotation.y,child.rotation.z]
      }

      // API call here to make new placedModel
      PlacedModelAPI.createOne(newPlacedModel)
        .then((data) => {
          markerList.push(data._id) // Add id of new placedModel to the list
        })
    }
  })

  console.log(`Found ${markerList.length} Floormarkers`)
  console.log(markerList)

  return markerList
}

// // Reads the path object of a 3D model
// function extractPath(model) {

//   const path = {}

//   model.scene.traverse(function (object) {

//     console.log("Looking for path object.")
//     if (object.name === "Path" && object.isMesh) {

//       console.log("Found path object.")
//       let vertices = object.geometry.attributes.position.array
//       for (let i = 0; i < vertices.length; i = i + 3) {
//         //a vertex' position is (vertices[i],vertices[i+1],vertices[i+2])
//         path[i / 3] = {
//           x: vertices[i],
//           y: vertices[i + 1],
//           z: vertices[i + 2]
//         }
//       }
//     }

//   });

//   return path
// }