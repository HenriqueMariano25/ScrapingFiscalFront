<template>
  <b-container class="home">

    <b-row class="text-center">
      <b-col>
        <h1>Leitor QR Code Notas Fiscais</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button block @click="mostrarQr = !mostrarQr">
          Ler código
        </b-button>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-2" v-show="mostrarQr">
      <b-col cols="auto" class="leitor">
          <qrcode-stream :camera="camera" @decode="codigoLido" :track="paintOutline">
            <div  >
              <b-row no-gutters align-v="center" v-show="carregando" class="carregando text-center">
                <b-col>
                  <h2><b-spinner label="Spinning"></b-spinner> Buscando dados...</h2>
                </b-col>
              </b-row>
            </div>
          </qrcode-stream>

      </b-col>
    </b-row>
    <b-row v-show="mostrarTabela" class="mt-2">
      <b-col>
        <b-table head-variant="dark" no-border-collapse striped hover :items="itens" :fields="campos" sticky-header small bordered></b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>

      </b-col>
    </b-row>
    <b-row v-show="mostrarBotao">
      <b-col>
          <b-button variant="success" @click="criarExcel" block>
            Gerar Excel
          </b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Home",
  data(){
    return{
      camera: 'auto',
      itens: [],
      campos: [
        {key: 'nome', label: 'Nome', sortable: true, thClass: 'text-center'},
        {key: 'valor', label: 'Valor', sortable: true, thClass: 'text-center'},
        {key: 'quantidade', label: 'Quantidade', sortable: true, thClass: 'text-center'},
        {key: 'unidade', label: 'Unidade', sortable: true, thClass: 'text-center'},
      ],
      dados: [],
      mostrarQr: false,
      mostrarTabela: false,
      carregando: false,
      mostrarBotao: false
    }
  },
  methods:{
    async codigoLido(link) {
      this.carregando = true
      this.camera = 'off'
      await api.get("/consultar", {params: {link: link}}).then(resposta => {
        this.itens = resposta.data.itens
        this.dados = [resposta.data]
        console.log(resposta)
        this.carregando = false
        this.antesBusca = false
        this.mostrarTabela = true
        this.mostrarBotao = true
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
    async criarExcel(){
      console.log(this.dados)
      let dados = this.dados
      await api.post("gerar_excel", { dados }, {responseType: 'arraybuffer'}).then(resposta => {
        let blob = new Blob([resposta.data], {type: resposta.headers['content-type']});
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "teste";
        link.click();
      })
    }
  }
}
</script>

<style scoped>
.leitor{
  width: 40%;
}
.carregando {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(150,150,150,0.7);
  z-index: 1;
}

.home{
  background-color: rgb(230,230,230);
  border-radius: 5px;
  padding-bottom: 10px;
}
</style>