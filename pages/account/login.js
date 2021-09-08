import { FaUser } from 'react-icons/fa'
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'
import { useFormik } from 'formik';
import {useState,useEffect,useContext} from 'react'
import Link from 'next/link'
import { LoginSchema } from 'schemas/login.schema'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import logo from 'public/icons/google.svg'

const clientId = '473438493331-e5nlg4c1gipfi13fnp4i95k1moi3bq7j.apps.googleusercontent.com';

const LoginPage = () => {

    const onSuccess = (response) =>{
        console.log('[Login Success] currentUser: ', response.profileObj);
    }
    const onFailure = (response) =>{
        console.log('[Login Failed] response: ', response);
    }

    //USING FORMIK

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            alert(JSON.stringify(values,null,2));
        }
    });

return (
   
     <Layout title='User Login'>
        <div className={styles.auth}>
           <h1>
               <FaUser /> Log In
           </h1>
           <div>

                <GoogleLogin
                    clientId={clientId}
                    buttonText='Sign in with Google'
                    onSuccess= {onSuccess}
                    onFailure= {onFailure}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                        <GoogleButton onClick={renderProps.onClick} />
                      )}
                    isSignedIn={true}
                />

            </div> 
           <form onSubmit={formik.handleSubmit}>

             <div>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"   
                    value={formik.values.email}                   
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}              
                />
                {formik.touched.email && formik.errors.email 
                ? (<small>{formik.errors.email}</small>) 
                : null
                }
             </div>
             <div>
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formik.values.password} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                />
                {formik.touched.password && formik.errors.password 
                ? (<small>{formik.errors.password}</small>) 
                : null
                }
            </div>
           
            <input type="submit" value="Login" className="btn" />
         </form>

            <p>
                 Don't have an account? <Link href="/account/register"> Register </Link>
           </p>
       </div>
    </Layout>         

)
}

// WITHOUT FORMIK & YUP

//     const [email,setEmail] = useState('');
//     const [password,setPassword] = useState('');
    

//     const handleSubmit = e => {
//         e.preventDefault();
//         console.log({email,password});
//     }

//     return (
//         <Layout title='User Login'>
//             <div className={styles.auth}>
//                <h1>
//                    <FaUser /> Log In
//                </h1>
//                <form onSubmit={handleSubmit}>
//                    <div>
//                        <label htmlFor="email">Email Address</label>
//                        <input type="email" id="email" value={email} 
//                          onChange={(e) => setEmail(e.target.value)}/>
//                    </div>
//                    <div>
//                        <label htmlFor="password">Password</label>
//                        <input type="password" id="password" value={password} 
//                          onChange={(e) => setPassword(e.target.value)}/>
//                    </div>

//                    <input type="submit" value="Login" className="btn" />

//                </form>

//                <p>
//                    Don't have an account? <Link href="/account/register"> Register </Link>
//                </p>


//             </div>
            
//         </Layout>
//     )
// }

export default LoginPage
