import React from 'react'
import { Html } from '@react-three/drei'
import { useThree } from "@react-three/fiber";
import './Annotation.css'

const Annotation = ({ children, ...props }) => {
    const { gl } = useThree();
    return (
        <Html
        {...props}
        as='div' // Wrapping element (default: 'div')
        wrapperClass='annotation-wrapper' // The className of the wrapping element (default: undefined)
        transform portal={{ current: gl.domElement.parentNode }}
        prepend={false} // Project content behind the canvas (default: false)
        center={true} // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
        fullscreen={false} // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
        distanceFactor={1} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
        zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
        sprite // Renders as sprite, but only in transform mode (default=false)
        occlude={false}// Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
        >
        {children}
        </Html>
    )
  }

export default Annotation