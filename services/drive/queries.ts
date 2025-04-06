import drive from './auth';



export const getFiles = async (params = {}) => {
    try {
        const res = await drive.files.list(params);
        const files = res.data.files;
        console.log('getFiles', files);

        return files;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching files:', error.message);
        } else {
            console.error('Error fetching files:', error);
        }
        return null;
    }
};

export const getFileById = (fileId: string, fields?: string) => {
    try {
        const file = drive.files.get({ fileId, fields });
        return file;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching file:', error.message);
        } else {
            console.error('Error fetching file:', error);
        }
        return null;
    }
};

export const downLoadFile = async (fileId: string) => {
    try {
        const res = await drive.files.get({ fileId, alt: 'media' });
        return res.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error downloading file:', error.message);
        } else {
            console.error('Error downloading file:', error);
        }
        return null;
    }
};

export const getFolders = () => {
    const query = 'mimeType="application/vnd.google-apps.folder"';
    const params = { q: query };
    return getFiles(params);
};

export const getFolderByName = async (folderName: string) => {
    const query = `mimeType="application/vnd.google-apps.folder" and name="${folderName}"`;
    const params = { q: query };
    return getFiles(params);
};

export const getJsonFiles = async () => {
    const query = 'mimeType="application/json"';
    const params = { q: query };
    return getFiles(params);
};

export const getJsonFileByName = async (fileName: string) => {
    const query = `mimeType="application/json" and name="${fileName}"`;
    const params = { q: query };
    return getFiles(params);
};

export const getFilesInFolder = async (folderName: string, mimeType: string = '') => {
    const folder = await getFolderByName(folderName);
    if (!folder || !folder.length) {
        return null;
    }
    const folderId = folder[0].id;
    const query =
        `'${folderId}' in parents` +
        (mimeType ? ` and mimeType="${mimeType}"` : '');
    const params = { q: query };
    return getFiles(params);
};

