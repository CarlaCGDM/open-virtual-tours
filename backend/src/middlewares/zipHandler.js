import fs from 'fs/promises';  // Using fs/promises to avoid sync methods
import path from 'path';
import AdmZip from 'adm-zip';
import * as LODs from './generateLODs.cjs';

export async function inspectAndExtractZip(zipFilePath, unzipDir) {
    try {
        // Ensure the extraction directory exists
        await fs.mkdir(unzipDir, { recursive: true });
        console.log(`Extracting ZIP: ${zipFilePath} to ${unzipDir}`);

        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo(unzipDir, true); // Overwrite files if needed

        // List extracted files
        const extractedFiles = await fs.readdir(unzipDir);
        console.log('Extracted Files:', extractedFiles);

        // Proceed to inspect and handle the extracted files
    
        return handleExtractedFiles(extractedFiles, unzipDir);
        
    } catch (err) {
        console.error('Error during extraction or file reading:', err);
        return { success: false, message: 'Failed to extract or process ZIP' };
    }
}


function handleExtractedFiles(files, unzipDir) {
    const glbFiles = files.filter(file => file.endsWith('.glb'));

    if (glbFiles.length === 1) {
        console.log('✅ Only one .glb file found, generating LODs...');
        
        // 🔥 FIXED: Pass the full file path instead of just the filename
        const glbFilePath = path.join(unzipDir, glbFiles[0]);
        console.log("global file path is: " + glbFilePath)
        return generateLODs(glbFilePath, unzipDir);
    
    } else if (glbFiles.length === 4) {
        console.log('✅ Four .glb LOD files found, storing them separately...');
        return storeLODs(glbFiles, unzipDir);
    
    } else {
        console.log('❌ Invalid number of .glb files in the .zip. Expected 1 or 4.');
        return { success: false, message: 'Invalid number of .glb files' };
    }
}

async function generateLODs(glbFilePath, unzipDir) {
    try {
        console.log(`🔄 Generating LODs for: ${glbFilePath}...`);
        
        // 🔥 FIXED: Now passing the correct full path
        const lodResult = await LODs.generateLODs(glbFilePath, unzipDir);

        return { success: true, message: `✅ LODs generated for ${path.basename(glbFilePath)}` };
    
    } catch (error) {
        console.error('❌ Error generating LODs:', error);
        return { success: false, message: 'LOD generation failed' };
    }
}

function storeLODs(glbFiles, unzipDir) {
    try {
        glbFiles.forEach((file, index) => {
            const currentFilePath = path.join(unzipDir, file);
            const newFilePath = path.join(unzipDir, `LOD_${index}.glb`);

            fs.rename(currentFilePath, newFilePath)
                .then(() => console.log(`📦 Stored LOD file: ${newFilePath}`))
                .catch(error => console.error('❌ Error renaming LOD file:', error));
        });

        return { success: true, message: '✅ LODs stored successfully' };
    
    } catch (error) {
        console.error('❌ Error storing LODs:', error);
        return { success: false, message: 'Failed to store LODs' };
    }
}

export default inspectAndExtractZip;
