import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap";
import { det } from 'mathjs'

const Cramer = () => {
    // มีข้อผิดพลาดคือหากเปลี่ยนมิติของเมทริก ค่าที่กรอกอยู๋่เดิมจะไม่หายไป แต่ในการคำนวณภายในจะเป็น 0 ทั้งหมดแล้ว 
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

    const Calculate = (matrixA, matrixB) => {
        var D = det(matrixA)
        var D_column;
        var determinant = [];
        // D_column = matrixA; แบบนี้ไมไ่ด้เพราะเป็นการส่งผ่านแบบ pointer จะไปแก้ข้อมูลใน matrixA
        var X = [];
        for (var i = 0; i < matrixA.length; i++) {
            D_column = copyMatrix(matrixA);
            // console.log(matrixA)
            for (var j = 0; j < matrixA.length; j++) {
                console.log("j: " + j + " " + D_column[j][i])
                D_column[j][i] = matrixB[j]
            }
            X[i] = det(D_column) / D;
            determinant.push(det(D_column))
            console.log(X[i])
        }
        setAns(X)
        setD(D)
        setDeterminant(determinant)
    }

    //const [matA, setA] = useState([])
    const [matA, setA] = useState([
        [0, 0],
        [0, 0]
    ]);
    const [matB, setB] = useState([])
    const [D, setD] = useState([])
    const [ans, setAns] = useState([])
    const [Deter, setDeterminant] = useState([])
    const [numMatrix, setMatrix] = useState(2);

    const ChangematrixA = (event, row, column) => {
        //console.log("row: "+ row + " column: "+ column)
        matA[row][column] = parseFloat(event.target.value)
    }
    const ChangematrixB = (event, row) => {
        matB[row] = parseFloat(event.target.value)
    }

    const inputMatrix = (event) => {//เพื่อสร้างอาเรย์ n มิติที่จะ put 0 ลงไป
        setMatrix(event.target.value)
        if (event.target.value > 1) {
            var a = []
            var b = []

            for (var i = 0; i < event.target.value; i++) {
                a[i] = [] //declare เพื่อให้รู้ว่าเป็นอาเรย์กี่มิติ เช่น อาเรย์ 3 มิติจะเป็นแบบนี้ [Array(3), Array(3), Array(0)]
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
                    Cramer's Rule method</b></h3>
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
            <br /><br />
            <center>
                <h4>Answer:<br /></h4> {ans.map((ans, i) => (
                    <p>X{i + 1} = ( Delta{i + 1} / D  ) = ( {Deter[i]} / {D} ) = {ans.toPrecision(7)}</p>
                ))}
            </center>
        </Container >
    )
}

export default Cramer