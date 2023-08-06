
# Leave a Note - Driver's Communication App

Leave A Note: Transforming Parking Incident Solutions. Our platform provides a secure and efficient way for users to leave notes and reports when direct communication is not possible. Facilitating smooth resolutions, whether you're involved in the incident or a supportive witness.

This repository exclusively hosts the client-side of our application. In addition, the application is further developed across two primary branches:
- 'main' Branch: This branch is for a ASP.NET Core SQL backend which can be found [here](https://github.com/korenkaplan/Leave-A-Note-NodeJS-Server).
- 'NET_Core_Version' branch:This branch is for a Node js mongoDB backend which can be found [here](https://github.com/korenkaplan/LeaveANoteServerProject).


##  Demo & Screenshots
- [Walkthrough demo youtube video](https://www.youtube.com/watch?v=FAv9v3SBU9I)
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

## Table Of Contents
1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [About The Idea](#about-the-idea)
4. [Roadmap - Future Improvements](#roadmap)
5. [Directories](#directories)
6. [Environment Variables](#environment-variables)
7. [Run Locally](#run-locally)
8. [Author & Feedback](#author--feedback)
   
## Tech Stack

**Client:** React-Native, Typescript (Currant Repository)

**Server for main branch :** Node, Typescript,  Express, Mongodb Atlas with Mongoose.

[Node.JS & Mongodb version Server side Repository](https://github.com/korenkaplan/Leave-A-Note-NodeJS-Server)


**Server for Net_Core_Backend branch :** ASP.NET Core 7 , Entity Framework 7.

[.NET 7 & SQL version Server side Repository](https://github.com/korenkaplan/LeaveANoteServerProject)


## Features

- Light/dark mode toggle
- User authentication with secure login and authorization using JWT Tokens.
- Background and Foreground notification system for new notes and reports using FCM. (Currently only for .NET Version)
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


### Launch the Project

```bash
  npm run start
```

Choose Android

```bash
  a - run on Android
```

## Author & Feedback
- [@korenkaplan](https://github.com/korenkaplan)
- If you have any feedback, please reach out to us at korenkaplan96@gmail.com
