<template>
  <v-layout>
    <v-flex class="text-center">
      <v-row>
        <v-col cols="6">
          <v-text-field v-mask="'##:##'" v-model="carga" />
        </v-col>
        <v-col cols="6">
          <v-btn block color="indigo" dark>Salvar</v-btn>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      carga: '08:00'
    }
  }
}
</script>
