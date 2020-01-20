# Social Network Advertising
This project was created using the Angular CLI (v. 7.2.0) and the Node.js (v. 10.15.3) server environment. The following packages (dependencies) are used for the server side: cors (v. 2.8.5), express (v. 4.16.4), mysql (v. 2.16.0), nodemon (v. 1.18.11). The following packages are used for the client part: bootstrap, jquery, font-awesome, angular-font-awesome.
The "SocialNetworkAdvertising" application includes the following user roles: customer, performer, admin.
Description of roles:
* The customer has the opportunity to order advertising on popular social networks. Customers can use data filtering to find the right ad. They can also view their advertising orders and their status.
* The performer has the opportunity to offer his services of advertising on social networks. The performer may confirm or reject the customer's order. 
* The administrator has the ability to create, edit and delete data.

Users have the ability to edit their profile.
All data is stored in the MySQL database "socialnetworksadvertising". The server interacts with the database using SQL queries (CRUD) and stored procedures.

## Requirements

* Node.js
* Angular CLI
* XAMPP-Control
* Git

## Common setup

### Clone the repository ###

```bash
git clone https://github.com/bodnya29179/SocialNetworkAdvertising-Task.git
```
Also you can download the repository as a `.zip` file.

### Install npm packages (dependencies) ###

```bash
cd back-end_nodejs
npm install
npm install express --save
npm install cors --save
npm install mysql --save
npm install nodemon --save
```

```bash
cd front-end_angular/my-app
npm install
npm install bootstrap --save
npm install jquery --save
npm install font-awesome --save
npm install angular-font-awesome --save
```

Shut it down manually with `Ctrl-C`.

### Install XAMPP-Control ###
Install XAMPP-Control using this link https://www.apachefriends.org/ru/download.html.
Paste the `socialnetworksadvertising` folder in the following directory: `..\xampp\mysql\data`. In the end you will have the path `..\xampp\mysql\data\socialnetworksadvertising`. Three files should to be in the `socialnetworksadvertising` folder.

## Run

Run the program `XAMPP Control Panel`. Start `Apache` and `MySQL` modules.

Navigate to `back-end_nodejs` folder using `cd back-end_nodejs` in the terminal. Use `nodemon server.js` for a run back-end part.

Navigete to `front-end_angular\my-app` folder using `cd front-end_angular\my-app` in the terminal. Use `ng serve` for a run front-end part. Navigate to `http://localhost:4200/` in your browser. You can also use the `ng serve -o` in the terminal to automatically open a web page.

## ScreenShots

Note: All data are invented.

### Sign in and Sign up pages

#### Sing in page
<img src="https://i.ibb.co/jZqVC0S/1.png" alt="Sing in">

#### Sing up page
<img src="https://i.ibb.co/z4qmnhj/2.png" alt="Sing up">

### Customer pages examples

#### Services page
<img src="https://i.ibb.co/XLwJskf/3.png" alt="Services page">

#### Orders page
<img src="https://i.ibb.co/6FBVNqv/4.png" alt="Orders page">

#### Profile edit page
<img src="https://i.ibb.co/GJBc42h/5.png" alt="Profile edit page">

### Performer pages examples

#### Service create form
<img src="https://i.ibb.co/NFMnwQD/6.png" alt="Service create form">

#### Orders
<img src="https://i.ibb.co/L5TgB7d/7.png" alt="Orders page">

### Admin page example

<img src="https://i.ibb.co/BtCb8bf/8.png" alt="Social networks details page">
