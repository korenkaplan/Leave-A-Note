# "Leave A Note"  Documentation
Leave A Note is a revolutionary platform designed to address the challenges drivers face during parking incidents or accidents when direct communication with the other party is not possible. Our goal is to provide a secure and efficient way for users to leave notes and reports for each other, ensuring a smooth resolution even in the absence of the other driver or when acting as a witness to a parking incident.

---
![App Screenshot](https://imgur.com/uuAI0PO)

## Table Of Content
1. [Source and Demo, Future Features for Upcoming Versions](#source-and-demo-future-features-for-upcoming-versions)
2. [Introduction](#introduction)
3. [Directories](#directories)
   



## Source And Demo, Future Features for Upcoming Versions

**App Video Demo:**
- [Walkthrough demo video](https://www.youtube.com/watch?v=FAv9v3SBU9I)

**Source Code on GitHub:**
- [.NET 7 & SQL version Server side Repository](https://github.com/korenkaplan/LeaveANoteServerProject)
- [Node.JS & Mongodb version Server side Repository](https://github.com/korenkaplan/Leave-A-Note-NodeJS-Server)
  

**Future Features for Upcoming Versions (Current Version 1.0):**
1. **Multi-Language Support:** Recognizing our diverse user base, we plan to introduce multi-language support. Users will be able to interact with the platform in their preferred language, promoting inclusivity and ease of use for everyone.
2. **Geo-Tagging and Mapping Integration:** To better understand incident locations, we will integrate geo-tagging and mapping functionalities. This will help users visualize the incident locations and provide a more accurate context for reporting and resolving parking incidents.
3. **Image Download and Note Share as PDF:** In response to user requests, we will be introducing the ability to download incident images and notes as PDF files. This feature ensures users can keep a secure offline copy for their records or easily share the incident details with relevant parties.
4. **User Feedback System for Problem and Bug Reports:** Your feedback matters to us! To provide a more streamlined way for users to report problems and bugs, we will introduce a user feedback system. This feature will allow you to submit any issues you encounter directly through the platform, enabling us to address and resolve them promptly.
---

## Introduction

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

## Branches: Two Versions Available

Leave A Note offers two different versions to suit your backend preferences: the **.NET Core SQL Version** and the **Node.js MongoDB Version**.

### .NET Core SQL Version

The `.NET Core SQL Version` branch is designed for those who prefer to work with the .NET ecosystem and utilize SQL databases. This version offers:

- **Robust Ecosystem:** Leveraging the capabilities of the .NET Core framework, this version provides a strong and well-supported backend ecosystem.
- **SQL Database:** Utilizing a SQL database (such as SQL Server), this version offers reliable data storage and querying.
- **Scalability:** With proper architecture and optimization, this version can handle scaling to accommodate increasing user demands.

To access the `.NET Core SQL Version` source code and set up instructions, visit the repository here: [Leave A Note .NET Core SQL Version](https://github.com/korenkaplan/LeaveANoteServerProject).

### Node.js MongoDB Version

The `Node.js MongoDB Version` branch is tailored for developers who prefer working with Node.js and MongoDB for their backend needs. This version provides:

- **Node.js Flexibility:** Utilizing the Node.js runtime, this version allows for event-driven and non-blocking I/O operations.
- **MongoDB Database:** The use of a MongoDB database provides a schema-less and flexible approach to data storage.
- **Modern Web Development:** Leveraging JavaScript for both frontend and backend development, this version aligns with modern web development trends.

To explore the `Node.js MongoDB Version` source code and setup instructions, head over to the repository: [Leave A Note Node.js MongoDB Version](https://github.com/korenkaplan/Leave-A-Note-NodeJS-Server).

Whichever version you choose, both are designed to empower you in creating a seamless and efficient experience for users of the "Leave A Note" platform.


---
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

