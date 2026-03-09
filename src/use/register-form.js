import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import {ref} from 'vue';
import { useAuthStore } from '@/store/auth.module';
import {useRouter} from 'vue-router';


export function useRegisterForm(){
    const store = useAuthStore();
    const router = useRouter();
    const errorMessage = ref('');
    const {handleSubmit} = useForm();

    const {value: username} = useField(
        'username',
        yup
        .string()
        .trim()
        .required()
    )

    const {value: password} = useField(
        'password',
        yup
        .string()
        .trim()
        .required()
    )

    const {value: confirPassword} = useField(
        'confirmPassword',
        yup
        .string()
        .trim()
        .required()
    )

    const {value: inviteCode} = useField(
        'code',
        yup
        .string()
        .trim()
        .required()
    )

    let isRegisterFailed = ref(false)

    const onRegister = handleSubmit(async values => {
        if (values.password !== values.confirmPassword){
            errorMessage.value = 'Пароли не совпадают';
            isRegisterFailed.value = true
            return
        }
        try {
            await store.registration({
                email: values.username,
                password: values.password,
                invite_code: values.code,
            });
            router.push('/dashboard')
        } catch (e) {
            errorMessage.value = '500. Ошибка на стороне сервера' 
            if (e.status === 400){
                errorMessage.value = 'Некорретный пригласительный код'
            }
            if (e.status === 409){
                errorMessage.value = 'Почта уже занята'
            }
            isRegisterFailed.value = true
            username.value = '';
            password.value = '';
            confirPassword.value = '';
            inviteCode.value = '';
        }
    })

    return {
        regUsername: username,
        regPassword: password,
        regConfirmPassword: confirPassword,
        inviteCode,
        onRegister,
        isRegisterFailed,
        errorMessage
    }
}