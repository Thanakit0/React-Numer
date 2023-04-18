import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Nav_bar';
import Bisection from './Root_of_Equation/Bisection';
import FalsePosition from './Root_of_Equation/False_Position';
import FixedPoint from './Root_of_Equation/Fixed_Point_Iteration';
import NewtonRaphson from './Root_of_Equation/Newton-Raphson';
import Secant from './Root_of_Equation/Secant';
import Taylor from './Root_of_Equation/Taylor';
import Cramer from './Linear_Algebraic_Equation/Cramer';
import GaussElimination from './Linear_Algebraic_Equation/Gauss_Elimination';
import GaussJordan from './Linear_Algebraic_Equation/Gauss_Jordan';
import MatrixInversion from './Linear_Algebraic_Equation/Matrix_Inversion';

// import Cholesky from './Root/Cholesky.js';
// import Conjugate from './Root/Conjugate.js';
// import Gauss_Seidel from './Root/Gauss_Seidel.js';
// import Jacobi from './Root/Jacobi.js';
// import LU from './Root/LU.js';
// ;



function App() {
  
  return (
    
    <div>
      

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Bisection />} />
        <Route exact path="/Bisection" element={<Bisection />} />
        <Route exact path="/FalsePosition" element={<FalsePosition />} />
        <Route exact path="/FixedPoint" element={<FixedPoint />} />
        <Route exact path="/Taylor" element={<Taylor />} />
        <Route exact path="/NewtonRaphson" element={<NewtonRaphson />} />
        <Route exact path="/Secant" element={<Secant />} />
        <Route exact path="/Cramer" element={<Cramer />} />
        <Route exact path="/Elimination" element={<GaussElimination />} />
        <Route exact path="/Jordan" element={<GaussJordan />} />
        <Route exact path="/Matrix" element={<MatrixInversion/>} />
        { /*
        
        
        <Route path="LU" element={<LU/>} />
        <Route path="Cholesky" element={<Cholesky/>} />
        <Route path="Jacobi" element={<Jacobi/>} />
        <Route path="Seidel" element={<Gauss_Seidel/>} />
        <Route path="Conjugate" element={<Conjugate/>} /> */}
      </Routes>

     
    
    </div>
  );
}

export default App;