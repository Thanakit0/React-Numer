import { useState, useEffect } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
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

const Taylor = () => {
    const print = () => {
        const datanew1 = data.map((e) => { return e.iteration });
        const datanew2 = data.map((e) => { return e.X });
        const datanew3 = data.map((e) => { return ans });

        const data_plot = {
            labels: datanew1,
            datasets: [
                {
                    label: "X predictions",
                    data: datanew2,
                    fill: true,
                    borderColor: 'rgb(253, 135, 255)',
                    backgroundColor: 'rgba(253, 135, 255, 0.5)'
                },
                {
                    label: "X real",
                    data: datanew3,
                    fill: true,
                    borderColor: 'rgb(1, 255, 179)',
                    backgroundColor: 'rgba(1, 255, 179, 0.5)'
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
                    text: 'Taylor Line Chart',
                }
            },
        };
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="20%"><center>Iteration</center></th>
                            <th width="40%"><center>X</center></th>
                            <th width="40%"><center>Error</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td><center>{element.iteration}</center></td>
                                    <td>{element.X}</td>
                                    <td>{element.error}</td>

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

    const error = (x_pre, x_real) => Math.abs((x_real - x_pre) / x_real) * 100;

    const factorial = (n) => {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    const deri = (x0, n) => {
        var diff = Equation, Answer, scope;
        scope = {
            x: x0,
        }
        for (var i = 0; i < n - 1; i++) {
            diff = derivative(diff, 'x')
        }
        Answer = derivative(diff, 'x').evaluate(scope)

        return Answer;
    }

    const cal_fX = (x, x0, n) => {
        var fX0, scope, fX_iter, deri_equation;
        scope = {
            x: x0,
        }
        fX0 = evaluate(Equation, scope)

        if (n === 0) {
            return fX0;
        } else {
            fX_iter = fX0;
            for (var i = 1; i <= n; i++) {
                deri_equation = deri(x0, i);
                fX_iter += (Math.pow(x - x0, i) / factorial(i)) * deri_equation;
                console.log("x iter: " + fX_iter)
                if (i === n) {
                    console.log("x: " + (Math.pow(x - x0, i) / factorial(i)) * deri_equation);
                    //console.log("x iter: "+fX_iter)
                    console.log("pow: " + Math.pow(x - x0, i))
                    console.log("fac: " + factorial(i))
                    console.log("deri: " + deri_equation)
                    console.log("--------------")
                }
            }
            return fX_iter;
        }
    }

    const Calculate = (x, x0, n) => {
        var obj = {};
        var iter = 0;
        const e = 0.00001;
        var fX, scope, x_iter, ea;
        scope = {
            x: x,
        }
        fX = evaluate(Equation, scope)
        do {
            x_iter = cal_fX(x, x0, iter);
            iter++;
            ea = error(x_iter, fX);
            obj = {
                iteration: iter,
                X: x_iter,
                error: ea,
            }
            data.push(obj)
        } while (iter < n && ea > e );

        //find x real 
        scope = {
            x: x,
        }
        ans = evaluate(Equation, scope)
        setX_real(ans)
        console.log("X real: " + x_real)
        setX_predict(x_iter);
    }
    var ans;
    const data = [];
    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^3) ")
    const [X, setX] = useState(4)
    const [X0, setX0] = useState(2)
    const [N, setN] = useState(10)
    const [X_predict, setX_predict] = useState(0)
    const [x_real, setX_real] = useState(0)

    const inputEquation = (event) => {
        setEquation(event.target.value)
    }
    const inputX = (event) => {
        setX(event.target.value)
    }
    const inputX0 = (event) => {
        setX0(event.target.value)
    }
    const inputN = (event) => {
        setN(event.target.value)
    }

    const calculateRoot = () => {
        const xnum = parseFloat(X)
        const xNnum = parseFloat(N)
        const x0num = parseFloat(X0)
        Calculate(xnum, x0num, xNnum);

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
        setX(API[rand].X_point)
        setX0(API[rand].Xl)
        setN(API[rand].N)
    }

    return (
        <Container>
            <Form >
                <br />
                <center><h3><b>Solving systems root of an equation using<br />
                    Taylor series</b></h3>
                    <Form.Group className="mb-3">
                        <br />
                        <Form.Label>Input f(x)</Form.Label><br />
                        <div className="d-inline-flex p-2">
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "65%", margin: "0 auto" }} className="form-control"></input>
                        <Button type="button"  variant="outline-secondary" onClick={Randoms}>
                            Random
                        </Button>
                        </div><br/>
                        <Form.Label>Input X(point)</Form.Label>
                        <input type="number" id="X" value={X} onChange={inputX} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                        <Form.Label>Input x0</Form.Label>
                        <input type="number" id="X0" value={X0} onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                        <Form.Label>Input order</Form.Label>
                        <input type="number" id="n" value={N} onChange={inputN} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </center>
            </Form>
            <br></br>
            <pre><h5><b>  Answer = {X_predict.toPrecision(7)}</b></h5></pre>
            <Container>
                {html}
            </Container>
        </Container>
    )
}

export default Taylor