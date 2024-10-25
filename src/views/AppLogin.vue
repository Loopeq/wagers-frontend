<template>
    <div class="centered-box-wrapper">
        <div class="main">
            <form class="form1" @submit.prevent="onSubmit">
                <input v-model="login" class="un" :class="{error: authError, agreed: succsess }" type="text" placeholder="Login" style="margin-bottom: 10px">
                <input v-model='password' class="un" :class="{error: authError, agreed: succsess }" type="password"  placeholder="Password" style="margin-bottom: 10px">
                <button class="submit un" :disabled="!(login && password)">Enter</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{ 
                login: null,
                password: null,
                authError: false,
                succsess: false
            }
        },

        methods:{
            async onSubmit(){
                if (this.login.length && this.password.length){
                    try {
                        const params = new URLSearchParams()
                        params.append('username', this.login.trim())
                        params.append('password', this.password.trim())
                        await this.axios
                        .post(this.$hostname + `/auth/jwt/login`, params, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }, 
                            withCredentials: true
                        })
                        .then(response => {
                            if (response.status === 204 || response.status === 200){
                                this.authError = false
                                this.succsess = true
                            } 
                        })
                    }
                    catch {
                        this.authError = true
                        this.password = null 
                        this.login = null
                    }
                    }
                }
            }, 

        mounted() {
            document.title = 'Log In'
        }
    }
</script>

<style scoped>
p{
    text-align: center;
}


.main {
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    height: 400px;
    margin: 7em auto;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);

    }
    
.sign {
    color: #FF3D00;
    font-weight: bold;
    font-size: 23px;
}

.un {
    width: 76%;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    text-align: center;
    font-family: 'Ubuntu', sans-serif;
}

form.form1 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
}

form.form1 > *{
    width: 100%;
}


.submit {
    cursor: pointer;
    text-align: center;
    user-select: none;
    color: #fff;
    background-color: #FF3D00;
    border: 0;
    font-size: 12px;
}

.submit:disabled{
    opacity: 0.4;
}

.submit:active{
    opacity: 0.5;
}


a {
    color: #E1BEE7;
    text-decoration: none
}

.error{
    border: 1px solid red
}

.agreed{
    border: 2px solid green
}

</style>