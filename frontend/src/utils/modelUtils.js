// Extracts relevant data from a 3D Environment model object
export default function extractMarkerData(model) {

  const markerData = {}

    // Count the wall markers
    markerData.floorMarkers = countMarkers("FloorMarker",model)

    // Count the floor markers
    markerData.walllMarkers = countMarkers("WallMarker",model)

    // Extract the path
    markerData.path = extractPath(model)

    return markerData
}

// Counts the number of wall or floor markers in a 3D model
function countMarkers(markerType, model) {
  let markerCount = 0

  console.log("Counting markers of type: " + markerType)

  displayModel.scene.children.forEach(child => {
    if (child.name.includes('FloorMarker'))
    {
        markerCount++
    }
  })
  return markerCount
}

// Reads the path object of a 3D model
function extractPath(model) {

  const path = {}
  return path
    
}