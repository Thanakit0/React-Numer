import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap";

const Elimination = () => {
    const calculateRoot = () => {
        Calculate(matA, matB);
    }

    const Calculate = (matrixA, matrixB) => {
        const n = matrixA.length;

        //Forward Elimination
        for (let k = 0; k < n - 1; k++) {
            for (let i = k + 1; i < n; i++) {
                const factor = matrixA[i][k] / matrixA[k][k]; //value to do matrix to 0
                for (let j = k + 1; j < n; j++) {
                    matrixA[i][j] -= factor * matrixA[k][j];//delete all row with factor value
                }
                matrixB[i] -= factor * matrixB[k];
                matrixA[i][k] = 0;
            }
        }
        console.log(matrixA)
        console.log(matrixB)
        console.log("---------------------------------")

        //Back Substitution 
        const x = new Array(n).fill(0);
        x[n - 1] = matrixB[n - 1] / matrixA[n - 1][n - 1]; //last matrix
        for (let i = n - 2; i >= 0; i--) {
            console.log(i)
            let sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += matrixA[i][j] * x[j]; //sum all matrix ยกเว้นตัวที่ j
            }
            x[i] = (matrixB[i] - sum) / matrixA[i][i];
        }
        setAns(x)
    }

    const [matA, setA] = useState([
        [0, 0],
        [0, 0]
    ]);
    const [matB, setB] = useState([])
    const [ans, setAns] = useState([])
    const [numMatrix, setMatrix] = useState(2);
    const ChangematrixA = (event, row, column) => {
        matA[row][column] = parseFloat(event.target.value)
    }
    const ChangematrixB = (event, row) => {
        matB[row] = parseFloat(event.target.value)
    }

    const inputMatrix = (event) => {
        setMatrix(event.target.value)
        if (event.target.value > 1) {
            var a = []
            var b = []
            for (var i = 0; i < event.target.value; i++) {
                a[i] = []
                for (var j = 0; j < event.target.value; j++) {
                    a[i][j] = 0
                    b[i] = 0
                }
                setA(a)
                setB(b)
            }
        }
        else {
            setA([])
            setB([])
        }
    }

    return (
        <Container>
            <Form >
                <br />
                <center><h3><b>Solving systems of linear equations using <br />
                    Gauss Elimination Back Substitution method</b></h3>
                    <Form.Group className="mb-3">
                        <br />
                        <Form.Label><h5>Matrix dimension:</h5></Form.Label>
                        <input type="number" min="0" id="numMatrix" value={numMatrix} onChange={inputMatrix} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    </Form.Group>
                    <table>
                        <thead>
                            <tr>
                                {/* add all cell matrix A */}
                                <th colSpan={matA[0].length}>Matrix A</th>
                                <th>Matrix B</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matA.map((matrixValueA, i) => (
                                <tr key={i}>
                                    {matrixValueA.map((indexOf_j, j) => (
                                        <td key={`${i}-${j}`}>
                                            <input onChange={(event) => ChangematrixA(event, i, j)} placeholder="Matrix A" />
                                        </td>
                                    ))}
                                    <td>
                                        <input onChange={(event) => ChangematrixB(event, i)} placeholder="Matrix B" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </center>
            </Form>
            <br />
            <center>
                <h4><b>Answer:<br /></b></h4> {ans.map((ans, i) => (
                    <p>X{i + 1} = {ans.toPrecision(7)}</p>
                ))}
            </center>
        </Container >
    )
}

export default Elimination