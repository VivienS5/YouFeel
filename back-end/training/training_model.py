
import pickle
import string
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
import tensorflow as tf
import numpy as np
import pandas as pds
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder

from tqdm import tqdm


class ModelTraining():
    path_dataset = "./dataset/emotions.csv"
    path_comments_dataset = "./dataset/comments.csv"
    nb_words = 100000
    seq_lenght = 250
    epochs = 10
    embedding_dim  = 32
    def __init__(self) -> None:
        tqdm.pandas()
        np.set_printoptions(precision=3, suppress=True)
        self.loadDataset()
        self.preProcess()
        self.train()
    def loadDataset(self):
        """Load the emotion and comments dataset.

        Returns:
            bool: True if the dataset is loaded successfully, False otherwise.
        """
        print("=== Loading dataset ===")
        self.data_emotions = pds.read_csv(self.path_dataset,sep=",",nrows=self.nb_words )
        self.data_emotions.drop('Unnamed: 0', axis=1, inplace=True)
        self.data_text = self.data_emotions['text']
        
        self.data_label = self.data_emotions['label']

    def custom_standardization(self,input_data):
        
        lowercase = tf.strings.lower(input_data)
        lowercase_string = lowercase.numpy().decode('utf-8')
        lowercase_string = re.sub(r'[^\w\s]', '', lowercase_string)
        stop_word = set(stopwords.words('english'))
        stop_word = " ".join([word for word in lowercase_string.split() if word not in stop_word])
        lemamatized_text = self.lemmatize_text(stop_word)
        stripped_html = tf.strings.regex_replace(lemamatized_text, '<br />', ' ')
        result =  tf.strings.regex_replace(stripped_html,
                                  '[%s]' % re.escape(string.punctuation),
                                  '')
        return result.numpy().decode('utf-8')

    def lemmatize_text(self, text):
        lemmatizer = WordNetLemmatizer()
        word_list = word_tokenize(text)
        lemmatized_output = ' '.join([lemmatizer.lemmatize(w) for w in word_list])
        return lemmatized_output
    
    def preProcess(self):
        self.data_text = pds.Series(self.data_text).apply(self.custom_standardization)
        print(self.data_text.head())
        self.tokenizer = Tokenizer(num_words=self.nb_words, oov_token="<OOV>")
        self.tokenizer.fit_on_texts(self.data_text)
        sequences = self.tokenizer.texts_to_sequences(self.data_text)
        self.padded_sequences = pad_sequences(sequences)
        print(self.padded_sequences)
    def vectorize_text(self, text):
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(text)
        return tfidf_matrix
    def youFeelModel(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Embedding(input_dim = self.nb_words,output_dim= self.embedding_dim),
            tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(128)),
            tf.keras.layers.Dense(64,activation='relu'),
            tf.keras.layers.Dense(32,activation='relu'),
            tf.keras.layers.Dense(6,activation='softmax')
            ])      
        return model
    def train(self):
        print("=== Training ===")
        youFeelModel = self.youFeelModel()
        
        youFeelModel.compile(loss=tf.keras.losses.SparseCategoricalCrossentropy(),
                        optimizer=tf.optimizers.Adam(),metrics=['accuracy'])
        sequences_train, sequences_val, labels_train, labels_val = train_test_split(
        self.padded_sequences, self.data_label, test_size=0.2, random_state=42)
        history = youFeelModel.fit(sequences_train, labels_train, 
                               epochs=self.epochs, 
                               validation_data=(sequences_val, labels_val))        
        with open('./back-end/training/models/tokenizer.pickle', 'wb') as handle:
            pickle.dump(self.tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
        youFeelModel.save_weights('./back-end/training/models/model_weights.weights.h5')
        self.plot_history(history)
        pass
    def plot_history(self,history):
            # Plot training & validation accuracy values
        plt.figure()
        plt.plot(history.history['accuracy'])
        plt.plot(history.history['val_accuracy'])
        plt.title('Model accuracy')
        plt.ylabel('Accuracy')
        plt.xlabel('Epoch')
        plt.legend(['Train', 'Validation'], loc='upper left')
        plt.show()

        # Plot training & validation loss values
        plt.figure()
        plt.plot(history.history['loss'])
        plt.plot(history.history['val_loss'])
        plt.title('Model loss')
        plt.ylabel('Loss')
        plt.xlabel('Epoch')
        plt.legend(['Train', 'Validation'], loc='upper left')
        plt.show()
        pass
    pass