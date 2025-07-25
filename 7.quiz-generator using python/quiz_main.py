import csv
import random
from quiz import Question, Quiz
from datetime import datetime

def load_questions(filename, num_questions=10):
    questions = []
    try:
        with open(filename, newline='') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header
            for row in reader:
                q_text = row[0]
                options = row[1:5]
                correct = row[5]
                questions.append(Question(q_text, options, correct))
        return random.sample(questions, k=min(num_questions, len(questions)))
    except Exception as e:
        print("Error loading questions:", e)
        return []

def main():
    print("Welcome to the Automated Quiz!")
    username = input("Enter your name: ")
    question_list = load_questions("questions.csv", num_questions=10)
    quiz = Quiz(question_list)

    quiz.start()
    quiz.log_score(username)

if __name__ == "__main__":
    main()