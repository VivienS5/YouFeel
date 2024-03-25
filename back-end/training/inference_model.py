import pickle
import re
import string
import numpy as np
import tensorflow as tf
from nltk import word_tokenize
from nltk.corpus import stopwords
from tensorflow.keras.preprocessing.sequence import pad_sequences
from nltk.stem import WordNetLemmatizer
import nltk
import csv

nb_words = 100000

def custom_standardization(input_data):
    lowercase = tf.strings.lower(input_data)
    lowercase_string = lowercase.numpy().decode('utf-8')
    lowercase_string = re.sub(r'[^\w\s]', '', lowercase_string)
    stop_word = set(stopwords.words('english'))
    stop_word = " ".join([word for word in lowercase_string.split() if word not in stop_word])
    lemamatized_text = lemmatize_text(stop_word)
    stripped_html = tf.strings.regex_replace(lemamatized_text, '<br />', ' ')
    result = tf.strings.regex_replace(stripped_html,
                                      '[%s]' % re.escape(string.punctuation),
                                      '')
    return result.numpy().decode('utf-8')
def init():
    nltk.download('stopwords')
    nltk.download('wordnet')
def lemmatize_text(text):
    lemmatizer = WordNetLemmatizer()
    word_list = word_tokenize(text)
    lemmatized_output = ' '.join([lemmatizer.lemmatize(w) for w in word_list])
    return lemmatized_output
embedding_dim  = 32
def create_model():
    model = tf.keras.Sequential([
            tf.keras.layers.Embedding(input_dim=nb_words, output_dim=embedding_dim),
            tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(128)),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(6, activation='softmax')
            ])

    model.compile(loss=tf.keras.losses.SparseCategoricalCrossentropy(),
                  optimizer=tf.optimizers.Adam(),
                  metrics=['accuracy'])

    model.build((None, nb_words))
    
    return model

def inference(texts):
    # Load the model and the tokenizer

    # Load the weights
    model =create_model()
    model.build((None, nb_words))
    model.load_weights('./back-end/training/models/model_weights.weights.h5')
    if model is None:
        raise ValueError("Model is not loaded")
    with open('./back-end/training/models/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    # Tokenize the texts and convert to sequences
    texts=custom_standardization(texts)
    tests = word_tokenize(texts)
    sequences = tokenizer.texts_to_sequences([tests])
    padded_sequences = pad_sequences(sequences)
    # Pad the sequences
    phrase_vector = tf.keras.preprocessing.sequence.pad_sequences(padded_sequences)

    # Predict the output
    predictions = model.predict(phrase_vector)
    predictions = [round(prediction, 3) for prediction in predictions[0]]
    # print(predictions)

    highest_prediction = np.argmax(predictions)

    return highest_prediction

labels = ['sadness', 'joy', 'love', 'anger', 'fear','surprise'] 


def process_comments(commentaires):
    processed_comments = []
    data = {}
    for i, comment_row in enumerate(commentaires): 
        comment = comment_row[1] 
        emotion_prediction = inference(comment)
        emotion_prediction = int(emotion_prediction)

        data = {'username':comment_row[0],'commentaire': comment_row[1], 'emotion_prediction': emotion_prediction}
        print(data)

        processed_comments.append(data)
    return processed_comments
