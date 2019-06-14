<h1>Report System Project</h1>

<h3>Abstract</h3>
<p>To begin, clone the repor and run <code>npm install</code>. Edit the <b>.envtest</b> file to add your MongoDB database link.</p>
<p>The idea behind this project was to create a full stack Node.js program that had a real world application. 
With this you can register and create reports (logs) to document changes on a project.</p>

<p>This project uses Express as backend server-side framework, MongoDB as database, and MVC as design pattern.</p>
<p>I might refactor this project later and use the backend as a just-api service, with a React application on the front end.
That would involve token/cookie authentication on the front end, something that I just don't know how to handle yet.</p>

<ul>
    <li>/authentication contains the authentication middleware. It pretty much validates the current user and allows the request to pass to the next step</li>  
    <li>/controllers contains the Log.js and User.js controllers. Those two basically have the route action methods.</li>
    <li>/models contains the Log.js and User.js MongoDB models.</li>
    <li>/public contains the stylesheets</li>
    <li>/routes contains the routes for /user and /log. The user routes have the registration process due to passport.js standarts</li>
    <li>/test contains the test files. Those are empty for the moment.</li>
    <li>/utils have the log and user utility methods for handling database actions, login, and so on.</li>
    <li>/views have the views files, all of those are <code>.ejs</code> files.</li>
</ul>
