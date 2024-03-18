from flask import Flask, render_template, redirect, request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from bs4 import BeautifulSoup
import re
from apiKey import secretApiKey
import os
import csv

app = Flask(__name__)

# Clé d'API YouTube
api_key = secretApiKey

# Créer un objet service YouTube
youtube = build('youtube', 'v3', developerKey=api_key)

# Définir une fonction pour récupérer les commentaires
def get_video_comments(video_id, max_results=20):
    comments_data = []
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
            cleaned_text = cleaned_text.encode('utf-8', 'ignore').decode('utf-8')
            comments_data.append({"username": author, "commentaire": cleaned_text})
        return comments_data

    except HttpError as e:
        print("Une erreur HTTP %d s'est produite:\n%s" % (e.resp.status, e.content))
        return None

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        youtube_link = request.form['youtube_link']
        video_id = re.findall(r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})', youtube_link)
        if video_id:
            comments_data = get_video_comments(video_id[0])
            if comments_data:
                with open("./dataset/comments.csv", "w", encoding='utf-8') as csv_file:
                    for comment in comments_data:
                        csv_file.write(f"{comment['username']},{comment['commentaire']}\n")
                return redirect('/traitement')
            else:
                return "Erreur lors de la récupération des commentaires."
        else:
            return "URL YouTube invalide."
    return render_template('index.html')

@app.route('/traitement')
def traitement():
    os.system('python ./back-end/training/inference_model.py') 
    return redirect('/comments')

@app.route('/comments')
def comments():
    comments = load_comments_from_csv("./dataset/comments_with_emotions.csv")
    return render_template('comments.html', comments=comments)

def load_comments_from_csv(file_path):
    comments_data = []
    with open(file_path, 'r', encoding='utf-8') as csv_file:
        reader = csv.reader(csv_file)
        next(reader) 
        for row in reader:
            username, commentaire, emotion = row
            comments_data.append({"username": username, "commentaire": commentaire, "emotion": emotion})
    return comments_data

if __name__ == '__main__':
    app.run(debug=True)
