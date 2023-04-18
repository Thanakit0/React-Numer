import { useState, useEffect } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Secant = () => {
    const print = () => {
        const datanew1 = data.map((e) => { return e.iteration });
        const datanew2 = data.map((e) => { return e.X0 });
        const datanew3 = data.map((e) => { return e.X1 });
        const datanew4 = data.map((e) => { return e.X2 });

        const data_plot = {
            labels: datanew1,
            datasets: [
                {
                    label: "X0",
                    data: datanew2,
                    fill: true,
                    borderColor: 'rgb(253, 135, 255)',
                    backgroundColor: 'rgba(253, 135, 255, 0.5)'
                },
                {
                    label: "X1",
                    data: datanew3,
                    fill: true,
                    borderColor: 'rgb(1, 255, 179)',
                    backgroundColor: 'rgba(1, 255, 179, 0.5)'
                },
                {
                    label: "X2",
                    data: datanew4,
                    fill: true,
                    borderColor: 'rgb(110, 217, 249)',
                    backgroundColor: 'rgba(110, 217, 249, 0.5)'
                },
            ]
        };
        ChartJS.defaults.font.size = 20;
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 16,
                        },
                    },
                },
                title: {
                    display: true,
                    text: 'Secant Line Chart',
                }
            },
        };
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%"><center>Iteration</center></th>
                            <th width="30%"><center>X0</center></th>
                            <th width="30%"><center>X1</center></th>
                            <th width="30%"><center>X2</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td><center>{element.iteration}</center></td>
                                    <td>{element.X0}</td>
                                    <td>{element.X1}</td>
                                    <td>{element.X2}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
                <div >
                <br /><br /><br /><br />
                    <Line data={data_plot} options={options} />
                    <br /><br /><br />
                </div>
            </Container>
        );
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calculate = (x0, x1) => {
        var x2, fX0, fX1, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};

        do {
            scope = {
                x: x0
            }
            fX0 = evaluate(Equation, scope);
            scope = {
                x: x1
            }
            fX1 = evaluate(Equation, scope);
            x2 = x1 - ((fX1 * (x1 - x0)) / (fX1 - fX0));
            ea = error(x1, x2);
            iter++;
            obj = {
                iteration: iter,
                X0: x0,
                X1: x1,
                X2: x2,
            }
            data.push(obj);
            x0 = x1;
            x1 = x2;
        } while (ea > e && iter < MAX)
        setX(x2)
    }

    const data = [];
    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("2x^3-2x-5")
    const [X, setX] = useState(0)
    const [X0, setX0] = useState(1)
    const [X1, setX1] = useState(2)

    const inputEquation = (event) => {
        setEquation(event.target.value)
    }
    const inputX0 = (event) => {
        setX0(event.target.value)
    }
    const inputX1 = (event) => {
        setX1(event.target.value)
    }

    const calculateRoot = () => {
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        Calculate(x0num, x1num);

        setHtml(print());
    }

    const [API, setAPI] = useState({})
    async function fetchData() {
        try {
            const res = await fetch('http://localhost:8080/rootofequation');
            const data = await res.json(); 
            setAPI(data);
        } catch (err) {
            console.log("Error!!!" + err);
        }
    }
    useEffect(() => {
        fetchData();
    }, []) 

    const Randoms = () => {
        var n = API.length
        var rand = Math.floor(Math.random() * ((n-1)+1)) //random number of api
        setEquation(API[rand].Equation)
        setX0(API[rand].Xl)
        setX1(API[rand].Xr)
    }

    return (
        <Container>
            <Form >
                <br />
                <center><h3><b>Solving systems root of an equation using<br />
                    Secant method</b></h3>
                    <Form.Group className="mb-3">
                        <br />
                        <Form.Label>Input f(x)</Form.Label><br />
                        <div className="d-inline-flex p-2">
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "65%", margin: "0 auto" }} className="form-control"></input>
                        <Button type="button"  variant="outline-secondary" onClick={Randoms}>
                            Random
                        </Button>
                        </div><br/>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" value={X0} onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                        <Form.Label>Input X1</Form.Label>
                        <input type="number" id="X1" value={X1} onChange={inputX1} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </center>
            </Form>
            <br></br>
            <pre><h5><b>  Answer = {X.toPrecision(7)}</b></h5></pre>
            <Container>
                {html}
            </Container>
        </Container>
    )
}

export default Secant