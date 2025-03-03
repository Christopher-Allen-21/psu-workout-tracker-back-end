# PSU Masters Sample Final Project - Back End

- **Objective** - To design, develop, and deploy a project that demonstrates skills and knowledge of web development

# Link to Site

- https://chrisallen1996.com/workout

# To Run

- **npm start** - run this in root directory

# To Run Tests
- **npm i jest --save-dev** - installs Jest
- **npm install supertest --save-dev** - installs Supertest

# Packages to Install

- Project Setup

  - **npm init -y** - setup new project and creates package.json
  - **npm install express** - installs express
  - **npm i dotenv** - installs dotenv (used for environment variables)
  - **npm install --save-dev nodemon** - installs nodemon
  - **npm install yamljs** - installs yaml
  - **npm install swagger-ui-express** - installs swagger UI
  - **npm install axios** - installs axios (used to make request to 3rd party API)
  - **npm install --save cors** - installs cors
  - **npm install aws-sdk** - install aws sdk

# Create AWS User

- Go to Users in AWS console
- Click "Create user"
- Add user name
- Attach policies
- Copy down AWS Access Key and AWS Secret Key
- Add AWS Access Key to .env file and add AWS Secret Key to Heroku Config Vars

# Deployment Heroku

- Create New App
- ![image](https://github.com/user-attachments/assets/551bf844-fe14-4d2c-a17b-dfa47b6aa0f3)
- ![image](https://github.com/user-attachments/assets/d1fa73ce-9920-41f9-85e4-1cac27c89519)
- Connect Heroku app to GitHub repository
- ![image](https://github.com/user-attachments/assets/a1083f4e-051e-41d4-99b7-795d73140084)
- Navigate to Settings tab and add AWS User SecretKey to Config Vars
- ![image](https://github.com/user-attachments/assets/ce68dcf2-6aa1-4c73-8c79-7adbb4cc4768)
- Navigate to Deploy tab and click Deploy Branch
- ![image](https://github.com/user-attachments/assets/c79e615a-bfd1-4d25-b074-21f48f43d01f)

- Monitor
  - Navigate to Metrics tab
  - ![image](https://github.com/user-attachments/assets/3e7b2f71-d25d-4a59-83c0-3f9c09435da0)

