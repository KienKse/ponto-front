<template>
  <v-layout>
    <v-flex class="text-center">
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="pa-2" outlined tile>
            {{ mes }}
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4">
          <v-card class="pa-2" outlined style="background-color: #f0f0f0;" tile>
            Data
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-2" outlined style="background-color: #f0f0f0;" tile>
            Saldo
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-2" outlined style="background-color: #f0f0f0;" tile>
            Obeservação
          </v-card>
        </v-col>
      </v-row>
      <apontamento-list></apontamento-list>
    </v-flex>
  </v-layout>
</template>

<script>
import ApontamentoList from '@@/components/ApontamentoList'

export default {
  components: {
    ApontamentoList
  },
  data() {
    return {
      month: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      mes: null
    }
  },
  created() {
    this.mes = this.month[new Date().getMonth()]
  },
  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    }
  }
}
</script>
