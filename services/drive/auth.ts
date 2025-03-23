import { google } from 'googleapis';

// authenticates the service account to be used in this context
const auth = new google.auth.GoogleAuth({
  // your credentials to authenticate
  keyFile: process.cwd() + '/creds.json',
  // the actions you are permissed to perform using this API, in this case
  // all CRUD operations are permissed, check out
  // [ https://developers.google.com/drive/api/guides/api-specific-auth ]
  // for more advice on scopes
  scopes: ['https://www.googleapis.com/auth/drive'],
});
// allows you to use drive API methods e.g. listing files, creating files.
const drive = google.drive({ version: 'v3', auth });

export default drive;
