<h1>NL2SQL Translation System</h1>

End-to-end solution for converting natural language queries to SQL using React frontend and Python backend
<h3>Demo on YouTube</h3>
https://youtu.be/ePS7UmnFpZI
<br>
<h3>Repository Structure</h3>
This repository contains 3 folders, front-end, back-end and model_training<br>
Folder front-end contains code for React Web UI, along with Redux, Saga and Slices implementation.<br>
Folder back-end contains code for Python FastAPI code, which is used for APIs which are used for query processing.<br>
Folder model_training contains all the data used for training the model to predict SQL queries. It contains .ipynb files, dataset csv and resultant model export jsons and tesnors.<br>
Current stable version of explorted model is inside folder sql_generator-nl2sql, which is generated with help of NL2SQL_Cleaned.csv and model_training-nl2sql.ipynb<br>

<h3>Architecture of the project.</h3>
<img src="./Architecture.png" title="Project Architecture">

<h3>Key Features</h3>
1. Natural language understanding with schema linking<br>
2. Dynamic few-shot learning implementation<br>
3. React-based query interface<br>
<img src="./UI Snapshot.png" title="UI Snapshot">

Report for this project is available as Project Report.pdf in base directory.<br>

<h3>Installation</h3>
1. Clone repo<br>
2. Install dependencies:<br>
    Install React App dependencies<br>
    1) cd front-end/nl2sql<br>
    2) npm install  <br>
    Install Python FastAPI dependency and Model use requirements<br>
    1)cd back-end  <br>
    2) pip install -r requirements.txt  <br>

<h3>Usage</h3>
Start backend API using following commands<br>
1. cd back-end<br>
2. uvicorn main:app --reload<br>
Now, the backend is loaded onto http://localhost:8000. You can view the API documentaion at http://localhost:8000/docs<br>

Launch React app using following commands<br>
1. cd front-end/nl2sql<br>
2. npm start<br>
This will start the front end server on your local at http://localhost:3000<br>

- Input natural language query<br>
- View generated SQL and results<br>

<h3>Model Training</h3>
All the code for training of T5small model is present inside the folder model_training.<br>
The code used for the current active version of trained model is inside model_training-nl2sql.ipynb file. This file uses NL2SQL_Cleaned.csv as input source. The output of this training is saved inside sql_generator-nl2sql folder which is again saved in back-end directory for using into API.<br>
