class Question:
    def __init__(self, text, options, answer):
        self.text = text
        self.options = options
        self.answer = answer

    def ask(self):
        print(self.text)
        for i, option in enumerate(self.options, 1):
            print(f"{i}. {option}")
        try:
            user_input = int(input("Your answer (1-4): "))
            return self.options[user_input - 1] == self.answer
        except (ValueError, IndexError):
            print("Invalid input!")
            return False

import csv
from datetime import datetime

class Quiz:
    def __init__(self, questions):
        self.questions = questions
        self.score = 0

    def start(self):
        for q in self.questions:
            if q.ask():
                self.score += 1
        print(f"\nYour Final Score: {self.score}/{len(self.questions)}")

    def log_score(self, username):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        try:
            with open("results.csv", "a", newline='') as file:
                writer = csv.writer(file)
                writer.writerow([username, self.score, len(self.questions), timestamp])
            print("Your score has been saved to results.csv")
        except Exception as e:
            print("Could not save results:", e)