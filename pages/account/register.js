import { FaUser } from 'react-icons/fa'
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import {useState,useEffect,useContext} from 'react'
import Link from 'next/link'
import { RegistrationSchema } from 'schemas/registration.schema';
import Layout from '@/components/Layout'
import AuthContext from '@/context/AuthContext';
import styles from '@/styles/AuthForm.module.css'


const RegisterPage = () => {

    const {register,error} = useContext(AuthContext);

    
    useEffect(() => error && toast.error(error));

 //USING FORMIK
//         const formik = useFormik({
//             initialValues: {
//                 username: '',
//                 email: '',
//                 password: '',
//                 passwordConfirm: '',
//             },
//             validationSchema: RegistrationSchema,
//             onSubmit: values => {
//                 alert(JSON.stringify(values,null,2));
//             }
//         });

//     return (
       
//          <Layout title='User Register'>
//             <div className={styles.auth}>
//                <h1>
//                    <FaUser /> Register
//                </h1>
//                <form onSubmit={formik.handleSubmit}>
//                   <div>
//                      <label htmlFor="username">Username</label>
//                      <input type="text"
//                             id="username" 
//                             name="username"
//                             value={formik.values.username} 
//                             onChange={formik.handleChange} 
//                             onBlur={formik.handleBlur}                                           
//                     />
//                     {formik.touched.username && formik.errors.username 
//                     ? (<small>{formik.errors.username}</small>) 
//                     : null
//                     }
//                  </div>
//                  <div>
//                     <label htmlFor="email">Email Address</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"   
//                         value={formik.values.email}                   
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}              
//                     />
//                     {formik.touched.email && formik.errors.email 
//                     ? (<small>{formik.errors.email}</small>) 
//                     : null
//                     }
//                  </div>
//                  <div>
//                     <label htmlFor="password">Password</label>
//                     <input 
//                         type="password" 
//                         id="password" 
//                         name="password" 
//                         value={formik.values.password} 
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur} 
//                     />
//                     {formik.touched.password && formik.errors.password 
//                     ? (<small>{formik.errors.password}</small>) 
//                     : null
//                     }
//                 </div>
//                 <div>
//                     <label htmlFor="passwordConfirm">Confirm Password</label>
//                     <input
//                         type="password" 
//                         id="passwordConfirm" 
//                         name="passwordConfirm" 
//                         value={formik.values.passwordConfirm} 
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.passwordConfirm && formik.errors.passwordConfirm 
//                     ? (<small>{formik.errors.passwordConfirm}</small>) 
//                     : null
//                     }
//                 </div>
               
//                 <input type="submit" value="Register" className="btn" />

//              </form>

//             <p>
//                 Already have an account? <Link href="/account/login"> Login </Link>
//             </p>
//            </div>
//         </Layout>         

//     )
//   }


        //WITHOUT FORMIK
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if(password !== passwordConfirm){
            alert('Passwords do not match');
            return;
        }
        register({username,email,password});
    }
    return (
        <Layout title='User Register'>
            <ToastContainer />
            <div className={styles.auth}>
               <h1>
                   <FaUser /> Register
               </h1>
               <form onSubmit={handleSubmit}>
               <div>
                       <label htmlFor="username">Username</label>
                       <input type="text" id="email" value={username} 
                         onChange={(e) => setUsername(e.target.value)} />
                   </div>
                   <div>
                       <label htmlFor="email">Email Address</label>
                       <input type="email" id="email" value={email} 
                         onChange={(e) => setEmail(e.target.value)}/>
                   </div>
                   <div>
                       <label htmlFor="password">Password</label>
                       <input type="password" id="password" value={password} 
                         onChange={(e) => setPassword(e.target.value)}/>
                   </div>
                   <div>
                       <label htmlFor="passwordConfirm">Confirm Password</label>
                       <input type="password" id="passwordConfirm" value={passwordConfirm} 
                         onChange={(e) => setPasswordConfirm(e.target.value)}/>
                   </div>


                   <input type="submit" value="Register" className="btn" />

               </form>

               <p>
                   Already have an account? <Link href="/account/login"> Login </Link>
               </p>
            </div>
            
        </Layout>
    )
}

export default RegisterPage

