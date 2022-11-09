<template>
  <div class="forms">
    <h1>Login</h1>
    <label class="login-form__label" >UEmail:</label>
    <input
        type="email"
        id="login-email"
        placeholder="Introduzca su email"
        required
        v-model="email"
        tabindex="1"
        autofocus
        ref="email"
    >

    <label class="login-form__label" >Contraseña:</label>
    <input
        type="password"
        id="login-password"
        placeholder="Introduzca su contraseña"
        required
        v-model="password"
        tabindex="20"
        @keyup.enter="login"
    >
    <br>
    <p v-if="error" class="login-error">Has introducido mal el email o la contraseña.</p>
    <input class="form-submit" type="button" value="Iniciar Sesión" tabindex="30" @click="login(email, password)">

    <!---------------------------------------------------------------------------------------------------------------------------------------------------->
    <h1 class="registro">Registrarse</h1>

    <label class="login-form__label">Nombre:</label>
    <input
        type="text"
        class="login-form__input"
        id="login-name"
        placeholder="Introduzca su nombre"
        required
        v-model="name"
        tabindex="1"
        autofocus
        ref="name"
    >

    <label class="login-form__label">Apellido:</label>
    <input
        type="text"
        class="login-form__input"
        id="login-lastname"
        placeholder="Introduzca su apellido"
        required
        v-model="lastname"
        tabindex="20"
    >

    <label class="login-form__label">Email:</label>
    <input
        type="email"
        class="login-form__input"
        placeholder="Introduzca su email"
        required
        v-model="emailRegister"
        tabindex="30"
    >
    <label class="login-form__label">Contraseña:</label>
    <input
        type="password"
        class="login-form__input"
        id="password"
        placeholder="Introduzca su contraseña"
        required
        v-model="passwordRegister"
        tabindex="50"
        ref="password"
    >
    <label class="login-form__label">Repita su contraseña:</label>
    <input
        type="password"
        class="login-form__input"
        id="register-password"
        placeholder="Repita su contraseña"
        required
        v-model="repeatPassword"
        tabindex="60"
        @keyup.enter="register()"
    >
    <br>
    <p v-if="errorInputs" class="login-error">Debes completar todos los campos</p>
    <input id="form-submit-toregister" type="button" value="Registrarse" tabindex="70" @click="register()">

    <p>{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LogIn',
  data: () => ({
    email: null,
    password: null,
    error: false,
    name: null,
    lastname: null,
    emailRegister: null,
    passwordRegister: null,
    repeatPassword: null,
    errorInputs: false,
    message: null,
  }),
  methods: {
    login() {
      if(this.email != null && this.password != null) {
        axios.get("http://localhost:5000/api/v1/users/" + this.email)
            .then(response => {
              console.log(response.data.message)
              if ((response.data.user['email'] === this.email) && response.data.user['password'] === this.password) {
                this.$router.push('/' + response.data.user['id'] + '/home');
              } else {
                this.error = true;
                this.$refs.email.focus();
              }

            })
            .catch(err => {
              console.log(err);
              // this.$router.push("/error-server")
            })
      } else {
        this.error = true
        this.$refs.email.focus()
      }
    },
    register() {
      if (this.name != null && this.lastname != null && this.emailRegister != null && this.passwordRegister != null &&
          this.repeatPassword != null) {

        if (this.passwordRegister === this.repeatPassword) {

          let newUser = {
            "address": null,
            "email": this.emailRegister,
            "lastname": this.lastname,
            "name": this.name,
            "password": this.passwordRegister,
            "tel": null,
            "neighborhood" : null,
            "cards": []
          }

          axios.post('http://localhost:5000/api/v1/users', newUser)
              .then(response => {
                console.log(response.data.message)

                if (response.data.status === "201") {
                  if (this.errorInputs) { //reset errors
                    this.errorInputs = false;
                  }
                  this.message = response.data.message;

                } else {
                  this.message = "Error en los datos";
                }

              })
              .catch(err => {
                console.log(err)
                // this.$router.push("/error-server")
              })

        } else {
          if(this.errorInputs) {this.errorInputs = false}
          this.message = "The passwords are different";
        }
      } else{
        this.errorInputs = true
      }
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&family=Nunito&display=swap');
.login-form__label{
  font-family: "Comfortaa", cursive;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 0.3%;
}
h1{
  font-family: "Comfortaa", cursive;
  color: black;
  margin-top: 5%;
}
.forms{
  background-color: #e4a82f;
  height: 105vh;
  width: 100%;
  margin-top: -5%;
}
.form-submit{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left:40%;
  width: 20%;
  height: 50px;
  background: #8e1f30;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  padding-left: 2px;
  margin-top: 1%;
  text-decoration: none;
}
.form-submit:hover{
  background-color: #e4a82f;
  text-decoration: none;
  border: #8e1f30 solid;
}
#form-submit-toregister{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left:40%;
  width: 20%;
  height: 50px;
  background: #8e1f30;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  padding-left: 2px;
  margin-top: 1%;
  text-decoration: none;
}
#form-submit-toregister:hover{
  background-color: #e4a82f;
  text-decoration: none;
  border: #8e1f30 solid;
}
.registro{
  margin-top: 1%;
}
p{
  font-family: "Comfortaa", cursive;
  color: black;
}
input{
  width: 30%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 0.375rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  margin-top: -2%;
}

</style>