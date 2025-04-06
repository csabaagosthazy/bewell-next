import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/_options"
import { i18n } from '@/i18n.config';
import { getTranslationFileIds } from '@/lib/translations';
import { isObjectEmpty } from '@/utils/common';


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (session) {
        try {
            const { translations, nameSpace, key, newValues } = await req.json();

            if (isObjectEmpty(translations) || !nameSpace || !key || isObjectEmpty(newValues)) {
                return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
            }

            // Initialize Google Drive API
            const auth = new google.auth.OAuth2();
            auth.setCredentials({ access_token: session.accessToken });

            const drive = google.drive({ version: 'v3', auth });


            Object.entries(newValues).forEach(async ([locale, value]) => {
                if (!i18n.locales.includes(locale)) {
                    return NextResponse.json({ message: `Locale ${locale} is not supported` }, { status: 400 });
                }
                const translationFile = translations[locale];
                if (!translationFile) {
                    return NextResponse.json({ message: `No translation file found for ${locale}` }, { status: 400 });
                }

                const fileId = translations.fileIds[locale]
                if (!fileId) {
                    return NextResponse.json({ message: `No file ID found for ${locale}` }, { status: 400 });
                }

                const updatedContent = { ...translationFile }
                console.log('updatedContent', updatedContent)
                updatedContent[nameSpace][key] = value;

                const media = {
                    mimeType: 'application/json',
                    body: JSON.stringify(updatedContent),
                }

                const driveResponse = await drive.files.update({
                    fileId: fileId,
                    media: media,
                });
                console.log('Drive response:', driveResponse.data);
                if (driveResponse.status !== 200) {
                    return NextResponse.json({ message: `Failed to update file for ${locale}` }, { status: 500 });
                }
            })

            return NextResponse.json({ message: 'File updated successfully' });
        } catch (error) {
            console.error('Error updating file:', error.message);
            return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
        }

    } else {
        // Not Signed in
        return NextResponse.json({ error: "Not signed in" }, { status: 401 })
    }


}
