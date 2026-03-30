'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { CheckCircle, Clock, FileText, Award, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SkillTest {
  skillName: string;
  questions: Question[];
  passingScore: number;
  timeLimit: number; // in minutes
}

// JSON test data for different skills
const skillsTests: Record<string, SkillTest> = {
  'React': {
    skillName: 'React',
    passingScore: 0,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of React hooks?",
        options: [
          "To replace class components entirely",
          "To add state and lifecycle features to functional components",
          "To improve performance only",
          "To handle routing in React applications"
        ],
        correctAnswer: 1,
        explanation: "React hooks allow functional components to use state and other React features that were previously only available in class components."
      },
      {
        id: 2,
        question: "Which hook is used to perform side effects in functional components?",
        options: [
          "useState",
          "useContext",
          "useEffect",
          "useReducer"
        ],
        correctAnswer: 2,
        explanation: "useEffect is the hook used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM."
      },
      {
        id: 3,
        question: "What does the 'key' prop do in React lists?",
        options: [
          "It styles list items",
          "It helps React identify which items have changed",
          "It sorts the list automatically",
          "It provides hover effects"
        ],
        correctAnswer: 1,
        explanation: "Keys help React identify which items in a list have changed, been added, or been removed, enabling efficient updates to the UI."
      },
      {
        id: 4,
        question: "What is the purpose of the useState hook?",
        options: [
          "To handle API calls",
          "To manage component state",
          "To create routing",
          "To style components"
        ],
        correctAnswer: 1,
        explanation: "useState is a hook that lets you add React state to functional components, allowing them to store and update data over time."
      },
      {
        id: 5,
        question: "Which method is used to prevent default form submission in React?",
        options: [
          "event.stopSubmit()",
          "event.preventDefault()",
          "event.cancel()",
          "event.stopPropagation()"
        ],
        correctAnswer: 1,
        explanation: "event.preventDefault() is used to prevent the default behavior of an event, such as form submission or link navigation."
      }
    ]
  },
  'TypeScript': {
    skillName: 'TypeScript',
    passingScore: 0,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What is TypeScript primarily used for?",
        options: [
          "Database management",
          "Adding static types to JavaScript",
          "CSS preprocessing",
          "Server configuration"
        ],
        correctAnswer: 1,
        explanation: "TypeScript is a typed superset of JavaScript that adds static types, helping catch errors early and improve code quality."
      },
      {
        id: 2,
        question: "Which keyword is used to define an interface in TypeScript?",
        options: [
          "type",
          "interface",
          "class",
          "struct"
        ],
        correctAnswer: 1,
        explanation: "The 'interface' keyword is used to define the structure of objects and enforce type checking in TypeScript."
      },
      {
        id: 3,
        question: "What does the 'any' type represent in TypeScript?",
        options: [
          "No type at all",
          "Any JavaScript value",
          "Only strings",
          "Only numbers"
        ],
        correctAnswer: 1,
        explanation: "The 'any' type is a special type that represents any JavaScript value and essentially disables type checking for that variable."
      },
      {
        id: 4,
        question: "How do you make optional properties in TypeScript interfaces?",
        options: [
          "Using the '?' operator",
          "Using the 'optional' keyword",
          "Using the 'null' type",
          "Using square brackets"
        ],
        correctAnswer: 0,
        explanation: "Optional properties in TypeScript interfaces are marked with a '?' after the property name, like 'name?: string'."
      },
      {
        id: 5,
        question: "What is the purpose of generics in TypeScript?",
        options: [
          "To make code run faster",
          "To create reusable components that work with multiple types",
          "To handle async operations",
          "To style components"
        ],
        correctAnswer: 1,
        explanation: "Generics allow you to create reusable components that can work with multiple types while maintaining type safety."
      }
    ]
  },
  'Node.js': {
    skillName: 'Node.js',
    passingScore: 0,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What is Node.js built on?",
        options: [
          "Java Virtual Machine",
          "Chrome V8 JavaScript engine",
          "Python interpreter",
          "Ruby runtime"
        ],
        correctAnswer: 1,
        explanation: "Node.js is built on the Chrome V8 JavaScript engine, which compiles JavaScript to native machine code."
      },
      {
        id: 2,
        question: "Which module system does Node.js use?",
        options: [
          "ES modules only",
          "CommonJS by default",
          "AMD modules",
          "UMD modules"
        ],
        correctAnswer: 1,
        explanation: "Node.js uses CommonJS module system by default, though it now also supports ES modules with the .mjs extension or 'type': 'module' in package.json."
      },
      {
        id: 3,
        question: "What is npm?",
        options: [
          "Node.js package manager",
          "Node.js testing framework",
          "Node.js debugger",
          "Node.js server"
        ],
        correctAnswer: 0,
        explanation: "npm (Node Package Manager) is the default package manager for Node.js, used to install and manage dependencies."
      },
      {
        id: 4,
        question: "Which method is used to read files asynchronously in Node.js?",
        options: [
          "fs.readSync()",
          "fs.readFile()",
          "fs.read()",
          "fs.open()"
        ],
        correctAnswer: 1,
        explanation: "fs.readFile() is used to read files asynchronously in Node.js, taking a callback function or returning a Promise."
      },
      {
        id: 5,
        question: "What is the purpose of the 'event loop' in Node.js?",
        options: [
          "To handle synchronous operations",
          "To handle asynchronous operations and callbacks",
          "To compile JavaScript",
          "To manage memory"
        ],
        correctAnswer: 1,
        explanation: "The event loop is the core mechanism in Node.js that handles asynchronous operations and callbacks, allowing non-blocking I/O operations."
      }
    ]
  },
  'MongoDB': {
    skillName: 'MongoDB',
    passingScore: 0,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What type of database is MongoDB?",
        options: [
          "Relational database",
          "NoSQL document database",
          "Graph database",
          "Time-series database"
        ],
        correctAnswer: 1,
        explanation: "MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents."
      },
      {
        id: 2,
        question: "What is the basic unit of data storage in MongoDB?",
        options: [
          "Table",
          "Row",
          "Document",
          "Column"
        ],
        correctAnswer: 2,
        explanation: "Documents are the basic unit of data in MongoDB, similar to rows in relational databases but with a flexible structure."
      },
      {
        id: 3,
        question: "Which method is used to query documents in MongoDB?",
        options: [
          "find()",
          "select()",
          "query()",
          "get()"
        ],
        correctAnswer: 0,
        explanation: "The find() method is used to query documents in MongoDB, allowing you to specify criteria to filter results."
      },
      {
        id: 4,
        question: "What is a 'collection' in MongoDB?",
        options: [
          "A group of related documents",
          "A single document",
          "A database connection",
          "A query result"
        ],
        correctAnswer: 0,
        explanation: "A collection is a group of MongoDB documents, similar to a table in relational databases."
      },
      {
        id: 5,
        question: "Which operator is used for matching array elements in MongoDB queries?",
        options: [
          "$in",
          "$elemMatch",
          "$all",
          "$size"
        ],
        correctAnswer: 1,
        explanation: "$elemMatch is used to match documents that contain an array field with at least one element that matches all the specified query criteria."
      }
    ]
  },
  'AWS': {
    skillName: 'AWS',
    passingScore: 0,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What does AWS stand for?",
        options: [
          "Amazon Web Services",
          "Advanced Web Solutions",
          "Automated Web Systems",
          "Application Web Servers"
        ],
        correctAnswer: 0,
        explanation: "AWS stands for Amazon Web Services, which is Amazon's cloud computing platform."
      },
      {
        id: 2,
        question: "Which AWS service is used for object storage?",
        options: [
          "EC2",
          "S3",
          "RDS",
          "Lambda"
        ],
        correctAnswer: 1,
        explanation: "Amazon S3 (Simple Storage Service) is AWS's object storage service designed to store and retrieve any amount of data from anywhere."
      },
      {
        id: 3,
        question: "What is EC2 in AWS?",
        options: [
          "Elastic Compute Cloud",
          "Elastic Container Cloud",
          "Elastic Cache Cloud",
          "Elastic Computing Core"
        ],
        correctAnswer: 0,
        explanation: "Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the AWS cloud."
      },
      {
        id: 4,
        question: "Which AWS service is used for serverless computing?",
        options: [
          "EC2",
          "ECS",
          "Lambda",
          "EKS"
        ],
        correctAnswer: 2,
        explanation: "AWS Lambda is a serverless compute service that runs code in response to events and automatically manages the underlying compute resources."
      },
      {
        id: 5,
        question: "What is the primary purpose of AWS IAM?",
        options: [
          "Database management",
          "Identity and Access Management",
          "Network configuration",
          "Storage management"
        ],
        correctAnswer: 1,
        explanation: "AWS IAM (Identity and Access Management) enables you to manage access to AWS services and resources securely."
      }
    ]
  },
  'Docker': {
    skillName: 'Docker',
    passingScore: 0,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What is a Docker container?",
        options: [
          "A virtual machine",
          "A lightweight, standalone executable package",
          "A database system",
          "A programming language"
        ],
        correctAnswer: 1,
        explanation: "A Docker container is a lightweight, standalone executable package that includes everything needed to run a piece of software."
      },
      {
        id: 2,
        question: "What is the purpose of a Dockerfile?",
        options: [
          "To store configuration settings",
          "To define the instructions for building a Docker image",
          "To manage container networks",
          "To backup container data"
        ],
        correctAnswer: 1,
        explanation: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image."
      },
      {
        id: 3,
        question: "Which command is used to build a Docker image?",
        options: [
          "docker build",
          "docker create",
          "docker make",
          "docker construct"
        ],
        correctAnswer: 0,
        explanation: "The 'docker build' command is used to build Docker images from a Dockerfile and a context."
      },
      {
        id: 4,
        question: "What is Docker Hub?",
        options: [
          "A container orchestration tool",
          "A cloud-based registry service for Docker images",
          "A Docker monitoring tool",
          "A Docker networking service"
        ],
        correctAnswer: 1,
        explanation: "Docker Hub is a cloud-based registry service that allows you to share and manage Docker images."
      },
      {
        id: 5,
        question: "What is the difference between Docker images and containers?",
        options: [
          "There is no difference",
          "Images are read-only templates while containers are running instances",
          "Images are for Windows and containers are for Linux",
          "Images are larger than containers"
        ],
        correctAnswer: 1,
        explanation: "Docker images are read-only templates used to create containers, while containers are the actual running instances of those images."
      }
    ]
  },
  'JavaScript': {
    skillName: 'JavaScript',
    passingScore: 0,
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "What is the result of 'typeof null' in JavaScript?",
        options: [
          "'null'",
          "'undefined'",
          "'object'",
          "'number'"
        ],
        correctAnswer: 2,
        explanation: "typeof null returns 'object' due to a historical bug in JavaScript. This is considered a language quirk."
      },
      {
        id: 2,
        question: "Which method adds an element to the end of an array?",
        options: [
          "push()",
          "pop()",
          "shift()",
          "unshift()"
        ],
        correctAnswer: 0,
        explanation: "push() adds one or more elements to the end of an array and returns the new length."
      },
      {
        id: 3,
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close applications",
          "A function that has access to variables in its outer scope",
          "A type of loop",
          "A method to stop execution"
        ],
        correctAnswer: 1,
        explanation: "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned."
      },
      {
        id: 4,
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: [
          "var",
          "let",
          "const",
          "constant"
        ],
        correctAnswer: 2,
        explanation: "const is used to declare a constant - a variable that cannot be reassigned after its initial declaration."
      },
      {
        id: 5,
        question: "What does the '===' operator do?",
        options: [
          "Assigns a value",
          "Compares values and types",
          "Compares only values",
          "Checks if a variable exists"
        ],
        correctAnswer: 1,
        explanation: "The strict equality operator (===) compares both value and type, while == performs type coercion."
      }
    ]
  }
};

