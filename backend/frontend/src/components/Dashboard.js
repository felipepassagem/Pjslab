import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [chartData, setData1] = useState([]);
  const [chartData2, setData2] = useState([]);
  const [chartData3, setData3] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mprice, setMprice] = useState(0);
  const [data, setData] = useState([]);
  const [unfinished, setUnfinished] = useState([]);
  const [unpayed, setUnpayed] = useState(0);
  const [unpayedquant, setUnpayedquant] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [ finished, setFinished] = useState(0)
  const navigate = useNavigate();

  const cookies = new Cookies();
  var token = cookies.get("mycookie");

  useEffect(() => {
    if (!token) {
      cookies.remove("mycookie")
      navigate("/login", { replace: true });
    }
  });

  const setjobss = (x) => {
    setJobs(x);
  };

  const test = (x) => {
    setData1(x);
  };

  const test2 = (x, y) => {
    setMprice(x);
    setData(y);
  };

  const getChartData2 = (x) => {
    setData2(x);
  };
  const getChartData3 = (x) => {
    setData3(x);
  };
  //const navigate = useNavigate();

  /*   const sort_object = (obj) => {
    items = Object.keys(obj).map(function (key) {
      return [key, obj[key]];
    });
    items.sort(function (first, second) {
      return second[1] - first[1];
    });
    sorted_obj = {};
    $.each(items, function (k, v) {
      use_key = v[0];
      use_value = v[1];
      sorted_obj[use_key] = use_value;
    });
    return sorted_obj;
  } */
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  //barchart1 data
  useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/jobs/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          var data = response.data.sort((a, b) => {
            if (a.dentist > b.dentist) {
              return 1;
            }
            if (a.dentist < b.dentist) {
              return -1;
            }
            return 0;
          });

          //reduce equal itens on data
          /* const groups = data.reduce(
            (dentists, item) => ({
              ...dentists,
              [item.dentist]: [...(dentists[item.dentist] || []), item],
            }),
            {}
          ); */

          // count same name
          let numbers = data.reduce((acc, child) => {
            if (!acc[child.dentist]) {
              acc[child.dentist] = 0;
            }
            acc[child.dentist]++;
            return acc;
          }, {});

          var dataArr = Object.entries(numbers);
          //numero de labels
          var sortedArray = dataArr.slice(0, 8).sort(function (a, b) {
            return b[1] - a[1];
          });

          var chartDataSorted = {
            labels: sortedArray.map((label) => {
              return label[0];
            }),
            datasets: [
              {
                label: "Trabalhos x Dentista",
                data: sortedArray.map((label) => {
                  return label[1];
                }),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          };
          //cards
          var tempjobs = [];
          var finished = 0
          var openvalues = 0.0;
          var unpayedquant = 0;
          response.data.map((job) => {
            if (job.isFinished == false) {
              tempjobs.push(job);
            } else {
              finished += 1
            }
            if (job.isPayed == false) {
              openvalues = +openvalues + +job.price;
              unpayedquant++;
            }
          });
          setFinished(finished)
          setUnfinished(tempjobs.length);
          setUnpayed(openvalues);
          setUnpayedquant(unpayedquant);
          setIsLoading(true);
          test(chartDataSorted);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoading]);

  useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/products/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          var data = response.data.sort((a, b) => {
            if (a.buyDate > b.buyDate) {
              return 1;
            }
            if (a.buyDate < b.buyDate) {
              return -1;
            }
            return 0;
          });

          var tempprice = [];
          var tempdate = [];
          var temp = [];

          let test = data.map((product, index) => {
            
            tempdate.push(product.buyDate.slice(0, 7).split("-").join(""));
            tempprice.push(product.price * product.quantity);
            temp.push([ tempdate[index], tempprice[index] ]);
          });
          

          var mprice = 0
          var testprice = []

          for(var i = 0; i < tempdate.length; i++){
            if(tempdate[i] == tempdate[i +1]){
              mprice += +(tempprice[i])
            } else {
              mprice += +(tempprice[i])
              testprice.push(mprice)
              mprice = 0
            }
          }
          var unique = tempdate.filter(onlyUnique)
          

          var dataArr = []
          
          for(var i = 0; i < unique.length; i++){
            dataArr.push([unique[i], testprice[i]])
          }
          
          
          dataArr = dataArr.slice(0,12)

          var chartDataSorted = {
            labels: dataArr.map((label) => {
              return label[0];
            }),
            datasets: [
              {
                label: "Gasto x Mês",
                data: dataArr.map((label) => {
                  return parseFloat(label[1]).toFixed(2);
                }),
                backgroundColor: [
                  
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 0.7)"],
                borderWidth: 1,
              },
            ],
          };

          getChartData2(chartDataSorted)
          
          
          //////continuar aqui
          
          /* const usersByYear = temp.reduce((acc, value) => {
            // Group initialization
            if (!acc[value[0]]) {
              acc[value[0]] = [];
            }
          
            // Grouping
            acc[value[0]].push(value);
          
            return acc;
          }, {});

          var data = Object.entries(usersByYear)
          
          console.log(data) */
          
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoading]);

  

  useEffect(() => {
    if (chartData === []) {
      if (isLoading == false) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
    if (chartData2 === []) {
      if (isLoading == false) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [chartData, mprice]);
  //linechart1 data
  /*   useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/products/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          //setProducts(response.data);
          var products = response.data;
          console.log(products);
          var monthYearList = [];
          var listList = [];
          var temp = [];
          var totalPrice = 0;
          var priceList = [];
          var month;
          var year;
          var x;
          var len = products.length;
          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-");
            x = month[1] + month[0];
            monthYearList.push(x);
          }
          for (var i = 0; i < len; i++) {
            month = products[i].buyDate.split("-")[1];
            year = products[i].buyDate.split("-")[0];
            var date = month + year;
            if (date == monthYearList[i + 1]) {
              temp.push(products[i]);
            } else {
              temp.push(products[i]);
              listList.push(temp);
              temp = [];
            }
          }
          for (var i = 0; i < listList.length; i++) {
            for (var l = 0; l < listList[i].length; l++) {
              totalPrice +=
                parseFloat(listList[i][l].price).toFixed(2) *
                parseFloat(listList[i][l].quantity).toFixed(2);
            }
            priceList.push(totalPrice);
            totalPrice = 0;
          }
          var unique = monthYearList.filter(onlyUnique);
          //test2(priceList, listList);

          var arrayOfObject = priceList.map(function (value, index) {
            return [value, unique[index]];
          });
          
          var sortedArray = arrayOfObject.sort(function (a, b) {
            return parseFloat(a[1]) - parseFloat(b[1]);
          });
          
          var chartDataSorted = {
            labels: sortedArray.map((label) => {
              return label[1];
            }),
            datasets: [
              {
                label: "Gasto / Mes",
                data: sortedArray.map((label) => {
                  return parseFloat(label[0]).toFixed(2);
                }),
                backgroundColor: [
                  "rgba(54, 162, 235, 1)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          };

          getChartData2(chartDataSorted);
          setIsLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoading]); */

  const setJobss = async (resp) => {
    var jobss = resp;
    return jobss;
  };

    useEffect(() => {
    if (token !== undefined) {
      axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/jobs/",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          
          var jobs = response.data
          //var data = response.data;
          var monthYearList = [];
          var listList = [];
          var temp = [];
          var totalPrice = 0;
          var priceList = [];
          var month;
          var year;
          var x;
          var len = jobs.length;
        
          for (var i = 0; i < len; i++) {
            if(jobs[i].isPayed == true){
              month = jobs[i].finishedAt.split("-");
              x = month[0] + month[1];
              monthYearList.push(x);
            }
            
          }
          
          for (var i = 0; i < len; i++) {
            month = jobs[i].finishedAt.split("-")[1];
            year = jobs[i].finishedAt.split("-")[0];
            var date = month + year;
            if(jobs[i].isPayed){
              if (date == monthYearList[i + 1]) {
                temp.push(jobs[i]);
              } else {
                temp.push(jobs[i]);
                listList.push(temp);
                temp = [];
              }
            }
          }
          

          //aquiiiiiiiiiiiiiiiiiiiiiiiiiiii
          for (var j = 0; j < listList.length; j++) {
            for (var l = 0; l < listList[j].length; l++) {
              totalPrice += +parseFloat(listList[j][l].price).toFixed(2);
            }
            priceList.push(parseFloat(totalPrice).toFixed(2));
            totalPrice = 0;
          }
          /* console.log(monthYearList)
          console.log(priceList) */
          var list = []

          for(var i=0; i < priceList.length; i++){
            list.push([monthYearList[i], priceList[i]])
          }

          
          
          
           var unique = monthYearList.filter(onlyUnique);
          
          //console.log(test2(priceList, listList));
          

          /* var arrayOfObject = priceList.map(function (value, index) {
            return [value, unique[index]];
          }); */

          
           var list = list.sort(function (a, b) {
            return a[0] - b[0];
          }); 
           

          var dates = []
          var values = []

          for(var i=0; i < list.length; i++){
            dates.push(list[i][0])
            values.push(list[i][1])
          }

          /* console.log(dates)
          console.log(values) */

          
          var mvalue = 0
          var valueList = []

          
          for(var i=0; i < dates.length; i++){
            if(dates[i] == dates[i+1]){
              mvalue += +(values[i])
            } else {
              mvalue += +(values[i])
              valueList.push(mvalue)
              mvalue = 0
            }
          }

          var unique = dates.filter(onlyUnique);
          console.log(unique)
          console.log(valueList)
          

          
          

          /* for(var i = 0; i < sortedArray.length; i++){
            if(sortedArray[i][1] == undefined){
              
              sortedArray.splice(i)
            }
          } */

           var chartDataSorted = {
            labels: unique.map((label) => {
              return label;
            }),
            datasets: [
              {
                label: "Recebido x Mes",
                data: valueList.map((label) => {
                  return label;
                }),
                backgroundColor: [
                  "rgba(54, 162, 235, .3)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          }; 
          
          getChartData3(chartDataSorted); 
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoading]); 

  return (
    <div>
      
      <Container>
        <Row>
        <Col className="mt-3" md={3}>
            <Card>
              <Card.Header>Finalizados</Card.Header>
              <Card.Body>{finished}</Card.Body>
            </Card>
          </Col>
          <Col className="mt-3" md={3}>
            <Card>
              <Card.Header>Não finalizados</Card.Header>
              <Card.Body>
                {parseFloat(unfinished) > 0 ? unfinished : "--"}
              </Card.Body>
            </Card>
          </Col>
          <Col className="mt-3" md={3}>
            <Card>
              <Card.Header>Não pagos</Card.Header>
              <Card.Body>{unpayedquant}</Card.Body>
            </Card>
          </Col>
          
          <Col className="mt-3" md={3}>
            <Card>
              <Card.Header className="">Total em aberto</Card.Header>
              <Card.Body>{unpayed}</Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col className="mt-2" md={6}>
            {chartData3.length != 0 ? (
              <LineChart chartData={chartData3}></LineChart>
            ) : (
              "Insficient data"
            )}
          </Col> 
          
          
           <Col className="mt-2" md={6}>
            {chartData2.length != 0 ? (
              <LineChart chartData={chartData2}></LineChart>
            ) : (
              "Insficient data"
            )}
          </Col> 
          <Col className="mt-2" md={6}>
            {chartData.length != 0 ? (
              <BarChart chartData={chartData}></BarChart>
            ) : (
              "Insficient data"
            )}
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
