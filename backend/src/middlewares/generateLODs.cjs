const fs = require('fs');
const fspromises = require('fs/promises');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const sharp = require('sharp');
const { processGltf, glbToGltf, gltfToGlb } = require('gltf-pipeline');

const execAsync = promisify(exec);

/**
 * Generates LOD versions of a given .glb file
 * @param {string} glbPath - Path to the original .glb file
 * @param {string} outputDir - Directory where LODs should be stored
 */
async function generateLODs(glbPath, outputDir) {
    try {
        console.log(`Processing LODs for: ${glbPath}`);

        // ✅ FIX: Replaced fs.existsSync() with fs.access()
        try {
            await fspromises.access(glbPath); // Checks if the file exists
        } catch {
            console.error(`❌ File not found: ${glbPath}`);
            throw new Error(`File not found: ${glbPath}`);
        }

        try {
            console.log(`Creating directory: ${outputDir}`);
            await fspromises.mkdir(outputDir, { recursive: true });
        } catch (error) {
            console.error(`Error creating directory: ${error.message}`);
        }
        

        const lodLevels = [
            { name: 'LOD_01', textureSize: 1024, simplification: 0 },
            { name: 'LOD_02', textureSize: 512, simplification: 0.75 },
            { name: 'LOD_03', textureSize: 64, simplification: 0.95 }
        ];

        for (const lod of lodLevels) {
            const lodPath = path.join(outputDir, `${lod.name}.glb`);
            console.log(`🔄 Processing ${lod.name}...`);

            // Read original .glb file as a stream
            const glbStream = fs.createReadStream(glbPath);
            
            // Buffer the stream to get the GLB content
            const glbBuffer = await streamToBuffer(glbStream);

            // Convert GLB to GLTF for processing
            const { gltf } = await glbToGltf(glbBuffer);

            // Process the GLTF with simplification and Draco options
            const options = {
                dracoOptions: lod.simplification > 0 ? { compressionLevel: 10 } : undefined,
                simplifyOptions: lod.simplification > 0 ? { ratio: 1 - lod.simplification } : undefined
            };

            const processedResult = await processGltf(gltf, options);
            let processedGltf = processedResult.gltf;

            // Handle texture resizing (for LOD_02 and LOD_03)
            if (lod.textureSize) {
                processedGltf = await resizeTextures(processedGltf, lod.textureSize, lod.name === "LOD_03");
            }

            // Convert the processed GLTF back to GLB
            const { glb: finalGlbBuffer } = await gltfToGlb(processedGltf);

            // Save the final GLB file
            await fspromises.writeFile(lodPath, finalGlbBuffer);
            console.log(`✅ ${lod.name} saved at ${lodPath}`);
        }

        console.log('🎉 All LODs generated successfully!');
        return { success: true, message: 'LODs generated!' };
    } catch (error) {
        console.error('❌ Error generating LODs:', error);
        return { success: false, message: 'LOD generation failed' };
    }
}

/**
 * Converts a ReadStream to a Buffer
 * @param {fs.ReadStream} stream - The stream to convert
 * @returns {Promise<Buffer>} - A promise that resolves with the buffer
 */
function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

/**
 * Resizes textures inside a gltf object
 * @param {Object} gltf - The gltf object
 * @param {number} size - Texture resolution
 * @param {boolean} discardMaps - Whether to discard normal/roughness maps
 */
async function resizeTextures(gltf, size, discardMaps) {
    console.log(`🎨 Resizing textures to ${size}px, discardMaps: ${discardMaps}`);
    // You would need to implement this part to extract textures and resize them using sharp
    // This might involve using the gltf.materials and gltf.textures properties
    return gltf;
}

module.exports = { generateLODs };


