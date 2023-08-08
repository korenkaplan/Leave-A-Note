# Leave A Note: Transforming Parking Incident Solutions

Welcome to Leave A Note – your go-to platform for seamless parking incident resolutions. With our secure and efficient system, users can effortlessly leave notes and reports  in situations where direct communication isn't feasible.

## How It Works

Whether you're directly involved in the incident or acting as a supportive witness, our process is simple and user-friendly:

1. **Enter Car Number**: Begin by typing in the car number involved in the incident. 

2. **Capture Photo**: Take a quick photo of the accident scene. 

3. **Send Report**: Hit that "Send" button! Your report will be securely submitted through our system.

**That's it!** The magic of Leave A Note does the rest. If the other driver is also a user of our app, they'll promptly receive your message and can communicate with you. In the event that the driver isn't registered on the app yet, no worries – we've got you covered. Your report will be safely stored, ready to be delivered whenever they join our community.

At Leave A Note, our aim is to simplify the process, reduce stress, and foster community support among drivers. If you've got any questions or feedback, feel free to reach out. Let's make parking incidents pyhisical notes a thing of the past and create a more cooperative and hassle-free experience together! 🚗📝🤝


This repository exclusively hosts the client-side of our application. In addition, the application is further developed across two primary branches:
- `main` branch:This branch is for [this server project](https://github.com/korenkaplan/Leave-A-Note-NodeJS-Server), a Node js, mongoDB backend.
- `NET_Core_Backend` Branch : This branch is for [this server project](https://github.com/korenkaplan/LeaveANoteServerProject) an ASP.NET Core backend, SQL database .

  
## Table Of Contents
1. [Demo & Screenshots](#demo--screenshots)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [About The Idea](#about-the-idea)
5. [Roadmap - Future Improvements](#roadmap)
6. [Directories](#directories)
7. [Environment Variables](#environment-variables)
8. [Run Locally](#run-locally)
9. [API Reference](#api-reference)
10. [Author & Feedback](#author--feedback)

##  Demo & Screenshots
- [Walkthrough demo youtube video](https://www.youtube.com/watch?v=FAv9v3SBU9I)
### Screenshots from the application.
 <div>
<img src="https://i.imgur.com/OomUzFO.jpg" width=150px >
<img src="https://i.imgur.com/NwaUIrq.jpg" width=150px >
<img src="https://i.imgur.com/iyOiBYt.jpg" width=150px >
<img src="https://i.imgur.com/MlZXV8P.jpg" width=150px >
<img src="https://i.imgur.com/k91xU8E.jpg" width=150px >
<img src="https://i.imgur.com/ttdbT3L.jpg" width=150px >
<img src="https://i.imgur.com/XcKMSVZ.jpg" width=150px >
<img src="https://i.imgur.com/nBvNqbK.jpg" width=150px >
<img src="https://i.imgur.com/MLkrqnb.jpg" width=150px >
<img src="https://i.imgur.com/Rwok9PM.jpg" width=150px >
<img src="https://i.imgur.com/08J4kub.jpg" width=150px >
<img src="https://i.imgur.com/zLGrhRK.jpg" width=150px >
<img src="https://i.imgur.com/SSJIjwc.jpg" width=150px >
<img src="https://i.imgur.com/CR44j6n.jpg" width=150px >
<img src="https://i.imgur.com/sQpKjIK.jpg" width=150px >
</div>


   
## Tech Stack

**Client:** React-Native, Typescript (Currant Repository)

**Server for main branch :** Node, Typescript,  Express, Mongodb Atlas with Mongoose.

[Node.JS & Mongodb version Server side Repository](https://github.com/korenkaplan/Leave-A-Note-NodeJS-Server)


**Server for Net_Core_Backend branch :** ASP.NET Core 7 , Entity Framework 7, Microsoft Azure Cloud Services.

[.NET 7 & SQL version Server side Repository](https://github.com/korenkaplan/LeaveANoteServerProject)

**Cloud Storage:** Firebase Storage to store the images.

## Features

- Light/dark mode toggle
- User authentication with secure login and authorization using JWT Tokens.
- Background and Foreground notification system for new notes and reports using FCM.
- Camera integration for capturing,using a custom camera component.
- Easy-to-use interface that accommodates users of all experience levels
- Featuring animation using the lottie package.

## About The Idea

**The Problem:**
Parking incidents can be frustrating and stressful, especially when the other driver involved is not present to exchange details. This often leads to a lack of information and difficulties in resolving insurance claims. "Leave A Note" aims to bridge this communication gap and provide a reliable means for drivers and witnesses to share vital information, ensuring a fair and hassle-free process in such situations.

**Target Audience:**
Our platform caters to all drivers, whether they have experienced a parking incident or want to assist others as witnesses. By bringing drivers together on a single platform, "Leave A Note" fosters a community-driven approach to resolve parking-related issues.

**Benefits and Advantages:**
- Streamlined Process: Leave A Note takes simplicity to the next level. With just the car number involved in the accident and a quick picture, users can effortlessly document the incident. No complex forms or time-consuming processes, making it easy for anyone to use and contribute valuable information.
- Reduced Stress: Leave A Note alleviates the stress associated with parking accidents, making it easier for drivers to handle such situations.
- Community Support: The platform fosters a supportive community of drivers and witnesses, encouraging cooperative assistance during parking incidents.

**Privacy and Security:**
- Privacy of a Reporter (3rd Party Witness): As a 3rd party witness, you have the option to remain completely anonymous when reporting an accident between two other drivers. Your identity will never be disclosed to the involved parties, ensuring you can contribute valuable information without any concerns about personal exposure.
- Asymmetric Information Sharing: To further protect your privacy, "Leave A Note" operates on asymmetric information sharing. Only the damaged user will have access to the details of the hitting driver, while the reverse is not permitted. This ensures that the user who experienced the incident retains full control over the exchange of information, maintaining their privacy and personal safety.
---
## Roadmap

- **Multi-Language Support:** Recognizing our diverse user base, we plan to introduce multi-language support. Users will be able to interact with the platform in their preferred language, promoting inclusivity and ease of use for everyone.

- **Geo-Tagging and Mapping Integration:** To better understand incident locations, we will integrate geo-tagging and mapping functionalities. This will help users visualize the incident locations and provide a more accurate context for reporting and resolving parking incidents.

- **Image Download and Note Share as PDF:** In response to user requests, we will be introducing the ability to download incident images and notes as PDF files. This feature ensures users can keep a secure offline copy for their records or easily share the incident details with relevant parties.

- **User Feedback System for Problem and Bug Reports:** Your feedback matters to us! To provide a more streamlined way for users to report problems and bugs, we will introduce a user feedback system. This feature will allow you to submit any issues you encounter directly through the platform, enabling us to address and resolve them promptly.

## Directories
 - **assets**: Contains animations and images used throughout the app.

- **components**: Houses reusable UI components and specialized components:
  - **uiComponents**: Holds custom UI components used across the app.
  - **cameraComp.jsx**: Custom camera component designed for the app.

- **config**: Includes configuration files for seamless integration:
  - Firebase configuration files and other settings.

- **context**: Manages context-related functionality for the app:
  - **ThemeContext**: Handles the app's themes and visual styles.
  - **ContextProvider**: Main context provider for managing global state.

- **navigatorAuth**: Responsible for navigation components based on authentication status:
  - **BottomTabs**: Navigational layout for authenticated users.
  - **NotAuthenticatedStack**: Navigation stack for non-authenticated users.

- **pages**: Core screens and subdirectories for organizing features:
  - **kpi**: Analytics tailored for admin users to visualize app statistics.
  - **notesAndReports**: Components for creating and viewing notes and reports.
  - **profilePages**: Sections like accidents history, edit information, and password updates.

- **utils**: Contains utility resources for app functionality:
  - **interfaces**: Defines TypeScript interfaces for strong typing.
  - **validation**: Includes validation schemas (e.g., Joi) to ensure data integrity.
  - **notifications**: Houses helper functions for managing app notifications.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
This all can be found in the .env.example file, copy the following from firebase when creating a new project. 

`API_KEY`

`AUTH_DOMAIN`

`PROJECT_ID`

`STORAGE_BUCKET`

`MESSAGING_SENDER_ID`

`APP_ID`

`MEASUREMENT_ID`


This is for the notification you need to enable FCM with firebase.

`SERVER_KEY`


## Run Locally 
### Clone and install 

Clone the project from this link

```bash
   https://github.com/korenkaplan/Leave-A-Note.git
```

Go to the project directory

```bash
  cd Client/LeaveANote
```

Install dependencies

```bash
  npm install
```

### Create the .env file

To run this project, you will need to add the following environment variables to your .env file.
This all can be found in the .env.example file, copy the following from firebase when creating a new project. 

`API_KEY`

`AUTH_DOMAIN`

`PROJECT_ID`

`STORAGE_BUCKET`

`MESSAGING_SENDER_ID`

`APP_ID`

`MEASUREMENT_ID`

`SERVER_KEY`

### Launch the Project

```bash
  npm start
```

Choose Android

```bash
  a - run on Android
```

## API Reference - Context Functions
### Base URL: https://leave-a-note-nodejs-server.onrender.com/api
#### getUserQuery
Using the mongodb find method to search a user in the user's collection.

**Returned Value:** a user object with the projection fields or null if not found.


```HTTP Request:
POST /users/getUser
```

| Request-Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `query` | `object` | The properties to search by |
| `projection` | `object` | The properties to get back |

#### updateDeviceTokenInDb
Update the user's device in the database to keep it updated.

**Returned Value:** Void

```http
PUT /users/updateDeviceToken
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `deviceToken`      | `string` | `The user's device token for sending notifications` |
| `userId`      | `string` | `The user's ID in the database` |

#### reportsAndNotesDistributionData
Get the distribution data of the reports notes and unmatched reports.

**Authorization:** bearer token , role = 'Admin'

**Returned Value:** An object containing the amount of reports, notes and unmatched reports.

```http
POST /stats/reportsDistribution
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `role`      | `string` | `The user role, stats only available to the admin` |

#### registeredUsersData 
Get registered users' data per month for a specific year.

**Authorization:** bearer token , role = 'Admin'

**Returned Value:** An object containing the amount of regiserted user of a specific year.

```http
POST /stats/registeredUsersData
```
year	string	Year for filtering
role	string	User role for filtering
| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `year`      | `string` | `Year for filtering` |
| `role`      | `string` | `The user role, stats only available to the admin` |

#### loginAttempt
Make a sign in attempt.

**Returned Value:** A token containing the user id, experation time and role.

```http
POST /users/login '
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | `The email to search the user by` |
| `password`      | `string` | `the password of the user` |

#### signupAttempt
Register a new user.

**Returned Value:** A token containing the user id, experation time and role.

```http
POST /users/register'
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | `The user's name` |
| `email`      | `string` | `The user's email` |
| `password`      | `string` | `The user's password` |
| `carNumber`      | `string` | `The user's car number` |
| `phoneNumber`      | `string` | `The user's phone number` |
| `deviceToken`      | `string` | `The user's device token` |

#### submitNote
Submits a new note.

**Authorization:** bearer token

**Returned Value:** Void

```http
POST /notes/createNote'
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `damaged_user_car_num`      | `string` | ` The damaged user's car number` |
| `hitting_user_car`      | `string` | `The offending user's car number` |
| `hitting_user_phone`      | `string` | `The offending user's phone number` |
| `hitting_user_name`      | `string` | `The offending user's name` |
| `imageSource`      | `string` | `The url to the image of the accident.` |


#### submitReport
Create a new report

**Authorization:** bearer token

**Returned Value:** Void

```http
POST /reports/createReport '
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imageUrl`      | `string` | `The url to the image of the accident.` |
| `damagedCarNumber`      | `string` | `The damaged user's car number` |
| `hittingCarNumber`      | `string` | `The offending user's car number` |
| `isAnonymous`      | `bool` | `Determines whether the reporter will stay anonymous` |
| `reporter`      | `{name: string , phoneNumber:string}` | `` |

#### updateUserInformation
Update the user's inforamtion in the database.

**Authorization:** bearer token

**Returned Value:** Void

```http
POST /users/informationUpdate'
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | `The ID od  the user to update` |
| `update`      | `{email:str, phoneNUmber: str, carNumber:str,name:str}` | `The data to update` |

#### updateUserPassword
Update the user's password in the database.

**Authorization:** bearer token

**Returned Value:** Void

```http
POST /users/passwordUpdate'
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | `The ID od  the user to update` |
| `oldPassword`      | `string` | `Validate the old password before changing` |
| `newPassword`      | `string` | `The new password to update to` |

#### deleteAccident
Delete accident form the user's accident.

**Authorization:** bearer token

**Returned Value:** Void

```http
POST /users/deleteMessage'
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | `The ID od  the user to update` |
| `messageId`      | `string` | `The ID of the accident's message to delete` |

#### deleteFromUnreadMessages
Remove the message from the users inbox.

**Authorization:** bearer token

**Returned Value:** Void

```http
POST /users/deleteMessageInbox'
```

| Request-Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | `The ID od  the user to update` |
| `messageId`      | `string` | `The ID of the accident's message to delete` |
## Author & Feedback
- [@korenkaplan](https://github.com/korenkaplan)
- If you have any feedback, please reach out to us at korenkaplan96@gmail.com
