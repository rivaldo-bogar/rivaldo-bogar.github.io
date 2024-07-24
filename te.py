from __future__ import print_function
from google.oauth2 import service_account
from googleapiclient.discovery import build
import webbrowser

# Lokasi file kredensial OAuth 2.0 yang diunduh dari Google Developer Console
credentials = service_account.Credentials.from_service_account_file(
    'C:\\Users\\rival\\Videos\\kredentialkey.json',scopes=['https://www.googleapis.com/auth/drive.readonly']
)

# Buat objek service untuk berinteraksi dengan Google Drive API
service = build('drive', 'v3', credentials=credentials)

def main():
    # ID folder Google Drive yang berisi foto-foto Anda
    folder_id = '1QfOBS_v72u6BgrIZcR8o0BaV89wn_McF'

    # Ambil daftar file di dalam folder
    results = service.files().list(
        q=f"'{folder_id}' in parents and mimeType='image/jpeg'",
        fields="nextPageToken, files(id, name, webContentLink)").execute()
    
    # Tampilkan link download setiap foto
    for file in results.get('files', []):
        print(f"Found file: {file['name']}")
        print(f"Download link: {file['webContentLink']}")
        print()

    # Buka foto pertama di browser (opsional)
    if results.get('files'):
        first_file = results['files'][0]
        webbrowser.open(first_file['webContentLink'])

if __name__ == '__main__':
    main()
