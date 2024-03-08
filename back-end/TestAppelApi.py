from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import json
from bs4 import BeautifulSoup

# Clé d'API YouTube
api_key = "AIzaSyDBz0WcoEWF048aGMdBJ2x83TqNtchYri0"

# Créer un objet service YouTube
youtube = build('youtube', 'v3', developerKey=api_key)

# Identifiant de la vidéo YouTube
video_id = "JdFRjsEZrmU"

# Nombre de commentaires à récupérer
max_results = 100

comments_data = {}

try:
    # Récupérer les commentaires de la vidéo
    response = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=max_results
    ).execute()

    # Ajouter les commentaires à la structure de données
    for comment in response["items"]:
        snippet = comment["snippet"]["topLevelComment"]["snippet"]
        author = snippet["authorDisplayName"]
        text = snippet["textDisplay"]
        # Nettoyer le commentaire
        cleaned_text = BeautifulSoup(text, "html.parser").get_text()
        cleaned_text = cleaned_text.encode('ascii', 'ignore').decode('utf-8')
        if author in comments_data:
            comments_data[author].append(cleaned_text)
        else:
            comments_data[author] = [cleaned_text]

    # Enregistrer les données dans un fichier JSON
    with open("./dataset/comments.json", "w", encoding='utf-8') as json_file:
        json.dump(comments_data, json_file, indent=4, ensure_ascii=False)
    print("Les commentaires ont été enregistrés dans le fichier 'comments.json'.")

except HttpError as e:
    print("Une erreur HTTP %d s'est produite:\n%s" % (e.resp.status, e.content))
