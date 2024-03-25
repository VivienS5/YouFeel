import sys
sys.path.append("back-end/training/")
from flask import Flask, render_template, redirect, request, jsonify
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from bs4 import BeautifulSoup
import re
from apiKey import secretApiKey
import os
import csv
import pandas as pd


app = Flask(__name__)

# Clé d'API YouTube
api_key = secretApiKey
commentaires = []

# Créer un objet service YouTube
youtube = build('youtube', 'v3', developerKey=api_key)

# fonction pour récupérer les commentaires
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

@app.route('/upload' , methods = ['GET' ,'POST'])
def upload_File():
    import inference_model
    global commentToJson
    global titre_video
    global tag_link
    commentToJson = None
    if request.method == 'POST':
        youtube_link = request.form['youtube_link']
        video_id = re.findall(r'(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})', youtube_link)
        if video_id:
            video_details = youtube.videos().list(
                part="snippet",
                id=video_id[0]
            ).execute()
            tag_link = video_id[0]
            titre_video = video_details["items"][0]["snippet"]["title"]
            comments_data = get_video_comments(video_id[0])
            if comments_data:
                commentaires = []
                for comment in comments_data:
                    commentaires.append((comment['username'], comment['commentaire']))
                commentToJson = inference_model.process_comments(commentaires)
                return redirect('http://localhost:4200/commentaire')
                # return redirect('/comments') pour afficher les commentaires sur le serveur
            else:
                return "Erreur lors de la récupération des commentaires."
        else:
            return "URL YouTube invalide."
    return "Bien reçu l'url"


@app.route('/comments/json')
def comments_json():
    global commentToJson
    # règle problème d'int64
    commentToJson = [{'username': item['username'], 'commentaire': item['commentaire'], 'emotion_prediction': str(item['emotion_prediction'])} for item in commentToJson]
    return jsonify(commentToJson)

@app.route('/data_video')
def data_video():
    global titre_video
    global tag_link
    return jsonify({"titre":titre_video, "tag": tag_link})

if __name__ == '__main__':
    app.run(debug=True)
