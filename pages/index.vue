<template>
  <v-layout justify-center align-center>
    <v-flex>
      <v-row>
        <v-col>
          <!-- <div class="text-center">
            <logo />
          </div>-->
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="obs"
                label="Observação"
                placeholder="Digite a observação"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- TIME -->
            <v-col cols="11" sm="5">
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    v-on="on"
                    label="Horario"
                    readonly
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="modal2"
                  v-model="time"
                  use-seconds
                  format="24hr"
                  full-width
                >
                  <v-spacer></v-spacer>
                  <v-btn @click="modal2 = false" text color="primary"
                    >Cancelar</v-btn
                  >
                  <v-btn @click="$refs.dialog.save(time)" text color="primary"
                    >Salvar</v-btn
                  >
                </v-time-picker>
              </v-dialog>
            </v-col>

            <!-- DATE -->
            <v-col cols="10" sm="8" md="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    v-on="on"
                    label="Data"
                    hint="Mês / Dia / Ano"
                    persistent-hint
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="menu2 = false"
                  v-model="date"
                  no-title
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- CARD -->
          <v-card
            class="mx-auto"
            max-width="400"
            style="padding: 25px; border-radius: 10px"
          >
            <div class="overline mb-4">Informações</div>
            <p>
              Data:
              <strong>{{ date }}</strong>
            </p>
            <p>
              Horario:
              <strong>{{ time }}</strong>
            </p>
            <v-card-actions>
              <v-row>
                <v-col cols="10" sm="6">
                  <div class="my-2">
                    <v-btn
                      @click="registrar(date, time, obs)"
                      color="primary"
                      fab
                      small
                      dark
                    >
                      <v-icon>mdi-alarm</v-icon>
                    </v-btn>
                    <v-label>Salvar</v-label>
                  </div>
                </v-col>
                <v-col cols="10" sm="6">
                  <div class="my-2">
                    <v-btn @click="limparCampos" color="error" fab small dark>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-label>Limpar</v-label>
                  </div>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- APONTAMENTOS -->
        <v-col>
          <v-row v-for="item in apontamentos" v-bind:key="item.id" no-gutters>
            <v-col cols="4">
              <v-card class="pa-2" outlined tile>
                {{ item.date }}
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="pa-2" outlined tile>
                {{ item.time }}
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="pa-2" outlined tile>
                {{ item.obs }}
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    obs: null,
    time: null,
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu2: false,
    modal2: false,
    apontamentos: []
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  created() {
    const data = new Date()
    this.time =
      data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds()
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    limparCampos() {
      this.date = null
      this.time = null
      this.obs = null
    },
    async registrar() {
      if (!this.verificarHorario(this.date, this.time, this.obs)) {
        const date = this.date
        const time = this.time
        const obs = this.obs === null ? 'Não consta' : this.obs
        this.apontamentos.push({
          date,
          time,
          obs
        })
        await this.$axios
          .post('/api/registrar', {
            date,
            time,
            obs
          })
          .then(function(response) {
            // console.log(response.data)
            // console.log(response.status)
            // console.log(response.statusText)
            // console.log(response.headers)
            // console.log(response.config)
            // this.apontamentos.put({
            //   data: this.date,
            //   time: this.time,
            //   obs: this.obs
            // })
          })
          .catch(function(error) {
            // console.log(this.apontamentos)
            console.log('ERRO\n\n\n' + error)
          })
      }
    },
    async getUser() {
      await this.$axios
        .get('https://gitlab.com/KienKse/sandbox/raw/master/monstro.json')
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err)
          return null
        })
    },
    async enviar() {
      await this.$axios
        .get('https://gitlab.com/KienKse/sandbox/raw/master/monstro.json', {
          crossdomain: true,
          headers: {
            'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATH',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
          }
        })
        .then(function(response) {
          // eslint-disable-next-line
          console.log('response is : ' + response.data)
        })
        .catch(function(error) {
          if (error.response) {
            // eslint-disable-next-line
            console.log('ERRO1\n\n\n' + error.response.headers)
          } else if (error.request) {
            // eslint-disable-next-line
            console.log('ERRO2\n\n\n' + error.request)
          } else {
            // eslint-disable-next-line
            console.log('ERRO3\n\n\n' + error.message)
          }
          // eslint-disable-next-line
          console.log('ERRO4\n\n\n' + error.config)
        })
    },
    verificarHorario(data, horario, obs) {
      let encontrado = false
      this.apontamentos.forEach((apontamento) => {
        if (apontamento.date === data && apontamento.time === horario) {
          encontrado = true
        }
      })
      return encontrado
    }
  }
}
</script>
