// Extracts relevant data from a 3D Environment model object
export default function extractMarkerData(model) {

  const markerData = {floorMarkers:{},wallMarkers:{},path:{}}

    // Count the wall markers
    markerData.floorMarkers = fillMarkerData(countMarkers("FloorMarker",model))

    // Count the floor markers
    markerData.wallMarkers = fillMarkerData(countMarkers("WallMarker",model))

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
  return path
    
}

function fillMarkerData(count) {
  const placeholders = {}
  const placeholder = "665de2f449867a205bee52e6"

  for (let index = 0; index < count; index++) {
    placeholders[index] = placeholder
  }

  return placeholders
}