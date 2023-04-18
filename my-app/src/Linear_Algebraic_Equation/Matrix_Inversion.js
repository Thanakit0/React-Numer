import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap";
import { identity, multiply } from 'mathjs'

const Inverse = () => {

    const calculateRoot = () => {
        Calculate(matA, matB);
    }

    const copyMatrix = (matrix) => {
        var array = []
        for (var i = 0; i < matrix.length; i++) {
            array[i] = [];
            for (var j = 0; j < matrix.length; j++) {
                array[i][j] = matrix[i][j];
            }
        }
        return array
    }

    const Calculate = (MatrixA, matrixB) => {
        var matrixA = copyMatrix(MatrixA)
        const n = matrixA.length;
        var identityMatrix = identity(n)._data  //เมทริกซ์เอกลักษณ์

        for (let k = 0; k < n - 1; k++) {
            for (let i = k + 1; i < n; i++) {
                const factor = matrixA[i][k] / matrixA[k][k];//ตัวคูณที่ต้องการกำจัดในแถว
                // update matrix
                for (let j = 0; j < n; j++) {
                    identityMatrix[i][j] -= factor * identityMatrix[k][j];
                    matrixA[i][j] -= factor * matrixA[k][j];
                }
                matrixA[i][k] = 0;
            }
        }
        // console.log("upper triangular matrix: ")
        // console.log(matrixA)
        // console.log(identityMatrix)
        // console.log(matA)

        // // console.log("lower triangular matrix: ")
        // // console.log(matrixA)

        //do matrix[i][i] to 1 and find answer for matrix B
        for (let i = 0; i < n; i++) {
            const factor = matrixA[i][i]
            for (let j = 0; j < n; j++) {
                //console.log("identity matrix " + identityMatrix[i][j] + "matrix A" + matrixA[i][i])
                identityMatrix[i][j] = identityMatrix[i][j] / factor;

                //console.log("identity matrix " + matrixA[i][j] + "matrix A" + matrixA[i][i]);
                matrixA[i][j] = matrixA[i][j] / factor;
            }

            matrixA[i][i] = 1;
        }


        //do reverse ไล่การทำงานจากตัวสุดท้ายไปเรื่อยๆ
        for (let k = n - 1; k >= 0; k--) {
            for (let i = k - 1; i >= 0; i--) {
                const factor = matrixA[i][k] / matrixA[k][k];//ตัวคูณที่ต้องการกำจัดในแถว
                // update matrix
                for (let j = n - 1; j >= 0; j--) {
                    identityMatrix[i][j] -= factor * identityMatrix[k][j];
                    matrixA[i][j] -= factor * matrixA[k][j];
                }
                matrixA[i][k] = 0;
            }
        }


        console.log(matrixA)
        console.log(identityMatrix)
        console.log("---------------------------------")

        var X = multiply(identityMatrix, matrixB)
        setAns(X)
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
                    Inverse Matrix method</b></h3>
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
                    <p key={i}>X{i + 1} = {ans.toPrecision(7)}</p>
                ))}
            </center>
        </Container >
    )
}

export default Inverse