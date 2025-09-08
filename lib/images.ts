import fs from 'fs';
import path from 'path';
import { DRIVE_IMAGE_FOLDER_NAME, LOCAL_IMAGE_FOLDER_NAME } from '@/app_config';

import { downLoadLongFile, getFilesInFolder } from '@/services/drive/queries'

const createImageFolder = (): string => {
    const folderName = path.join(process.cwd(), `public/${LOCAL_IMAGE_FOLDER_NAME}`)

    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
    }
    return folderName;
}

const isImageExists = (name: string): boolean => {
    const folderName = createImageFolder()
    const imagePath = `${folderName}/${name}`;
    return fs.existsSync(imagePath);
}


export const getImageByName = async (name: string): Promise<string | null> => {
    if (!isImageExists(name)) {
        // get image from remote
        const imagePath = await getRemoteImageByName(name);
        if (!imagePath) {
            console.error(`Error fetching image from remote: ${name}`);
            return null;
        }
    }
    // return load image function as the dictionary
    return `/${LOCAL_IMAGE_FOLDER_NAME}/${name}`;
}

export const getLocalImageByName = (name: string): string | null => {

}

export const updateLocalImageByName = (name: string, data: ArrayBuffer): string | null => { }

// export const updateRemoteImageByName = async (name: string, data: ArrayBuffer): Promise<string | null> => { }


export const getRemoteImageByName = async (name: string): Promise<string | null> => {
    const mimeType = 'image/jpeg';
    const fetchResult = await getFilesInFolder(DRIVE_IMAGE_FOLDER_NAME, mimeType);;
    console.log('fetchResult', fetchResult)
    if (!fetchResult || !fetchResult.length) {
        console.error('Error fetching translation files:', fetchResult);
        return null;
    }
    const file = fetchResult.find(file => file.name === name);
    if (!file) {
        console.error(`No image file found for ${name}!`);
        return null;
    }

    const data = await downLoadLongFile(file.id as string);
    console.log('data', data);
    if (!data) {
        console.error(`Error downloading image file for ${name}!`);
        return null;
    }

    return saveImage(data, name);
}

/**
 * Saves an array buffer as an image file.
 * @param buffer - The ArrayBuffer containing the image data
 * @param fileName - The desired file name
 * @param mimeType - The MIME type of the image (to determine extension)
 * @returns The file path of the saved image
 */
export const saveImage = (buffer: ArrayBuffer, fileName: string): string | null => {
    const dirPath = createImageFolder();

    const filePath: string = path.join(dirPath, '/', fileName);

    try {
        // Convert ArrayBuffer to Buffer and write to file
        fs.writeFileSync(filePath, new Uint8Array(Buffer.from(buffer)));

        console.log(`✅ Image successfully saved at: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error(`❌ Error saving image file: ${(error as Error).message}`);
        return null;
    }
}

