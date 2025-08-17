import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import {ref} from 'vue';
import { useAuthStore } from '@/store/auth.module';
import {useRouter} from 'vue-router';


export function useLoginForm(){
    const store = useAuthStore();
    const router = useRouter();
    const {handleSubmit} = useForm();

    const {value: username} = useField(
        'username',
        yup
        .string()
        .trim()
        .required('Пожалуйста введите логин')
    )

    const {value: password} = useField(
        'password',
        yup
        .string()
        .trim()
        .required('Пожалуйста введите пароль')
    )

    let isAuthFailed = ref(false)

    const onLogin = handleSubmit(async values => {
        try {
            await store.login(values);
            router.push('/');
        } catch (e) { 
            isAuthFailed.value = true
            console.error(e)
        }
    })

    return {
        username,
        password, 
        onLogin,
        isAuthFailed
    }
}