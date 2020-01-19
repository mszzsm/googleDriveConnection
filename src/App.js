import React  from 'react';
import './App.css';
import Async from 'react-async';

function App() {
    let myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const loadUsers = () =>
        fetch("https://sheets.googleapis.com/v4/spreadsheets/15POFFJyDdbc5ayKIYluJ1kC0dyENq-euriFn7bKuT6E/values/01.2020!A1:Q37?access_token=ya29.Il-6B7axWifh-P_BJMtmAzVIT4a_UFng9zyeQ2eK1gFF7w9ud-QxpNf_gHtXoZcYAnd-redMp5dwBUimp-qD15mbU0nFrY65oqeKtupboXZo0L2USKCx-xR8mjxXhTaWkw", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));



  return (
    <div className="App">
      <header className="App-header">
        <p>
          here will be a result of our fetch from google drive
        </p>
          <Async promiseFn={loadUsers}>
              {({ data, err, isLoading }) => {
                  if (isLoading) return "Loading..."
                  if (err) return `Something went wrong: ${err.message}`

                  if (data)
                      return (
                          <div>
                              <div>
                                  <h2>React Async - Random Users</h2>
                              </div>
                              {data.map(user=> (
                                  <div key={user.username} className="row">
                                      <div className="col-md-12">
                                          <p>{user.name}</p>
                                          <p>{user.email}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )
              }}
          </Async>
      </header>
    </div>
  );
}

export default App;
