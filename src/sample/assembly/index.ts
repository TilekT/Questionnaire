import {context,logging,PersistentVector} from "near-sdk-as";

//view method
export function hello(): bool {
   logging.log("Hi, there! Lets write a first smart contract on NEAR!");
   return true;
}

//call method with context.sender
export function greetingUser(): string {
  return "Now " + context.sender + " its time to create a NEAR questionnaire!";
}

//'questions' 
let questions = new PersistentVector<string>('question');
//'answers' 
let answers = new PersistentVector<string>('answer');

//add a new question to questionnaire
export function addQuestion(question: string): string {
  assert(question.length > 0, "question can not be blank");
  questions.push(question);
  return question.toString() + " new question was ADDED";
}

//to show all questions
export function showMyQuestions(): Array<string> {
  let listToPrint = new Array<string>();
  let i: i32 = 0;
  if(questions.length == 0){
    listToPrint.push("Dear " + context.sender + " there is no questions right now, please add some!")
  }
  while (i < questions.length) {
    listToPrint.push(questions[i])
    i++
  }
  return listToPrint;
}

//remove a question from array
export function deleteQuestion(question: i32): string {
   if(questions.containsIndex(question - 1)){
    questions.swap_remove(question - 1);
   return "The " + question.toString() + " question was DELETED";
 }
 return "There is No questions to delete";
}

//get the number of questions
export function getNumQuestions(): String {
  return "Hello "+ context.sender +  ", there is " + questions.length.toString()
    + " questions for today!";

}

//add a new answer
export function addAnswer(answer: string): string {
  assert(answer.length > 0, "answer can not be blank");
  answers.push(answer);
  return answer.toString() + " new answer was ADDED";
}

//to show all answers
export function showMyAnswers(): Array<string> {
  let listToPrint = new Array<string>();
  let i: i32 = 0;
  if(answers.length == 0){
    listToPrint.push("Dear " + context.sender + " there is no answers right now, please add some!")
  }
  while (i < answers.length) {
    listToPrint.push(answers[i])
    i++
  }
  return listToPrint;
}

//remove an answer from array
export function deleteAnswer(answer: i32): string {
  if(answers.containsIndex(answer - 1)){
   answers.swap_remove(answer - 1);
  return "The " + answer.toString() + " answer was DELETED";
}
return "There is No answers to delete";
}

//get the number of answers
export function getNumAnswers(): String {
  return "Hello "+ context.sender +  ", there is " + answers.length.toString()
    + " answers for today!";

}