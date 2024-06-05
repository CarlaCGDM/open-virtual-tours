import React from 'react'
import { Html } from '@react-three/drei'

const Annotation = ({ children, ...props }) => {
    return (
        <Html
        {...props}
        as='div' // Wrapping element (default: 'div')
        prepend // Project content behind the canvas (default: false)
        center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
        fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
        distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
        zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
        transform // If true, applies matrix3d transformations (default=false)
        sprite // Renders as sprite, but only in transform mode (default=false)
        occlude={true} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
        onOcclude={(hidden) => null} // Callback when the visibility changes (default: undefined)
        >
        {children}
        </Html>
    )
  }

export default Annotation