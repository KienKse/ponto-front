<template>
  <v-layout column justify-center align-center>
    <v-flex>
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
            <v-time-picker v-if="modal2" v-model="time" full-width>
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
        max-width="344"
        outlined
        style="margin-top:50px; padding: 20px; border-radius:15px;"
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
          <!-- <v-btn small color="red">Limpar</v-btn> -->
          <!-- <v-btn small color="primary">Salvar</v-btn> -->
          <v-row>
            <v-col cols="10" sm="6">
              <div class="my-2">
                <v-btn @click="enviar" color="primary" fab small dark>
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
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: (vm) => ({
    // date: new Date().toISOString().substr(0, 10),
    obs: null,
    date: null,
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    // menu1: false,
    time: null,
    menu2: false,
    modal2: false
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
      return ''
    },
    async enviar() {
      const personagem = await this.$axios.$get(
        'https://gitlab.com/KienKse/sandbox/raw/master/monstro.json'
      )
      // eslint-disable-next-line
      console.log(personagem)
    }
  }
}
// // import Logo from '~/components/Logo.vue'
// // import VuetifyLogo from '~/components/VuetifyLogo.vue'
// export default {
//   components: {
//     // Logo
//     // VuetifyLogo
//   }
// }
</script>
