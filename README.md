# react-project-issues

This project is a single-page web application created with React and TypeScript that displays issues from the react GitHub repository. 
It shows the number and title of each issue. 
Users can expand an issue to view its body by clicking the Expand button to the left of the issue.

## Requirements

Node.js >= 14.0,
npm >= 6.0,
React >= 18.0,
TypeScript >= 4.0

## Instructions

For your convenience, I have included the .env file in the repository.  
Please note that you will need to replace the placeholder REACT_APP_GITHUB_TOKEN in the .env file with your GitHub personal access token.

Use Docker Compose to build and run the application:

`docker-compose up --build`

## Access the app at: 

http://localhost:3000/ReactProjectIssues 

## Testing

`npm test`