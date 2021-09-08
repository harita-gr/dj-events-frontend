import * as Yup from 'yup';

export const RegistrationSchema = Yup.object().shape({

    username: Yup.string().trim()
        .required('Required')
        .max(15, 'Must be 15 characters or less'),
    email: Yup.string().trim()
        .required('Required')
        .email('Invalid email address'),     
    password: Yup.string().trim()
        .required('Required')
        .min(6,'Should be atleast 6 charcters'),
    passwordConfirm: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'),null],'Passwords are not matching')

});