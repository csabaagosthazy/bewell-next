import { google } from 'googleapis';

/* Example usage
const fileId = 'your-file-id-here';
const newContent = { key: 'value' }; // Replace with your JSON content
const accessToken = 'next-auth-access-token'; // Replace with your NextAuth access token

updateJsonFileOnDriveWithNextAuth(fileId, newContent, accessToken); */


async function updateJsonFileOnDriveWithNextAuth(
    fileId: string,
    newContent: object,
    accessToken: string
) {
    // Initialize Google Drive API with the NextAuth access token
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: 'v3', auth });

    // Update the file content
    const media = {
        mimeType: 'application/json',
        body: JSON.stringify(newContent),
    };

    try {
        const response = await drive.files.update({
            fileId: fileId,
            media: media,
        });
        console.log('File updated successfully:', response.data);
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message
        else message = String(error)
        console.error('Error updating file:', message);
    }
}


/* Example usage
  const fileId = 'your-file-id-here';
  const accessToken = 'next-auth-access-token'; // Replace with your NextAuth access token
  const keyPath = ['level1', 'level2', 'key']; // Path to the key in nested JSON
  const newValue = 'new value'; // Replace with the new value
  
  updateJsonKeyValuePair(fileId, accessToken, keyPath, newValue); */

async function updateJsonKeyValuePair(
    fileId: string,
    accessToken: string,
    keyPath: string[],
    newValue: any
) {
    // Initialize Google Drive API with the NextAuth access token
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: 'v3', auth });

    try {
        // Step 1: Retrieve the current content of the file
        const response = await drive.files.get({
            fileId: fileId,
            alt: 'media',
        });

        const jsonContent = JSON.parse(response.data as string);

        // Step 2: Update the specific key-value pair
        let currentLevel = jsonContent;
        for (let i = 0; i < keyPath.length - 1; i++) {
            const key = keyPath[i];
            if (!currentLevel[key]) {
                throw new Error(`Key "${key}" does not exist in the JSON`);
            }
            currentLevel = currentLevel[key];
        }
        currentLevel[keyPath[keyPath.length - 1]] = newValue;

        // Step 3: Upload the updated JSON content back to Google Drive
        const media = {
            mimeType: 'application/json',
            body: JSON.stringify(jsonContent),
        };

        const updateResponse = await drive.files.update({
            fileId: fileId,
            media: media,
        });

        console.log('File updated successfully:', updateResponse.data);
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message
        else message = String(error)
        console.error('Error updating file:', message);
    }
}

