import {
  greetingUser,
  hello,
  addQuestion,
  showMyQuestions,
  getNumQuestions,
  addAnswer,
  showMyAnswers,
  getNumAnswers
} from "../assembly";
import { PersistentVector, VMContext, VM , context } from "near-sdk-as";

const contract = "greeting";
const user = "user";
const question1 = "WEB 3.0";
const question2 = "Sharding";
const answer1 = "Sharding does a horizontal partition of your database";
const answer2 = "Web 3.0 is a general idea for a decentralized Internet";
let i: i32 = 0
let questions = new PersistentVector<string>('question');
let answers = new PersistentVector<string>('answer');

describe("greeting", () => {
  beforeEach(() => {
    VMContext.setCurrent_account_id(contract);
    VMContext.setSigner_account_id(user);
  });

  it("should respond to hello()", () => {
    expect(hello()).toBeTruthy();//output for boolean function
    expect(VM.logs()).toContainEqual("Hi, there! Lets write a first smart contract on NEAR!");//print stuff

  });

  it("should respond to greetingUser()", () => {
    expect(greetingUser()).toStrictEqual("Now " + context.sender + " its time to create a NEAR questionnaire!");

  });


  it("should respond to addQuestion()", () => {
    if(question1.length == 0){
      expect(addQuestion(question1)).toStrictEqual("Question can not be blank");
    }
    expect(addQuestion(question1)).toStrictEqual(question1 + " new question was ADDED");
  });


  it("should respond to addAnswer()", () => {
    if(answer1.length == 0){
      expect(addQuestion(answer1)).toStrictEqual("Answer can not be blank");
    }
    expect(addQuestion(answer1)).toStrictEqual(answer1 + " new question was ADDED");
  });
 
  
  it("should respond to getNumQuestions()", () => {
    expect(getNumQuestions()).toStrictEqual("Hello " + context.sender + ", there is " + 
    questions.length.toString() + " questions for today!");
      
  });


  it("should respond to getNumAnswers()", () => {
    expect(getNumAnswers()).toStrictEqual("Hello " + context.sender + ", there is " + 
    answers.length.toString() + " answers for today!");
      
  });


  it("should respond to showMyQuestions()", () => {
    questions.push(question1)
    questions.push(question2);

    const output = showMyQuestions();
    expect(output).toHaveLength(2);
    expect(showMyQuestions()).toStrictEqual([question1, question2]);
    if(questions.length == 0){
    expect(showMyQuestions()).toStrictEqual(["Dear " + context.sender + " there is no questions right now, please add some!"]);

    }
    
  });


  it("should respond to showMyAnswers()", () => {
    answers.push(answer1)
    answers.push(answer2);

    const output = showMyAnswers();
    expect(output).toHaveLength(2);
    expect(showMyAnswers()).toStrictEqual([answer1, answer2]);
    if(answers.length == 0){
    expect(showMyAnswers()).toStrictEqual(["Dear " + context.sender + " there is no answers right now, please add some!"]);

    }
    
  });
});
