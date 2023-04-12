# FDM Employe E-Portal

### Description :
This is a group project assigned by the consultancy company FDM. The objective was to develop an employee portal for their users. 
This includes a login system with different access levels based on the account type, as well as the ability to request help, submit an annual leave
Features included a login system with a hierarchy and features based on the types of users, including a support ticket system and the ability to submit annual leave requests. 
The prototype was developed using React JS and a Mongo DB backend.

### Log in page

![image](https://user-images.githubusercontent.com/56612823/231566196-46dc5418-c79d-4454-9ce1-ecf66d8d7ea0.png)
This is the login page, which lets you enter your login credentials

e.g Username (yaseen), Password (test)

### Main Dashboard Home Page

<img src="C:\Users\yasee\Downloads\FDM-Employee-Portal-main\FDM-Employee-Portal-main\img.png" />

The main home page for all users features a carousel of FDM's core values and useful links to different aspects of the site. It also includes a Twitter feed to allow employees to stay up to date with company news.

<img src="https://user-images.githubusercontent.com/78224090/193462914-e597436c-e406-4ef9-b448-05fb6e0a81a3.PNG" />



### Technologies used :
    - HTML/CSS/Javascript
    - React JS including components from Primereact
    - React Bootstrap
    - MongoDB
    
### Functionalities implemented :
    - Login system with a user hierarchy (employee, it support, human resources, manager, admin)
    - Home page with navigation to other sections of the portal
    - Employees can submit IT/HR support tickets containing a title and description of their issue.
    - Employees can submit a request for annual leave.
    - Employees can view their profile page.
    - Employees can modify their profile page.
    - Managers can handle and respond to support tickets.
    - Managers can approve or deny annual leave requests.
    - Managers can send notifications to other accounts or a group of accounts.
    - Administrators can make accounts for the system.
    - Administrators can block accounts

### Setup :
    (01) - Install Node and Yarn
    (02) - Open CMD in the employee portal directory
    (03) - Install libraries using the command "npm install"
    (04) - Type "cd backend" and enter the command "node api.js"
    (05) - Open a new terminal at the file directory
    (06) - Enter the command "yarn start" and visit the URL specified
    (07) - Enter "yasee" for the username and "test" as the password. This is an admin account and provides all functionalities of the site.
