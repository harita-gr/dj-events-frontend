import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({

    email: Yup.string().trim()
        .required('Required')
        .email('Invalid email address'),     
    password: Yup.string().trim()
        .required('Required')
        .min(6,'Should be atleast 6 charcters')

});