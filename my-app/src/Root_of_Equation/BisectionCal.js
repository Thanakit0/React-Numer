import { evaluate } from 'mathjs'



export const Calbisection = (new_Equation, xl, xr) => {

    let data = [];

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
    
    const check_bisection = (xl, xr) => {
        let scope;
        scope = {
            x: xl,
        }
        var a = evaluate(new_Equation, scope);
        scope = {
            x: xr,
        }
        let b = evaluate(new_Equation, scope);
        return (a * b);
    }

    var xm, fXm, fXr, ea, scope;
    var iter = 0; //number of interation
    var x_old = 0;
    var MAX = 50; // max number of iteration
    const e = 0.00001;
    var obj = {};

    if (check_bisection(xl, xr) < 0) { //check bisection can use 
        do {
            if (iter !== 0) //ถ้าไม่ใส่ไว้ในรอบที่ 0 จะทำให้ค่าที่อยู๋ใน x0 เป็น undefined เพราะรอบแรกยังไม่มีค่า x ใหม่
                x_old = xm + 0;
            xm = (xl + xr) / 2.0;
            scope = { //it is a obj to convert xm to x!!
                x: xr,
            }
            fXr = evaluate(new_Equation, scope) //pass scope to equation -> x
            scope = {
                x: xm,
            }
            fXm = evaluate(new_Equation, scope)

            iter++;
            if (fXm * fXr < 0) { //check cuting R or L
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr
                }
                data.push(obj)
                xl = xm;
            } else {
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr
                }
                data.push(obj)
                xr = xm;
            }
            ea = error(x_old, xm);
        } while (ea > e && iter < MAX); //check error % 
    }
    return {datanew: data, xnew: xm}
}