import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import {ref} from 'vue';
import { useAuthStore } from '@/store/auth.module';
import {useRouter} from 'vue-router';


export function useLoginForm(){
    const store = useAuthStore();
    const router = useRouter();
    const {handleSubmit, isSubmit} = useForm();

    const {value: username, handleBlur: lBlur} = useField(
        'username',
        yup
        .string()
        .trim()
        .required('Пожалуйста введите логин')
    )

    const MIN_LENGTH = 0;

    const {value: password, handleBlur: pBlur} = useField(
        'password',
        yup
        .string()
        .trim()
        .required('Пожалуйста введите пароль')
        .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
    )

    let isAuthFailed = ref(false)

    const onSubmit = handleSubmit(async values => {
        try {
            await store.login(values);
            if (store.isAuthenticated){
                router.push('/');
            }
        } catch (e) { 
            isAuthFailed.value = true
            username.value = '';
            password.value = '';
            console.log(e)
        }
    })

    return {
        username,
        password, 
        lBlur,
        pBlur, 
        onSubmit,
        isSubmit,
        isAuthFailed
    }
}