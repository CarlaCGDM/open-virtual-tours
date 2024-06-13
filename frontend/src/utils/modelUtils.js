// Extracts relevant data from a 3D Environment model object
export default function extractMarkerData(model) {

  const markerData = {floorMarkers:0,wallMarkers:0,path:{}}

    // Count the wall markers
    markerData.floorMarkers = countMarkers("FloorMarker",model)

    // Count the floor markers
    markerData.wallMarkers = countMarkers("WallMarker",model)

    // Extract the path
    markerData.path = extractPath(model)

    return markerData
}

// Counts the number of wall or floor markers in a 3D model
function countMarkers(markerType, model) {
  let markerCount = 0

  console.log("Counting markers of type: " + markerType)

  model.scene.children.forEach(child => {
    if (child.name.includes(markerType))
    {
        markerCount++
    }
  })

  console.log(`Found ${markerCount} ${markerType}s`)

  return markerCount
}

// Reads the path object of a 3D model
function extractPath(model) {

  const path = {}

  model.scene.traverse( function( object ) {

    console.log("Looking for path object.")
    if ( object.name === "Path" && object.isMesh ) {
 
      console.log("Found path object.")
      let vertices = object.geometry.attributes.position.array
      for (let i = 0; i < vertices.length; i=i+3) {
        //a vertex' position is (vertices[i],vertices[i+1],vertices[i+2])
        path[i/3] = {
          x:vertices[i],
          y:vertices[i+1],
          z:vertices[i+2]
        }
      }
    }
 
 } );

  return path
}