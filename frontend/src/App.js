
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JobListScreen from "./screens/JobListScreen";
import LoginRegisterScreen from "./screens/LoginRegisterScreen";
import UserScreen from "./screens/UserScreen";
import DentistListScreen from "./screens/DentistListScreen";
import AddDentistScreen from "./screens/AddDentistScreen";
import JobFormScreen from "./screens/JobFormScreen";
import ProductListScreen from "./screens/ProductListScreen";
import AddProductScreen from "./screens/AddProductScreen";
import DashboardScreen from "./screens/DashboardScreen";

function App() {
  /* const [user, setUser] = useState('');
  const [token, setToken] = useState('')
  const [login, setLogin] = useState(false);
  
  const cookies = new Cookies(); */
  

  
/*   useEffect(() => {
    setToken(cookies.get('mycookie'))
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/users/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          var data1 = response.data;
          setLogin(true)
        })
        .catch((error) => {
        });
    }
  }, [token]); */
  
  

  return (
    <div className="App">
      <Router>
        
        <ToastContainer />
        <Routes>
          {/**/}
          <Route exact path="/job_list" element={<JobListScreen />}/>
          <Route exact path="/" element={<DentistListScreen />}></Route>
          <Route exact path="/:name" element={<JobListScreen />}></Route>
          <Route exact path="quote/:name" element={<JobListScreen />}></Route>
          <Route exact path="/login" element={<LoginRegisterScreen />}></Route>
          <Route exact path="/dentist_list" element={<DentistListScreen />}></Route>
          <Route exact path="/user/:id" element={<UserScreen />}></Route>
          <Route exact path="/addDentist" element={<AddDentistScreen />}></Route>
          <Route exact path="/dentist/:id" element={<AddDentistScreen />}></Route>
          <Route exact path="/job/:id" element={<JobFormScreen />}></Route>
          <Route path="/job_reg/:name/:id" element={<JobFormScreen />}></Route>
          <Route  path="/productlist" element={<ProductListScreen />}></Route>
          <Route  path="/addproduct/" element={<AddProductScreen />}></Route>
          <Route  path="/editproduct/:id" element={<AddProductScreen />}></Route>
          <Route  path="/dashboard/" element={<DashboardScreen />}></Route>
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
