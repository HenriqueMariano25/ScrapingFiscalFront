<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <b-button class="w-100" @click="$modal.show('adicionar-gastos')">
              Adicionar gasto
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <modal width="90%" name="adicionar-gastos" adaptive clickToClose height="90%">
          <b-container>
            <div class="carregando" v-show="carregando">
              <b-row class="vh-100 text-center" no-gutters align-v="center">
                <b-col>
                  <h2><b-spinner label="Spinning"></b-spinner> Buscando dados...</h2>
                </b-col>
              </b-row>
            </div>
            <b-row class="text-center">
              <b-col>
                <h3>Adicionar gasto</h3>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <qrcode-stream :camera="camera" @decode="codigoLido" :track="paintOutline"></qrcode-stream>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <span><strong>Estabelecimento: </strong>{{ dados.estabelecimento }}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <span><strong>Dia e hora: </strong>{{ dados.dia}} {{ dados.hora}}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <span><strong>Forma de pagamento: </strong>{{ dados.formaPagamento }}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-table striped hover :items="itens" :fields="campos">

                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button block variant="danger">
                  Cancelar
                </b-button>
              </b-col>
              <b-col>
                <b-button block>
                  Salvar dados
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import api from "../services/api"

export default {
  name: "Home",
  data() {
    return {
      itens: [],
      campos: [
        {key: 'nome', label: 'Nome', sortable: true, thClass: 'text-center'},
        {key: 'valor', label: 'Valor', sortable: true, thClass: 'text-center'},
      ],
      dados: [],
      carregando: false,
      camera: 'auto'
    }
  },
  methods: {
    async codigoLido(link) {
      this.carregando = true
      this.camera = 'off'
      await api.get("/consultar", {params: {link: link}}).then(resposta => {
        this.itens = resposta.data.itens
        this.dados = resposta.data
        console.log(resposta)
        this.carregando = false
        // this.camera = 'auto'
      })
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const {x, y} of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
  }
}
</script>

<style>

.carregando {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(150,150,150,0.7);
  z-index: 1;
  margin-left: -15px;
}
</style>