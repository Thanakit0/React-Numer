import { useState, useEffect} from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'

const Fixed_Point = () => {
    const print = () => {
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%"><center>Iteration</center></th>
                            <th width="30%"><center>X0</center></th>
                            <th width="30%"><center>X1</center></th>
                            <th width="30%"><center>Error</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td><center>{element.iteration}</center></td>
                                    <td>{element.X0}</td>
                                    <td>{element.X1}</td>
                                    <td>{element.error}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calculate = (x0) => {
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        var scope, x1, ea;

        do {
            scope = {
                x: x0,
            }
            x1 = evaluate(Equation, scope)
            iter++;
            ea = error(x0, x1);
            obj = {
                iteration: iter,
                X0: x0,
                X1: x1,
                error: ea,
            }
            data.push(obj)
            x0 = x1;
        } while (ea > e && iter < MAX);
        setX(x1)
    }

    const data = [];
    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("4/(2x-1)")
    const [X, setX] = useState(0)
    const [X0, setX0] = useState(1.5)

    const inputEquation = (event) => {
        setEquation(event.target.value)
    }
    const inputX0 = (event) => {
        setX0(event.target.value)
    }

    const calculateRoot = () => {
        const x0num = parseFloat(X0)
        Calculate(x0num);

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
    }

    return (
        <Container>
            <Form >
                <br />
                <center><h3><b>Solving systems root of an equation using<br />
                    Fixed point iteration method</b></h3>
                    <Form.Group className="mb-3">
                        <br />
                        <Form.Label>Input x</Form.Label><br />
                        <div className="d-inline-flex p-2">
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "65%", margin: "0 auto" }} className="form-control"></input>
                        <Button type="button"  variant="outline-secondary" onClick={Randoms}>
                            Random
                        </Button>
                        </div>
                        <br /><Form.Label>Input x0</Form.Label>
                        <input type="number" id="XL" value={X0} onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
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

export default Fixed_Point