interface SkillsAssessmentProps {
  skillName: string;
  onComplete: (score: number, passed: boolean) => void;
  onCancel: () => void;
}

export const SkillsAssessment: React.FC<SkillsAssessmentProps> = ({
  skillName,
  onComplete,
  onCancel
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const test = skillsTests[skillName];

  useEffect(() => {
    if (isTestStarted && !isTestCompleted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && isTestStarted && !isTestCompleted) {
      handleCompleteTest();
    }
  }, [timeRemaining, isTestStarted, isTestCompleted]);

  const startTest = () => {
    setIsTestStarted(true);
    setTimeRemaining(test.timeLimit * 60);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleCompleteTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCompleteTest = () => {
    setIsTestCompleted(true);
    calculateResults();
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    test.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / test.questions.length) * 100);
    const passed = score >= test.passingScore;
    
    setShowResults(true);
    
    // Immediately verify skill if passed
    if (passed) {
      onComplete(score, passed);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!test) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Test not available for {skillName}</p>
          <Button onClick={onCancel} className="mt-4">
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isTestStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>{skillName} Skills Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Test Details</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {test.questions.length} multiple-choice questions</li>
                <li>• Time limit: {test.timeLimit} minutes</li>
                <li>• Passing score: {test.passingScore}%</li>
                <li>• Questions cover fundamental and advanced concepts</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-[#1E293B]">Test Instructions:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Read each question carefully before answering</li>
                <li>• Select the best answer from the options provided</li>
                <li>• You can navigate between questions using Previous/Next buttons</li>
                <li>• The test will auto-submit when time expires</li>
                <li>• You must score at least {test.passingScore}% to pass</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={startTest}>
                Start Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    let correctAnswers = 0;
    test.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / test.questions.length) * 100);
    const passed = score >= test.passingScore;

    const handleClose = () => {
    onCancel();
  };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {passed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Clock className="w-5 h-5 text-red-500" />
            )}
            <span>Assessment Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {score}%
              </div>
              <p className={`text-lg font-medium ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {passed ? 'Congratulations! You passed!' : 'You did not pass. Try again later.'}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                You answered {correctAnswers} out of {test.questions.length} questions correctly
              </p>
              {passed && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    🎉 Skill verified! Your {skillName} skill is now verified with a score of {score}%.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[#1E293B]">Question Review:</h4>
              {test.questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer;
                return (
                  <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1E293B] mb-2">Question {index + 1}: {question.question}</p>
                        <p className="text-sm text-gray-600 mb-2">Your answer: {question.options[selectedAnswers[index]] || 'Not answered'}</p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600">Correct answer: {question.options[question.correctAnswer]}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-2">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>{skillName} Assessment</span>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${timeRemaining < 60 ? 'text-red-600' : 'text-gray-600'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="secondary" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#0A66C2] h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {test.questions.length}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-[#1E293B] mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-[#0A66C2] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswers[currentQuestion] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="mr-3"
                  />
                  <span className="text-[#1E293B]">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === test.questions.length - 1 ? 'Submit' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
