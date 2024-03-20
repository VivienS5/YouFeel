import csv
import sys
sys.path.append("back-end/training/")
import json
import threading
from bs4 import BeautifulSoup
import googleapiclient.discovery
from requests import HTTPError
from inference_model import inference,init
from training_model import ModelTraining
youtube = googleapiclient.discovery.build("youtube", "v3",developerKey="AIzaSyDBz0WcoEWF048aGMdBJ2x83TqNtchYri0")
def get_video_comments(video_id, max_results=1):
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
        return comments_data

    except HTTPError as e:
        print("Une erreur HTTP %d s'est produite:\n%s" % (e.resp.status, e.content))
        return None


class TerminalTools():
    def __init__(self):
        super().__init__()
    def predict_mode(self):
        result =input("Utiliser la prédiction pour les commentaires de la vidéo ? (Oui/Non) :")
        if result.lower() == "oui" or result.lower() == "yes" or result.lower() == "o" or result.lower() == "y":
            return True
        else:
            return False
    def trainModel_mode(self):
        result =input("Voulez-vous entrainer le modèle avec les nouveaux commentaires ? (Oui/Non) :")
        if result.lower() == "oui" or result.lower() == "yes" or result.lower() == "o" or result.lower() == "y":
            return True
        else:
            return False
    def run(self):
        predict_mode = False
        # Ask video url from user
        while True:
            try:
                print("Enter the video url : ")
                url =input("URL : ")
                video_id = self.get_video_id(url)
                if video_id != "URL is not valid":
                    comments_data = get_video_comments(video_id)
                    if comments_data:
                        predict_mode = self.predict_mode()
                        values = comments_data.values()
                        results = {}
                        print(len(values))
                        for index,value in enumerate(values):
                            join = ''.join(value)
                            print("Selectionner le label pour le commentaire suivant : (0: tristesse, 1: joie, 2: amour, 3: colere, 4: peur, 5: surprise, -1: passer au commentaire suivant)")
                            if predict_mode:
                                inference_thread = PredictComment(join)
                                inference_thread.start()
                            result =input(join)
                            try:
                                if result == "-1":
                                    continue
                                if not result.isdigit():
                                    print ("Invalid input")
                                    continue
                                
                                results[index] = {
                                    "text": str(join),
                                    "label": result
                                }
                            except:
                                print("Invalid input")   
                        save =self.save_comments(results)
                        if save:
                            print("Comments saved successfully")
                            if self.trainModel_mode():
                                training_thread = TrainingComment()
                                training_thread.start()
                            exit(0)
                        
                else :
                    print(video_id)
            except InterruptedError:
                print("Goodbye!")
                return False
        
    def get_video_id(self,url):
        try:
            video_id = url.split("v=")[1]
            print(video_id)
            return video_id
        except Exception as e:
            return "URL is not valid"
    def save_comments(self, values):
        try:
            with open("./dataset/comments.csv", "a", encoding='utf-8', newline='') as buffer_file:
                writer = csv.writer(buffer_file)
                for index, value in values.items():
                    text = f'"{value["text"]}"'
                    label = value["label"]
                    writer.writerow([text, label])
            return True
        except Exception as e:
            print("Exception:" + e.__str__())
            return False
    pass
class PredictComment(threading.Thread):
    def __init__(self, comments_data):
        self.comments_data = comments_data
        init()
        super().__init__()

    def run(self):
        inference(self.comments_data)
        pass

class TrainingComment(threading.Thread):
    def __init__(self):
        super().__init__()
        self.training=ModelTraining(comments_training=True, nb_words=10000, epoch=10, embedding_dim=32)

    def run(self):
        self.training()
        pass
if __name__ == "__main__":
    try:   
        terminal = TerminalTools()
        terminal.run()
    except KeyboardInterrupt:
        print("Goodbye!")
    pass