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

![image](https://user-images.githubusercontent.com/56612823/231566398-b6c8059d-ea3d-4cfa-ab55-2938af9b3eec.png)

The main home page for all users features a slideshow of FDM's core values and useful links to different aspects of the site. It also includes a Twitter feed to allow employees to stay up to date with company news, in addition to cards for diiferent parts of the e-portal.

![image](https://user-images.githubusercontent.com/56612823/231569962-bbc0a188-8374-4ac5-a99b-3409e63bebe9.png)

Above is an image of the side bar, which differs from employee to admin to limit functionality for the average user.

![image](https://user-images.githubusercontent.com/56612823/231571178-7c363feb-6b20-4130-9896-d6d16a98835f.png)

This is the support page.

![image](https://user-images.githubusercontent.com/56612823/231571279-b1030a41-9b15-4332-b395-0f1c3d50c936.png)

View current tickets open.

### Technologies used :
    - HTML/CSS/Javascript
    - React JS including components from react and Primereact for styling 
    - React Bootstrap for styling
    - MongoDB for the database
    
### Functionalities implemented :
    - Login system with a user hierarchy (employee, it support, human resources, manager, admin)
    - Home page with navigation to other sections of the portal
    - Employees can submit help support tickets for different aparetments, containing a title and description of their issue.
    - Employees can submit a request for annual leave.
    - Employees can view their profile page.
    - Employees can modify their profile page.
    - Employess can send others a message/notice
    - Managers can handle and respond to support tickets.
    - Managers can approve or deny annual leave requests.
    - Managers can send notifications to other accounts or a number of accounts.
    - Administrators can make accounts for the system.
    - Administrators can block accounts

### Setup :
    (01) - Install Node and Yarn
    (02) - Open CMD in the employee portal directory
    (03) - Install libraries using the command "npm install"
    (04) - Install yarn "npm install -g yarn"
    (04) - Type "cd backend" and enter the command "node api.js"
    (05) - Open a new terminal at the file directory
    (06) - Enter the command "yarn start" and visit the URL specified
    (07) - Enter "yaseen" for the username and "test" as the password. This is an admin account and provides all functionalities of the site.
