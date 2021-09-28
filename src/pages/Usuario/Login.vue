<template>
  <b-container fluid>
    <b-row align-h="center" align-v="center" class="vh-100">
      <b-col>
        <b-row class="text-center">
          <b-col>
            <h1>Login</h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                label="Usuário"
                label-for="usuario">
              <b-form-input id="usuario" v-model="usuario.usuario"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                label="Senha"
                label-for="senha">
              <b-form-input type="password" id="senha" v-model="usuario.senha"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-button class="w-100" variant="primary" @click="entrar">Entrar</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>

import api from "../../services/api"

export default {
  name: "Login",
  data() {
    return {
      usuario: {
        usuario: null,
        senha: null
      }
    }
  },
  methods: {
    async entrar() {
      const {usuario, senha} = this.usuario
      await api.get("/usuario/login", { params : {usuario: usuario, senha}}).then( resposta => {
        console.log(resposta)
        this.$router.push({name: "Home"})
      })
    }
  }
}
</script>

<style scoped>

</style>