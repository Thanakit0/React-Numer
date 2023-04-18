import React from "react";

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/#">Home</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/#" role="button" aria-expanded="false">Root of Equation</a>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="Bisection">Bisection Method</Link></li>
                    <li><Link className="dropdown-item" to="FalsePosition">False-Position Method</Link></li>
                    <li><Link className="dropdown-item" to="FixedPoint">Fixed Point Iteration Method</Link></li>
                    <li><Link className="dropdown-item" to="Taylor">Taylor Series</Link></li>
                    <li><Link className="dropdown-item" to="NewtonRaphson">Newton-Raphson Method</Link></li>
                    <li><Link className="dropdown-item" to="Secant">Secant Method</Link></li>
                </ul>
            </li>

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Linear Algebraic Equation
                </a>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="Cramer">Cramer's Rule</Link></li>
                    <li><Link className="dropdown-item" to="Elimination">Gauss Elimination Method</Link></li>
                    <li><Link className="dropdown-item" to="Jordan">Gauss-Jordan Method</Link></li>
                    <li><Link className="dropdown-item" to="Matrix">Matrix Inversion Method</Link></li>
                    <li><a className="dropdown-item" href="/#">LU Decomposition Method</a></li>
                    <li><a className="dropdown-item" href="/#">Cholesky Decomposition Method</a></li>
                    <li><a className="dropdown-item" href="/#">Jacobi Iteration Method</a></li>
                    <li><a className="dropdown-item" href="/#">Gauss-Seidel Iteration Method</a></li>
                    <li><a className="dropdown-item" href="/#">Conjugate Gradient Method</a></li>
                </ul>
            </li>

            {/* <li className="nav-item">
                <a className="nav-link" href="/#">Link</a>
            </li> */}

        </ul>
    );
}

export default Navbar;
